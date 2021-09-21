import { motion } from "framer-motion";
import { useContext } from "react"
import { DropDownContext } from "../../context/DropDownContext"


export function DropDownSection ({option}: any) {
    const { cachedId} = useContext(DropDownContext);
    const { id,  width, optionCenterX } = option;
    const contentWidth = width | 0;
    const x = optionCenterX - contentWidth / 2
    const isActive: Boolean = cachedId === id
    
    return (
        <motion.div 
            className="dropdown-section"
            initial={{ x }}
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