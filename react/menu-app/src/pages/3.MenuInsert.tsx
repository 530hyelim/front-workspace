import { useNavigate } from "react-router-dom";
import RadioGroup from "../components/RadioGroup";
import useInput from "../hooks/useInput";
import { initMenu, type MenuCreate } from "../type/menu";
import type { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function MenuInput() {
    // #1. 메뉴 등록 기능
    const [newMenus, handleInputChange] = useInput<MenuCreate>(initMenu);
    const navigate = useNavigate();
    /*
        #2. useMutation
         - 데이터 생성/수정/삭제 시 사용하는 훅 함수로 데이터 변경 작업을 처리한다.
         - useQuery 처럼 자동 캐싱 기능이 존재하지 않으며, 호출 시점에서 1회 실행된다.
         - 요청을 보낸 후 요청 상태(loading, error, success)를 관리할 수 있으며,
           요청 성공 시 캐시 데이터를 무효화(invalidate)시켜 관련 데이터를 refetch한다.
           (useQuery를 통해 queryClient 전역 캐시 메모리에 저장된 캐시 데이터 무효화)

        [사용법]
        const queryClient = useQueryClient(); 전역 캐시관리 객체(쿼리 무효화에 사용한다)
        메인에서 생성된 객체 그대로 가져온다.
        const mutation = useMutation({
            mutationFn : 서버와 통신 할 비동기 함수,
            onSuccess : 성공 시 실행되는 콜백 함수 정의
            onError : 실패 시 실행되는 콜백 함수
            onSettled : 항상 실행되는 콜백 함수
        });

        [반환값]
        - mutate : 요청을 실행하는 함수
        - isPending : 실행중 상태 값
        - isError : 에러 여부
        - isSuccess : 성공 여부
        - error : 에러 객체
        - data : 성공 시 반환 된 데이터 (리스폰스 엔티티 제네릭 보이드라서 불필요)
    */
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn : (newMenu:MenuCreate) => axios.post("http://localhost:8081/api/menus", newMenu),
        onSuccess : (res) => {
            // 등록 요청 성공 시
            queryClient.invalidateQueries({queryKey:['menus']}); // 메뉴 목록 데이터 캐시 무효화
            // 리디렉션(서버에서 location을 지정해 주었으면 해당 경로로, 아니면 목록으로 이동)
            // 컨트롤러 CrossOrigin 어노테이션에 요청헤더 expose 되게 설정해주어야 함
            const loc = res.headers['location'];
            navigate(loc ?? '/menus', {
                state : {flash : "메뉴가 등록되었습니다."}
            });
        }
    });
    const insertMenu = (e:FormEvent) => {
        // 제출 대상은 현재 서버가 아니라 api 서버로 요청보내야 하기 때문에 제출 방지
        e.preventDefault(); 
        // 유효성 검사
        if (newMenus.restaurant == '' || newMenus.name == '') {
            alert('모든 필드를 입력하세요.');
            return;
        }
        if (newMenus.price < 0) {
            alert('가격은 0원 이상이어야 합니다.');
            return;
        }
        // type, taste에 대한 검사 + 권한 체크는 생략
        mutation.mutate(newMenus); // 비동기 함수 실행
    };
    if (mutation.isPending) {
        return <div>Loading...</div>
    }
    if (mutation.isError) {
        return <div className="alert alert-danger">{mutation.error.message}</div>
    }
    return (
        <div className="menu-test">
            <h4>메뉴 등록하기(POST)</h4>
            <form id="menuEnrollFrm" onSubmit={insertMenu} >
                <input type="text" name="restaurant" placeholder="음식점" className="form-control" onChange={handleInputChange} />
                <input type="text" name="name" placeholder="메뉴" className="form-control" onChange={handleInputChange} />
                <input type="number" name="price" placeholder="가격" className="form-control" onChange={handleInputChange} />
                <div className="form-check form-check-inline">
                    <RadioGroup id="get-kr" value="kr" name="type" checked={newMenus.type == 'kr'} onChange={handleInputChange} label="한식" />
                    <RadioGroup id="get-ch" value="ch" name="type" checked={newMenus.type == 'ch'} onChange={handleInputChange} label="중식" />
                    <RadioGroup id="get-jp" value="jp" name="type" checked={newMenus.type == 'jp'} onChange={handleInputChange} label="일식" />
                </div>
                <div className="form-check form-check-inline">
                    <RadioGroup id="get-hot" value="hot" name="taste" checked={newMenus.taste == 'hot'} onChange={handleInputChange} label="매운맛" />
                    <RadioGroup id="get-mild" value="mild" name="taste" checked={newMenus.taste == 'mild'} onChange={handleInputChange} label="순한맛" />
                </div>
                <br />
                <input type="submit" className="btn btn-block btn-outline-success btn-send" value="등록" disabled={mutation.isPending} />
                {/* 무의미한 재 요청을 막기 위해 disabled 값을 변경해서 버튼 클릭을 비활성화 */}
            </form>
        </div>
    )
}