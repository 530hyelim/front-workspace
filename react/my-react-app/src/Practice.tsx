import './App.css'
import UserInfoContainer from './practice/1.PropsPractice'

function Practice() {
    return (
        <>
            <div className="App">
                <div className='header'>
                    <h1 style={{ fontWeight: "bolder" }}>KH G CLASS</h1>
                </div>
                {/* 여기 아래에 실습문제들 추가. */}
                <UserInfoContainer />
            </div>
        </>
    )
}

export default Practice