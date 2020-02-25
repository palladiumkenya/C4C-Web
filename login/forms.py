from django import forms
from .models import User


class UserLoginForm(forms.ModelForm):
    username = forms.CharField()
    password = forms.PasswordInput()

    class Meta:
        model = User
        fields = ['username', 'password']
        template_name = 'login/login.html'

