import { createContext, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

interface IOptionsData {
    id?: number;
    optionDimensions?: object;
    optionCenterX?: number;
    WrappedContent?: any;
    backgroundHeight?: number;
}

interface IDataProps {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    optionCenterX?: number;
}

interface IParamsProps {
    id?: number;
    props?: IDataProps;
}


interface IDropdownContext {
    registerOption: (data: IOptionsData) => any;
    updatedOptionProps: (data: IParamsProps) => any;
    getOptionById: (id: IParamsProps) => any;
    deleteOptionsById: (id: IParamsProps) => any;
    options: IOptionsData[];
    targetId: number | null;
    setTargetId: Dispatch<SetStateAction<number | null>>
    cachedId: number | null,
    setCachedId: Dispatch<SetStateAction<number | null>>
}

export const DropDownContext = createContext( {} as IDropdownContext )

export function DropDownProvider ({ children}: any ) {
    const [options, setOptions] = useState<IOptionsData[]>([] as IOptionsData[]);
    const [targetId, setTargetId] = useState<number | null>(null);
    const [cachedId, setCachedId] = useState<number | null>(null);

    const registerOption = useCallback(

        ({
            id,
            optionDimensions,
            optionCenterX,
            WrappedContent,
            backgroundHeight
        }) => {
        setOptions(items => { 

            return [
            ...items,
            {
                id,
                optionDimensions,
                optionCenterX,
                WrappedContent,
                backgroundHeight    
            }
        ]})
    }, [setOptions])

    const updatedOptionProps = useCallback(({id, props}: IParamsProps) => {

        return setOptions(items => {
            return items.map(item => {
        
                if(item.id === id) {
                    item = { ...item, ...props}
                }

                return item;
            })
      }  )
    }, [setOptions])

    const getOptionById = useCallback(({id}: IParamsProps) => {

        return options.find(item => {return item.id === id})
    }, [options])

    const deleteOptionsById = useCallback(({id}: IParamsProps) => {
 
        return setOptions(items => items.filter(item => item.id !== id))
    }, [setOptions])

    useEffect(() => {
        if(targetId !== null) return setCachedId(targetId)
    }, [targetId])

    return (
        <DropDownContext.Provider
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
        </DropDownContext.Provider>
    )

} 