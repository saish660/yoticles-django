from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
import os


# Create your models here.
class User(AbstractUser):
    pass


def get_image_url(instance, filename):
    base, extension = os.path.splitext(filename)
    new_filename = f"{uuid.uuid4()}{extension}"
    return f"media/images/{new_filename}"


class Article(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles')
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to=get_image_url, max_length=100, blank=True)
    body = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    read_time = models.IntegerField()
    read_count = models.IntegerField(default=0)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    bookmarks = models.ManyToManyField(User, related_name='bookmarked_posts', blank=True)

    def __str__(self):
        return self.title

