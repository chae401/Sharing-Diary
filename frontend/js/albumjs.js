let today = new Date();

var week = ["일","월","화","수","목","금","토"];

document.getElementById('val').innerHTML = today.getFullYear()+"년 " +  parseInt(today.getMonth()+1) +"월 " + today.getDate() + "일 "+week[today.getDay()]+"요일";

  function wrapWindowByMask() {
      //화면의 높이와 너비를 구한다.
      var maskHeight = $(document).height();
      var maskWidth = $(window).width();

      //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
      $('#fade').css({
        'width': maskWidth,
        'height': maskHeight
      });
    }

    /// 화면의 중앙에 레이어띄움
    function showLayer() {
      wrapWindowByMask();

      $("#light").css("position", "absolute");
      $("#light").css("top", Math.max(0, (($(window).height() - $("#light").outerHeight()) / 2) + $(window).scrollTop() - 100) + "px");
      $("#light").css("left", Math.max(0, (($(window).width() - $("#light").outerWidth()) / 2) + $(window).scrollLeft()) + "px");

      $('#fade').show();
      $('#light').show();
    }


    function clolse() {
      $('#fade').hide();
      $('#light').hide();
    }