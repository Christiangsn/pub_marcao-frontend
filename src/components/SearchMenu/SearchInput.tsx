import { useEffect, useState } from "react"
import { useSearch } from "../../hooks/useSearch"

interface IPropsValues {
    callbackChildren: (value: any) => void
}

export function SearchInput ( { callbackChildren } : IPropsValues) {
    const [value, setValue] = useState<any>('')
    const { setSearch } = useSearch()

    useEffect(() => {
        setSearch(value)
        callbackChildren(value)
    })

    return (
        <input 
            type="text" 
            value={value}
            placeholder="Pesquisar Cliente"
            onChange={(event) => setValue(event.target.value)}
        />
    )
}