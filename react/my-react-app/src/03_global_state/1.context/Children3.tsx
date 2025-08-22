import { useContext } from "react";
import { MyContext } from "./Context";

export default function Children3() {
    const {userInfo, setUserInfo} = useContext(MyContext);
    return (
        <>
            <h1>Children 3</h1>
            <button onClick={() => {
                setUserInfo({name : 'mileyh', age : 17})
            }}>
                {userInfo.name} ::: {userInfo.age}
            </button>
        </>
    )
}