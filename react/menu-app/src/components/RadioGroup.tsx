import type { ChangeEvent } from "react";

export default function RadioGroup(
    {name, id, value, checked, onChange, label}
    :{name:string, id:string, value:string, checked:boolean, 
        onChange:(e:ChangeEvent<HTMLInputElement>)=>void, label:string}
) {
    return (
        <>
            <input type="radio" className="form-check-input" 
            name={name} id={id} value={value} checked={checked} onChange={onChange}/>
            <label htmlFor={id} className="form-check-label">{label}</label>
        </>
    )
}