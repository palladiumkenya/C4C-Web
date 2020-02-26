from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserLoginForm
from .models import User
from django.contrib.auth import authenticate
from django.contrib.admin import AdminSite

# method to login user into the dashboard


def login(request):
    form = UserLoginForm
    # POST is used when the user sends the email and password for authentication
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        # Basic form validation, checks the form is filled as per model specifications
        if form.is_valid():
            # here we create a variable clean to store the key value array for the form
            clean = form.cleaned_data
            # we get the value of the email
            user = User.objects.get(email=clean['email'])
            if user is not None:
                # we get the password after we see email exits, and return success message
                if user.password == clean['password']:
                    message = messages.success(request, f'Login Succesfull {user.email}!')
                    return HttpResponse(user)
                else:
                    message = messages.warning(request, f'Login Unsuccesfull {user.email}!')
                    return render(request, 'login/login.html', {"form": form, 'message': message})
            else:
                message = messages.warning(request, f'Login Unsuccesfull {user.email}!')
                return render(request, 'login/login.html', {"form": form, 'message': message})

    # the form will be returned if there is no POST request
    return render(request, 'login/login.html', {"form": form})
