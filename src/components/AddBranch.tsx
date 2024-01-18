const AddBranch = () => {
  return (
    <button className="bg-white shadow-md text-[10px] text-[#3370ff] px-2 py-1 rounded-2xl">
      <div className="flex gap-1 items-center">
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
        Add Conditional Branch
      </div>
    </button>
  )
}

export default AddBranch
