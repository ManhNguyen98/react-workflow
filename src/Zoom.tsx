import { ZOOM_TYPE } from './type'
import { useEditor } from './useEditor'

const Zoom = () => {
  const { size, zoomSize } = useEditor()
  return (
    <div className="flex justify-between items-center w-56 fixed top-4 right-4 z-10 bg-white shadow-lg px-3 py-1.5 border rounded-lg">
      <span className="text-gray-500 text-sm">{size}%</span>
      <div className="flex gap-1 items-center">
        <button
          className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 ${
            size === 50 ? 'disabled' : ''
          }`}
          onClick={() => zoomSize?.(ZOOM_TYPE.OUT)}
        >
          <svg
            width="16px"
            height="16px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 12c0-.55.504-1 1.12-1h15.76c.616 0 1.12.45 1.12 1s-.504 1-1.12 1H4.12c-.308 0-.588-.113-.79-.294A.946.946 0 0 1 3 12Z"
              fill="#18202A"
            ></path>
          </svg>
        </button>
        <button
          className={`w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 ${
            size === 300 ? 'disabled' : ''
          }`}
          onClick={() => zoomSize?.(ZOOM_TYPE.IN)}
        >
          <svg
            width="16px"
            height="16px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 3a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Z"
              fill="#18202A"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 12a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z"
              fill="#18202A"
            ></path>
          </svg>
        </button>
        <button
          className={`px-2 py-1 text-sm rounded-md flex items-center justify-center hover:bg-gray-200 ${
            size === 300 ? 'disabled' : ''
          }`}
          onClick={() => zoomSize?.()}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Zoom
