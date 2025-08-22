import { createSlice } from "@reduxjs/toolkit";

// createSlice : store에서 관리해야할 상태(state)와, 상태변경로직(reducer)을 함께 정의하는 함수
const counterSlice = createSlice({
    name : 'counter', // action의 type에 붙는 접두어
    initialState : {
        value : 0
    },
    /*
        reducers
         - Action을 받아서 상태값을 변경하는 함수를 등록하는 영역
         - 각 함수 등록 시 액션생성함수와 액션타입을 자동으로 생성해준다.
         - 액션타입은 name/reducers키 형식으로 생성
    */
    reducers : {
        increment : (state) => { // state(value) 원래라면 readonly 타입이어야 함
            //return {value : state.value + 1}; readonly로 사용. 옛날방식
            state.value++; // RTK버전. 실제로는 내부적으로 불변성 유지됨. 이미 상태값 깊은복사해서 넘겨주는 방식
        }, // payload가 있다면 두번째 매개변수로 받아옴
        decrement : (state) => {
            state.value--;
        },
        incrementByAmount : (state, action) => {
            state.value += action.payload;
        }
    }
});

// 액션생성함수
//  - RTK는 reducers의 함수명과 매칭되는 액션함수를 자동으로 생성한다.
export const {increment, decrement, incrementByAmount} = counterSlice.actions; 
// counter/increment라는 action 생성
export default counterSlice.reducer; // store 등록용