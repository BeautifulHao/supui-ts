import { RefObject, useEffect } from 'react'

function useOutsideClick(ref: RefObject<HTMLElement>, handler: Function) {
    useEffect(() => {
        const mousedownEvent = (e: MouseEvent) => {
            if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
                return
            }
            handler(e)
        }

        document.addEventListener('mousedown', mousedownEvent)
        return () => {
            document.removeEventListener('mousedown', mousedownEvent)
        };
    }, [ref, handler]);
}

export default useOutsideClick