import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { decrement, increment, incrementByAmount } from "../features/counterSlice";

export default function Counter() {
    // useSelector
    //  - 구독 기능
    //  - 스토어의 상태를 반환하는 함수
    //  - 반환값은 RootState로 정의하여 추출
    const counter = useSelector((state:RootState) => state.counter);
    const dispatch = useDispatch(); // 스토어에 액션객체를 전송하는 함수
    return (
        <div>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
                <button onClick={() => dispatch(incrementByAmount(5))}>+5씩증가</button>
                <p>{counter.value}</p>
            </div>
        </div>
    )
}