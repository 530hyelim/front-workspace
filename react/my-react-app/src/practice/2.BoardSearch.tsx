import { useRef, useState } from 'react';
import { boardList } from './boardMockup';

function BoardSearch({ list }: { list: typeof boardList }) {
    // - 검색어가 있으면 검색어를 포함한 게시글만 필터링하여 검색결과에 표시하세요.
    // - 검색어가 없으면 검색결과 없음을 표시하며 이 때 조건부 렌더링을 사용하세요.

    // #1. 검색어 관리
    //  - useState나 useRef를 활용하여 검색어를 관리하는 변수를 선언하세요. 
    //  - 단, 뭐가 더 효율적인지 생각한 후 작업하세요.
    const keywordRef = useRef<HTMLInputElement>(null);

    // #2. 검색결과 저장용 state 선언
    //  - 검색결과를 저장할 state를 선언하세요.
    //  - 이 state의 초기값은 null로 지정하세요(검색결과 없음을 의미)
    //  - 이 state는 검색결과가 있는경우 typeof boardList 타입이며, 검색결과가 없는 경우 
    //    null타입을 가지는 UnionType입니다.
    const [result, setResult] = useState<typeof boardList | null>(null);

    // #3. 검색함수 작성
    // - 이 함수는props로 전달받은 list의 데이터를 바탕으로, 게시글 제목에 검색어가 포함된
    //    게시글정보만 필터링합니다 
    // - 필터링 결과는 2번 검색결과 저장용 state의 state변경함수를 통하여 저장합니다.
    // - 검색결과가 존재하지 않거나, 입력한 검색어가 비어있는 경우 null값을 저장합니다.
    const onSearchHandler = () => {
        const keyword = keywordRef.current?.value;
        if (!keyword) {
            setResult(null);
            return;
        }
        const found = list.filter( (board) => board.boardTitle.includes(keyword) );
        setResult(found);
    };

    // #4. 
    return (
        <>
            <div>
                <h2>실습문제 4 : 게시판 검색</h2>
                <input ref={keywordRef} type="text" placeholder="검색어를 입력하세요." />
                <button onClick={onSearchHandler}>검색</button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h3>검색 결과</h3>
                {
                    // #4 데이터 바인딩.  
                    // - result가 null이 아니고, 길이가 0보다 큰경우 result값을 바인딩하세요.
                    // - result가 null인 경우, 검색결과가 없습니다가 표시되도록 조건부 랜더링하세요.
                    // - 구현 화면은 아래이미지를 참고하세요.(완벽히 똑같지 않아도 ok)
                    // - 렌더링 성능향상을 위해 key값을 설정하세요
                    (result && result.length > 0) ? 
                        result.map( (found) => (
                            <ul key={found.boardNo}>
                                <li><b>번호:</b> {found.boardNo}</li>
                                <li><b>제목:</b> {found.boardTitle}</li>
                                <li><b>작성자:</b> {found.boardWriter}</li>
                                <li><b>작성일:</b> {found.boardDate}</li>
                            </ul>
                        )) : <p>검색결과가 없습니다.</p>
                }
            </div>
        </>
    );
}

export default BoardSearch;