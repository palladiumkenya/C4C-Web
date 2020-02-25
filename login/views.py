from django.shortcuts import render
from .forms import UserLoginForm


def login(request):
    form = UserLoginForm()
    if request.method == 'POST':
        form = UserLoginForm(request.POST)

    return render(request, 'login/login.html', {'form': form})

