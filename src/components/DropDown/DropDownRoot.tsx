import { useContext, useMemo } from "react"
import { ContextDropDown } from '../../context/DropDown'
import { DropDownSection } from "./Section"
import { motion } from 'framer-motion'

interface IContentDimensions {
    x: number;
    y: number;
    widht: number;
    height: number;
    current: any;
}

export function DropDownRoot () {
    const { options, cachedId, getOptionById } = useContext(ContextDropDown)

    
    const cachedOption = useMemo(() => {
        getOptionById(cachedId) 
        return cachedId
    },[
        cachedId, getOptionById
    ]);
    console.log('options', options)
    let [width, height, x] = [0, 0, 0]
    

    if (cachedOption) {
        console.log(cachedOption)
        const optionsTrue = options[0]
        const { contentDimensions } = optionsTrue 
        const widthDimension = contentDimensions?.width || 0
        const heightDimension = contentDimensions?.height || 0
        const xDimension = contentDimensions.x ? contentDimensions.x : 0
        const xCenter = xDimension + widthDimension / 2 || 0

        console.log(contentDimensions)

        width = widthDimension || 0
        height = heightDimension || 0
        x = xCenter - width / 2 || 0
    }

    return ( 
        <div
             className="dropdown-root"
        >
            <motion.div 
                className="dropdown-container"
                animate={{
                    x,
                    width,
                    height
                }}
            >
                <div>
                    {options.map((item: any) => 
                        <DropDownSection 
                            key={item.id}
                            option={item}
                        />
                    )}
                </div>
            </motion.div>
        </div>
    )
}