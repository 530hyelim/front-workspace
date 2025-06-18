function test1() {
    console.log('요소에 이벤트 발생');
}
// "test1();" == function(){ test1(); }
// 따라서 inline에서는 함수호출 연산자 필수

/*
    html 페이지 로딩이 완료된 이후에 코드를 실행하고자 할 때
     - window.onload 사용
     - 모든 html이 로딩 완료된 이후에 실행되는 함수 내부에 작성하면
       js 파일이 header쪽에 작성돼 있어도 실행됨
*/
window.onload = function() {
    document.querySelector("#btn2").onclick = test1();
    // onclick에는 항상 함수가 대입되어야 함
    // test1()을 대입하면 반환된 값인 undefined가 대입되기 때문
    document.querySelector("#btn2").onclick = test1;
    document.querySelector("#btn2").onclick = function() {
        console.log('캬캬캬');
    }; // 이것만 실행되게 됨. 덮어쓰기

    // 콜백함수형태로 이벤트리스너 함수 넣어주기
    document.querySelector("#btn3").addEventListener("click",function() {
        console.log("btn3 clicked!");
    });
    document.querySelector("#btn3").addEventListener("click",function() {
        console.log("ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ btn3 clicked!");
    }); // 중복으로 여러 개 추가할 수 있음
};

/*
    Event 객체
     - 발생한 이벤트 관련 모든 정보를 가지고 있는 객체
     - 이벤트가 발생한 요소(이벤트 타겟 객체), 발생한 이벤트의 유형, html 내부의 위치정보 등
     - 이벤트 발생 시 브라우저는 이벤트 핸들러 함수의 첫 번째 매개변수로
       항상 이벤트 객체를 주입

    Event Target 객체
     - 이벤트가 발생한 객체 (발생한 이벤트의 유형)
     - 이벤트 객체의 target 속성의 값
 */
document.querySelector(".box").onmouseover = function(e) {
    console.log(e); // e = MouseEvent (이벤트에 바인딩 된 이벤트 객체)
    console.log(e.target); // e.target = div.box (이벤트가 발생한 요소)

    e.target.innerHTML = "하이"; // 해당 요소에 직접 접근이 가능
};
document.querySelector(".box").onmouseout = function() {
    // this == e.target (이벤트가 발생한 요소. 이벤트 타깃 객체)
    this.innerHTML = "바이";
};

/*
    keyEvent
     - keydown(눌리는 순간), keypress(눌리는 동안), keyup(=input)
*/
document.querySelector("#userInput").addEventListener("keypress",
    function(e) {
        console.log(e); // KeyboardEvent
        document.querySelector(".text-wrapper").innerHTML = e.target.value;
        // keyup이 발생할 때 input에 값이 기록되기 때문에 keydown이나 
        // keypress시에는 작성된 value를 바로바로 html에 표시할 수 없다.
        // 따라서 keyup을 가장 많이 사용하는 이유 (input을 사용하기도 함)
        // 사용자가 입력한 값을 즉시 얻어오기 위해서
    }
);

/* submit event */
document.querySelector("form").onsubmit = function(e) {
    /*
        사용자가 입력한 값이 유효한 값인지 유효성 검사를 진행하기 위한
        목적으로 작성한다 (eg. 회원가입 / injection 공격 방어)
    */
    console.log(e); // SubmitEvent
    // 1. 아이디 검사
    const userId = document.querySelector("#userId");
    if (userId.value.length < 4) {
        alert("유효한 아이디를 입력하세요");
        userId.focus();
        //return false; // submit 이벤트 막기 (제출이 실행안됨)
        e.preventDefault(); // 기본 이벤트 실행 방지
        // 첫번째로 내가 작성한 이벤트가 먼저 실행이 되고
        // 두번째로 기본 이벤트가 실행됨 <- 이것만 실행 안되게 하는 것
        // 뒤에 다른 코드들 작성하더라도 실행된다는 차이가 있음
        // 기본 이벤트? 각 태그마다 내장되어 있는 이벤트 기능
        // ex) submit 버튼 : submit 이벤트
        //     a 태그 : click 이벤트
    }
    // 2. 비밀번호 검사
    const pwd = document.querySelector("#pwd");
    if (pwd.value.length < 4) {
        alert("유효한 비번 입력");
        pwd.select(); // focus 상태가됨
        // 아이디랑 비번 둘다 비정상적으로 입력하면 마지막 포커스로 이동
        e.preventDefault();
    }
    return true; // 생략가능하지만 유효성검사를 모두 통과했다는 의미로 작성
};

function displayMsg(e, boxx) {
    // capture phase가 끝나는 곳이 바로 이벤트 타깃 객체가 됨
    console.log("이벤트 객체 : ", e);
    // data-xxx 의 속성값을 구하는 방법 : dataset.xxx
    // data-xxx : html 태그에 데이터를 저장하기 위해 사용하는 속성
    console.log(e.target, boxx.dataset.text);
    // 이벤트 타깃 객체는 항상 단 하나임
    // 그래서 e.target == this가 완벽하지 않음
    // 따라서 현재 어떤 객체에서 이벤트가 실행되는지 정확히 알려면
    // this로 boxx를 가져와야 함
    e.stopPropagation();
    // 자바스크립트 내부에는 상위요소로의 이벤트 전파를 막는 함수
}