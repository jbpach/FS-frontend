import { Fa0 } from "react-icons/fa6"

const Button = ({type, clickHandler, icon, label}) => {
    return (
        <button 
            type={type}
            onClick={clickHandler}
            className="flex justify-between items-center font-medium text-sm px-5 py-2.5 leading-none bg-red-400 text-white rounded-lg gap-3"
        >
            {icon}{label}{<Fa0 className=" text-transparent"/>}
        </button>
    )
}

export default Button