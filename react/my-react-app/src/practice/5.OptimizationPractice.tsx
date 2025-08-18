import React, { useMemo, useCallback, useState, useRef, useEffect, type ChangeEvent } from "react";

const initialUsers = ["심은성", "한종윤", "안정현", "김현주", "서혜림",
    "조아현", "정은비", "조윤식", "고훈", "남건후"];

// 변경금지!!
//  - 호출시마다 1초 이상의 시간이 소요되는 무거운 함수
function heavyFilter(list: string[], keyword: string): string[] {
    console.log("#1. heavyFilter 호출");
    const start = performance.now();
    while (performance.now() - start < 1000) { } // 1초 delay
    return list.filter((user) => user.includes(keyword));
}

function OptimizationPractice() {
    const [users, setUsers] = useState(initialUsers);
    const [keyword, setKeyword] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [newUser, setNewUser] = useState("");

    //  1) 현재 filtered는 검색어(keyword)가 변경될때마다 필터링 연산이 실행된다. 이를 최적화 하여
    //      "검색버튼을 누를 때"만 연산이 실행되도록 최적화 하세요.
    //     단, filtered연산시 heavyFilter는 반드시 수행되어야 한다.

    //  2) 현재filtered는 컴포넌트가 렌더링 될때 마다 필터링 연산이 실행된다.
    //    이를 최적화 하여 keyword가 변경되지 않는 한 불필요한 연산이 수행되지 않도록 최적화 하시오.

    const filtered = useMemo(() => heavyFilter(users, keyword),[keyword]);

    const showCount = useCallback(() => {
        setKeyword(inputRef.current?.value ?? "");
        //alert("검색 결과: " + filtered.length + "명");
    },[]);

    const onRegister = () => {
        if (!newUser.trim()) return;
        setUsers([...users, newUser.trim()]);
        setNewUser("");
    };
    return (
        <div>
            <h2>회원 검색 (최적화 실습)</h2>

            <input
                placeholder="검색어 입력" 
                ref={inputRef}
                //onChange={(e) => setKeyword(e.target.value)}
                //value={keyword}
            />
            <p>검색 결과 ({filtered.length}명): {filtered.slice(0, 10).join(", ")}</p>
            <Button showCount={showCount}></Button>
            <hr />

            <h3>신규 사용자 등록</h3>
            <input
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                placeholder="새 사용자 이름"
            />
            <button onClick={onRegister}>등록</button>
        </div>
    );
}

const heavyWork = () => {
    console.log("#2. 자식 컴포넌트 heavyWork 호출");
    const start = performance.now();
    while (performance.now() - start < 500) { } // 100ms delay
};

const Button = React.memo(({ showCount }: { showCount: () => void }) => {
    // 3) 자식 컴포넌트 랜더링 최소화.
    // - 자식 컴포넌트의 불필요한 렌더링을 줄여 heavyWork의 호출을 최소화하세요.
    // - 단, showCount는 반드시 부모 컴포넌트로부터 얻어와야한다.
    heavyWork(); // 삭제 및 변경 금지 !!
    return (
        <>
            <button onClick={showCount}>검색 결과 수 보기</button>
        </>
    );
});

export default OptimizationPractice;
