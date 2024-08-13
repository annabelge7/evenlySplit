'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useSubscription } from '@apollo/client'
import { GroupContext } from '@/context/Context'
import { GROUP_PAID_SUBSCRIPTION } from '@/graphql/subscriptions'
import { GET_GROUP_BY_ID } from '@/graphql/queries'
import { calculateShare } from '../../../utils'
import {
  ContentBox,
  TitleBar,
  Loading,
  ErrorPage,
  GroupPaid,
} from '@/components'

export default function UserSummaryPage() {
  const router = useRouter()
  const { setGroupID, setOwner } = useContext(GroupContext)
  const [isGroupPaid, setGroupPaid] = useState(false)

  const { groupid } = useParams()
  const { data, loading, error } = useQuery(GET_GROUP_BY_ID, {
    variables: { id: groupid },
  })

  useSubscription(GROUP_PAID_SUBSCRIPTION, {
    variables: { groupId: groupid },
    onData: ({ data: subscriptionData }) => {
      if (subscriptionData?.data?.groupPaid) {
        setGroupPaid(true)
      }
    },
  })

  useEffect(() => {
    if (isGroupPaid) {
      router.push(`/pay/confirmation/${groupid}`)
    }
    return
  }, [isGroupPaid])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorPage />
  }

  if (!data) {
    return <ErrorPage />
  }

  if (data.group.paid) {
    return <GroupPaid />
  }

  const owner = data.group.owner
  const session = data.group.groupName
  const total = data.group.total.toFixed(2)
  const numMembers = data.group.numMembers

  setOwner(owner)
  setGroupID(groupid)

  const yourShare = calculateShare(total, numMembers)
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <TitleBar color="darkblue" title="Group Summary" />
      <ContentBox width={'w-3/4'} height={'h-3/5'}>
        <div className="flex flex-col items-center justify-center text-4xl">
          <p className="mb-4 p-4 text-center font-bold text-black">
            <span className="text-darkblue">{owner}</span> making a payment of{' '}
            <span className="text-darkblue">${total}</span> for{' '}
            <span className="text-darkblue">{session}</span> which is{' '}
            <span className="text-darkblue">{yourShare}</span> per person
          </p>
        </div>
        <div className="mt-4 w-3/4 rounded-md bg-orange text-center">
          <p className="p-4 text-4xl font-bold text-white">
            {owner} is making the payment...{' '}
          </p>
        </div>
      </ContentBox>
    </div>
  )
}
