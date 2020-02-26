from django.db import models


class User(models.Model):
    # we add email and password to help with authentication

    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    # here we add class Meta to specify the table we want the User model to interact with
    class Meta:
        db_table = 'users'
