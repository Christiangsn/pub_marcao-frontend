import client  from '../../assets/images/clients.png'
import './Menu.scss'

export function MenuContentClient () {

    return (
        <div id="Content">

        <header>
            <div className="content-icon">
                <div className="image-client">
                    <img src={client} alt="client" />
                </div>
                <strong>Clientes</strong>
            </div>
            </header>
        </div>
    )
}