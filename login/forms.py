from django import forms
from .models import User


class UserLoginForm(forms.ModelForm):
    email = forms.EmailField()
    password = forms.CharField(max_length=32, widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['email', 'password']

