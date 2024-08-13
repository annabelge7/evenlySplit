from django.urls import path

from strawberry.django.views import AsyncGraphQLView
from .schema import schema


# Need to create views
urlpatterns = [
    path('graphql', AsyncGraphQLView.as_view(schema=schema))
]
