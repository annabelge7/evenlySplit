export default function TitleBar({ color, title }) {
  //ended up not using color since all are darkblue, but will wait to take it out of args until meeting
  return (
    <div className="w-3/4 rounded-md bg-darkblue text-center">
      <p className="p-4 text-4xl font-bold text-white">{title}</p>
    </div>
  )
}
