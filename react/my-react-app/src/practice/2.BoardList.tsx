import React from 'react';
import { boardList } from './boardMockup';

function BoardList({ list, setList }: { list: typeof boardList, setList: React.Dispatch<React.SetStateAction<typeof boardList>> }) {
    // #3. 정렬 함수 구현
    // - 작성일 기준 오름차순/내림차순 해주는 함수를 구현하세요.
    const sortByDateAsc = () => {
        setList([...list].sort( (boardA, boardB) => 
            new Date(boardA.boardDate).getTime() - new Date(boardB.boardDate).getTime()));
    };
    const sortByDateDesc = () => {
        setList([...list].sort( (boardA, boardB) => 
            boardB.boardDate.localeCompare(boardA.boardDate)));
    };

    // #2. 삭제함수 구현
    //  - 게시글 번호를 인자로 받아 게시글을 삭제하는 함수를 구현하세요.
    const boardDelete = (boardNo:number) => {
        setList(list.filter( (board) => board.boardNo !== boardNo ));
    };

    return (
        <div>
            <h2>실습문제 2 : 게시판 목록</h2>
            <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={sortByDateAsc}>작성일 오름차순 정렬</button>
                    <button onClick={sortByDateDesc}>작성일 내림차순 정렬</button>
                </div>
            </div>
            <table className='list-table'>
                <thead>
                    <tr >
                        <th style={{ width: "10%" }}>번호</th>
                        <th style={{ width: "40%" }}>제목</th>
                        <th style={{ width: "20%" }}>작성자</th>
                        <th style={{ width: "20%" }}>작성일</th>
                        <th style={{ width: "10%" }}>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // #1 데이터 바인딩.  
                        //  - props로 전달받은 배열데이터를 바인딩하세요
                        //  - 구현 화면은 아래이미지를 참고하세요.(완벽히 똑같지 않아도 ok)
                        //  - 렌더링 성능향상을 위해 key값을 설정하세요
                        list != null && list.map((board) => (
                            <tr key={board.boardNo}>
                                <td>{board.boardNo}</td>
                                <td>{board.boardTitle}</td>
                                <td>{board.boardWriter}</td>
                                <td>{board.boardDate}</td>
                                <td><button onClick={() => boardDelete(board.boardNo)}>삭제</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default BoardList;