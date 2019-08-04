from django.conf.urls import url, include

from anchor import views

urlpatterns = [
    # 主播首页
    url(r'^index/', views.index, name='index'),#zaccc.lzok.top/index/
    url(r'^ainvite/', views.invite, name='ainvite'),#zaccc.lzok.top/ainvite/
    url(r'^await/', views.wait, name='await'),#zaccc.lzok.top/await/
    url(r'^join/', views.join, name='join'),  # zaccc.lzok.top/join/
    url(r'^join/', views.join, name='join'),  # zaccc.lzok.top/join/
    url(r'^quit/', views.quit, name='quit'),  # zaccc.lzok.top/quit/
]
