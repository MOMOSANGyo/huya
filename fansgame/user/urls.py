from django.conf.urls import url, include

from user import views

urlpatterns = [

    url(r'^index/', views.index, name='index'),#http://zaccc.lzok.top/user/index/ b0
    url(r'^invite/', views.invite, name='invite'),#http://zaccc.lzok.top/user/invite/
    url(r'^wait/', views.wait, name='wait'),#http://zaccc.lzok.top/user/wait/
    url(r'^waitword/', views.waitword, name='waitword'),#http://zaccc.lzok.top/user/waitword/

]