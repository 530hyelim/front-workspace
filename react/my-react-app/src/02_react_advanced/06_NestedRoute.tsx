import { Outlet } from "react-router-dom";
/*
    중첩 라우팅
     - 여러 자식 컴포넌트가 공용으로 사용하는 부모 컴포넌트가 존재하는 경우,
       중첩 라우팅 구조를 만들어서 적용한다.
     - 즉, 부모 컴포넌트의 하위에 여러 자식컴포넌트를 중첩하여 구성하는 방식
     - 부모 컴포넌트를 기준으로 자식 요소가 들어갈 위치는 <Outlet/>이라는 컴포넌트로 바인딩 한다.
*/
export default function NestedRoute() {
    return (
        <div>
            <h1>Axios Get | Post</h1>
            <Outlet />
        </div>
    )
}