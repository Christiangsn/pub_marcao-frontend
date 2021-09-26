
import { useContext } from 'react'
import logo from '../../assets/images/Sonhar-com-beber-cerveja.jpg'
import { AuthContext } from '../../context/Auth'

export function Profile () {
    const { user } = useContext(AuthContext)

    return (
        <div className="profile">
            <img src={logo} alt="profile" />
            <div>
                {user?.name}
            </div>
        </div>
    )
}