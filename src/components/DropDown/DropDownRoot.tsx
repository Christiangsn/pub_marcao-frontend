import { motion } from 'framer-motion';
import { useContext, useMemo, useState } from 'react';
import { DropDownContext } from '../../context/DropDownContext';
import { DropDownSection } from './DropDownSection';

const refDuration = .22

export function DropDownRoot () {
    const { options, cachedId, getOptionById, targetId } = useContext(DropDownContext)

    const id = cachedId || undefined

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cachedOption = useMemo(() => getOptionById({id}), [cachedId])
    
    let [ xAnimate, widthAnimate, heightAnimate ] = [0, 0, 0]

    if(cachedOption) {
        const { optionCenterX,  width, height} = cachedOption

        widthAnimate = width
        heightAnimate = height
        xAnimate = optionCenterX - widthAnimate / 2
    }

    //Barra para saber se o mouse esta em cima da opção
    const [Hovering, setHovering] = useState<Boolean>(false)
    const isActive: Boolean = targetId !== null ||  Hovering

    //First Interaction - Movimento ao abrir a primeira vez o menu
    const [hasInteracted, setHasInteracted] = useState<Boolean>(false)
    const isFirstInteraction: Boolean = isActive && !hasInteracted;

    if(isFirstInteraction) {
        setTimeout(() => {
            if(!hasInteracted) setHasInteracted(true)
        }, 15)
    }

    return (
        <motion.div 
            className="dropdown-root"
            animate={{
                opacity: isActive ? 1 : 0
            }}
            transition={{
                opacity: { duration: refDuration, delay: 0.05 }
            }}
        >
            <motion.div 
                className="dropdown-container"
                animate={{ 
                    x: xAnimate,
                    width: widthAnimate,
                    height: heightAnimate,
                    pointerEvents: isActive ? 'unset' : 'none'
                }}
                transition={{
                    ease: 'easeOut',
                    x: isFirstInteraction ? { duration: 0 } : refDuration,
                    width: { duration: isFirstInteraction ? 0 : refDuration * 0.93 },
                    height: { duration: isFirstInteraction ? 0 : refDuration * 0.93 },
                    //bug fix
                    pointerEvents: { delay: 0.05 }
                }}
                onHoverStart={() => setHovering(true)}
                onHoverEnd={() => setHovering(false)}
            >
                <motion.div
                    animate={{
                        x: -xAnimate
                    }}
                    transition={{
                        x: isFirstInteraction ? { duration: 0 } : undefined,
                    }}
                >
                    {options.map(item => 
                        <DropDownSection
                            key={item.id} 
                            option={item}
                        />
                    )}
                </motion.div>
            </motion.div>
            <DropDownArrow 
                    isFirstInteraction={isFirstInteraction}
                />
        </motion.div>
    )
}

function DropDownArrow(isFirstInteraction: any) {
    const { cachedId, getOptionById } = useContext(DropDownContext)

    const id = cachedId || undefined
    const cachedOption = useMemo(() => getOptionById({id}), [cachedId])

    const x = cachedOption ? cachedOption.optionCenterX : 0

    return (
        <motion.div 
            className="dropdown-arrow"
            initial={{
                opacity: 0,

            }}
            animate={{
                x,
                pointerEvents: 'none',
                opacity: x > 0 ? 1 : 0
            }}
            transition={{
                ease: 'easeInOut',
                x: { duration: isFirstInteraction ? 0 : refDuration}
            }}
        />

    ) 
}