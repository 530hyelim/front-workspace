$(function() {
    // 순수 자바스크립트 코드 기술해도 상관은 없음
    document.querySelector("#id1").style.color = "red";
    // jQuery 영역 내부에서는 되도록 jQuery 메서드/함수만 사용하는게 좋음
    // jQuery 방식의 요소 선택
    // $("선택자")
    // 선택한 jQuery의 메서드를 사용하여 값을 변경
    $("#id2").css("color","pink");
    $("#id2").html(".innerHTML 대신 html()함수 : 내부 요소 변경");
    // html element가 아니고 jQuery의 클래스를 바탕으로 생성된 객체임
    
    // 태그 선택자
    $("p").css("color","blue");
    // 클래스 선택자
    $(".item")
        .css({backgroundColor:'lightgray', color:'red'})
        // css 스타일 여러개 적용하고 싶으면 객체{} 형태로 속성명:속성값 제시
        .click(function() {
            // addEventListener 방식으로 클릭이벤트가 추가됨
            console.log("클릭됨");
        });
        // 최종 반환값이 jQuery 객체(this)임 => 메서드 체이닝이 가능하다는 의미
        // 자바의 빌더 패턴과 유사한 구조
});