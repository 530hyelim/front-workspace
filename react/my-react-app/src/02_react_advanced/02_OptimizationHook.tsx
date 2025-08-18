/*
    최적화를 위해 사용하는 훅 함수들
     - useMemo, useCallback
     - 컴포넌트의 리렌더링을 줄여 성능을 최적화 해준다.
*/
import React, { useCallback, useMemo, useState } from "react";

function OptimizationHook() {
    /*
        #1. useMemo
         - 계산결과를 메모해두는 훅
         - 리렌더링 시 계산비용이 큰 작업의 결과를 메모이제이션(캐싱)하여 렌더링을 최적화한다.
         - 계산 비용이 큰 작업 -> 데이터 정렬, 필터링 등
    */
    const [numbers, setNumbers] = useState([5,1,9,3]); // 서버에서 얻어온 데이터. 아무튼 그럼.
    const [text, setText] = useState("");
    const heavyComputation = (list: number[]) => {
        // 시간 지연을 위한 코드.
        console.log("1. heavyComputation 호출");
        const start = performance.now();
        while (performance.now() - start < 1) {} // 1초 delay
        return [...list].sort((a, b) => a - b);
    };
    // 컴포넌트가 렌더링 될 때마다 정렬된 배열을 다시 계산하는 중
    //const sorted = heavyComputation(numbers);
    // 현재 컴포넌트가 렌더링 될 때마다 정렬된 배열을 다시 계산하는 것이 아니라
    // 컴포넌트가 마운트 될 때만 정렬된 배열을 계산하고, 그 이후에는 캐싱된 배열을 사용
    const sorted = useMemo(() => heavyComputation(numbers), [numbers]); // 리액트 돔 내부 메모리상에 저장
    /*
        #2. useCallback
         - 함수를 메모해두는 훅 (원래도 함수생성 비용이 그리 비싸진 않음)
         - 매 렌더링마다 새롭게 만들어지는 함수 생성 비용을 줄여준다. (그럼 왜 씀? 렌더링 최적화)
         - 함수를 부모 컴포넌트에서 생성하여 자식 컴포넌트로 전달하는 경우, 함수가 새롭게 생성되면서
           자식 컴포넌트 또한 리렌더링 되는데 이를 방지하기 위해 사용 (React.memo와 함께 사용)
    */
    const showSorted = useCallback(() => {
        alert("정렬 결과 : " + sorted.join(", "));
    }, [sorted]);
    return (
        <div>
            <h2>최적화 Hook</h2>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
            <p>원본 데이터 : {numbers.join(", ")}</p>
            <p>정렬된 데이터 : {sorted.join(", ")}</p>
            <ChildList onClick={showSorted}/>
            <button onClick={() => setNumbers([...numbers, Math.floor(Math.random() * 100)])}>
                숫자 추가
            </button>
        </div>
    )
}
// React.memo -> props가 바뀌지 않으면 리 렌더링하지 않는 컴포넌트로 만드는 함수
// 원래는 부모컴포넌트가 변경되면 자식 컴포넌트도 함께 리렌더링 되는 것이 기본값 
const ChildList = React.memo(({onClick}:{onClick: () => void}) => {
    //console.log("자식 컴포넌트 렌더링");
    const childHeavyComputation = () => {
        // 시간 지연을 위한 코드.
        console.log("2. childHeavyComputation 호출");
        const start = performance.now();
        while (performance.now() - start < 500) {} // 1초 delay
    };
    childHeavyComputation();
    return <button onClick={onClick}>정렬 결과 보기</button>
});
export default OptimizationHook;