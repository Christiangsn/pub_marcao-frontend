
import {  useContext, useEffect, useRef, useState } from 'react'
import { DropDownDimensions } from './DropDownDimensions'
import { DropDownContext } from '../../context/DropDownContext';

import { motion } from 'framer-motion'
import React from 'react';

//Descobrir a tipagem do content
interface IDropDownoptions {
    name?: string;
    content?: any
    backgroundHeight?: number;
}

interface IDimensions {
    x: number;
    y: number;
    width: number;
    height: number;
    current: any;
}

let isMobile: Boolean = false
let lastOptionId = 0

export function DropDownOptions ({ name, content: Content}: IDropDownoptions) {
    const idRef = useRef(++lastOptionId);
    const id = idRef.current;

    const [ optionHook, optionDimensions ] = DropDownDimensions();
    const [ registered, setRegistered ] = useState<Boolean>(false)

    const { registerOption, updatedOptionProps, deleteOptionsById, setTargetId, targetId } = useContext(DropDownContext)

    useEffect(() => {
        if(!registered && optionDimensions) {
            const WrappedContent = () => {

                const contentRef = useRef<HTMLDivElement>(null)
                
                useEffect(() => {
                    const propsRef = contentRef?.current?.getBoundingClientRect();
                    const props = {
                        top: propsRef?.top,
                        right: propsRef?.right,
                        bottom: propsRef?.bottom,
                        left: propsRef?.left,
                        width: propsRef?.width,
                        height: propsRef?.height,
                        x: propsRef?.x,
                        y: propsRef?.y
                    }

                    updatedOptionProps({id, props} )
                }, [])

                return (
                    <div ref={contentRef}>
                        <Content />
                    </div>
                )
            }

            registerOption({
                id,
                optionDimensions,
                optionCenterX: (optionDimensions as IDimensions).x + (optionDimensions as IDimensions).width / 2,
                WrappedContent,
            
            })
            
            setRegistered(true)
        } else if (registered && optionDimensions) {

            const props = {
                optionCenterX: (optionDimensions as IDimensions).x + (optionDimensions as IDimensions).width / 2,
            }
            updatedOptionProps({
                id,
                props
            })
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        registerOption, 
        id, 
        registered, 
        optionDimensions, 
        updatedOptionProps,
        deleteOptionsById,
    ])

    useEffect(() => deleteOptionsById({id}), [deleteOptionsById, id])
    
    const handleOpen = () => setTargetId(id)
    const handleClose = () => setTargetId(null)
    const handleTouch = () => (isMobile = true)

    const handleClick = (event: any) => {
        event.preventDefault();

        return targetId === id ? handleClose() : handleOpen()
    } 


    return (
        <motion.button 
            className="dropdown-option"
            ref={optionHook}
            onMouseDown={handleClick}
            onHoverStart={() => !isMobile && handleOpen()}
            onHoverEnd={() => !isMobile && handleClose()}
            onTouchStart={handleTouch}
            onFocus={handleOpen}
            onBlur={handleClose}
        >
            {name}
        </motion.button>

    )
}
