import { RefObject, useEffect } from 'react'

const BACKDROP_CLASSNAME = 'backdrop'

export function useVirtualBackdrop(
  isOpen: boolean,
  menuRef: RefObject<HTMLElement>,
  onClose?: () => void | undefined
) {
  useEffect(() => {
    const handleEvent = (e: Event) => {
      const menu = menuRef.current
      const target = e.target as HTMLElement | null
      if (!menu || !target) {
        return
      }

      if (
        !menu.contains(e.target as Node | null) ||
        target.classList.contains(BACKDROP_CLASSNAME)
      ) {
        e.stopImmediatePropagation()
        e.stopPropagation()
        e.preventDefault()
        if (onClose) {
          onClose()
        }
      }
    }

    if (isOpen && onClose) {
      document.addEventListener('mousedown', handleEvent)
    }

    return () => {
      document.removeEventListener('mousedown', handleEvent)
    }
  }, [isOpen, menuRef, onClose])
}

export default useVirtualBackdrop
