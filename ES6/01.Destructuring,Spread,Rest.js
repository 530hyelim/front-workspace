/*
    1. Destructuring(비구조화) 문법
    비구조화할당. 구조분해할당.
     - 객체나 배열의 내부 구조를 분해하여 각각의 값을 변수에 쉽게 할당하는 문법
     - 주로 변수 선언 시 많이 사용되며, 함수의 매개변수에서도 사용
*/
const arr = [1,2,3];
const a = arr[0];
const b = arr[1];
const c = arr.length;

// 배열 비구조화 문법
// 배열의 인덱스 순서에 맞게 변수를 준비해두면, 각 배열에 담긴 값이 순서에 맞춰서 저장
const [d,e,f,g] = arr;
console.log(d,e,f,g);

// 객체 비구조화 문법
const obj = {
    foo : 1, bao : 2
};
//const foo = obj.foo;
//const bao = obj["bao"];
const {foo, bao="z", option=""} = obj; // 기본값설정. 함수의 매개변수에 하듯 배열에서도 가능
console.log(foo, bao, option); // option에는 undefined
// option : obj에 속성이 존재 할수도있고 없을수도 있는 경우에 사용
// 객체의 속성명과 동일한 변수에 객체의 속성값을 할당

// 2. Spread Operator
// - 배열이나 객체에 담겨있는 값들을 꺼내어 전개해주는 연산자
// - 배열 및 객체에 값을 대입하는 경우, 함수 호출 시 자주 사용
const arr2 = [1,2,3,4];
console.log(...arr2); // ... 전개연산자

// spread 연산자를 활용한 배열/객체 (깊은)복사
const copy_arr = [0, ...arr2, 5]; // [0,1,2,3,4,5]
console.log(copy_arr);

// 객체 전개
const person = {name : 'hyelim', job : 'student'};
const hyelim = {...person, location : 'seoul'};
//console.log(...hyelim); 런타임에러. 객체전개 시 사용위치 주의

// 3. Rest Parameter
// - 함수 선언 및 비구조화 문법에서 나머지 값들을 하나로 모아주는 역할
function testRest(first, ...rest) { // rest는 항상 배열 형태로. 하나여도 배열. 없어도 빈배열
    console.log(first);
    console.log(rest);
}
testRest('g','o','o','f','y');
testRest(...arr2);

// 비구조화 할당과 Rest Parameter
function testRest2({name, age, ...rest}){ // 변수명 rest 아니여도 됨
    console.log(name, age, rest); // 여기서 rest는 항상 객체. 비구조화 할당 문법과 함께 사용해야됨
}
const person2 = {name: 'hyelim', age: 27, hobby: ['game', 'movie'], location: 'seoul'};
testRest2(person2);

// 비구조화 할당과 Rest Parameter (배열데이터)
const array3 = [1,2,3,4];
const [first, ...rest] = array3;

const {age, ...rest2} = person2;
console.log(age, rest2);