import { useEffect } from 'react'

export function useCaptureEscKey(isOpen: boolean, handler: () => void) {
  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event?.preventDefault()
        handler()
      }
    }
    document.addEventListener('keydown', handleEvent)
    return () => {
      document.removeEventListener('keydown', handleEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])
}

export default useCaptureEscKey
