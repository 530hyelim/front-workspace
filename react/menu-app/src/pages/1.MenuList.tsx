import { useEffect, useState } from "react"
import type { Menu } from "../type/menu";
import { loadMenus } from "../api/menuApi";
import RadioGroup from "../components/RadioGroup";
import useInput from "../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MenuList() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const navigate = useNavigate();
    // #3. 메뉴 검색 기능
    const [searchKeyword, onChangeKeyword] = useInput({
        type : 'all',
        taste : 'all'
    });
    // #1. 게시글 불러오기
    //  - useEffect를 활용하여 컴포넌트가 마운트 될 때 1번만 로드되도록 설정
    useEffect(() => {
        /*
            #2. CORS 설정
             - 브라우저는 보안상 SOP 정책을 사용한다
             - SOP : 동일한 출처 (Origin)에서만 리소스 요청을 허용하는 정책
             - 출처(Origin) : 프로토콜 + ip주소 + 포트번호
             - 이 때 요청을 받는 서버측에서 현재 출처에 대한 요청을 허용하도록 CrossOrigin 속성을
               추가해줘야 한다.
        */
        loadMenus(searchKeyword).then(response => {
            setMenus(response.data);
        });
        //handleSearchMenus();
    }, []);
    const handleSearchMenus = () => {
        // loadMenus(searchKeyword).then(response => {
        //     setMenus(response.data);
        // });
        axios.get("http://localhost:8081/api/menus", {
            params : searchKeyword
        }).then(res => setMenus(res.data));
    };
    return (
        <>
            <div className="menu-test">
                <h4>전체 메뉴 조회(Get)</h4>
            </div>
            <div className="form-check form-check-inline">
                <RadioGroup id="get-no-type" value="all" name="type"
                    checked={searchKeyword.type === 'all'} onChange={onChangeKeyword} label="모두" />
                <RadioGroup id="get-kr" value="kr" name="type"
                    checked={searchKeyword.type === 'kr'} onChange={onChangeKeyword} label="한식" />
                <RadioGroup id="get-jp" value="jp" name="type"
                    checked={searchKeyword.type === 'jp'} onChange={onChangeKeyword} label="일식" />
                <RadioGroup id="get-ch" value="ch" name="type"
                    checked={searchKeyword.type === 'ch'} onChange={onChangeKeyword} label="중식" />
            </div>
            <div className="form-check form-check-inline">
                <RadioGroup id="get-no-taste" value="all" name="taste"
                    checked={searchKeyword.taste === 'all'} onChange={onChangeKeyword} label="모두" />
                <RadioGroup id="get-mild" value="mild" name="taste"
                    checked={searchKeyword.taste === 'mild'} onChange={onChangeKeyword} label="순한맛" />
                <RadioGroup id="get-hot" value="hot" name="taste"
                    checked={searchKeyword.taste === 'hot'} onChange={onChangeKeyword} label="매운맛" />
            </div>
            <input type="button"
                className="btn btn-block btn-outline-success btn-send"
                onClick={handleSearchMenus}
                value="검색"
            />
            <div className="result" id="menus-result">
                <table className="table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>음식점</th>
                            <th>메뉴</th>
                            <th>가격</th>
                            <th>타입</th>
                            <th>맛</th>
                            <th>버튼</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menus && menus.map(menu => {
                                return (
                                    <tr key={menu.id} onClick={() => navigate(`/menus/${menu.id}`)}>
                                        <td>{menu.id}</td>
                                        <td>{menu.restaurant}</td>
                                        <td>{menu.name}</td>
                                        <td>{menu.price}</td>
                                        <td>{menu.type}</td>
                                        <td>{menu.taste}</td>
                                        <td>
                                            <button className="btn" onClick={
                                                (e) => {
                                                    e.stopPropagation();
                                                    // 상위요소로의 이벤트 전파 방지
                                                    navigate(`/menus/${menu.id}/edit`);
                                                }
                                            }>수정</button>
                                            <button className="btn">삭제</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}