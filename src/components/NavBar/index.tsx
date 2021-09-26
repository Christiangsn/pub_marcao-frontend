
import { ContentCompany, ContentProducts, ContentDevelopers } from '../DropDownContent/'
import { DropDownOptions, DropDownRoot } from '../DropDown'
import { DropDownProvider } from '../../context/DropDownContext'

import logo from '../../assets/images/logopub.png'
import './navbar.scss'

export function NavBar () {
    return (
        <DropDownProvider>
             <div className="Container">
                        <img src={logo} alt="logo"/>
                        <ul>
                            <li>
                                <DropDownOptions    
                                    name="Estoque"
                                    content={ContentProducts}
                                    
                                />
                            </li>
                            <li>
                                <DropDownOptions    
                                    name="Developers"
                                    content={ContentCompany}
                                   
                                />
                            </li>
                            <li>
                                <DropDownOptions    
                                    name="Developers"
                                    content={ContentDevelopers}
                                    
                                />
                            </li>
                        </ul>
                        
            </div>
            <DropDownRoot />
        </DropDownProvider>
    )



}