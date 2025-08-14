import { useState } from 'react';
import { boardList } from './boardMockup';  
import BoardList from './2.BoardList';
import BoardRegister from './2.BoardInsert';
import BoardSearch from './2.BoardSearch';

function BoardContainer(){
  // #1. state선언
  // - BoardList, BoardRegister, BoardSearch의 매개변수를 확인하여 필요한 state를
  //   선언하세요.
  // - 사용할데이터의 초기값은 boardMockUp의 boardList를 사용하세요.

  // #2. props구현
  //  - props문법을 통해 컴포넌트들에 필요한 데이터를 전달하세요.
  //  - 각 컴포넌트의 필요한 데이터는 아래 문제들을 확인하여 파악하세요.
  let [list, setList] = useState(boardList);
  return(
    <div>
      <BoardList list={list} setList={setList}/>
      <BoardRegister list={list} setList={setList}/>
      <BoardSearch list={list}/>
    </div>
  )
}

export default BoardContainer;