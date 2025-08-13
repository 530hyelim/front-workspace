// ES Module 표준모델시스템
function sayHi() {
    console.log('hello module');
}
const abc = "abcde";

export {sayHi};
export {abc};
export const fn1 = (a) => console.log(a);

// default 문법
export default abc;
// export default fn1;
// 모듈 단위로 단 하나의 값만 가능