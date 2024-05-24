import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
    desplegar: boolean,
    idList: string,
    icon: string,
    nombre: string,
    children: React.ReactNode,
}

const ListMenu = (props: Props) => {
    const [isOpen, setIsOpen] = useState(props.desplegar)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(()=>{
        setIsOpen(props.desplegar)
    },[props.desplegar])

    return (
        <li>
            <button
                type="button"
                onClick={toggleMenu}
                id-list={props.idList}
                className={`
                flex 
                items-center 
                p-3 px-6
                w-full 
                text-sm 
                font-normal 
                text-gray-400                
                transition 
                duration-75 
                group 
                hover:text-white`}
            >
                <i className={`bi ${props.icon}  text-xl pr-2`} ></i>
                <span
                    className="flex-1 
                    pr-2
                    text-left 
                    whitespace-nowrap 
                    overflow-hidden"
                    sidebar-toggle-item="true"
                >
                    {props.nombre}
                </span>
                <IoIosArrowDown className={`${isOpen ? 'rotate-0' : 'rotate-[-90deg]'} w-5 h-5 transition-all duration-700`} />
            </button>
            <ul
                aria-expanded={isOpen}
                className={`max-h-0 
                            overflow-hidden 
                            transition-all 
                            duration-500
                            ${isOpen ? 'max-h-[500px]' : 'max-h-0'}                          
                            bg-gray-700`}
            >
                {props.children}
            </ul>
        </li>
    )
}

export default ListMenu