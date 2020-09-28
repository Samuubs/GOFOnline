import React from "react";

import './styles.css';

const AuthInput = ({label, name, placeholder, type, ...rest}) => {
    return (
        <div className="input-auth-block">
            <label htmlFor={name}>{label}</label>
            <input type={type} id={name} placeholder={placeholder} {...rest} />
        </div>
    );
}

export default AuthInput;