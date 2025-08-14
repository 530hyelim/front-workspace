import React, { useState } from 'react';
import { boardList } from './boardMockup';

function BoardRegister({ list, setList }: { list: typeof boardList, setList: React.Dispatch<React.SetStateAction<typeof boardList>> }) {
    // #1. 게시글 입력 상태 관리 state
    //  - 실시간으로 게시글 입력상태를 보관하는 state를 선언하세요.
    //  - 게시글입력상태의 속성으로는 무엇이 필요할지 생각하고 , 불필요한 속성은 없도록 하세요.
    const [board, setBoard] = useState({ 
        boardTitle: '', 
        boardWriter: '', 
        boardContent: ''
    });

    // #2. 게시글 입력 상태 관리 함수
    //  - 사용자가 입력하는 데이터를 실시간으로 게시글 입력 상태state에 저장하는 함수를 작성하세요.
    //  - 이 함수를 제목,작성자,글내용의 changeEvent에 바인딩하세요.  
    //  - 이 함수를 Input태그에 바인딩할때의 event객체는 React.ChangeEvent<HTMLInputElement>
    //    이며, TextArea에 바인딩할때의 event객체는 React.ChangeEvent<HTMLTextAreaElement> 입니다.
    const onInputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBoard(
            // (prev) => {
            //     return { ...prev, [name]: value };
            // }
            {...board, [name]: value}
        )
    };

    // #3. 게시글 등록 함수
    //  - 제목, 작성자, 내용중 하나라도 입력하지 않으면 등록이 불가능해야합니다.
    //  - 게시글번호는 이전 게시글배열의 값들 중 가장큰 값에서 +1해주세요.
    //  - 게시글 날짜는 formatDate함수를 사용하여 현재시간이 등록되도록 해주세요.
    //  - 게시글 등록 후 BoardList컴포넌트에 등록한 게시글정보가 추가되도록 해주세요.
    //  - 게시글 등록 후 입력 값이 ''로 초기화되도록 해주세요.
    const onRegisterHandler = () => {
        //if (board.boardTitle.trim() == '' || board.boardWriter.trim() == '' || board.boardContent.trim() == '') {
        // js falsy한 값 불린형변환 덕분
        if (!board.boardTitle || !board.boardWriter || !board.boardContent) {
            alert("제목, 작성자, 내용 중 하나라도 입력하지 않으면 등록이 불가능합니다");
            return;
        }
        const newBoard = {
            ...board,
            boardNo: Math.max(...list.map( (b) => b.boardNo )) + 1,
            // boardTitle: board.boardTitle,
            // boardContent: board.boardContent,
            // boardWriter: board.boardWriter,
            boardDate: formatDate(new Date())
        };
        setList([...list, newBoard]);
        setBoard({ boardTitle: '', boardWriter: '', boardContent: ''});
        // batch 업데이트. 업데이트 할 내용을 모아두었다가 한번에 업데이트 (효율적인 렌더링)
    };

    // 날짜 포맷팅 함수
    const formatDate = (date: Date): string => {
        const pad = (n: number) => n.toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // 월은 0부터 시작
        const day = pad(date.getDate());

        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <>
            <div>
                <h2>실습문제 3 : 게시판 등록</h2>
                <table className='enroll-table'>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <td colSpan={3}>
                                <input type='text' name='boardTitle' value={board.boardTitle} onChange={onInputHandler} />
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td colSpan={3}>
                                <input type='text' name='boardWriter' value={board.boardWriter} onChange={onInputHandler} />
                            </td>
                        </tr>
                        <tr>
                            <th>글내용</th>
                            <td colSpan={3} style={{ height: "200px" }}>
                                <textarea name='boardContent' value={board.boardContent} onChange={onInputHandler}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={4}><button onClick={onRegisterHandler}>등록</button></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    );
}

export default BoardRegister;