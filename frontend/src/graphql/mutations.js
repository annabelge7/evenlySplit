import { gql } from '@apollo/client'

export const DELETE_ALL_USERS = gql`
  mutation DeleteAllUsers {
    deleteAllUsers
  }
`

export const DELETE_ALL_GROUPS = gql`
  mutation DeleteAllGroups {
    deleteAllGroups
  }
`

export const ADD_GROUP = gql`
  mutation AddGroup(
    $groupName: String!
    $owner: String!
    $total: Float!
    $numMembers: Int!
  ) {
    addGroup(
      data: {
        groupName: $groupName
        owner: $owner
        total: $total
        numMembers: $numMembers
      }
    ) {
      id
      groupName
      owner
      owner
      total
      paid
    }
  }
`

export const SET_GROUP_PAID = gql`
  mutation SetGroupPaid($groupId: ID!) {
    setGroupPaid(groupId: $groupId)
  }
`

export const ADD_USER = gql`
  mutation AddUser(
    $userName: String!
    $accepted: Boolean!
    $owner: Boolean!
    $groupid: ID!
  ) {
    addUser(
      data: {
        userName: $userName
        accepted: $accepted
        owner: $owner
        groupid: $groupid
      }
    ) {
      id
      userName
      accepted
      owner
      groupid {
        pk
      }
    }
    updateGroup(groupId: $groupid)
  }
`
