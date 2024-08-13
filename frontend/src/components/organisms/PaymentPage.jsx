'use client'
import { useState, useContext, useEffect } from 'react'
import {
  Header,
  ContentBox,
  TitleBar,
  Button,
  Input,
  ErrorPage,
  Loading,
} from '@/components'
import { useParams } from 'next/navigation'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { GroupContext } from '@/context/Context'
import { GET_GROUP_BY_ID } from '@/graphql/queries'

import { SET_GROUP_PAID } from '@/graphql/mutations'

export default function PaymentPage() {
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [card, setCard] = useState('')
  const [cvv, setCvv] = useState('')
  const [date, setDate] = useState('')
  const {
    groupID,
    setGroupID,
    session,
    setSession,
    total,
    setTotal,
    owner,
    setOwner,
    isOwner,
  } = useContext(GroupContext)
  const { groupid } = useParams()
  const router = useRouter()

  const {
    data: groupData,
    loading: groupLoading,
    error: groupError,
  } = useQuery(GET_GROUP_BY_ID, {
    variables: { id: groupid },
  })

  useEffect(() => {
    if (groupData) {
      setGroupID(groupid)
      setSession(groupData.group.groupName)
      setTotal(groupData.group.total)
      setOwner(groupData.group.owner)
    }
  }, [groupData, groupid, setGroupID, setSession, setTotal, setOwner])

  const [
    setGroupPaid,
    { data: paidData, loading: paidLoading, error: paidError },
  ] = useMutation(SET_GROUP_PAID)

  const addCreditCard = () => {
    const generateCreditNumber = () => {
      const generateFourDigits = () => {
        return String(Math.floor(1000 + Math.random() * 9000)) // Ensures 4 digits
      }

      const numberOne = generateFourDigits()
      const numberTwo = generateFourDigits()
      const numberThree = generateFourDigits()
      const numberFour = generateFourDigits()

      return `${numberOne}  ${numberTwo}  ${numberThree}  ${numberFour}`
    }

    const creditCvv = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * 10),
    ).join('')

    const generateRandomDate = () => {
      const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
      const year = String(
        new Date().getFullYear() + Math.floor(Math.random() * 10),
      ).slice(2)
      return `${month}/${year}`
    }

    const creditDate = generateRandomDate()
    const number = generateCreditNumber()

    setCard(number)
    setCvv(creditCvv)
    setDate(creditDate)
  }

  const submitPayment = async (e) => {
    if (first && last && card && cvv && date) {
      try {
        const { data: paid } = await setGroupPaid({
          variables: { groupId: groupid },
        })

        if (paid) {
          router.push(`/pay/confirmation/${groupid}`)
        } else {
          alert('Payment submission failed. Please try again.')
        }
      } catch (err) {
        console.error('Payment submission error:', err)
        alert('Payment submission error. Please try again.')
      }
    } else {
      alert('Please fill in all the fields')
    }
  }

  if (groupLoading) return <Loading />
  if (groupError) return <ErrorPage />
  if (!isOwner)
    return (
      <ErrorPage
        text={'You are not the group owner. Please go back to Home Page.'}
      />
    )

  return (
    <>
      <Header />
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <TitleBar color="darkblue" title="Payment Information" />
        <ContentBox width={'w-3/4'} height={'h-3/5'}>
          <div className="flex h-full w-full flex-col justify-between space-y-8 p-10 text-black">
            <div className="mx-auto flex w-full justify-between gap-5 border-b border-b-2 border-black font-bold">
              <p>{session}</p>
              <p>{total}</p>
            </div>
            <div className="flex h-full w-full flex-col space-y-8 pt-10">
              <div className="flex gap-5">
                <Input
                  width={'w-2/5'}
                  height={'h-18'}
                  placeholder={'First Name'}
                  required
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                ></Input>
                <Input
                  width={'w-2/5'}
                  height={'h-18'}
                  placeholder={'Last Name'}
                  required
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                ></Input>
              </div>
              <div className="flex gap-5">
                <Input
                  width={'w-4/6'}
                  height={'h-18'}
                  placeholder={'Card Number'}
                  required
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                ></Input>
                <Button
                  color={'orange'}
                  text={'Add Credit Card'}
                  onClick={addCreditCard}
                ></Button>
              </div>
              <div className="flex gap-5">
                <Input
                  width={'w-1/5'}
                  height={'h-10'}
                  placeholder={'CVV'}
                  required
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                ></Input>
                <Input
                  width={'w-2/5'}
                  height={'h-10'}
                  placeholder={'MM/YY'}
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                ></Input>
              </div>
            </div>
          </div>
        </ContentBox>
        <Button
          text="Submit Payment"
          color="orange"
          onClick={submitPayment}
          width={'1/4'}
        />
      </div>
    </>
  )
}
