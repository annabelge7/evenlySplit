import { TitleBar } from '@/components'

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <TitleBar
        color="darkblue"
        title="Loading..."
      ></TitleBar>
    </div>
  )
}
