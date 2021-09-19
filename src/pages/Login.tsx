
import '../styles/auth.scss';
import { FaSignInAlt } from 'react-icons/fa';
import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast'

import { Button } from '../components/Button'
import { AuthContext } from '../context/Auth';
import { verifyLogon } from '../context/AuthVerify'

export function Login () {
    const { register, handleSubmit } = useForm();
    const { user, signIn } = useContext(AuthContext);
    const history = useHistory()
    
    async function handleSignIn (data: any) {

        try {
            if(!user) {
                return await signIn(data)
            }
            history.push('/home')
        } catch (error: any) {
            console.log(error.response)
            toast.error(error.response.data.error.message)
        }
        
    }

    useEffect(() => {  
        verifyLogon().then( (result: Boolean) => {
            console.log(result)
            if(result === true){
                history.push('/home')
            }
            return
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div id="container">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <main>
                <div className="login"> 
                    <div>
                        <strong> Login </strong>
                    </div>
                    <form name="login" className="form" onSubmit={handleSubmit(handleSignIn)}>
                        <div className="input-control">
                            <input 
                                {...register('email')}
                                type="email" 
                                name="email" 
                                className="input-field"
                                 placeholder="Email Address" />
                            <label  
                                className="input-label">
                                    Email
                            </label>
                        </div>
                        <div className="input-control">
                            <input 
                                {...register('password')}
                                type="password" 
                                name="password" 
                                className="input-field" 
                                placeholder="Password" />
                            <label 
                                className="input-label">
                                    Senha
                            </label>
                        </div>
                        <div className="submit">
                            <Button 
                                type="submit" >
                                    <FaSignInAlt />
                                    Entrar
                            </Button>
                            
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )

}