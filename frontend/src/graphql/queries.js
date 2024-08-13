import { gql } from '@apollo/client'

export const GET_GROUPS = gql`
  query GetGroups {
    groups {
      id
      groupName
      owner
      total
      paid
      numMembers
    }
  }
`

export const GET_GROUP_BY_ID = gql`
  query GetGroupById($id: ID!) {
    group(id: $id) {
      id
      groupName
      owner
      total
      paid
      numMembers
      membersJoined
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      userName
      accepted
      owner
      groupid {
        pk
      }
    }
  }
`

export const GET_USERS_BY_GROUP = gql`
  query GetUsersByGroup($groupId: ID!) {
    usersByGroup(groupId: $groupId) {
      id
      userName
      accepted
      owner
      groupid {
        pk
      }
    }
  }
`
