import { useEffect, useState } from "react";

export default function UseEffectHook() {
  /*
    #1. Hook
      - 함수형 컴포넌트 내부에 React의 기능 (state관리, 생명주기 함수)를 연결할 수
        있도록 도와주는 함수
      - 원래 React에서는 컴포넌트가 복잡한 동작을 수행하려면 클래스 컴포넌트를 써야했다.
        하지만, 그럴 경우 컴포넌트의 코드가 복잡하고, 가독성이 떨어지는 단점이 존재했음.
      - 따라서 함수형 컴포넌트의 간결함을 유지하면서도, 클래스처럼 기능을 확장할 수 있도록
        hook 함수가 도입되었다.
  */
  const [count, setCount] = useState(0);
  /*
    #2. useEffect
      - React 컴포넌트가 언제 실행되고(mount), 언제 삭제되고(unMount), 언제 업데이트되는지
        (update)를 감지하여 특정작업을 수행할 수 있게 해주는 hook 함수
      - 클래슬 컴포넌트에서만 가능했던 생명주기 함수를 함수형 컴포넌트에서 사용할 수 있도록 만들어졌다.

    3_1) 생명주기 함수
      - 컴포넌트는 생성부터 소멸까지 특정 순서에 맞춰서 동작하며, 이 과정을 생명주기(lifecycle)이라고 부른다.
      - 마운트(mount) : 컴포넌트가 처음 렌더링 될 때
      - 업데이트(update) : props나 state가 변경되어 컴포넌트가 리렌더링 될 때
      - 언마운트(unmount) : 컴포넌트가 화면에서 사라질 때

    3_2) 사용법
    useEffect( () => {
      //마운트, 업데이트 시 실행할 코드
      //언제? 이벤트 등록, 타이머 설정(일정시간동안 조작이 없으면 화면바뀌는거), API 호출(성능이슈로 고유한 사용방법이 있음)
      return () => {
        //언마운트 시점에 실행할 코드
        //정리작업(clean up)용 코드를 작성한다
        //예를들어 등록한 이벤트나 타이머 해제
      }
    }, [의존성]); //의존성(state)이 변경될 때 마다 useEffect가 재실행(업데이트)
  */
  // api 서버와 통신하여 초기 데이터를 load 하고자 할 때 사용하는 방식
  useEffect(() => {
    console.log('최초 한 번만 렌더링');
    return () => {
      console.log('unmount시 실행되는 영역');
    }
  },[]); // 의존성 배열을 비워두기 => 컴포넌트가 처음 마운트 될 때만 실행되도록 설정
  // 의존성 배열을 사용하여 update 시점에 실행할 코드 기술
  useEffect(() => {
    console.log('컴포넌트가 화면에 mount');
    const timer = setInterval(() => {
      console.log('타이머 동작 중...');
    },1000);
    return () => {
      // clean-up 작업
      clearInterval(timer);
    }
  },[count]);
  return (
    <div>
      <h1>UseEffect</h1>
      <h2>count : {count}</h2>
      <button onClick={() => setCount(count+1)}>+</button>
    </div>
  )
}