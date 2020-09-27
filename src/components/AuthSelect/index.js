import React, { SelectHTMLAttributes } from "react";

import './styles.css';

const Select = ({label, name, options, ...rest}) => {
    return (
        <div className="auth-select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden>Tipo de usuário</option>

                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    );
}

export default Select;