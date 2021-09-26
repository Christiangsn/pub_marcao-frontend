
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

import './client.scss'
import editClient from '../../assets/menu/edit.png'
import listClient from '../../assets/menu/listar.png'
import { ClientsModal } from '../../components/Clients/modal'


export function ClientHome () {
    const [isModalVisible, setIsModalVisible] = useState<Boolean>(false)    
    const history = useHistory()

    async function addClient () {
        history.push('/clients/new')
    }

    async function clients () {
        history.push('/clients/list')
    }

    return (
        <div id="Content">

            <main>
                <div className="inputs">
                    <button 
                        className="input"
                        onClick={clients}
                    >
                        <img src={listClient} alt='' />
                        <p>Ver Clientes</p>
                    </button>
                    <button 
                        className="input"
                    >
                        <img src={editClient} alt="edit-client" />
                        <p> Editar Cliente </p>
                    </button>
                    <button 
                        className="input"
                        onClick={() => setIsModalVisible(true)}
                    >Adicionar Cliente
                    </button>
                    {isModalVisible ? <ClientsModal closeModal={setIsModalVisible} /> : null}
                </div>
            </main>
        </div>
    )
}