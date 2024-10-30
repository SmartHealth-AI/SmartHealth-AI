from django.db import models

class User(models.Model):
  firstname = models.CharField(max_length=255)
  lastname = models.CharField(max_length=255)
  # uuid
  # created_by
  # created_at
  # updated_by
  # updated_at

  def __str__(self):
    return str(self.firstname) + str(self.lastname)
