const AddNode = () => {
  return (
    <button className="w-6 h-6 flex items-center justify-center bg-white shadow-md rounded-full">
      <svg
        width="12px"
        height="12px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 3a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Z"
          fill="#3370ff"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 12a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z"
          fill="#3370ff"
        ></path>
      </svg>
    </button>
  )
}

export default AddNode
