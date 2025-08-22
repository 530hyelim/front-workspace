import { useEffect, type FormEvent } from "react";
import RadioGroup from "../components/RadioGroup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { initMenu, type Menu, type MenuUpdate } from "../type/menu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../hooks/useInput";

const MenuEdit = () => {
    // #1. 메뉴 수정 기능 구현   
    // 요구사항
    const {id} = useParams();
    const navigate = useNavigate();
    // 1. 현재 메뉴 정보에 맞는 데이터를 서버에서 읽어온 후 , 폼에 바인딩한다.(useEffect+useQuery 사용)
    const {data, isLoading, isError, error} = useQuery<Menu>({
        queryKey : ['menu', id],
        queryFn : () => axios.get("http://localhost:8081/api/menus/" + id).then(res => res.data),
        staleTime : 1000 * 60
    });
    // 2. 읽어온 데이터가 없는 경우 목록 페이지로 이동시키고 "존재하지 않는 메뉴입니다." 메세지를 출력한다. 
    if (isError) {
        navigate("/menus", {state: {flash: '존재하지 않는 메뉴입니다.'}});
        return;
    }
    // 3. useInput훅을 사용하여 폼상태를 관리한다.
    const [menu, handleInputChange, resetMenu, setMenus] = useInput<MenuUpdate>(initMenu);
    useEffect(() => {
        if (data) {
            setMenus(data);
        }
    },[data]);
    // 5. 유효성 검사 통과시 서버에 수정요청을 보낸다(useMutation 사용)
    // 6. 수정 완료 후 상세 페이지로 이동시키고, 수정완료 메세지를 출력한다.
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn : (menu:MenuUpdate) => axios.put("http://localhost:8081/api/menus/"+id, menu),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ['menu', id]});
            queryClient.invalidateQueries({queryKey : ['menus']});
            navigate(`/menus/${id}`, {state:{flash:'메뉴 수정이 완료되었습니다.'}});
        }
    });
    // 4. 수정 버튼 클릭시 다음 내용에 대한 유효성 검사를 진행한다.
    //    - 모든 필드는 반드시 입력되어야 한다. 
    //    - price는 0이상 이어야 한다.
    //    - 유효성 검사 실패시 경고창(alert)을 통해 경고 메세지를 출력한다.
    const updateMenu = (e:FormEvent) => {
        e.preventDefault();
        // 유효성 검사
        if (menu.restaurant == '' || menu.name == '') {
            alert('모든 필드를 입력하시요');
            return;
        }
        mutation.mutate(menu);
    }
    // 7. 중복 제출을 방지하기 위해 제출이 진행되는 동안은 버튼을 비활성화 시킨다.
    // 8. 제출이 진행되는 동안은 로딩 상태를 표시한다.
    //    - <div>Loading...</div>
    if (mutation.isPending) {
        return <div>제출중...</div>
    }
    // 9. 수정 실패시 에러 메세지를 출력한다.
    //    - <div className="alert alert-danger">에러메세지</div>  
    if (mutation.isError) {
        return <div className="alert alert-danger">{mutation.error.message}</div>
    }
    /*
    const {id} = useParams();
    const navigate = useNavigate();
    const {data, isLoading, isError, error} = useQuery<Menu>({
        queryKey : ['menu', id],
        queryFn : () => 
            axios.get(`http://localhost:8081/api/menus/${id}`)
            .then(res => res.data)
            .catch(err => navigate('/menus', {
                state : {flash : "존재하지 않는 메뉴입니다."}
            })),
        staleTime : 1000 * 60,
        gcTime : 1000 * 60 * 5,
        enabled : true
    });
    const [menu, handleInputChange] = useInput<Menu>(data ?? initMenu);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn : (newMenu:Menu) => axios.put("http://localhost:8081/api/menus/" + id, newMenu),
        onSuccess : (res) => {
            queryClient.invalidateQueries({queryKey:['menus']});
            queryClient.invalidateQueries({queryKey:['menu', id]}); // readonly unknown 배열이라 자료형 맞아야 함
            navigate(`/menus/${id}`, {
                state : {flash : "수정완료"}
            });
        }
    });
    const updateMenu = (e:FormEvent) => {
        e.preventDefault();
        if (menu.restaurant == '' || menu.name == '') {
            alert('모든 필드를 입력하세요.');
            return;
        }
        if (menu.price < 0) {
            alert('가격은 0원 이상이어야 합니다.');
            return;
        }
        mutation.mutate(menu);
    };
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div className="alert alert-danger">{error.message}</div>
    */
    return (
        <>
            <div className="menu-test">
                <h4>메뉴 수정하기(PUT)</h4>
                <form id="menuEnrollFrm" onSubmit={updateMenu} >
                    <input type="text" name="restaurant" value={menu.restaurant} onChange={handleInputChange} className="form-control" />
                    <input type="text" name="name" value={menu.name} onChange={handleInputChange} className="form-control" />
                    <input type="number" name="price" value={menu.price} onChange={handleInputChange} className="form-control" />
                    <div className="form-check form-check-inline">
                        <RadioGroup id="get-kr" value="kr" name="type" checked={menu.type === 'kr'} onChange={handleInputChange} label="한식" />
                        <RadioGroup id="get-ch" value="ch" name="type" checked={menu.type === 'ch'} onChange={handleInputChange} label="중식" />
                        <RadioGroup id="get-jp" value="jp" name="type" checked={menu.type === 'jp'} onChange={handleInputChange} label="일식" />
                    </div>
                    <div className="form-check form-check-inline">
                        <RadioGroup id="get-hot" value="hot" name="taste" checked={menu.taste === 'hot'} onChange={handleInputChange} label="매운맛" />
                        <RadioGroup id="get-mild" value="mild" name="taste" checked={menu.taste === 'mild'} onChange={handleInputChange} label="순한맛" />
                    </div>
                    <br />
                    <input type="submit" className="btn btn-block btn-outline-success btn-send" value="수정" disabled={mutation.isPending}/>
                </form>
            </div>
        </>
    )
}
export default MenuEdit;