from django.conf.urls import url, include

from newuser import views

urlpatterns = [
    # 主播首页
    # url(r'^invited/', views.invited, name='index'),#zaccc.lzok.top/newuser/invited/
    url(r'^join/', views.join, name='join'),#zaccc.lzok.top/newuser/join/
    url(r'^wait/', views.wait, name='wait'),#zaccc.lzok.top/newuser/wait/
    url(r'^question/', views.question, name='question'),  # zaccc.lzok.top/newuser/question/
    url(r'^answer/', views.answer, name='answer'),  # zaccc.lzok.top/newuser/answer/
    url(r'^waitnext/', views.waitnext, name='waitnext'),  # zaccc.lzok.top/newuser/waitnext/
    url(r'^display/', views.display, name='display'),  # zaccc.lzok.top/newuser/display/
    url(r'^last/', views.last, name='last'),  # zaccc.lzok.top/newuser/last/
]
