import './Common.css'
import Footer from './Footer'
import Header from './Header'
/*
    #1. 일반 CSS
     - 전통적인 방식의 CSS로 파일 하나에 모든 컴포넌트에서 사용할 전역 스타일을 작성한다.
     - 모든 컴포넌트에서 동일한 클래스명에 스타일이 부여되기 때문에 스타일 충돌 위험이 높다.
     - 따라서 모든 컴포넌트에서 똑같이 사용하는 BODY 태그의 스타일, 폰트 등만 작성한다.

    #2. CSS Module
     - 컴포넌트 단위로 스타일을 작성할 수 있도록 도와주는 방식
     - 컴파일 단계에서 클래스명이 "고유한 이름"으로 변환되어, 컴포넌트끼리 클래스명이 충돌하지 않는다.
     - 대규모 프로젝트에서 유용한 스타일링 방식
     - <사용법>
       - import 변수명 from '모듈css경로'
       - className={변수명.클래스명}
*/
function ModuleCSS() {
    return (
        <div className="container">
            <h1 className="title">일반 css와 모듈 css</h1>
            <Header/>
            <Footer/>
        </div>
    )
}
export default ModuleCSS