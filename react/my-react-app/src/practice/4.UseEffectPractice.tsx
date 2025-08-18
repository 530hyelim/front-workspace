
import { useEffect, useState } from "react";

// localStorage 저장용 키
const STORAGE_KEY = "autosave:text";

function AutoSaveEditor() {
    // 입력상태 관리용 state
    const [text, setText] = useState("");

    // 저장상태 관리용 state
    const [saved, setSaved] = useState(false);

    // 1. 자동저장기능 구현
    // - useeEffect와 setTimeout을 사용하여 사용자가 3초동안 값을 입력하지 않는 경우 현재 입력한 내용이 
    //   localStorage에 저장되도록구현하세요.
    // - 단, 입력한 값이 없는 경우에는 setTimeout이 실행되지 않도록 처리하세요.
    // - 한번 호출된 setTimeout함수가 실행되기 전에, 사용자가 값을 수정하는 경우 자동저장 되지 
    //   않도록 제거해주세요.(clearTimeout)
    // - 임시저장이 완료되면 saved상태값을 true로 변경되도록 하세요.
    // - 값을 입력하는 동안에는 saved상태값을 false로 변경되도록 하세요.
    useEffect(() => {
        if (localStorage.getItem(STORAGE_KEY) === text) {
            return;
        }
        setSaved(false);
        const timer = setTimeout(() => {
            if (text) {
                localStorage.setItem(STORAGE_KEY, text);
                setSaved(true);
            }
        }, 3000);
        return (() => {
            clearTimeout(timer);
        });
    }, [text]);
    // localStorage.setItem(key, value) : localStorage 데이터 저장메서드

    // 2. 저장된 데이터 로드 기능 구현
    // - 컴포넌트가 처음 마운트 될 때, localStorage에 저장된 데이터를 꺼내어 text에 업데이트 
    //   되도록 하세요.
    useEffect(() => {
        const text = localStorage.getItem(STORAGE_KEY);
        setText(text ?? "");
        setSaved(true);
    }, []);
    // localStorage.getItem(key) : localStorage 데이터 추출 메서드

    return (

        <div>
            <h2>Auto Save Editor</h2>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="글을 입력해보세요..."
                rows={5}
                style={{ width: "100%", padding: "10px" }}
            />

            <p style={{ color: saved ? "green" : "gray" }}>
                {saved ? "✔ 임시 저장 완료됨" : "입력 중..."}
            </p>
        </div>
    );
}

export default AutoSaveEditor;
