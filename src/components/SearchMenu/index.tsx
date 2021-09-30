
import { AiOutlineSearch } from 'react-icons/ai'
import './search.scss'
import { SearchInput } from './SearchInput'
import { useState } from 'react';

import { FaUserAlt } from "react-icons/fa";

interface ISearchProps {
    placeholder: string;
    callbackPattern: (value: any) => void
}

export function SearchMenu ( {placeholder, callbackPattern} : ISearchProps) {
    const [isModalVisible, setIsModalVisible] = useState<Boolean>(false) 

    function callbackChildren (value: string) {
        callbackPattern(value)
    }

    return (
        <div className="content-search">
            <div className="search-box">
                <div className="search">
                    <SearchInput 
                        callbackChildren={callbackChildren}
                    />
                    <a className="search-btn" href="#" />
                    <AiOutlineSearch />
                </div>
            </div>
            <div className="search-description">
                <div className="description search-name">
                    <FaUserAlt />
                    <ul>Cliente</ul>
                </div>

                <div className="description search-apelido">
                    <ul>Apelido</ul>
                </div>

                <div className="description search-data">
                    <ul>Cliente desde</ul>
                </div>
                    
            </div>
            

        </div>
    )
}