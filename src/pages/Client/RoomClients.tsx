import { api } from "../../services/locals"


export function roomClients () {

    async function getClients () {


        try {
            api.get('/cllients/all')
        } catch (error) {
            
        }
    }
    
    return (
        <div id="Content">

            <main>
                <div>teste</div>

            </main>
        </div>
    )
    
}