from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import Article, User
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
import datetime
from django.contrib.auth.decorators import login_required
import markdown2
import readtime
import json



def index(request):
    return render(request, "yoticles/index.html", {
        "posts_list": Article.objects.all()
    })


def about(request):
    return render(request, "yoticles/about_us.html")


def follow_us(request):
    return render(request, "yoticles/follow_us.html")


def get_article(request, id):
    article = Article.objects.get(id=id)
    article.read_count += 1
    article.save()
    article_html = markdown2.markdown(article.body)
    return render(request, "yoticles/article.html", {
        "post": article,
        "html_body": article_html,
        "recommended_posts": Article.objects.all()
    })


def get_profile(request, username=None):
    if username is None:
        if request.user.is_authenticated:
            requested_user = request.user
        else:
            return HttpResponseRedirect(reverse('login'))
    else:
        if User.objects.filter(username=username).exists():
            requested_user = User.objects.get(username=username)
        else:
            return HttpResponse("User not found")

    return render(request, "yoticles/profile.html", {
        "user": requested_user,
        "posts_list": Article.objects.filter(author=requested_user)
    })


@login_required
def create_post(request):
    if request.method == "POST":
        title = request.POST.get("title")
        body = request.POST.get("body")
        author = request.user
        image = request.FILES.get("image")
        read_time = readtime.of_markdown(body)
        new_article = Article(title=title, body=body, author=author, image=image, read_time=read_time.minutes)
        new_article.save()
        return HttpResponseRedirect(reverse("profile"))
    else:
        return render(request, "yoticles/create_post.html")



def signup(request):
    if request.method == "POST":
        first_name = request.POST.get("fname")
        last_name = request.POST.get("lname")
        username = request.POST.get("signup_username")
        email = request.POST.get("email")
        password = request.POST.get("signup_password")

        if User.objects.filter(username=username).exists():
            return HttpResponse("username already taken")

        new_user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name, email=email, password=password)
        new_user.date_joined += datetime.timedelta(hours=5, minutes=30)
        new_user.save()
        login(request, new_user)
        return HttpResponseRedirect(reverse("profile"))

    return render(request, "yoticles/accounts.html")


def login_user(request):
    if request.method == "POST":
        username = request.POST.get("login_username")
        password = request.POST.get("login_password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("profile"))
        else:
            return HttpResponse("Invalid username or password")

    return render(request, "yoticles/accounts.html")


@login_required
def logout_user(request):
    logout(request)
    return HttpResponseRedirect(reverse("signup"))


@login_required
def alter_bookmark(request):
    if request.method == "POST":
        data = json.loads(request.body)
        post_id = data.get("post_id")
        article = Article.objects.get(id=post_id)
        if article in request.user.bookmarked_posts.all():
            request.user.bookmarked_posts.remove(article)
            return JsonResponse(1, safe=False)
        else:
            request.user.bookmarked_posts.add(article)
            return JsonResponse(2, safe=False)
    else:
        return HttpResponse(status=403)


@login_required
def alter_likes(request):
    if request.method == "POST":
        data = json.loads(request.body)
        post_id = data.get("post_id")
        article = Article.objects.get(id=post_id)
        if article in request.user.liked_posts.all():
            request.user.liked_posts.remove(article)
            return JsonResponse(1, safe=False)
        else:
            request.user.liked_posts.add(article)
            return JsonResponse(2, safe=False)
    else:
        return HttpResponse(status=403)


@login_required
def bookmarks(request):
    return render(request, "yoticles/bookmarks.html", {
        "posts_list": request.user.bookmarked_posts.all
    })


def privacy_policy(request):
    return render(request, "yoticles/privacy-policy.html")
