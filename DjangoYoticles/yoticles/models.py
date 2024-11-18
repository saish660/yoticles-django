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
    image = models.ImageField(upload_to=get_image_url, height_field=None, width_field=None, max_length=100, blank=True)
    body = models.TextField()
    pub_date = models.DateTimeField()
    read_time = models.IntegerField(default=5)
    like_count = models.IntegerField(default=0)
    read_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title

