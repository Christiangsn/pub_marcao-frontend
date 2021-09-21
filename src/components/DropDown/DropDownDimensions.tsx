import { useState, useCallback, useLayoutEffect } from "react";

const getDimensions = (element: HTMLElement) => element.getBoundingClientRect();

export function DropDownDimensions (responsive: Boolean = true) {
    
    const [dimensions, setDimensions] = useState<any | null>(null)
    const [element, setElement] = useState<HTMLElement | null>(null)

    const hook = useCallback((element: HTMLElement) => setElement(element),
    [])

    useLayoutEffect(() => {
        console.log(element)
        if(element) {
            const updateDimensions = () => {
                window.requestAnimationFrame(() => {
                    setDimensions(getDimensions(element))
                })
            }

            updateDimensions()

            if(responsive) {
                window.addEventListener('resize', updateDimensions)

                return () => {
                    window.removeEventListener('resize', updateDimensions)
                }
            }
        }
        
   
    }, [element, hook, responsive])

    return [hook, dimensions, element]
}