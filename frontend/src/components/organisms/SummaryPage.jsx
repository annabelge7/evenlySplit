'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useContext, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'

import {
  ContentBox,
  TitleBar,
  Loading,
  ErrorPage,
  Button,
  GroupPaid,
  SummaryTable,
} from '@/components'

import { GET_GROUP_BY_ID, GET_USERS_BY_GROUP } from '@/graphql/queries'
import { USER_JOINED_SUBSCRIPTION } from '@/graphql/subscriptions'

import { GroupContext } from '@/context/Context'

export default function SummaryPage() {
  const { setGroupID, setOwner } = useContext(GroupContext)
  const { groupid } = useParams()
  const [users, setUsers] = useState([])
  const router = useRouter()

  const {
    data: groupData,
    loading: groupLoading,
    error: groupError,
  } = useQuery(GET_GROUP_BY_ID, {
    variables: { id: groupid },
  })

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(GET_USERS_BY_GROUP, {
    variables: { groupId: groupid },
    onCompleted: (data) => {
      if (data && data.usersByGroup) {
        setUsers(data.usersByGroup)
      }
    },
  })

  useSubscription(USER_JOINED_SUBSCRIPTION, {
    variables: { groupId: groupid },
    onData: ({ data: subscriptionData }) => {
      if (subscriptionData?.data?.userJoined) {
        setUsers((prevUsers) => {
          const newUser = subscriptionData.data.userJoined
          if (!prevUsers.some((user) => user.id === newUser.id)) {
            return [...prevUsers, newUser]
          }
          return prevUsers
        })
      }
    },
  })

  useEffect(() => {
    if (groupData) {
      setOwner(groupData.group.owner)
      setGroupID(groupid)
    }
  }, [groupData, groupid, setOwner, setGroupID])

  useEffect(() => {
    let isMounted = true

    if (usersData && usersData.usersByGroup && isMounted) {
      setUsers(usersData.usersByGroup)
    }

    return () => {
      isMounted = false
    }
  }, [usersData])

  if (groupLoading || usersLoading) {
    return <Loading />
  }

  if (groupError || usersError) {
    return <ErrorPage />
  }

  if (!groupData || !groupData.group) {
    return <ErrorPage />
  }

  if (groupData.group.paid) {
    return <GroupPaid />
  }

  const { owner, groupName, total, numMembers } = groupData.group

  const handlePayment = () => {
    if (users.length === numMembers) {
      router.push(`/payment/${groupid}`)
    }
  }

  const buttonText =
    users.length === numMembers
      ? 'Make Payment'
      : 'Waiting for all users to join...'

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <TitleBar color="darkblue" title="Group Summary" />
      <ContentBox width={'w-3/4'} height={'h-3/4'}>
        <div className="flex flex-col items-center justify-center text-4xl">
          <SummaryTable users={users} total={total} numMembers={numMembers} />
          <Button
            text={buttonText}
            color={users.length === numMembers ? 'orange' : 'darkblue'}
            width={'w-20'}
            onClick={handlePayment}
            disabled={users.length !== numMembers}
          />
        </div>
      </ContentBox>
    </div>
  )
}
