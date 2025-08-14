import React, { useState } from 'react';

type User = {
    name:string,
    age:number,
    hobby:string[]
}

interface UserInfoProps {
    user:User;
    setUser:(user:User)=>void;
}

export default function UserInfoContainer() {
    let [user, setUser] = useState({name:'홍길동', age:30, hobby:['코딩','게임']});
    return (
        <div>
            <UserInfo user={user} setUser={setUser}/>
        </div>
    );
}

function UserInfo({user, setUser}: UserInfoProps) {
    const handleChangeName = () => {
        // 객체 내부의 속성값에 대한 변경은 readonly를 위반하지 않는다.
        // 다만 주소값이 동일하기 때문에 같은 state라고 인식 => 리렌더링X
        user.name = "Goofy";
        user.age = 27;
        user.hobby = ['숨쉬기', '잠자기'];
        setUser({...user});
        // 전달받은 객체의 기존값들을 변경하는 것은 권장되지 않음 => 새 객체 만들자
        setUser({name:'Goofy', age :27, hobby:['숨쉬기','잠자기']});
    }
    return (
        <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
            <h2>사용자 정보</h2>
            <h3>이름: {user.name}</h3>
            <h3>나이: {user.age}</h3>
            <h3>취미: {user.hobby.join(', ')}</h3>
            <button onClick={handleChangeName}>정보 변경변경</button>
        </div>
    );
}