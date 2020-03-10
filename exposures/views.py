from django.shortcuts import render
from login.models import User


def exposures_home(request):
    # print(request.session)
    # print(dir(request.session))
    # key = request.session.session_key
    # print(key)
    return render(request, 'exposures/exposures.html')