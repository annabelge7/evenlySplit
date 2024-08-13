'use client'

import { useState, useContext } from 'react'

import {
  Header,
  ContentBox,
  TitleBar,
  Button,
  Input,
  ShareLink,
} from '@/components'

import { GroupContext } from '@/context/Context'

import { ADD_GROUP, ADD_USER } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'

export default function CreateSessionPage() {
  const [sessionName, setSessionName] = useState('')
  const [name, setName] = useState('')
  const [bill, setBill] = useState('')
  const [members, setMembers] = useState('')

  const [link, setLink] = useState('')

  const [addGroup] = useMutation(ADD_GROUP)
  const [addUser] = useMutation(ADD_USER)

  const {
    setGroupID,
    setSession,
    setOwner,
    setIsOwner,
    setTotal,
    setNumMembers,
  } = useContext(GroupContext)

  const createSession = async (e) => {
    e.preventDefault()

    const { data: group } = await addGroup({
      variables: {
        groupName: sessionName,
        owner: name,
        total: parseFloat(bill),
        numMembers: parseInt(members, 10),
      },
    })

    if (group && group.addGroup && group.addGroup.id) {
      setGroupID(group.addGroup.id)
      setSession(sessionName)
      setTotal(parseFloat(bill).toFixed(2))
      setNumMembers(parseInt(members))

      const { data: user } = await addUser({
        variables: {
          userName: name,
          accepted: true,
          owner: true,
          groupid: group.addGroup.id,
        },
      })

      if (user && user.addUser && user.addUser.id) {
        setOwner(name)
        setIsOwner(true)

        const link = `http://localhost:3000/invitation/${group.addGroup.id}`
        setLink(link)
      }
    } else {
      alert('Failed to add group. Please try again!')
    }
  }

  return (
    <>
      <Header />
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <TitleBar color="darkblue" title="Enter Session Details" />
        <ContentBox width={'w-3/4'} height={'h-3/5'}>
          <form onSubmit={createSession}>
            <div className="flex h-full w-full flex-col items-center justify-between p-12">
              <div className="flex h-2/4 w-full flex-col items-center justify-evenly gap-4 text-black">
                <Input
                  width={'w-3/4'}
                  height={'h-18'}
                  placeholder={'Session Name'}
                  value={sessionName}
                  type="text"
                  onChange={(e) => setSessionName(e.target.value)}
                ></Input>
                <div className="flex w-full justify-center gap-10">
                  <Input
                    width={'w-1/3'}
                    height={'h-18'}
                    placeholder={'Your Name'}
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  ></Input>
                  <Input
                    width={'w-1/3'}
                    height={'h-18'}
                    placeholder={'Total $ of Bill'}
                    value={bill}
                    type="number"
                    step="0.01"
                    min="0"
                    onChange={(e) => setBill(e.target.value)}
                  ></Input>
                  <Input
                    width={'w-1/3'}
                    height={'h-18'}
                    placeholder={'Number of Members'}
                    value={members}
                    type="number"
                    step="1"
                    min="0"
                    onChange={(e) => setMembers(e.target.value)}
                  ></Input>
                </div>
              </div>
              <Button
                text="Generate link to send to other members"
                color="orange"
                type="submit"
                width={'3/4'}
                height={'1/4'}
                textSize={'30px'}
              ></Button>
            </div>
          </form>
          {link && <ShareLink link={link} modalOpen={true} />}
        </ContentBox>
      </div>
    </>
  )
}
