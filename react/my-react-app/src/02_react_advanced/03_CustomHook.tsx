import { useState, type ChangeEvent } from "react";
import { useForm } from "./useForm";

export default function SignUpForm() {
    /*
        사용자 정의 hook 함수
         - 여러 컴포넌트에서 공통으로 사용하는 로직을 모듈화 시켜서 관리하는 경우,
           내부에 react의 hook 함수가 포함된 경우 customHook 이라고 부름
    */
    // const [user, setUser] = useState({
    //     username : "",
    //     email : "",
    //     password : ""
    // });
    // const inputHandler = (e:ChangeEvent<HTMLInputElement>) => {
    //     const {name, value} = e.target;
    //     setUser((prev) => {
    //         return {...prev, [name]: value};
    //     })
    // };
    const {form, handleChange, resetForm} = useForm({
        username : "",
        email : "",
        password : ""
    });
    const handleSubmit = () => {
        resetForm();
    };
    return (
        <>
            <div className="form-container">
                <h2>회원가입</h2>
                <div className="form-group">
                    <label>아이디</label>
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>이메일</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>비밀번호</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <button className="submit-button" onClick={handleSubmit}>
                    가입
                </button>
            </div>
        </>
    );
}