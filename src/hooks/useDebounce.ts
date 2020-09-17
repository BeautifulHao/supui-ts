import { useState, useEffect } from 'react'

function useDebounce(value: any, timeout: number = 300): any {
    const [lastValue, setLastValue] = useState<any>(null)
    useEffect(() => {
        const timeId = window.setTimeout(() => {
            setLastValue(value)
        }, timeout)
        return () => {
            clearTimeout(timeId)
        }
    }, [value, timeout])

    return lastValue
}

export default useDebounce;