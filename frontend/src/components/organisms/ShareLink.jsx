'use client'
import { useContext } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GroupContext } from '@/context/Context'
import { Modal, Button } from '@/components'
import { FaRegClipboard, FaClipboardCheck } from 'react-icons/fa6'
import QRCode from 'react-qr-code'

export default function ShareLink({ link, modalOpen }) {
  const [isModalOpen, setIsModalOpen] = useState(modalOpen)
  const [isCopied, setCopied] = useState(false)

  const router = useRouter()
  const { groupID, owner } = useContext(GroupContext)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const seeGroupPage = () => {
    router.push(`/summary/${groupID}`)
    setIsModalOpen(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 1500)
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <div className="items-center text-center">
        <p className="p-4 text-center text-lg font-bold text-black">
          Here is the invite link for your group. Copy it and send it to your
          other members or show them the QR Code to scan!
        </p>
        <div className="flex items-center p-2">
          <p className="text-lg text-darkblue">{link}</p>
          {isCopied ? (
            <FaClipboardCheck className="mb-1 text-black" size={25} />
          ) : (
            <FaRegClipboard
              className="mb-1 text-black"
              onClick={copyToClipboard}
              size={25}
            />
          )}
        </div>
        <QRCode value={link} bgColor="white" className=" m-8 self-center" />
        <p className="p-4 text-center text-lg font-bold text-black">
          You are the owner of this group. Stay on this tab in order to pay the
          bill.
        </p>
        <Button
          onClick={seeGroupPage}
          text="Go to Group Page"
          color="orange"
          type="submit"
          width={'3/4'}
          height={'1/4'}
          textSize={'16px'}
        />
      </div>
    </Modal>
  )
}
