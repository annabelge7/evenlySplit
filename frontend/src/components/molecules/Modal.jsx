'use client'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  const handleCloseClick = (e) => {
    e.preventDefault()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="w-full max-w-sm rounded bg-white p-6 shadow-lg">
        <button
          onClick={handleCloseClick}
          className="text-lg font-semibold text-black"
        >
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
