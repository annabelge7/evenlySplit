export default function InviteContent({ color, text, width, children }) {
  return (
    <div
      className={`
        text-black 
        bg-${color}
        m-2
        mr-2
        rounded-md
        p-3 
        text-center 
        font-bold
        shadow-lg
        transition
        duration-200
        ease-in-out
      `}
    >
      <h1> {text} </h1>
      {children}
    </div>
  )
}
