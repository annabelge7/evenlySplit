import { gql } from '@apollo/client'

export const USER_JOINED_SUBSCRIPTION = gql`
  subscription OnUserJoined($groupId: ID!) {
    userJoined(groupId: $groupId) {
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

export const GROUP_PAID_SUBSCRIPTION = gql`
  subscription OnGroupPaid($groupId: ID!) {
    groupPaid(groupId: $groupId)
  }
`
