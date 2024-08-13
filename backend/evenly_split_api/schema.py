import strawberry
import strawberry_django
from strawberry_django.optimizer import DjangoOptimizerExtension
from strawberry_django import mutations
from strawberry import ID
from typing import Optional, List
from asgiref.sync import sync_to_async
import logging
import asyncio

from .models import User as UserModel, GroupSession as GroupSessionModel
from .types import User, Group as GroupSession, GroupInput as GroupSessionInput, UserInput

logger = logging.getLogger(__name__)


@strawberry.type
class Query:
    groups: list[GroupSession] = strawberry_django.field()
    users: list[User] = strawberry_django.field()

    @strawberry.field
    async def group(self, id: ID) -> Optional[GroupSession]:
        try:
            group = await sync_to_async(GroupSessionModel.objects.get)(pk=id)
            return group
        except Exception as e:
            logger.error(f"Error getting group by ID: {e}")
            return None
    
    @strawberry.field
    async def users_by_group(self, group_id: ID) -> list[User]:
        users = await sync_to_async(list)(UserModel.objects.filter(groupid=group_id))
        return users


@strawberry.type
class Mutation:
    add_group: GroupSession = mutations.create(GroupSessionInput)
    add_user: User = mutations.create(UserInput)

    @strawberry.field 
    async def update_group(self, group_id: ID) -> bool: 
        try: 
            group = await sync_to_async(GroupSessionModel.objects.get)(id=group_id)
            group.members_joined += 1
            await sync_to_async(group.save)()
            return True
        except Exception as e:
            logger.error(f"Error updating group members in group {group_id}: {e}")
            return False           

    @strawberry.field
    async def set_group_paid(self, group_id: ID) -> bool:
        try:
            group = await sync_to_async(GroupSessionModel.objects.get)(id=group_id)
            group.paid = True
            await sync_to_async(group.save)()
            return True
        except Exception as e:
            logger.error(f"Error setting group {group_id} as paid: {e}")
            return False

    @strawberry.field
    async def delete_all_users(self) -> bool:
        try:
            await sync_to_async(UserModel.objects.all().delete)()
            return True
        except Exception as e:
            logger.error(f"Error deleting all users: {e}")
            return False

    @strawberry.field
    async def delete_all_groups(self) -> bool:
        try:
            await sync_to_async(GroupSessionModel.objects.all().delete)()
            return True
        except Exception as e:
            logger.error(f"Error deleting all groups: {e}")
            return False


#https://strawberry.rocks/docs/general/subscriptions 
@strawberry.type
class Subscription:
    @strawberry.subscription
    async def user_joined(self, group_id: ID) -> User:
        while True:
            users = await sync_to_async(list)(UserModel.objects.filter(groupid=group_id))
            for user in users:
                yield user
            await asyncio.sleep(1) 

    @strawberry.subscription
    async def group_paid(self, group_id: ID) -> bool: 
        while True:
            group = await sync_to_async(GroupSessionModel.objects.get)(pk=group_id)
            if group.paid: 
                yield True
            await asyncio.sleep(1) 



schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
    subscription=Subscription,
    extensions=[DjangoOptimizerExtension]  # extension to optimize queries
)
