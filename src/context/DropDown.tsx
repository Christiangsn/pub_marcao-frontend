import { useState, createContext, useCallback, useEffect } from "react";

export const ContextDropDown = createContext( {} as any )


export function DropDownProvider ( { children }: any ) {
    const [options, setOptions] = useState([] as any)
    const [targetId, setTargetId] = useState(null)
    const [cachedId, setCachedId] = useState(null)

    const registerOption = useCallback(
        
        ({ 
            id, 
            optionDimensions,
            optionCenterX,
            WrappedContent,
            backgroundHeight,
        }) => {
            setOptions((items: []) => [
                ...items,
                {
                    id, 
                    optionDimensions,
                    optionCenterX,
                    WrappedContent,
                    backgroundHeight,      
                }
            ]);
        }, 
    [setOptions]
    );


    const updatedOptionProps =   useCallback( (optionsId, props) => {
        setOptions((items: any) => 
        items.map((item: any)=> {
            if(item.id === optionsId) {
                item = { ...item, ...props}
            }
            return item
        })
        )
    }, [setOptions]);

    const getOptionById = useCallback( (id) => {
        console.log(id)
        options.find((item: any) => item.id === id)
    }, 
    [options])

    const deleteOptionsById = useCallback( (id) => {
        setOptions((items: any) => 
            items.filter((item: any) => 
                item.id !== id
        ))
    }, 
    [setOptions])

    useEffect(() => {
        if(targetId !== null) setCachedId(targetId)
    }, [targetId])

    return (
        <ContextDropDown.Provider 
            value={{
                registerOption,
                updatedOptionProps,
                getOptionById,
                deleteOptionsById,
                options,
                targetId,
                setTargetId,
                cachedId,
                setCachedId
            }}
        >
            {children}
        </ContextDropDown.Provider>
    )
}