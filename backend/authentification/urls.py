from django.urls import path
#from . import views
from .views import HomeView, LoginView, RegisterView, LogoutView, CookieTokenRefreshView, UserDetailView
urlpatterns = [
    # path('register/', views.RegisterView.as_view(), name='register'),
    # path('login/', views.LoginView.as_view(), name='login'),
    path('home/', HomeView.as_view(), name ='home'),
    # path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserDetailView.as_view(), name='user_detail'),
]