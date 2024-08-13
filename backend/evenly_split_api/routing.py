from django.urls import re_path
from strawberry.channels import GraphQLWSConsumer
from .schema import schema  # Import your GraphQL schema

websocket_urlpatterns = [
    re_path(r'^graphql/$', GraphQLWSConsumer.as_asgi(schema=schema)),
]
