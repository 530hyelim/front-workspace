import { useContext } from "react";
import { MyContext } from "./Context";

function Children2() {
    /*
        useContext(Context)
         - 구독 컴포넌트에서 전역 상태값을 사용하기 위해 필요한 함수
         - 여러 개의 전역 상태들 중 하나를 골라서 매개변수에 전달
    */
    const {userInfo} = useContext(MyContext);
    return (
        <>
            <h1>Children 2</h1>
            <h3>{userInfo.name} ::: {userInfo.age}</h3>
        </>
    );
}
export default Children2;