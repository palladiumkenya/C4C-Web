from django.db import models


class User(models.Model):
    # we add email and password to help with authentication

    email = models.CharField(max_length=50)
    role_id = models.IntegerField(default=1)
    password = models.CharField(max_length=255)


    # here we add class Meta to specify the table we want the User model to interact with
