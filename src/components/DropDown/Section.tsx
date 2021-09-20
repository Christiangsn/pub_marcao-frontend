import { motion } from "framer-motion";
import { useContext } from "react"
import { ContextDropDown } from '../../context/DropDown'


export function DropDownSection ({option}: any) {
    const { cachedId } = useContext(ContextDropDown);

    const { id, optionCenterX, contentDimensions } = option;

    const contentWidth = contentDimensions?.width || 0
    const x = optionCenterX - contentWidth / 2

    const isActive = cachedId === id;

    return (
        <motion.div 
            className="dropdown-section"
            initial={{
                x,

            }}
            animate={{
                x,
                opacity: isActive ? 1 : 0, 
                pointerEvents: isActive ? 'unset' : 'none'
            }}
            transition={{
                ease: 'easeOut',
                opacity: { duration: 0.2 }
            }}
        >
            <option.WrappedContent />
        </motion.div>
    )
}