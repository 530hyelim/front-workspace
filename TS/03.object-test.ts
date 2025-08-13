/*
    Academy에는 name속성이 필수로 들어가며 항상 'kh'값만 들어가며 수정될 수 없습니다.
    Academy에는 class속성이 필수로 들어가며 항상 문자열로된 배열데이터만 들어갑니다.
    Academy에는 location속성이 들어갈 수도 있으며 문자열만 들어갑니다.
    Academy에는 employee속성이 들어갈 수도 있으며 다음과 같은 데이터를 가질 수 있습니다
    [{name : 'mkm' , position: 'ceo'}, {name : 'hong', position : 'manager', dept_code : 'D2'}]
    [{name : 'mkm' , position: 'ceo'}, {name : 'lee', position : 'teacher', dept_code : 'D1'}]
    Employee는 Academy의 employee속성에서 사용되는 타입별칭입니다.
*/
type Academy = {
    readonly name:'kh'; // 수정될 수 없다!! readonly
    class:string[];
    location?:string;
    employee?:Employee[];
};
type Employee = {
    name:string;
    position:string;
    dept_code?:string;
};

/*
    type1과 type2를 관리할 수 있는 타입별칭 만들기
    type3과 type4를 관리할 수 있는 타입별칭 만들기
    MBTIType1과 MBTIType2를 이용하여 type5를 관리할 수 있는 타입별칭 만들기
*/
type MBTIType1 = {
    mbti:string;
    feature:string[];
    vocation?:string;
};
const type1:MBTIType1  = {mbti : 'ISTP', feature : ['망상가', '공감능력 부족'], vocation : '데이터분석가'};
const type2:MBTIType1  = {mbti : 'INTJ', feature : ['완벽주의자', '무신경']};

type MBTIType2 = {
    mbti:string;
    bestGunghab:string[];
    worstGunghab?:string;
};
const type3:MBTIType2  = {mbti : 'ISTP' , bestGunghab : ['ESFJ', 'ESTJ'] };
const type4:MBTIType2  = {mbti : 'ESFJ' , bestGunghab : ['ISFP', 'ISTP'] , worstGunghab : 'ENFJ' };

type MBTIType3 = MBTIType1 & MBTIType2;
const type5:MBTIType3 = {mbti : 'ISTP' , bestGunghab : ['ESFJ', 'ESTJ'], feature : ['망상가', '공감능력 부족']  }; 
// type6는 컴파일 에러 발생
//const type6:MBTIType3 = {mbti : 'ISTP' , bestGunghab : ['ESFJ', 'ESTJ'] , worstGunghab : 'ENFJ'}; 

/*
    Person은 Teacher와 Singer의 공통속성을 정의하는 인터페이스입니다.
    Teacher와 Singer는 Person을 확장하였고, 자신만의 속성을 추가로 가지고 있습니다.
    각 인터페이스에 들어가는 속성들은 mkm,kariana,winter객체에 대입되는 객체를 바탕으로 유추해보세요.
*/
interface Person {
    name:string;
    married?:boolean;
}
interface Teacher extends Person {
    major:string;
    classRoom:string;
    carrier:number;
}
interface Singer extends Person {
    songs:string[];
    group:string;
}
const mkm:Teacher  = {name : 'mkm', married : false, major: 'it', classRoom : 'C' , carrier:10 };
const karina:Singer = {name : '카리나', married : false, songs: ['슈퍼노바','블랙맘바'] , group : '에스파'  };
const winter:Singer = {name : '윈터', songs: ['슈퍼노바','블랙맘바'] , group : '에스파'  };

/*
    ObjType의 name에는 항상 'mkm'만 들어갈 수 있습니다.
    ObjType의 printName은 반환 값이 없는 메서드입니다.
    ObjType의 printName은 매개변수로 함수를 전달받습니다.
    printName의 callback은 반환 값이 없는 함수입니다.
    printName의 callback은 매개변수로 문자열을 전달받습니다.
    ObjType의 call은 반환 값이 없는 메서드입니다.
    ObjType의 call은 매개변수가 없습니다.
*/
type PrintFn = (callback:(something:string) => void) => void;
type CallFn = () => void;
type ObjType = {
    name:'mkm',
    printName:PrintFn,
    call:CallFn
};
const obj:ObjType = {
    name : 'mkm', 
    printName: function(callback) {        
        callback(this.name);
    },
    call : function() {
        const callback = (something:string) : void => {console.log(something)}
        this.printName(callback);
    } 
};
obj.call(); // mkm

/*
    Coin에는 반드시 ticker와 market속성이 존재해야 합니다.
    Coin에는 속성을 자유롭게 추가할 수 있습니다.
    Coin에 추가된 속성의 타입은  반드시  문자열이거나 숫자거나 불린값 이어야 합니다.
    그 외의 타입으로 추가되는 경우 컴파일 에러가 발생해야 합니다.
*/
type Coin = {
    ticker:string,
    market:string,
    [key:string]:string|number|boolean
}
const coin:Coin = {
    ticker : 'BTC',
    market : 'KRW',
    description : '최초의암호화폐'
}
//1) price속성 추가
coin.price = 10000000; //ok
//2) rank속성 추가
coin.rank = 1; // ok
//3) trade속성추가
coin.trade = true; // ok
// coin.trade = [1,2,3,4] // error
// coin.trade = undefined; // error
// coin.trade = null// error

/*
    매개변수로 전달받은 user객체에서 name과 age값만 뽑아서 첫 번째 console.log를 작성하고,
    user객체의 나머지 정보를 뽑아 others로 만든 후 두 번째 console.log에 대입하세요.
    ??공간에서만 코드를 작성해야 합니다.
*/
function greetUser({name, age, ...others}:{name:string, age:number, [x:string]:string|number}) {
    console.log(`안녕하세요. 제 이름은 ${name} ${age}살 입니다.`); // 안녕하세요. 제이름은 홍길동 30살 입니다.
    console.log(`추가정보 : ${others}`); // 추가정보 : { email: 'hong@test.com', location: '서울' }
}
const user = {
    name: '홍길동',
    age: 30,
    email: 'hong@test.com',
    location: '서울'
};
greetUser(user);
export default greetUser;