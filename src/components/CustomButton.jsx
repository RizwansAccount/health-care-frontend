import React from 'react'

const CustomButton = ({ title, buttonClassName, titleClassName }) => {
    return (
        <button className={`  ${buttonClassName}`} >
            <span className={`  ${titleClassName}`} >
                {title}
            </span>
        </button>
    )
}

export default CustomButton