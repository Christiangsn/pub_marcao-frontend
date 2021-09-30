import {useState } from "react";


export function useSearch () {
    const [search, setSearch] = useState<any>('')

    return { search, setSearch }
}