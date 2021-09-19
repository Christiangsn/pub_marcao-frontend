
import { parseCookies } from 'nookies'
export const verifyLogon = async () => {

    const { 'authToken': token } = parseCookies()

    if(token){
        return true
    } else {
        return false
    }
}