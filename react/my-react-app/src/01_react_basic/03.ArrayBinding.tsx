import { useState } from "react"

function ArrayDataBinding() {
    // 백엔드 서버에서 전달해준 배열 데이터라고 가정
    const [fruits, setFruits] = useState([{id:1, name:'apple'}, {id:2, name:'banana'}, {id:3, name:'cherry'}]);
    const addFruits = () => {
        // 배열에 데이터를 추가. 데이터 추가시 화면에 렌더링이 되어야 한다.
        //fruits.push({id:4, name:'orange'});
        //setFruits([...fruits]);
        const nextId = Math.max(...fruits.map((fruit) => fruit.id)) + 1;
        const newFruit = {id:nextId, name:'orange'};
        setFruits([...fruits, newFruit]);
    }
    const deleteFruit = (id:number) => {
        // 전달한 id값과 일치하는 요소를 삭제하는 기능
        // filter() : 배열 내부 요소에 대하여 조건에 맞는 요소만 남긴 새로운 배열을 반환하는 함수
        setFruits(fruits.filter((fruit) => fruit.id !== id));
    }
    const sortFruits = () => {
        // 객체 배열일 경우 정렬 기준을 정해주어야 함
        // id기준 역순정렬
        // sort 메서드는 원본배열에 영향을 끼치기 때문에 위험함
        // push sort splice 등 원본 상태값에 영향을 끼치는 메서드 사용시 깊은복사 필수
        //const sortedFruit = fruits.sort( (a,b) => b.id - a.id );
        const sortedFruit = [...fruits].sort( (a,b) => b.id - a.id );
        setFruits(sortedFruit);
    }
    return (
        <div>
            <h1>ArrayDataBinding</h1>
            <h2>FruitList</h2>
            <ul>
                {/* 
                    1. 배열데이터 바인딩
                    map()
                     - 배열의 각 요소에 대해 함수를 호출하여 새로운 요소를 만들어 반환하는 함수
                     - 리액드에서는 배열의 각 요소를 map함수를 호출하여 JSX요소로 변경 후 바인딩
                     - JSX에서는 for, if, while과 같은 예약어를 사용할 수 없기 때문에 함수를 이용하여 바인딩한다.
                     - {중괄호 안에서는 값만 기술할 수 있고, 그 값을 얻어내기 위해서 함수를 호출할 수 있다}
                */}
                {
                    fruits.map( (fruit) => (
                        /*
                            key
                             - 배열의 요소를 식별하는 유니크 값
                             - key값을 추가하면 리액트가 요소를 추적하여 변화를 감지할 수 있다
                             - 효율적인 렌더링을 위해 필수로 추가해야함
                        */
                        <li key={fruit.id}>{fruit.id} - {fruit.name}
                            <button onClick={() => deleteFruit(fruit.id)}>삭제</button>
                        </li>
                    ))
                }
            </ul>
            <button onClick={addFruits}>추가</button>
            <button onClick={sortFruits}>정렬</button>
        </div>
    )
}
export default ArrayDataBinding