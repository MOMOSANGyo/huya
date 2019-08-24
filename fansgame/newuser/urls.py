from django.conf.urls import url, include

from newuser import views

urlpatterns = [
    # 主播首页
    url(r'^index/', views.index, name='index'),#zaccc.lzok.top/new/user/index/
]
