/*
    Person class는 name,age,address,introduction속성을 가지고 있습니다.
    각 속성의 타입과 접근제한자는 다음과 같습니다.
        name은 문자열이며 어디서든 접근 가능합니다.
        age는 숫자이며 클래스 내에서만 접근 가능합니다.
        address는 주소이며 클래스 내에서만 접근가능하며, 객체 생성시에만 대입이 가능하고 수정이 불가능한 속성입니다.
        introduction은 함수이며 어디서든 접근 가능합니다.
    introduction은 클래스의 name,address,age속성에 저장된 내용을 출력하며 매개변수와 반환값은 없는 메서드입니다.
*/
class Person {
    constructor(public name:string, private age:number, private readonly address:string) {}
    public introduction() {
        console.log(`안녕 난 ${this.name}이라고 해. ${this.address}에 살고 나이는 ${this.age}야`);
    }
}
const mkm:Person = new Person('mkm',1234,'서울'); 
mkm.introduction(); // 안녕 난 mkm이라고해.서울에 살고 나이는 1234야

/*
    Pet는 다음 속성을 가지며 추상 클래스입니다.
        kind  - 문자열속성이며 필수속성입니다.
        name - 문자열속성이며 필수속성입니다.
        info() :void - 추상메서드입니다.
    Hamster는 Pet클래스를 상속받으며 다음 속성을 가지고 있습니다.
        food  - 문자열속성이며 선택속성입니다.
        info(): void
        kind,name,food에 저장된 값을 출력하는 메서드
        출력형식은 아래 문제를 참고
*/
abstract class Pet{
    constructor(public kind:string, public name:string) {}
    /*
    kind:string;
    name:string;
    constructor(kind, name) {
        this.kind = kind;
        this.name = name;
    }*/
    abstract info():void;
}
class Hamster extends Pet{
    constructor(public kind:string, public name:string, public food?:string) {
        super(kind, name);
    }
    /*
    food?:string;
    constructor(kind, name, food?) {
        super(kind, name);
        this.food = food;
    }*/
    info() {
        console.log(`이 햄스터는 ${this.kind}종이며, 이름은 ${this.name}입니다.`);
        //console.log(this.food ? `주식은 ${this.food}를 먹습니다.` : '');
        this.food && console.log(`주식은 ${this.food}를 먹습니다.`);
    }
}
const hamzzi:Hamster = new Hamster('페디그리 햄스터', '햄찌', '해바라기씨');
hamzzi.info();
//이 햄스터는 페디그리 햄스터종이며, 이름은 햄찌입니다.
//주식은 해바라기씨를 먹습니다.

const podong:Hamster = new Hamster('골든 햄스터', '포동');
podong.info();
//이 햄스터는 골든 햄스터종이며, 이름은 포동입니다.

/*
    매개변수의 item에 전달되는 값은  반드시 length 속성이 존재해야 합니다.
    매개변수가 전달되지 않을 경우 기본타입은 {length: 0}으로 설정합니다.
    item이 null혹은 undefined인 경우 value에는 기본타입과 동일한 값을 저장합니다. 
    item이 null혹은 undefined가 아닌 경우 value에는 item값이 그대로 저장됩니다.
*/
type MustLength = {length:number};
//function print<T extends MustLength = {length:0}>(item?: T): void {
function print<T extends {length:number} = {length:0}>(item?: T): void {
    const value:T = item ?? {length:0} as T;
    console.log(value.length);
}
print("hello"); // 5
print([1, 2, 3]); // 3
print({length : 100}); // 100
print(); // 0
//print(123); // 컴파일에러발생.

export default podong;