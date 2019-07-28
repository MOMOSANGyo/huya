from django.conf.urls import url, include

from user import views

urlpatterns = [

    url(r'^index/', views.index, name='index'),
]