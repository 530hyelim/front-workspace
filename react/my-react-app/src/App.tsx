import { Link, Route, Routes } from 'react-router-dom'
import Component from './01_react_basic/01.Component'
import ParentComponent from './01_react_basic/02.PropsAndState'
import ArrayDataBinding from './01_react_basic/03.ArrayBinding'
import ObjectDataBinding from './01_react_basic/04.ObjectBinding'
import ModuleCSS from './01_react_basic/05.ModuleCss'
import UseEffectHook from './02_react_advanced/01_UseEffectHook'
import OptimizationHook from './02_react_advanced/02_OptimizationHook'
import SignUpForm from './02_react_advanced/03_CustomHook'
import AxiosPost from './02_react_advanced/04_Axios.POST'
import AxiosGet from './02_react_advanced/04_Axios_GET'
import './App.css'
import './default.css'
import { useState } from "react";
import Header from './02_react_advanced/05_Router'
import NestedRoute from './02_react_advanced/06_NestedRoute'
import { UserDetail, UserList, VariableRoute } from './02_react_advanced/07_VariableRoute'

function App() {
  return (
    <>
      {/* <Component/> */}
      {/* <ParentComponent/> */}
      {/* <ArrayDataBinding/> */}
      {/* <ObjectDataBinding /> */}
      {/* <ModuleCSS/> */}
      {/* <UseEffectHook/> */}
      {/* <OptimizationHook/> */}
      {/* <SignUpForm/> */}
      {/* <AxiosGet /> */}
      {/* <AxiosPost /> */}
      <Header />
      <Routes>
        <Route path='/' element={<div>메인 페이지</div>} />
        <Route path='/useEffect' element={<UseEffectHook />} />
        <Route path='/optimize' element={<OptimizationHook />} />
        <Route path='/nested' element={<NestedRoute/>}>
          <Route path='get' element={<AxiosGet/>}/>
          <Route path='post' element={<AxiosPost/>}/>
        </Route>
        <Route path='/variable-route' element={<VariableRoute/>}>
          {/* 동적 자원경로(path variable) 설정 */}
          <Route path='user/:id' element={<UserDetail/>}/>
          <Route path='' element={<UserList/>}/>
        </Route>
        {/* 순서 상 항상 맨 아래에 위치해야 함 */}
        <Route path="*" element={<div>
          <h1 style={{ color: 'red' }}>잘못된 페이지입니다.</h1>
          <Link to={"/"}>메인페이지</Link>
          {/* 
            Link
             - html의 a 태그와 동일한 기능을 수행하나, 페이지 이동 시 새로고침 없이 컴포넌트를 전환한다.
               (History API 사용)
             - a 태그로 인한 페이지 이동은 location을 조작하는 행위로, 리액트에서는 권장되지 않는 이동방식이다.
               (페이지 새로고침 되면 state 값들이 전부 초기화되기 때문에 위험함!)
          */}
          {/* <br /><a href="/">a 태그로 이동</a> */}
        </div>} />
      </Routes>
      <nav className='nav'>
        <li>
          <Link to="/">메인페이지</Link>
        </li>
        <li>
          <Link to="/useEffect">useEffect</Link>
        </li>
        <li>
          <Link to="/optimize">Optimization</Link>
        </li>
        <li>
          <Link to="/nested/get">Axios Get</Link>
        </li>
        <li>
          <Link to="/nested/post">Axios Post</Link>
        </li>
        <li>
          <Link to="/variable-route">Variable Route</Link>
        </li>
      </nav>
    </>
  )

  //   const [userList, setUserList] = useState([
  //     { name: "유저1", age: 24, gender: "남자", phone: "010-2732-2241" },
  //     { name: "유저2", age: 27, gender: "여자", phone: "010-2674-0093" },
  //     { name: "유저3", age: 30, gender: "남자", phone: "010-3784-2834" },
  //   ]);
  //   const [name, setName] = useState("");
  //   const [age, setAge] = useState("");
  //   const [gender, setGender] = useState("");
  //   const [phone, setPhone] = useState("");

  //   const registUser = () => {
  //     const user:{name:any, age:any, gender:any, phone:any} = { name, age, gender, phone };
  //     userList.push(user);
  //     setUserList([...userList]);
  //     setName("");
  //     setAge("");
  //     setGender("");
  //     setPhone("");
  //   };

  //   return (
  //     <div className="App">
  //       <h1>회원 정보 출력</h1>
  //       <hr></hr>
  //       <table className="member_tbl">
  //         <thead>
  //           <tr>
  //             <th>이름</th>
  //             <th>나이</th>
  //             <th>성별</th>
  //             <th>전화번호</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {userList.map((item, index) => {
  //             return <User key={"user" + index} item={item} />;
  //           })}
  //         </tbody>
  //       </table>
  //       <div className="regist-wrap">
  //         <h3>회원 정보 등록</h3>
  //         <hr></hr>
  //         <InputWrap text="이름" data={name} setData={setName} />
  //         <InputWrap text="나이" data={age} setData={setAge} />
  //         <InputWrap text="성별" data={gender} setData={setGender} />
  //         <InputWrap text="전화번호" data={phone} setData={setPhone} />
  //         <button onClick={registUser}>회원등록</button>
  //       </div>
  //     </div>
  //   );
  // }

  // const User = (props:any) => {
  //   const user = props.item;
  //   return (
  //     <tr>
  //       <td>{user.name}</td>
  //       <td>{user.age}</td>
  //       <td>{user.gender}</td>
  //       <td>{user.phone}</td>
  //     </tr>
  //   );
  // };

  // const InputWrap = (props:any) => {
  //   const text = props.text;
  //   const data = props.data;
  //   const setData = props.setData;
  //   const changeInputValue = (e:any) => {
  //     setData(e.target.value);
  //   };
  //   return (
  //     <div className="input_wrap">
  //       <label>{text}</label>
  //       <input type="text" value={data} onChange={changeInputValue} />
  //     </div>
  //   );
};

export default App