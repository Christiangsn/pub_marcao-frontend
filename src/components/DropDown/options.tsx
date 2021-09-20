import { motion } from 'framer-motion'
import { useContext, useEffect, useRef, useState } from 'react';
import { useDimensions } from '../../context/Dimensions';

import '../../styles/options.scss';
import { ContextDropDown } from '../../context/DropDown'

interface IDimensions {
    x: number;
    y: number;
    widht: number;
    height: number;
    current: any;
}

let lasOptionID = 0;

interface IDropdown {
    name?: string;
    content?: any;
    backgroundHeight?: number;
}


export function DropDownOptions ({name, content: Content, backgroundHeight}: IDropdown) {
    const idRef = useRef(++lasOptionID)
    const id = idRef.current;

    const [optionHook, optionDimensions] = useDimensions();
    const [registered, setRegistered] = useState(false);

    const { registerOption, updatedOptionProps, deleteOptionsById, setTargetId, targetId } = useContext(ContextDropDown)

    useEffect(() => {
        if(!registered && optionDimensions){
            
            const WrappedContent = () => {
                const contentRef = useRef<HTMLDivElement>(null)

                useEffect(() => {
                    const contentDimensions = contentRef?.current?.getBoundingClientRect()
                    updatedOptionProps(id, { contentDimensions })
                }, [])

                return ( 
                    <div ref={contentRef}>
                        <Content />
                    </div>
                )

            }

            console.log('aqui no option 2',  Number((optionDimensions as IDimensions).widht))
            registerOption({
                id,
                optionDimensions,
                optionCenterX: Number((optionDimensions as IDimensions).x) + Number((optionDimensions as IDimensions).widht) / 2,
                WrappedContent, 
                backgroundHeight
            })

            setRegistered(true)
        } else if (registered && optionDimensions) {
            console.log('aqui no option',  Number((optionDimensions as IDimensions).x))
            updatedOptionProps(id, {
                optionDimensions,
                optionCenterX: Number((optionDimensions as IDimensions).x) + Number((optionDimensions as IDimensions).widht) / 2,

            })
        }
    }, [registerOption, id, registered, optionDimensions, updatedOptionProps, deleteOptionsById, backgroundHeight, Content])
    
    const handleOpen = () => setTargetId(id)
    const handleClose = () => setTargetId(null)
    const handleTouch = () => (true)

    const handleClick = (event: any) => {
        event.preventDefault()

        return targetId === id ? handleClose() : handleOpen()
    }

    return(
        <motion.button
            className="dropdown-option"
            ref={optionHook}
            onMouseDown={handleClick}
            onHoverStart={() => handleOpen()}
            onHoverEnd={() => handleClose()}
            onTouchStart={handleTouch}
            onFocus={handleOpen}
            onBlur={handleClose}
        >
            
        </motion.button>
    )
}