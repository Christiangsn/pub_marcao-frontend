import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/Auth';
import { NavBar } from '../../components/NavBar';

import './home.scss';

export function Home () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user } = useContext(AuthContext);

    useEffect(() => { 
     }, [])

    return ( 
        <>
            <NavBar />
        </>
    )

}
