import strawberry_django
from strawberry import auto, ID


from .models import User as UserModel
from .models import GroupSession as GroupSessionModel


@strawberry_django.type(UserModel)
class User:
    id: ID
    user_name: auto
    accepted: auto
    owner: auto
    groupid: auto


@strawberry_django.input(UserModel)
class UserInput:
    user_name: auto
    accepted: auto
    owner: auto
    groupid: ID


@strawberry_django.type(GroupSessionModel)
class Group:
    id: ID
    group_name: auto
    owner: auto
    total: auto
    paid: auto
    num_members: auto
    members_joined: auto


@strawberry_django.input(GroupSessionModel)
class GroupInput:
    group_name: auto
    owner: auto
    total: auto
    num_members: auto
