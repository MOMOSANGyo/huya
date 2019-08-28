from django.conf.urls import url, include

from newanchor import views

urlpatterns = [
    # 主播首页
    url(r'^index/', views.index, name='index'),#zaccc.lzok.top/newanchor/index/
    url(r'^invite/', views.invite, name='invite'),#zaccc.lzok.top/newanchor/invite/
    url(r'^wait/', views.wait, name='wait'),#zaccc.lzok.top/newanchor/wait/
    url(r'^join/', views.join, name='join'),#zaccc.lzok.top/newanchor/join/
    url(r'^prepare/', views.prepare, name='prepare'),#zaccc.lzok.top/newanchor/prepare/
    url(r'^isok/', views.isok, name='isok'),#zaccc.lzok.top/newanchor/isok/
    url(r'^staticword/', views.staticword, name='staticword'),  # zaccc.lzok.top/newanchor/staticword/
    url(r'^staticwordinfo/', views.staticwordinfo, name='staticwordinfo'),  # zaccc.lzok.top/newanchor/staticwordinfo/
    url(r'^next/', views.nexts, name='next'),  # zaccc.lzok.top/newanchor/next/
    url(r'^last/', views.last, name='last'),  # zaccc.lzok.top/newanchor/last/
    url(r'^pre/', views.pre, name='pre'),  # zaccc.lzok.top/newanchor/pre/
    url(r'^test/', views.test, name='test'),  # zaccc.lzok.top/newanchor/test/
    url(r'^a2status/', views.a2status, name='a2status'),  # zaccc.lzok.top/newanchor/a2status/
    url(r'^a3status/', views.a3fanye, name='a3status'),  # zaccc.lzok.top/newanchor/a3status/
    url(r'^a3status/', views.a4fanye, name='a3status'),  # zaccc.lzok.top/newanchor/a4status/
]
