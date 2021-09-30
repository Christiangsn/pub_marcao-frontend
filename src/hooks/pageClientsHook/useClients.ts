import { useEffect, useState } from "react";
import { api } from "../../services/locals";
import moment from 'moment'

interface IClient {
    id: string;
    name: string;
    surname: string;
    createdAt: Date;
}

export function useClient ( pageLimite : number ) {
    const [clients, setClient] = useState<IClient[]>([])

    moment.updateLocale('pt', {
        months : [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
            "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]
    });

    async function fetchClients (page: number): Promise<number> {

        const results = await api.get(`/clients?page=${page}&limit=${pageLimite}`)
        const resultsClients = results.data.clients
        const callbackTotalPages = Number(results.data.totalPages)
        const clientsFilters = resultsClients.map((client: any) => {
            return {
                id: client._id,
                name: client.name,
                surname: client.surname,
                createdAt: moment(client.createdAt).locale('pt-br').format("DD [de] MMMM/YYYY") 
            }
        })
                
        setClient([...clients, ...clientsFilters ])
        return callbackTotalPages
    }

    return { clients, fetchClients }
}