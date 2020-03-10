import bcrypt
from django.core.exceptions import ObjectDoesNotExist
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
            # we get the user object through email
            u = User.objects.get(email=clean['email'])
            user = checkUser(request=request, email=clean['email'], password=clean['password'])
            if user is not None:
                # we get the password after we see email exits, and return success message
                if user:
                    messages.success(request, f'Login Succesfull {u.email}!')
                    return HttpResponse(user)
                else:
                    messages.warning(request, 'Login Unsuccesfull! Check password')
                    return render(request, 'login/login.html', {"form": form})
            else:
                messages.warning(request, f'Login Unsuccesfull! Check email {u.email}!')
                return render(request, 'login/login.html', {"form": form})

    # the form will be returned if there is no POST request
    return render(request, 'login/login.html', {"form": form})


def checkUser(request, email, password):
    try:
        user = User.objects.get(email=email)
    except ObjectDoesNotExist:
        user = None
    password = str(password)
    if user is None:
        return None
    else:

       #  from requests import request

       request.session['email'] = email
       print(request.session.get("email", "unknown"))
       return render(request, 'exposures/exposures.html') if user.email == email and bcrypt.checkpw(password.encode('utf-8'),
                                                              user.password.encode('utf-8')) else False
