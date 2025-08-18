import { useState } from "react";
import { useForm } from "./useForm";
import axios from "axios";

interface User {
    name:string,
    email:string
}
function AxiosPost() {
    const {form, handleChange, resetForm} = useForm<User>({name:"",email:""});
    const [submittedUser, setSubmittedUser] = useState<User | null>(null);
    const [error, setError] = useState("");
    const handleSubmit = () => {
        if (!form.name || !form.email) {
            setError("이름과 이메일을 모두 입력하세요");
            return;
        }
        axios.post("https://jsonplaceholder.typicode.com/users", form) // 자바스크립트 객체가 json으로
        // 자동 변환돼서 body 영역으로 넘어감
        .then((result) => {
            setSubmittedUser(result.data); // form 데이터가 그대로 반환
            resetForm();
            setError("");
        })
        .catch((err) => {
            setError("등록 중 오류가 발생했습니다.");
        });
    };
    return (
        <div className="form-container">
            <h2>사용자 등록</h2>
            <div className="form-group">
                <label>이름</label>
                <input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>이메일</label>
                <input name="email" value={form.email} onChange={handleChange} />
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button onClick={handleSubmit}>등록하기</button>
            {submittedUser && (
                <div className="result-box">
                    <h4>등록된 사용자 정보</h4>
                    <p>이름: {submittedUser.name}</p>
                    <p>이메일: {submittedUser.email}</p>
                </div>
            )}
        </div>
    );
}
export default AxiosPost;