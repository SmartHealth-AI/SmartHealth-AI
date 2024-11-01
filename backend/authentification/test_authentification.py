import pytest
from django.contrib.auth import get_user_model
from authentification.models import Profile
from django.conf import settings
from rest_framework import status
from authentification.views import get_user_tokens
from rest_framework.test import APIClient

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user():
    def make_user(email="testuser@example.com", password="testpass123", **kwargs):
        User = get_user_model()
        user = User.objects.create_user(email=email, password=password, **kwargs)
        return user
    return make_user

# Kiểm thử đơn vị cho phương thức __str__ của User
@pytest.mark.django_db
@pytest.mark.unit
def test_user_str():
    User = get_user_model()
    user = User.objects.create_user(email="testuser@example.com", password="testpass123")
    assert str(user) == "testuser@example.com"

# Kiểm thử đơn vị cho việc tạo Profile
@pytest.mark.django_db
@pytest.mark.unit
def test_profile_creation():
    User = get_user_model()
    user = User.objects.create_user(email="testuser@example.com", password="testpass123")
    
    profile = Profile.objects.get(user=user)
    assert profile.user == user
    assert profile.image == "media/profile/avatar.png"
    assert str(profile) == "testuser@example.com Profile"

# Kiểm thử đơn vị cho tự động lưu Profile khi User cập nhật
@pytest.mark.django_db
@pytest.mark.unit
def test_profile_auto_save():
    User = get_user_model()
    user = User.objects.create_user(email="testuser@example.com", password="testpass123")
    
    user.first_name = "Updated Name"
    user.save()
    
    profile = Profile.objects.get(user=user)
    assert profile.user.first_name == "Updated Name"

# Kiểm thử chức năng cho HomeView
@pytest.mark.django_db
@pytest.mark.functional
def test_home_view(api_client, create_user):
    user = create_user()
    api_client.force_authenticate(user=user)
    response = api_client.get("/home/")
    assert response.status_code == status.HTTP_200_OK
    assert response.data == {'message': 'JWT Authentication page'}

# Kiểm thử chức năng cho RegisterView
@pytest.mark.django_db
@pytest.mark.functional
def test_register_view(api_client):
    data = {
        "email": "newuser@example.com",
        "password": "newpass123",
        "password2": "newpass123",
        "first_name": "New",
        "last_name": "User"
    }
    response = api_client.post("/register/", data)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data == "Registered!"

# Kiểm thử chức năng cho LoginView
@pytest.mark.django_db
@pytest.mark.functional
def test_login_view(api_client, create_user):
    create_user(email="loginuser@example.com", password="loginpass123")
    data = {
        "email": "loginuser@example.com",
        "password": "loginpass123"
    }
    response = api_client.post("/login/", data)
    assert response.status_code == status.HTTP_200_OK
    assert "access_token" in response.data
    assert "refresh_token" in response.data

# Kiểm thử chức năng cho LogoutView
@pytest.mark.django_db
@pytest.mark.functional
def test_logout_view(api_client, create_user):
    user = create_user()
    api_client.force_authenticate(user=user)
    
    tokens = get_user_tokens(user)
    api_client.cookies[settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']] = tokens["refresh_token"]
    
    response = api_client.post("/logout/")
    assert response.status_code == status.HTTP_205_RESET_CONTENT
