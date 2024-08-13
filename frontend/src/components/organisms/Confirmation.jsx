'use client'

import { useParams, useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GroupContext } from '@/context/Context'
import { GroupPaid } from '@/components'

import { ContentBox, Button, Loading, ErrorPage } from '@/components'
import { GET_GROUP_BY_ID } from '@/graphql/queries'
import { AiFillCheckCircle } from 'react-icons/ai'

export default function Confirmation() {
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
  }, [data, setOwner, setGroupID, groupid])

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
  const router = useRouter()

  const handleHomeClick = () => {
    router.push('/begin')
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-lightblue">
      <ContentBox width={'w-3/4'} height={'h-3/4'}>
        <AiFillCheckCircle size={180} className=" text-yellow" />
        <span className="p-4"></span>
        <h1 className=" px-2 text-center font-bold text-black sm:text-xl lg:text-6xl">
          Payment for <span className="text-darkblue">{session}</span> by{' '}
          <span className="text-darkblue">{owner}</span> was successfully
          completed!
        </h1>
        <div className="flex flex-col items-center justify-center"></div>
        <Button
          text="Start a New Session"
          color="orange"
          width={'1/4'}
          height={'1/4'}
          textSize={'30px'}
          onClick={handleHomeClick}
        ></Button>
      </ContentBox>
    </main>
  )
}
