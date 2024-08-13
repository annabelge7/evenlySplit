from django.db import models


class GroupSession(models.Model):
    group_name = models.CharField(max_length=500)
    owner = models.CharField(max_length=500)
    total = models.FloatField()
    paid = models.BooleanField(default=False, blank=True)
    num_members = models.IntegerField()
    members_joined = models.IntegerField(default=0, blank=True)

    def __str__(self):
        return self.group_name, self.total


class User(models.Model):
    user_name = models.CharField(max_length=500)
    accepted = models.BooleanField(default=False)
    owner = models.BooleanField(default=False)
    groupid = models.ForeignKey(
        GroupSession, on_delete=models.CASCADE)

    def __str__(self):
        return self.user_name
