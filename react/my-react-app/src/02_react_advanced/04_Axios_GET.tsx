import axios from "axios";
import { useEffect, useState } from "react";
/*
    Axios
     - 리액트 대표 비동기 통신 라이브러리
     - fetch를 사용하는 통신방식에 비해 문법이 간결하고 지원하는 기능이 많아 리액트에서 많이 사용한다.
*/
// api 서버에서 얻어올 데이터
interface User {
    id:number,
    name:string,
    email:string,
    phone:string
}
export default function AxiosGet() {
    const [users, setUsers] = useState<User[]>([]);
    /*
        비동기 통신은 컴포넌트가 마운트 될 때 최초 1회 실행되도록 useEffect에 작성한다.
    */
    useEffect(() => {
        /*
            axios.get/post/put/patch/delete(rest API)
            (url, 전송할데이터(객체형태))
            .then((result) => {
                응답 성공 시 실행할 코드. 일반적으로 setter 함수로 데이터 바인딩
            })
            .catch((err) => {
                실패 시 처리할 코드
            })
        */
        axios.get("https://jsonplaceholder.typicode.com/users", {
            params:{
                //id:1
            }
        })
        .then((res) => {
            console.log(res);
            setUsers(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    return (
        <div>
            <h2>사용자 목록</h2>
            <ul>
                {
                    users.map((user) => (
                        <li key={user.id}>
                            <b>{user.name}</b> - {user.email} / {user.phone}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}