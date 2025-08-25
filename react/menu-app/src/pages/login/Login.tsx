import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css'
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/authSlice";

export default function Login() {
    // 입력 상태
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // 요청 상태
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) { // 백에도 설정 해야함..
            setError("이메일과 비밀번호를 모두 입력하세요!");
            return;
        }
        setLoading(true);
        setError(""); // useQuery? 로그인데이터 캐싱할 필요 없어서 안씀
        axios.post("http://localhost:8081/api/auth/login", {email, password})
            .then(res => {
                console.log(res);
                /*
                    #1. JWT 저장위치
                     - JWT 토큰은 클라이언트의 브라우저에서 관리해야하는 데이터이며, 
                       API 요청에 사용되는 중요한 데이터
                     - AccessToken은 메모리에만 보관하고, Refresh Token은 쿠키
                       (http-only)에 보관

                    1) localStorage
                     - 브라우저의 로컬 저장소, 브라우저가 종료되어도 데이터가 유지된다.
                     - 손쉬운 기능 구현시에는 잠깐 사용하지만, XSS 공격에 취약하고 데이터가
                       하드드라이브에 다운로드 돼서 영구히 유지되기 때문에, 
                       JWT와 같은 토큰을 관리하기 적합하지 않다.

                    2) sessionStorage
                     - 탭 단위 세션 저장소로, 탭을 닫으면 데이터도 삭제된다.
                     - 로컬스토리지보다 쪼끔 더 안전 함
                       바뀌지 않는 간단한 사용자 정보 (세션스토리지에 장바구니 정보, 이미지 정보 등)
                       털려도 상관없는 정보 저장하긴 함. 아예 안쓰는건 X
                     - 로컬스토리지처럼 xss 공격에 매우 취약하다.

                    3) 쿠키
                     - 쿠키는 특정 도메인의 경로에 지정된 시간동안 저장되는 데이터
                     - 쿠키는 http 통신 시 헤더/바디에 담지 않더라도 항상 자동으로 전달된다.
                     - 기본 쿠키는 js로 접근하여 탈취될 수 있으나, http-only로 설정된 쿠키는
                       js로 제어가 불가능하다. (xss 에서 안전)
                     - 자동으로 계속 전달되기 때문에 csrf 공격에 취약해서 방어용 코드가 필요
                       cors 설정하면 고려할 필요가 없음. 공공 api 서비스 같은 경우 방어해야함
                       프론트에서 직접 csrf 토큰 생성해서 요청하고, 넘겨줄 때 같이 넘겨주기
                     - refreshToken 저장

                    4) 리액트의 메모리에 보관 (리덕스)
                     - 리덕스에 보관 시 메모리에만 저장되며, 새로고침 시 데이터가 소멸한다.
                     - 리덕스 persist 라이브러리 사용하면 영구히 유지되긴 하지만, session
                       local storage랑 다를 게 없어서 안 씀
                     - xss 공격의 위험이 존재하긴 하나 유지시간이 굉장히 짧기 때문에
                       공격 자체를 최소화 할 수 있다.
                     - 단, 새로고침 시 데이터가 소실되기 때문에, 인증 유지를 위한 토큰 재발급 기능 필요
                     - accessToken 저장

                    #2. AccessToken을 Cookie에서 관리하지 않는 이유
                     1. API 유연성 문제
                     2. CORS 설정 문제
                     3. 토큰만료 처리
                */
                dispatch(loginSuccess(res.data));
                navigate("/home", {state: {flash: "로그인 성공"}});
            })
            .catch((err:AxiosError) => {
                if (err.response?.status === 404) {
                    const doSignUp = confirm("등록된 계정이 없습니다. 현재 입력한 이메일과"
                                    + " 비민번호로 회원가입 할까요?");
                    if (!doSignUp) {
                        setError("계정을 다시 확인해주세요.");
                        setLoading(false);
                        return;
                    }
                    // 자동 회원가입 요청
                    axios.post("http://localhost:8081/api/auth/signup", {email, password})
                        .then(res => {
                            console.log(res);
                            dispatch(loginSuccess(res.data));
                            navigate("/home", {state: {flash: "회원가입 및 로그인 성공"}});
                        })
                        .catch(err => {
                            setError("회원가입에 실패했습니다. 나중에 다시 실행해주세요.");
                        })
                        // .finally(() => {
                        //     setLoading(false);
                        // });
                } else if (err.response?.status === 401) {
                    setError("비밀번호가 올바르지 않습니다.");
                } else {
                    setError("로그인 처리 중 오류가 발생했습니다.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };
    // 소셜 로그인은 백엔드 OAuth 엔드포인트로 리다이렉트
    const handleKakaoLogin = () => {
    };
    const handleNaverLogin = () => {
    };
    return (
        <div className={styles.page}>
            <section className={styles.card}>
                <h2 className={styles.title}>로그인</h2>
                <form onSubmit={handleLogin} className={styles.form}>
                    <label htmlFor="email" className={styles.label}>
                        이메일
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=""
                        autoComplete="email"
                    />
                    <label htmlFor="password" className={styles.label}>
                        비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=""
                        autoComplete="current-password"
                    />
                    <button type="submit" className={styles.primaryBtn} disabled={loading}>
                        {loading ? "로그인 중…" : "로그인"}
                    </button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
                <div className={styles.dividerWrap}>
                    <div className={styles.divider} />
                    <span className={styles.dividerText}>또는</span>
                    <div className={styles.divider} />
                </div>
                <div className={styles.socialGroup}>
                    <button className={`${styles.socialBtn} ${styles.kakao}`} onClick={handleKakaoLogin}>
                        카카오로 로그인
                    </button>
                    <button className={`${styles.socialBtn} ${styles.naver}`} onClick={handleNaverLogin}>
                        네이버로 로그인
                    </button>
                </div>
            </section>
        </div>
    );
}