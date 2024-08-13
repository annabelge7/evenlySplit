export default function Input({
  width,
  height,
  placeholder,
  value,
  type = 'text',
  onChange,
  step,
  min,
}) {
  return (
    <input
      type={`${type}`}
      onChange={onChange}
      value={value}
      required
      placeholder={placeholder}
      className={`${width} ${height} rounded-lg border-2 border-black bg-white p-2 text-center text-black focus:border-darkblue focus:outline-none`}
      {...(min !== undefined ? { min } : {})}
      {...(step !== undefined ? { step } : {})}
    ></input>
  )
}
