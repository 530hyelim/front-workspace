/*
    <Rules>
    #1. 컴포넌트의 이름은 "대문자"로 시작한다.
     - 리액트는 렌더링할 요소가 소문자로 시작하는 경우 html 태그로, 대문자로 시작하는 태그는
       리액트 컴포넌트로 인식
*/
function Component() {
    /*
        #2. [함수형] 컴포넌트는 반드시 1개의 JSX요소를 반환해야 한다.
         - 여러 태그를 동시에 반환하고자 한다면 <></>로 감싸준다.
           JSX? javascript XML. js 코드안에서 html 태그를 사용하여 ui를 구성할 수 있도록
           도와주는 문법. 리액트에서만 사용 가능
           부모 기준으로 1개. 여러개의 부모요소들을 사용해야하면 React.Fragments로 한 번 더 감싸준다.
           실제 렌더링 시에는 추가 안 됨.
        #3. return되는 요소는 ()로 감싸준다. 없으면 return 뒤의 공백을 반환하게 됨.
            또는 JSX 요소를 return 바로 뒤에오게 올려줘야함
    */
    return (
        <>
            {/* <div>
                <h1>Hello Kitty</h1>
            </div> */}
            <Header/>
            <hr/>
            <Footer/>
        </>
    )
}
function Header() {
    const title = "Hello Kitty";
    const style = {color:'white',backgroundColor:'black'};
    return (
        /*
            #4. 모든 요소는 반드시 "닫아"줘야한다.
             - <img>, <input>등 종료태그가 존재하지 않는 태그도 닫아줘야한다.
            #5. JSX 문법에서 자바스크립트 변수를 사용 시 {}를 이용한다.
            #6. style 속성값은 "객체"로 작성하여 {}로 바인딩한다.
        */
        <header style={style}>
            <img src="/vite.svg"/>
            <h1>{title}</h1>
        </header>
    )
}
import './01.Component.css'
function Footer() {
    /*
        #8. 이벤트 속성은 CamelCase로 작성한다.
         - html => onclick="함수()"
         - jsx => onClick={함수}
         - 값으로는 함수를 호출하지 않고, 함수 자체를 바인딩
    */
    const clickHandler = function() {
        console.log("만져주셔서 감사합ㄴ디ㅏ.");
    }
    return (
        // #7. 클래스 속성은 className으로 작성한다.
        //  - JSX 문법 내부에서 class는 class 생성 예약어를 의미
        <footer className="footer">
            <button onClick={clickHandler}>저를 만져주세요..</button>
        </footer>
    )
}
export default Component;