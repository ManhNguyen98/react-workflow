import React from 'react'
import { EmptyType } from '../type'
import clsx from 'clsx'

interface Props {
  name: EmptyType<string>
  value?: EmptyType<string>
  placeholder?: string
  editable?: boolean
  bgColor?: string
  titleColor?: string
  error?: boolean
  onDelete?: () => void
}

const Card: React.FC<Props> = ({
  name,
  value,
  placeholder,
  bgColor = '#a9b4cd',
  titleColor = '#fff',
  onDelete,
}) => {
  const deletable = typeof onDelete === 'function'

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onDelete?.()
  }
  return (
    <div
      style={{
        backgroundColor: `${bgColor}`,
      }}
      className="card-node-box"
    >
      <div style={{ color: `${titleColor}` }} className="card-node-title">
        {name}
      </div>
      <div className="card-select-trigger">
        <p className="m-0">{value}</p>
        <div className="card-placeholder">{placeholder}</div>
        <div className="card-select-right">
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
            />
          </svg>
        </div>
      </div>
      {deletable && (
        <button
          type="button"
          className={clsx(
            'card-del-btn',
            bgColor === '#fff' ? 'card-del-btn-dark' : ''
          )}
          onClick={handleDelete}
        >
          <svg
            width="12px"
            height="12px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.707 4.293a1 1 0 0 1 0 1.414l-14 14a1 1 0 0 1-1.414-1.414l14-14a1 1 0 0 1 1.414 0Z"
              fill="#fff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.293 4.293a1 1 0 0 1 1.414 0l14 14a1 1 0 0 1-1.414 1.414l-14-14a1 1 0 0 1 0-1.414Z"
              fill="#fff"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default Card
