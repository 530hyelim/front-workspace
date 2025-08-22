import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css'

export default function Login() {
    const navigate = useNavigate();
    // 입력 상태
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // 요청 상태
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleLogin = async (e: React.FormEvent) => {
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