import { Client } from "../../components/ClientsList";
import { SearchMenu } from "../../components/SearchMenu";
import { useClient } from "../../hooks/pageClientsHook/";
import { useEffect, useRef, useState } from "react";

type StatusPageActual = number;
type StatusTotalPage = number;

export function RoomClients () {
    const { clients, fetchClients } = useClient(15);
    const [clientSearch, setClientSearch] = useState<string>('')  
    const [ pagesTotal , setTotalPages] = useState<StatusTotalPage | 1>(1)
    const [page, setPage] = useState<StatusPageActual | 1>(1)
    const divElement = useRef(null)
   
    const clientsFilters = clients.filter((client) => client.name.toLowerCase().includes(clientSearch.toLowerCase()))
    const clientsRef = useRef<HTMLInputElement>(null)

    function callback(value: string): void {
        setClientSearch(value)
    }

    useEffect(() => {
        fetchClients(page)
            .then( (callbackTotalPages: number) => {
                setTotalPages(callbackTotalPages)
            })

    }, [page])

    useEffect(() => {

        if(divElement.current!){
            const intersecttionObserver = new IntersectionObserver( (entries) => {
                if(entries.some((entry) => entry.isIntersecting)){
                    handleScroll()
                }
            })
    
            intersecttionObserver.observe(divElement.current!)
            return () => intersecttionObserver.disconnect()

        }

        function handleScroll() {
            if( page === pagesTotal){
                return 
            }
            setPage (page + 1)
        }

    }, [page, pagesTotal])

    return (
        <div id="Content">

            <main>
                <SearchMenu 
                    placeholder="Cliente"
                    callbackPattern={callback}
                />
                <div 
                    className="content-main"
                    ref={clientsRef}
                >
               {    
                    
                   clientsFilters.map((client) => {
                       return (
                           <Client
                                key={client.id}
                                name={client.name}
                                surname={client.surname}
                                createdAt={client.createdAt}
                           />
                       )
                   }) 
                   
               }
               {page < pagesTotal &&
                    <div ref={divElement}>Carregando...</div>
               }
               </div>

            </main>
        </div>
    )
    
}