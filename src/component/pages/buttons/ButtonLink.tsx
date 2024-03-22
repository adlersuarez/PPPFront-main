import { NavLink } from "react-router-dom";

type Props = {
    to: string
    nombre: string
    icon?: string
    color?: string
    hover?: string
}

const ButtonLink = (props: Props) => {
    return (

        <NavLink
            to={props.to}
            className={`
                flex 
                items-center 
                w-full
                h-20 xl:h-24
                text-sm 
                text-white
                font-semibold 
                transition-all 
                duration-200
               ${props.color}
               hover:${props.hover}
                hover:bg-blue-700
                rounded-lg
                uppercase 
                `}
        >
            <div className="mx-auto flex gap-2 w-full h-full py-4">
                <div className="flex w-24 border-r">
                    <i className={`bi ${props.icon} text-3xl sm:text-4xl m-auto`} />
                </div>

                <p className="my-auto px-3 text-xl xl:text-2xl">{props.nombre}</p>
            </div>
        </NavLink>

    );

}

export default ButtonLink;