import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/Auth';

export function Home () {
    const { user } = useContext(AuthContext);

    useEffect(() => { 
     }, [])

    return ( 
        <h1>{user?.name}</h1>
    )

}
