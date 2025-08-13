let animal:string[], human:{name:string, age:number, height:number, married:boolean};
animal = ['panda','cat','wombat','frog','hamster'];
human = {name : 'mkm', age : 25, height: 180.5, married : false}

let zoo:{animals:string[], total:number, isClosed:boolean, location:string, masterInfo:{name:string, age:number, height:number}};
zoo = {
    animals : ['panda','cat','wombat','frog','hamster'],
    total   : 120,
    isClosed : false,
    location : "용인",
    masterInfo : {
        name : 'mkm',
        age : 25,
        height : 180.5
    }
};

let response: readonly [number, string]; // readonly 없으면 push나 splice 메서드 쓸 수 있음
/*
    reponse 변수는 항상   다음 3 값중 한가지만을 가집니다.
    [200 , "response success"]
    [404, "Page not found"]
    [500, "server error"]
    0번 인덱스에 숫자값만 와야합니다.
    1번 인덱스에는 문자열값만 와야합니다.
    2번 인덱스부터 새로운 값이 추가될 경우 반드시 에러를 발생시켜야 합니다.
*/

let array:(number|string|boolean|undefined|{name:string})[];
array = [12345, 'mkm', true, undefined]; // ok
array = ['mkm' , 12345, true]; // ok
array.push({name : 'mkm'}); // ok
// array변수는 튜플이 아닙니다. 
// array변수는 unknown[] , any[]타입이 아닙니다.

let favorite:'치킨'|'햄버거' = '치킨'; // ok
favorite = '햄버거'; // ok 
favorite = '피자'; // x
favorite = '짜장면'; // x
// favorite에는 치킨과 햄버거는 저장 가능하지만 그 외 어떤 값도저장할 수 없음.

//Q1. test1 변수에는
//    undefined를 넣어도 문제가 없습니다.
//    '1234'를  넣어도 문제가 없습니다.
//    1234를 넣으면 컴파일 에러가 발생합니다.
//    true를 넣으면 컴파일 에러가 발생합니다.
//    test1의 타입은 ?
let test1:string|undefined  = undefined; // ok
test1 = '1234'; // ok
test1 = 1234; // compile error
test1 = true; //compile error

//Q2. test2 변수에는 모든 값을 담을 수 있습니다.
//    true, 1234, undefined등을 넣어도 문제가 없습니다.
//    test1에 test2를 담을 수 있습니다.
//    test2는 UnionType이 아닙니다.
//    test2의 타입은?
let test2 : any = true; //ok
test2 = 1234;// ok
test1 = test2; // ok

//Q3. test3 변수에는모든 값을 담을 수 있습니다.
//    test1에 test3를 담으면 컴파일 에러가 발생합니다.
//    test3은 UnionType이 아닙니다.
//    test3의 타입은?
let test3 : unknown = undefined; // ok
test3 = 1234; // ok
test3 = true; // ok
test1 = test3; // compile error