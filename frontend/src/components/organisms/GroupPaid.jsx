'use client'

import { useRouter } from 'next/navigation'

import { Header, ContentBox, TitleBar, Button } from '@/components'

export default function GroupPaid() {
  const router = useRouter()

  const handleHomeClick = () => {
    router.push('/begin')
  }

  return (
    <>
      <Header />
      <div className="flex h-screen flex-col items-center justify-center gap-5">
        <ContentBox width={'w-4/4'} height={'h-3/5'}>
          <TitleBar
            color="darkblue"
            title="Payment Successful. This Group is Now Closed."
          ></TitleBar>
          <Button
            text="Go to Home Page"
            color="orange"
            width={'1/4'}
            height={'1/4'}
            textSize={'30px'}
            onClick={handleHomeClick}
          ></Button>
        </ContentBox>
      </div>
    </>
  )
}
