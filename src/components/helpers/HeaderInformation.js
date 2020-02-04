import React from 'react';

const HeaderInformation = ({title, children}) => {
    return (
        <div className='information container'>
            <div className='col-lg-6 offset-lg-3'>
                <h1>{title}</h1>
            </div>
            <div className='col-lg-8 offset-lg-2'>
                <p>
                    {children}
                </p>
            </div>
        </div>
    )
}

export default HeaderInformation;