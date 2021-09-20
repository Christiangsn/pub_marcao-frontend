import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/Auth';

import logo from '../assets/images/1087961.png'
import { DropDownOptions } from '../components/DropDown/options'
import { DropDownProvider } from '../context/DropDown';
import '../styles/home.scss'
import { Products } from '../components/Content/Products';
import { DropDownRoot } from '../components/DropDown/DropDownRoot';

export function Home () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user } = useContext(AuthContext);

    useEffect(() => { 
     }, [])

    return ( 
        <div id="home">
            <header>
                <div className="content">
                    <img src={logo} alt="logo" />
                    <DropDownProvider>
                        <ul>
                            <li>
                                <DropDownOptions    
                                    name="Estoque"
                                    content={Products}
                                />
                            </li>
                        </ul>
                        <DropDownRoot />
                    </DropDownProvider>
                </div>
            </header>

        </div>
    )

}
