export default function ContentBox({ children, width, height }) {
  return (
    <div
      className={`${width} ${height} flex flex-col items-center justify-center rounded-lg bg-white align-middle`}
    >
      {children}
    </div>
  )
}
