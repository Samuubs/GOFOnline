import React from "react";

import './styles.css';

const Input = ({label, name, placeholder, ...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} placeholder={placeholder} {...rest} />
        </div>
    );
}

export default Input;