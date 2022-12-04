$(function () {
  loading(); // 로딩창
  icon(); // 아이콘 설정
  icondbl(); //아이콘 더블클릭

  taskbarClk(); // 태스크바 클릭
  pageBtn(); //페이지 버튼
  pageSet(); //페이지 속성
  startBtn(); // 시작버튼 클릭
  startEvents(); //시작버튼 이벤트
  clock(); // 시간
});

let wd = $(window);

let content = [
  { img: "internet", name: "Internet explorer", className: "internet" },
  { img: "folder", name: "Portfolio", className: "portfolio" },
  { img: "people", name: "About me", className: "aboutme" },
  { img: "question", name: "Contact", className: "contact" },
];

function loadFadeOut() {
  $(".loading").fadeOut();
}

function loading() {
  wd.on("load", function () {
    setTimeout(loadFadeOut, 3000);
  });
}

function icon() {
  let icon = $(".icon-wrap");

  //juqery ui 설치 필수
  icon.draggable({
    containment: "parent",
    grid: [100, 110],
  });

  icon.on("click", function () {
    $(this).addClass("icon-border");
    icon.not($(this)).removeClass("icon-border");
  });

  // 아이콘이 아닌 곳을 클릭 시 아이콘 선택 해제
  $("html").click(function (e) {
    if ($(e.target).hasClass("desktop") || $(e.target).hasClass("task-bar")) {
      icon.removeClass("icon-border");
    }
  });
}

function icondbl() {
  let icon = $(".icon-wrap");
  let page = $(".open-page");
  let centerTask = $(".center-task");

  let hdClose = $(".header-close");

  icon.on("dblclick", function () {
    let idx = $(this).index();

    let list = content[idx];

    let pageIdx = page.eq(idx);

    //아이콘을 클릭하면 아이콘에 해당하는 화면이 나오고 0.1초뒤 클래스를 붙여준다
    pageIdx.fadeIn();
    setTimeout(function () {
      pageIdx.addClass("open-webPage");
    }, 100);

    let insTag = `<div class='page-taskbar ${list.className}-taskbar'>
  <img src='./source/icon/ico-${list.img}.ico' alt='' />
  <p>${list.name}</p>
</div>`;

    if (pageIdx.hasClass("open-webPage") == false) {
      centerTask.append(insTag);
      //위에서 open-webPage가 먼저 주어지기때문에 settimeout 부여
    }
  });

  hdClose.on("click", function () {
    // 클릭한 닫기 버튼의 해당 번호를 찾아 content 배열에서 클래스이름을 찾는다.
    let thispage = $(this).parents(".open-page");
    let tpIdx = thispage.index();
    let list = content[tpIdx - 1];
    let closedClsName = list.className;

    // 하드코딩?

    if (thispage.hasClass(`'${closedClsName}'`) == true) {
      $(`'.${closedClsName}-taskbar'`).remove();
    }
  });
}

function taskbarClk() {
  let docu = $(document);
  let pgtask = ".page-taskbar";

  docu.on("click", pgtask, function () {
    $(this).addClass("taskclk");
  });
}

function pageBtn() {
  let btnhd = $(".btn-header");

  btnhd.on("mousedown", function () {
    $(this).addClass("header-btn-clk");
  });

  btnhd.on("mouseup", function () {
    $(this).removeClass("header-btn-clk");
  });

  $(".header-close").on("click", function () {
    $(this).parents(".open-page").fadeOut(100, "linear");
    $(this).parents(".open-page").removeClass("open-webPage");
  });

  $(".header-min").on("click", function () {
    $(this).parents(".open-page").addClass("btnmin-clk");
  });
}

function pageSet() {
  let hdbar = $(".header-bar");
  let page = $(".open-page");
  let idx = 10;

  hdbar.on("mousedown", function () {
    let dragpage = $(this).parent(page);
    dragpage.draggable({
      containment: "parent",
    });
  });

  page.on("mousedown", function () {
    $(this).css("z-index", idx);
    idx++;
  });

  hdbar.on("mouseup", function () {
    page.draggable("destroy");
  });

  page.resizable({
    maxHeight: 840,
    maxWidth: 1660,
    minHeight: 240,
    minWidth: 240,
  });
}
// https://api.jqueryui.com/draggable/

function startBtn() {
  let btnStart = $(".btn-start");
  let startlist = $(".start-list");

  btnStart.on("click", function () {
    btnStart.toggleClass("btn-start-clk");

    startlist.toggleClass("start-list-up");
  });
}

function startEvents() {
  let restart = $(".start-restart");
  let shutdown = $(".start-shutdown");

  restart.on("click", function () {
    location.reload();
  });

  shutdown.on("click", function () {
    window.close();
  });
}

function timeSet() {
  let hours = $(".hour");
  let daynnight = $(".daynnight");

  let now = new Date();
  let hour = now.getHours();
  let min = "0" + now.getMinutes();
  let zeromin = min.slice(-2, min.length);

  if (hour > 12) {
    daynnight.text("오후");
    hours.text(hour - 12);
  } else {
    daynnight.text("오전");
    hours.text(hour);
  }

  $(".min").text(zeromin);
}

function clock() {
  setInterval("timeSet()", 1000);
}
