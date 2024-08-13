'use client'

import { useContext, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { GroupContext } from '@/context/Context'
import { GET_GROUP_BY_ID } from '@/graphql/queries'
import { calculateShare } from '../../../utils'
import {
  InviteBox,
  InviteContent,
  ErrorPage,
  ModalPage,
  Loading,
  GroupPaid,
  GroupFull,
} from '@/components'

export default function InvitationPage() {
  const { setGroupID, setOwner } = useContext(GroupContext)
  const { groupid } = useParams()

  const { data, loading, error } = useQuery(GET_GROUP_BY_ID, {
    variables: { id: groupid },
  })

  useEffect(() => {
    if (data && data.group) {
      setOwner(data.group.owner)
      setGroupID(groupid)
    }
  }, [data, groupid, setOwner, setGroupID])

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.log('error')
    return <ErrorPage />
  }

  if (!data) {
    console.log('data error')
    return <ErrorPage />
  }

  if (data.group.paid) {
    return <GroupPaid />
  }

  if (data.group.numMembers <= data.group.membersJoined) {
    return <GroupFull />
  }

  const owner = data.group.owner
  const session = data.group.groupName
  const total = data.group.total.toFixed(2)
  const numMembers = data.group.numMembers

  const yourShare = calculateShare(total, numMembers)

  return (
    <div className="mt-24 flex flex-col items-center justify-center p-4">
      <InviteBox>
        <div className="text-center text-2xl text-black">
          <span className="font-bold">{owner}</span>
          <span> is inviting you to</span>
          <br />
          <span className="font-bold text-darkblue">evenly split:</span>
        </div>
      </InviteBox>

      <InviteBox>
        <InviteContent text={`${session}`} color={'darkblue'} />
        <InviteContent text={`Total: $${total}`} color={'yellow'} />
        <InviteContent text={`Your Share: ${yourShare}`} color={'darkblue'} />
        <ModalPage />
      </InviteBox>
    </div>
  )
}
