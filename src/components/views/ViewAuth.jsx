import React from 'react'

const ViewAuth = ({ children, title }) => {
    return (
        <div className='flex h-full w-full items-center justify-center' >
            <div className='flex flex-col gap-[24px] shadow-lg bg-white w-[400px] px-[32px] py-[46px] rounded-lg'>
                {title && <span className='text-center'>
                    {title}
                </span>}
                {children}
            </div>
        </div>
    )
}

export default ViewAuth