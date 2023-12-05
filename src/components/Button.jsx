import React from 'react'


const Button = ({type, clickHandler, icon, label}) => {
    return (
        <button 
            type={type}
            onClick={clickHandler}
            className="flex justify-center items-center font-medium text-sm px-5 py-2.5 leading-none bg-red-400 text-white rounded-lg gap-3"
        >
            {icon}{label}
        </button>
    )
}

export default Button