
import { ContentCompany, ContentProducts, ContentDevelopers } from '../DropDownContent/'
import { DropDownOptions, DropDownRoot } from '../DropDown'
import { DropDownProvider } from '../../context/DropDownContext'

import logo from '../../assets/images/logopub.png'
import { FcAdvertising, FcInspection } from "react-icons/fc";
import { ImMenu3 } from "react-icons/im";
import avatar from '../../assets/images/avatar.png';
import './navbar.scss'
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth';

export function NavBar () {
    const { user } = useContext(AuthContext)

    return (
        <DropDownProvider>
             <div className="Container">
                <div className="navbar-main">
                    <ul>
                        <li>
                            <DropDownOptions    
                                name="Clientes"
                                content={ContentProducts}
                                
                            />
                        </li>
                        <li>
                            <DropDownOptions    
                                name="Pedidos"
                                content={ContentCompany}
                                
                            />
                        </li>
                        <li>
                            <DropDownOptions    
                                name="Estoque"
                                content={ContentDevelopers}
                                
                            />
                        </li>
                    </ul>
                </div>
                <div className="navbar-infos">

                </div>
                        


                        
            </div>
            <DropDownRoot />
        </DropDownProvider>
    )



}