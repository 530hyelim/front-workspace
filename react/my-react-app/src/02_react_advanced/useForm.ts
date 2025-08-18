import { useState } from "react";

// 여러 개의 input 태그의 상태를 객체형태로 관리하는 hook
export function useForm<T extends Object>(initData:T) {
    const [form, setForm] = useState(initData);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };
    const resetForm = () => {
        setForm(initData);
    };
    return {form, handleChange, resetForm};
}