/*
    #1. Redux
     - 리액트를 통한 복잡한 전역상태 관리 시 자주 사용되는 라이브러리(RTK:Redux Tool Kit)
     - redux는 "장바구니, 실시간 알림, 인증상태 및 권한" 등을 관리하며, 컴포넌트 단위로 관리되어야
       하는 일반 state 값들은 redux로 관리하지 않는다.

    #2. Redux의 구성요소
    1) Store(저장소)
     - Redux에서 관리하는 전역 상태를 보관하는 중앙 저장소
     - 컨텍스트와 다르게 어플리케이션에서 "유일"하도록 설정해야 한다 => 유지보수, 관리 편함

    2) State(상태값)
     - Store에 저장된 상태값
     - 이 상태값은 읽기전용이며, 직접 변경할 수 없다. 구버전에서는 직접 변경 시 에러 발생.
       신버전에서는 변경할 수 있는 것처럼 코드가 짜여있음. 완전 새로운 객체로 바꿔치기. useState처럼

    3) Action(명령객체) / Action Creator(액션생성함수)
     - 액션은 store의 상태값을 변경하는 요청을 담은 객체
     - 액션객체의 타입: {type:string, payload?:any} => 변경할 state, 변경할 데이터
     - 액션객체는 객체로 포현되며 반드시 type을 가져야 한다.
     - 액션생성함수를 통해 액션 객체를 생성할 수 있다.
    
    4) Reducer(상태변경함수)
     - Action을 받아서 상태값을 변경하는 함수
     - Store가 관리하는 콜백함수
     - (oldState, payload) => newState (RTK)
     - RTK에서는 Reducer와 Action, Action Creator를 함께 정의하는 createSlice 기능을 제공

    5) Dispatch (Action 전송 함수)
     - store를 사용하는 구독 컴포넌트에서 사용
     - dispatch 함수를 통해 안에 action 객체를 넣어서 store로 보내는 것 => SOrry!
     - Actions을 Store에 전달하는 함수
     - Dispatch를 통해 Action이 전달되면 Action에 정의한 reducer가 호출된다.
       (Action별로 실행할 reducer가 정의되어 있음)

    6) Selector (구독)
     - Store에 저장된 상태값을 꺼내오는 함수

    store : state, reducer(type 전달받아서 골라서 실행)
    구독 컴포넌트 : action creator(이벤트) => action, dispatch함수 (action을 store에 전달)

    #3. Redux의 동작흐름
    1) 사용자가 이벤트를 호출하여 Action Creator가 호출되고, 이로 인해 Action이 생성된다.
    2) 생성된 Action은 반드시 dispatch 함수를 통해 store로 전달
     ex: dispatch(actionCreator(payload))
    3) Store에서는 action과 일치하는 reducer를 찾아, payload를 전달 후 상태변경로직을 실행
    4) reducer는 상태변경로직의 결과인 새로운 state를 store에 반환한다
    5) store는 변경된 state를 저장하고, 이를 구독중인 컴포넌트들에게 알려준다
    6) 구독컴포넌트들은 전역상태값이 변경 시 재 렌더링 된다.

    npm install redux react-redux @reduxjs/toolkit
*/

import { configureStore } from "@reduxjs/toolkit";
import counter from '../features/counterSlice';
import todo from '../features/todoSlice';

// store 생성
export const store = configureStore({
    reducer : { // 스토어에 저장할 상태값을 관리. state 선언하지 않고, state를 관리하는 리듀서
        counter,
        todo
    }
});

export type RootState = ReturnType<typeof store.getState> // 스토어가 관리하는 상태값의 타입 반환