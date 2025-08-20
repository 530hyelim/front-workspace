import { Link } from "react-router-dom"

/*
    #components
     - 어플리케이션 전역에서 공용으로 사용되는 컴포넌트를 보관하는 폴더
       ex) Button, Header, input 기타 등등..
*/
const Header = () => {
    return (
    <header>
        <div id="header-container">
            <h1 style={{textAlign:"center"}}>Menu App</h1>
            <div className="navbar bg-light navbar-expand ">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/menus" className="nav-link">메뉴 전체 조회</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/menus/new" className="nav-link">메뉴 추가</Link>
                    </li>
                </ul>
            </div>
        </div>
    </header>)
}
export default Header