import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../features/authSlice";

export default function OAuth2Success() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const param = new URLSearchParams(location.search);
        const accessToken = param.get("accessToken") as string;
        // 인증 성공 후 사용자 정보 조회(쿼리스트링에 민감한 유저정보 못보내니까)
        axios.get("http://localhost:8081/api/auth/me", {
            headers : {
                Authorization : `Bearer ${accessToken}`
            }
        }).then(res => {
            dispatch(loginSuccess({accessToken, user:res.data}));
            navigate("/menus", {state: {flash: "로그인 완료"}, replace:true});
            // 히스토리를 덮어씌우기(뒤로가기 못하게 하려고)
        })
        // 리덕스 스토어에 액세스 토큰 저장
    }, []);

    return (
        <div>로그인 처리중...</div>
    )
}