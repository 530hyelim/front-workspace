/*
    Node 객체
        - 모든 DOM 객체는 Node 객체를 상속 받는다
        - html 내부에 작성하는 주석, 문자열, 태그 모두 node가 된다.
        - 모든 html 요소는 node의 메서드를 사용할 수 있고,
        EventTarget의 이벤트 속성들을 이용할 수 있다.
        - node(innerHTML과 같은 속성), eventTarget(onclick(), ...) : 추상클래스의 형태

    Dom 객체의 속성 및 메서드들
        1) firstChild, lastChild, childNodes, ...
        2) contains(), appendChild(), removeChild(), ...
*/
function test12() {
    // 동적으로 html 요소 생성하기 <h3>안녕하세요</h3>
    // 1. innerHTML 사용 (무조건 문자열 값으로만 추가할 수 있음)
    document.querySelector(".result").innerHTML = "<h3>하이 ㅋ</h3>";

    // 2. document 객체 생성 메서드 활용하기
    // 1) elementNode 생성 메서드
    const h3 = document.createElement("h3"); // 메모리 어딘가에 <h3></h3> 태그 생성됨
    console.log(h3);
    // 2) textNode 생성
    const textNode = document.createTextNode("하이 ㅋㅋ");
    console.log(textNode);
    // 3) 두 노드를 연결 (계층구조 설정)
    h3.appendChild(textNode); // 자식추가
    console.log(h3);
    // 4) h3태그를 dom요소에 추가 (안하면 html에 안 뜸)
    // 자식요소를 추가할 때 append() 자식여럿, appendChild() 자식하나
    document.querySelector(".result").appendChild(h3);
}
function test13() {
    // img 태그 동적 생성하기 <img src="이미지 파일의 경로" width/height alt, style>
    const img = document.createElement('img');
    img.src = "./window.png"; // js가 읽혀지는 html 기준으로 경로 작성해야 함
    img.style = "width: 200px";
    img.width = 200;
    document.querySelector(".img-wrapper").appendChild(img);
}
function deleteNode(node) {
    node.remove();
}