from django.urls import path
from . import views
import uuid
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.index, name="index"),
    path("about_us/", views.about, name="about_us"),
    path("follow_us/", views.follow_us, name="follow"),
    path("article/<uuid:id>", views.get_article, name="get_article"),
    path("profile/<str:username>", views.get_profile, name="get_profile"),
    path("profile/", views.get_profile, name="profile"),
    path("create_post/", views.create_post, name="create_post"),
    path("signup", views.signup, name="signup"),
    path("login", views.login_user, name="login"),
    path("logout", views.logout_user, name="logout")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
