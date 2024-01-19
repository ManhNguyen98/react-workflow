import React from 'react'
import { EmptyType } from '../type'

interface Props {
  name: EmptyType<string>
  value?: EmptyType<string>
  placeholder?: string
  editable?: boolean
  bgColor?: string
  titleColor?: string
  error?: boolean
}

const Card: React.FC<Props> = ({
  name,
  value,
  placeholder,
  bgColor = '#a9b4cd',
  titleColor = '#fff',
}) => {
  return (
    <div
      style={{
        backgroundColor: `${bgColor}`,
      }}
      className={`bg-[${bgColor}] w-full rounded-md cursor-pointer p-1 hover:shadow-[${bgColor}] hover:shadow-md z-10`}
    >
      <div
        style={{ color: `${titleColor}` }}
        className={`px-1 pb-1 text-left text-xs text-[${titleColor}]`}
      >
        {name}
      </div>
      <div className="bg-white px-1 py-0.5 text-left text-xs rounded-sm relative">
        <p className="m-0">{value}</p>
        <p className="m-0 text-[10px] text-gray-400">{placeholder}</p>
        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          <svg
            width="12px"
            height="12px"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 0 1-1.06-1.06L13.94 12 8.47 6.53a.75.75 0 0 1 0-1.06Z"
              fill="#18202A"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Card
