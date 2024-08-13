'use client'

import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Modal, InviteContent, Button } from '@/components'

import { GroupContext } from '@/context/Context'

import { ADD_USER } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'

export default function ModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')

  const [addUser] = useMutation(ADD_USER)

  const { groupID, owner } = useContext(GroupContext)

  const router = useRouter()

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const createUser = async (e) => {
    e.preventDefault()

    const { data: user } = await addUser({
      variables: {
        userName: name,
        accepted: true,
        owner: false,
        groupid: groupID,
      },
    })

    if (user && user.addUser && user.addUser.id) {
      setIsModalOpen(false)
      router.push(`/usersummary/${groupID}`)
    } else {
      alert('Please enter a valid name and try again!')
    }
  }

  return (
    <div>
      <Button
        text={'Join and Accept'}
        color={'orange'}
        onClick={handleOpenModal}
        width={'full'}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <InviteContent
          text={`Welcome to ${owner}'s Group!`}
          color={'darkblue'}
        />
        <form onSubmit={createUser}>
          <input
            type="text"
            className="mb-4 mt-4 w-full rounded border border-darkblue p-2 text-black"
            placeholder="Enter Your Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            color={'orange'}
            text={'Continue to Group Page'}
            width={'full'}
            type="submit"
          />
        </form>
      </Modal>
    </div>
  )
}
