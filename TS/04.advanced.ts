/*
    1. Class
     - javascript의 class문법을 보다 확장하여, 좀 더 객체지향적인 프로그래밍이 가능하도록 만들었다.
     - 접근제한자, 추상클래스, 인터페이스 구현등의 기능을 제공
*/
abstract class Animal {
    abstract bark():void;
}
class Tiger extends Animal {
    // 필드
    public name:string; // 자바스크립트에서는 디폴트상태가 퍼블릭임
    protected age:number;
    private location:string; // js에서는 #으로 제공
    // 생성자
    constructor(name:string, age:number, location:string) {
        super(); // 자바에서는 안써도 자동으로 추가해줬었지만 여기서는 직접 추가해주어야 함
        this.name = name;
        this.age = age;
        this.location = location;
    }
    /* public */ bark(): void {
        console.log('어흥!');
    }
}
const khTiger = new Tiger('mkm', 25, '서울');
khTiger.bark();

// 2. Constructor Parameter Properties
//  - class 생성시의 반복되는 코드를 줄일 수 있는 단축문법
class Product {
    // 필드 선언 생략, 초기화 코드 생략
    constructor(public id:number,
        protected name:string,
        private price:number,
        readonly brand:string
    ) {}
    printInfo() {
        console.log(this.id);
        console.log(this.name);
        console.log(this.price);
        console.log(this.brand);
    }
}
new Product(1, '로봇청소기', 700000, 'samsung').printInfo();
/*
    3. Generics
     - Type을 변수처럼 외부에서 주입받아 사용하는 기능으로 타입변수라고 불린다.
     - Type의 유연성을 제공하면서 확장성과 타입안정성을 추가할 수 있다.
     * Generics의 주요기능
       - extends 키워드를 통한 상한경계 설정 (super는 지원하지 않음. 하한경계 설정X)
       - Default Type
*/
// 1) 제네릭과 타입추론
function returnGeneric<T>(value:T):T {
    return value;
}
const result = returnGeneric("hello"); // 매개변수로 전달된 데이터를 통해 타입추론. T는 string으로 지정된다.
// 2) 제네릭의 extends
//  - 제네릭에 들어갈 타입의 상한타입을 설정
//  - super(하한경계)는 지원하지 않는다.
//   Animal을 상속받았거나 하위 타입만 받는 함수를 작성
function func<T extends Animal>(animal:T) { // 명목적 타이핑처럼 보이지만 실제로는 내부적으로 구조적 타이핑으로 검사함
    animal.bark();
}
// TypeScript는 구조 중심의 타입 검사 시스템을 사용하기 때문에 다음과 같이 작성 가능
function func2<T extends {bark():void}>(animal:T) { // 구조적 타이핑
    // 이 구조를 상속받은 어떤 객체든 상관이 없다.
    animal.bark();
}
// 3) 제네릭의 기본타입
//  - 제네릭이 사용되지 않는 경우 타입변수에 대입될 기본값 지정
function defValue<T = string>(value?:T):T[] {
    return value ? [value] : [];
}
const arr1 = defValue("hi");
const arr2 = defValue(45);
const arr3 = defValue();
const arr4 = defValue<number>();
/*
    기본타입과 extends의 혼합사용
*/
type Options = {theme:string};
function config<T extends Options = {theme:"dark"}>(option?:T):T {
    //return option ? option : {theme:"dark"} as T;
    //return option || {theme:"dark"} as T; // shortcut expression
    // falsy? 값이 비어있으면 false. 빈문자열 0 false 등등...

    // 널병합연산자 ??
    // a ?? b -> a가 null 또는 undefined인 경우 B반환, 아닌경우 A
    return option ?? {theme:"dark"} as T;
}
// 4) keyOf 연산자와 Generic
//  - 객체타입의 속성명들을 UnionType으로 추출하는 연산자
type Person = {
    name:string,
    age:number,
    location:string
}
type KeyOfPerson = keyof Person; // "name" | "age" | "location"
//function getValue<P extends Person, K extends KeyOfPerson>(person:P, key:K):P[K] {
function getValue<K extends KeyOfPerson>(person:Person, key:K):Person[K] {
    return person[key];
}
const person:Person = {name:'goofy', age:27, location:'seoul'};
const value = getValue(person, "name");
/*
    4. Utility Type
     - 기존 객체타입들을 변형 및 조작할 수 있도록 도와주는 유틸리티 타입들

    1) Partial<T>
     - T의 모든 속성을 optional 속성으로 변경해주는 유틸리티 타입
     - 모든 속성을 필수, 읽기 전용으로 만들어주는 Required<T>, Readonly<T>도 존재한다.
*/
interface User {
    id:number;
    name:string;
    email:string;
}
interface UpdateUser {
    id:number;
    name:string;
    email?:string;
}
const user:UpdateUser = {id:1, name:'aaa'}; // 수정할 데이터 중 email이 없는경우 에러
const partialUser:Partial<User> = {id:1, name:'aaa'};
/*
    2) Pick<T, K>
     - 객체의 속성 중 일부만 선택하여 새로운 타입을 만들 때 사용
*/
type SimpleUser = Pick<User, "name"|"email">; // == interface User {name:string; email:string;}
/*
    3) Omit<T, K>
     - 객체 타입에서 특정 속성을 제외하고 나머지만 남긴 새 타입을 만들 때 사용
*/
type NewUser = Omit<User, "id">; // id를 제외한 사용자 정보
const userData:NewUser = {
    name:"goofy",
    email:"goofy@naver.com"
}
/*
    Utility Type 조합
    1. User에서 id를 제외한 나머지 속성을 선택 후 전체를 옵셔널로 만들기
    2. User의 속성 중 name 속성을 필수로 만들기
    3. 1, 2번을 병합
*/
type EditableUser = Partial<Omit<User, "id">> & Required<Pick<User, "name">>
// == {name?:string, email?:string} & {name:string} // Required는 redundant
// => {name:string, email?:string}
// 같은 속성이 겹치는 경우 더 구체적인 속성으로 우선시되어 병합
/*
    4) Record<K, T>
     - 키 집합을 기준으로 T타입을 지정하는 객체 타입을 만든다.
     - 지정된 키 값들로 구성된 객체를 만들고 싶을 때 사용한다.
*/
type Page = "home"|"about"|"contact";
type PageInfo = {
    title:string,
    path:string
}
type PageInfo2 = {
    "home" : {
        title:string,
        path:string
    },
    "about" : {
        title:string,
        path:string
    },
    "contact" : {
        title:string,
        path:string
    }
}
//const pageMap:PageInfo2 = {
const pageMap:Record<Page, PageInfo> = {
    home:{title:"홈페이지", path:"/"},
    about:{title:"어바웃", path:"/about"},
    contact:{title:"연락처", path:"/contact"}
}
/*
    5) ReturnType<T>
     - 함수타입 T가 반환하는 결과의 타입을 그대로 가져오는 유틸리티타입
*/
function getUser() {
    return {id:1, name:'goofy', email:'abc'};
}
type UserData = ReturnType<typeof getUser>;
const data:UserData = {id:11, name:'hyelim', email:'dd'};
/*
    6) Parameters<T>
     - 함수타입 T의 매개변수 타입을 배열로 추출
     - 함수의 동일한 시그니쳐 유지를 위해 사용한다.
*/
function greet(name:string, age:number) {
    console.log(name, age);
}
type GreetParams = Parameters<typeof greet>; // [string, number]
const callGreet = function(...args : GreetParams) { // rest
    greet(...args); // spread
}
callGreet('goofy', 27);

export default Options;