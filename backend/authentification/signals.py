# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django.contrib.auth import get_user_model
# from .models import Profile

# @receiver(post_save, sender=get_user_model())
# def create_or_update_user_profile(sender, instance, created, **kwargs):

#     if created:
#         Profile.objects.create(user=instance)
#     else:

#         try:
#             instance.profile.save()
#         except Profile.DoesNotExist:

#             Profile.objects.create(user=instance)
