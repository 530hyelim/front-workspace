/*
    1. 화살표 함수
     - 함수를 간결하게 표기하는 방법
     - function 키워드 없이 (매개변수) => 본문 으로 작성한다
     - 일반함수와 this 바인딩 방식이 다르다.
*/

function declareFn(a, b) {
    return a * b;
}

// 화살표 함수
const declareFn1 = (a, b) => {return a * b};
const declareFn2 = (a, b) => a * b;
const declareFn3 = a => a * 1;

// 2. this 바인딩
// - this는 모든 함수에 묵시적으로 존재하는 예약어
// - 함수를 호출한 객체의 주소값이 바인딩 되도록 설계되어 있다.
// (일반 함수에 대한 설명!!)
function callableFn() {
    console.log(this);
}
callableFn(); // global (node js에서는 window가 아니라 global이 전역객체)

const obj1 = {
    name : "객체 1",
    callableFn : callableFn // 두 속성명이 같을 경우 생략 가능
}
obj1.callableFn();

// 3. 화살표 함수의 this
// - 화살표 함수는 자신만의 this를 가질 수 없도록 설계되어 있다 (코드의 결과 예측을 위함)
// - 화살표 함수는 선언된 위치의 상위 스코프의 this를 그대로 참조하여 사용
const arrowFn = () => {console.log(this)}; // global의 this : {}
arrowFn();
// 컴파일하고 글로벌 저장소에 저장하는데 그 때 this값이 global내부의 this값 또는 window로 고정됨

const obj2 = {
    name : "객체 2",
    arrowFn : arrowFn
}
obj2.arrowFn();

const obj3 = {
    name : "객체 3",
    arrowFn : function() {
        console.log(this.name);
        const getName = () => {
            return this.name; // arrowFn을 사용하는 obj3의 객체가 this에 바인딩
        }
        const getName2 = function() {
            return this.name;
        }
        console.log(getName());
        console.log(getName2()); // 함수를 호출한 주체가 없어서 global의 name값
    }
}
obj3.arrowFn();

/*
    4. 일반함수 vs. 화살표 함수
    1) 화살표 함수를 사용하는게 적합한 경우
    - this가 필요 없는 함수를 간결하게 표현하고자 할 때
    - 상위 스코프의 this를 그대로 유지해야 하는 콜백함수 사용 시
*/
function Timer() { // 생성자 함수
    this.seconds = 0;
    setInterval(() => {
        this.seconds++;
        console.log(this.seconds);
    }, 1000);
}
new Timer();

/*
    2) 일반함수를 사용하는게 적합한 경우
    - this가 동적으로 바인딩되어야 하는 경우 (객체의 메서드나 생성자 함수)
    - this를 현재 호출한 주체로부터 가져와야 하는 경우
*/
const counter = {
    count : 0,
    increase : function() {
        this.count++;
        console.log(this.count);
        // 화살표 함수로 바꾸면 global의 count 필드를 ++하려고 하니까 NaN
    }
}
counter.increase();

const Timer2 = () => {
    this.seconds = 0;
    setInterval(() => {
        this.seconds++;
        console.log(this.seconds);
    }, 1000);
}

// 5. 일반함수의 정적 this 바인딩 (ES5에서 화살표함수 못쓸때 사용가능)
const user = {
    name : 'goofy',
    printName : function() {
        console.log("my name is " + this.name);
    }
}
user.printName();

// 1) call(thisargs, ...args)
// - 함수의 this를 첫 번째 인자인 thisargs로 변경한 후 호출
user.printName.call({name: 'Donald Duck'});

// 2) apply(thisargs, [args])
// - call과 동일하지만, 두 번째 인자를 배열로 받음
function printName(greeting, target) {
    console.log(`${greeting}, ${this.name} and ${target}`);
}
printName.apply({name: 'mkm'}, ['Hello', 'Mr. Min']);

// 3) bind(thisargs)
// - 함수를 실행하지 않고, this가 바인딩 된 새로운 함수를 반환
// - 함수의 this값을 미리 바인딩 해둬야 하는 경우 사용
const bindFn = user.printName.bind({name: 'Rubber Duck'});
bindFn();