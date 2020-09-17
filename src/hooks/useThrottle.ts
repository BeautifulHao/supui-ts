import { useRef, useEffect } from 'react'

function useThrottle(fn:Function,wait:number = 300):void {
    const timeRef =  useRef<number>(0)
    useEffect(() => {
        if(!timeRef.current){
            timeRef.current = window.setTimeout(()=>{
                fn()
                timeRef.current = 0
            },wait)
        }
    }, [fn,wait]);
}

export default useThrottle