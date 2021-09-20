import { useCallback, useLayoutEffect, useState } from "react";

interface IDimensions {
    x: number;
    y: number;
    widht: number;
    height: number;
    current: any;
}

const getDimensions = (element: any) => element.getBoundingClientRect()

export function useDimensions(responsive: Boolean = true) {
    const [dimensions, setDimensions] = useState<IDimensions>({} as IDimensions);
    const [element, setElement] =  useState(null)

    const hook = useCallback(e => setElement(e), []);

    useLayoutEffect(() => {
        if(element) {
            const upateDimensions = () => {
                window.requestAnimationFrame(() => {
                    console.log(element)
                    setDimensions(getDimensions(element))
                })
            }

            upateDimensions();

            if(responsive) {
                window.addEventListener('resize', upateDimensions);

                return () => {
                    window.removeEventListener('resize', upateDimensions);
                }
            }
        };

    }, [element, hook, responsive]);

    return [hook, dimensions, element]
}