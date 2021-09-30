import './client.scss'
import avatar from '../../assets/images/avatar.png';
import { AiFillEdit, AiOutlineFileAdd } from "react-icons/ai";
import { Button } from '../Button';

interface IClientProps {
    name: string;
    surname: string;
    createdAt: Date;
}


export function Client ({name, surname, createdAt}: IClientProps) {

    return (
        <div className="dropdown-clients">
            <div className="drop-client">
                <img src={avatar} alt={name} />
                <span>{surname}</span>
            </div>
            <strong>{name}</strong>
            <strong>{createdAt}</strong>
            
        </div>
        //     {/* <div className="drop-list">
        //         <div className="drop-client">
        //             
        //             <div className="drop-name">
        //                 
        //                 <strong>{name}</strong>
        //             </div>
        //         </div>


        //         <div className="drop-data">
        //             <strong>{createdAt}</strong>
        //         </div>
        //         <div className="drop-options">


        //         </div>

        //     </div> */}
        // </>
    )
}