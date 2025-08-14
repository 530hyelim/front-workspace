import './App.css'
import UserInfoContainer from './practice/1.PropsPractice'
import BoardContainer from './practice/2.BoardContainer'
import ModuleCssPractice from './practice/3.CssStyling'

function Practice() {
    return (
        <>
            <div className="App">
                <div className='header'>
                    <h1 style={{ fontWeight: "bolder" }}>KH G CLASS</h1>
                </div>
                {/* 여기 아래에 실습문제들 추가. */}
                {/* <UserInfoContainer /> */}
                {/* <BoardContainer/> */}
                <ModuleCssPractice/>
            </div>
        </>
    )
}

export default Practice