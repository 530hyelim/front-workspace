import React, { useState } from 'react';

interface UserInfoProps {
    user:{
        name:string,
        age:number,
        hobby:string[]
    },
    setUser:Function
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
        setUser({name:'Goofy', age :27, hobby:['숨쉬기','잠자기']});
    }
    const hobbies = user.hobby.join(', ');
    return (
        <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
            <h2>사용자 정보</h2>
            <h3>이름: {user.name}</h3>
            <h3>나이: {user.age}</h3>
            <h3>취미: {hobbies}</h3>
            <button onClick={handleChangeName}>정보 변경변경</button>
        </div>
    );
}