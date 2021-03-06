
import { FaSignInAlt } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';

import { Toaster, toast } from 'react-hot-toast'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri"

import { Button } from '../../components/Button'
import { AuthContext } from '../../context/Auth';
import { verifyLogon } from '../../context/AuthVerify'

import './login.scss'

export function Login () {
    const { register, handleSubmit } = useForm();
    const { user, signIn } = useContext(AuthContext);
    const [loading, setLoading] = useState<Boolean>(false)
    const history = useHistory()
    
    async function handleSignIn (data: any): Promise<void> {

        try {
            setLoading(true)
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

                    <form name="login" className="form" onSubmit={handleSubmit(handleSignIn)}>
                        <div className="input-control">
                            <input 
                                {...register('email')}
                                type="email" 
                                name="email" 
                                className="input-field"
                                 placeholder="Email Address" />
                            <label  className="input-label"> Email </label>
                            <MdEmail />
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
                            <RiLockPasswordFill />
                        </div>
                        {!loading && (
                            <div className="submit">
                                <Button
                                    className="input-btn" 
                                    type="submit" >
                                        <FaSignInAlt />
                                        Entrar
                                </Button>
                            </div>
                            )
                        }

                        {loading  && (
                            <div className="submit">
                                <div className="spinner">
                                    <div className="spinner-loading"></div>
                                </div>
                            </div>
                            )
                        }

                    </form>
                </div>
            </main>
        </div>
    )

}