import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdNavigateNext, MdSave } from "react-icons/md";
import { FcOk } from "react-icons/fc";
import * as Yup from 'yup';
import { api } from '../../services/locals';


import './modal.scss'

interface IDataForms {
    name: string;
    lasteName: string;
    surname: string;
    Adress: string;
    cpf: string;
}

interface IValidated {
    nameRequired: Boolean;
    cpfRequires: Boolean;
}

type IEvent = React.ChangeEvent<HTMLInputElement>
type IEventSubmit = React.FormEvent

export function ClientsModal ( {closeModal} : any ) {
    const [activeStep, setActiveStep] = useState<number | 0>(0)
    const [loading, setLoading] = useState<number | 0>(0)
    const [disabled, setDisabled] = useState<Boolean>(false)
    const [validated, setValidated] = useState<IValidated>({ nameRequired: false, cpfRequires: false })
    const [data, setData] = useState<IDataForms>({
        name: "",
        lasteName: "",
        surname: "",
        Adress: "",
        cpf: ""
    })
    const schemaName = Yup.object().shape({
        name: Yup.string().required('Digite o Nome do Cliente'),
    })
    const schamaDocument = Yup.object().shape({  
        cpf: Yup.string().required('Digite o CPF ou RG do Cliente')
    })

    function getSteps () {
        return [
            { id: 0, name: "Dados" },
            { id: 1, name: "Informações"}
    ]
    }
    const steps = getSteps()

    const handleNext = async () => {
        
        try {
            await schemaName.validate(data, {
                abortEarly: true,
            })
            setActiveStep((nextStep) => nextStep + 1)
        }catch(error: any) {
            if (error instanceof Yup.ValidationError) {
                setValidated(validation => {
                    return { ...validation, nameRequired: true }
                })
            }
        }
        
    }

    const handleBack = () => {
        setActiveStep((priviousStep) => priviousStep - 1)
    }
    
    const handleLoading = () =>{
        setLoading((saved) => saved + 1)
    }

    const handleChange = (input: any) => (event: IEvent) => {
        setData({...data, [input]: event.target.value})
    }

    async function handleSubmitForms (event: IEventSubmit) {
        event.preventDefault()


        try {
            await schamaDocument.validate(data, {
                abortEarly: true,
            })

            handleLoading()
            setDisabled(true)

            api.post('/client/create', data)
                .then( () => {
                    handleLoading()
                    setTimeout(() => {
                        closeModal(false)
                    }, 1000)
                })
        }catch(error: any) {
            if (error instanceof Yup.ValidationError) {
                setValidated(validation => {
                    return { ...validation, cpfRequires: true }
                })
            }
        }

    }

    useEffect(() => {
        if(data.name.length > 0) {
            setValidated(validation => {
                return { ...validation, nameRequired: false }
            })
        }

        if(data.cpf.length > 0) {
            setValidated(validation => {
                return { ...validation, cpfRequires: false }
            })
        }

    }, [data.cpf.length, data.name.length])

    return (
        <div className="modal-content">
            <div className="modal">
            <div className="steps">
                {steps.map(option => (
                    <div className={ option.id === activeStep ? "onchange focus" : "onchange"} key={option.id}>
                    <strong 
                            key={option.id}
                            >{option.name}
                        </strong>
                    </div>
                ))}
            </div>

            <form className="input-forms">
                <div className="inputData">
                    {activeStep === 0 && (
                        <div className="inputform">
                            <div className="input-control">
                                <input 
                                    className="input-field"
                                    type="text"
                                    name="name"
                                    placeholder="Nome"
                                    disabled={ disabled ? true : false}
                                    defaultValue={data.name}
                                    onChange={handleChange('name')}
                                />
                                <label className="input-label" >Nome do Cliente</label>
                                {validated?.nameRequired && <strong>O Nome do Cliente é Obrigatório!</strong>}
                            </div>
                            
                            <div className="input-control">
                                <input 
                                    className="input-field"
                                    type="text"
                                    name="lasteName"
                                    disabled={ disabled ? true : false}
                                    placeholder="Sobrenome"
                                    defaultValue={data.lasteName}
                                    onChange={handleChange('lasteName')}
                                />
                                <label className="input-label">Sobrenome</label>
                            </div>
                            
                            <div className="input-control">
                                <input 
                                    className="input-field"
                                    type="text"
                                    name="surname"
                                    placeholder="Apelido"
                                    disabled={ disabled ? true : false}
                                    defaultValue={data.surname}
                                    onChange={handleChange('surname')}
                                />
                                <label className="input-label">Apelido</label>
                            </div>

                            <div className="input-steps" onClick={handleNext}>

                                <button 
                                    className="button-steps"
                                    
                                >Proximo
                                </button>
                                <MdNavigateNext />
                            </div>
                        </div>
                    )}

                    {activeStep === 1 && (
                        <div className="inputform">
                            <div className="input-control">
                                <input 
                                    className="input-field"
                                    type="text"
                                    name="adress"
                                    placeholder="Endereço"
                                    disabled={ disabled ? true : false}
                                    defaultValue={data.Adress}
                                    onChange={handleChange('Adress')}
                                />
                                <label className="input-label">Endereço</label>
                            </div>
                            
                            <div className="input-control">
                                <input 
                                    className="input-field"
                                    type="text"
                                    name="cpf"
                                    placeholder="cpf ou rg"
                                    disabled={ disabled ? true : false}
                                    defaultValue={data.cpf}
                                    onChange={handleChange('cpf')}
                                />
                                <label className="input-label">CPF OU RG</label>
                                {validated?.cpfRequires && <strong>Digite o CPF ou RG do Cliente!</strong>}
                            </div>
                            
                            {loading === 0 && (
                                <div className="container-inputs">
                                    <div className="input-steps" onClick={handleBack}>
                                        <MdChevronLeft />
                                        <button 
                                            className="button-steps"
                                            
                                        >Voltar
                                        </button>
                                    
                                    </div>

                                    <div className="input-steps" onClick={handleSubmitForms}>

                                        <button 
                                            type="submit"
                                            className="button-steps"
                                            
                                        >Cadastrar
                                        </button>
                                        <MdSave />
                                    </div>
                            
                                </div>
                            )}

                            {loading === 1 && (
                                <div className="spinner">
                                    <div className="spinner-loading"></div>
                                </div>
                            )}

                            {loading === 2 && (
                                <div className="spinner">
                                    <FcOk />
                                </div>
                            )}
                        </div>
                    )}
                    
                </div>

            </form>
        </div>
        </div>
    )   
    
}