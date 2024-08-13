'use client'
import { ContentBox, Button } from '../atoms'
import { useRouter } from 'next/navigation'

export default function Begin() {
  const router = useRouter()

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-lightblue">
      <ContentBox width="w-[840px]" height="h-36">
        <h1 className="text-4xl text-black">
          Welcome to{' '}
          <span className="font-bold text-darkblue">Evenly Split</span>
        </h1>
      </ContentBox>
      <span className="p-6"></span>
      <Button
        text="Click here to Start New Session"
        color="orange"
        width="w-4/5"
        onClick={() => router.push('/create')}
      ></Button>
    </main>
  )
}
