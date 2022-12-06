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
  skills(); // 스킬 게이지
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

    pageIdx.not().css("z-index", "1");
    pageIdx.css("z-index", "9");
    $(".open-page").not(pageIdx).css("z-index", "1");

    setTimeout(function () {
      pageIdx.addClass("open-webPage");
    }, 100);

    let insTag = `<div class='page-taskbar ${list.className}-taskbar taskclk'>
  <img src='./source/icon/ico-${list.img}.ico' alt='' />
  <p>${list.name}</p>
</div>`;

    if (pageIdx.hasClass("open-webPage") == false) {
      centerTask.append(insTag);
      $(".page-taskbar")
        .not($(`.${list.className}-taskbar`))
        .removeClass("taskclk");
      //위에서 open-webPage가 먼저 주어지기때문에 settimeout 부여
    }
  });

  hdClose.on("click", function () {
    // 클릭한 닫기 버튼의 해당 번호를 찾아 content 배열에서 클래스이름을 찾는다.
    let thispage = $(this).parents(".open-page");
    let tpIdx = thispage.index();
    let list = content[tpIdx - 1];
    let closedClsName = list.className;

    $(`.${closedClsName}-taskbar`).remove();
  });
}

function taskbarClk() {
  let docu = $(document);
  let pgtask = ".page-taskbar";

  docu.on("click", pgtask, function () {
    let pgtaskClsname = $(this).attr("class");
    let pgtcnfront = pgtaskClsname.slice(13);
    let openpgClsName = pgtcnfront.slice(0, -8);

    let openpage = $(".open-page");

    //태스크 바를 클릭한 곳은 활성화가 되고 다른 것들은 풀려라
    $(this).addClass("taskclk");
    $(".page-taskbar").not($(this)).removeClass("taskclk");

    $(`.${openpgClsName}`).css("z-index", "9");
    openpage.not($(`.${openpgClsName}`)).css("z-index", "1");

    $(`.${openpgClsName}`).removeClass("btnmin-clk");
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

  $(".header-min").on("click", function (e) {
    let thsOpenpg = $(this).parents(".open-page");
    let idx = thsOpenpg.index();
    let list = content[idx - 1];

    e.stopPropagation(); //이벤트 버블링 방지
    thsOpenpg.addClass("btnmin-clk");
    $(`.${list.className}-taskbar`).removeClass("taskclk");
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

  //페이지를 누르면 아래쪽 태스크바가 활성화
  page.on("click", function () {
    //이 페이지의 순서와 content배열의 순서 일치
    let idx = $(this).index();
    let list = content[idx - 1];

    let pgtaskbar = $(".page-taskbar");

    $(`.${list.className}-taskbar`).addClass("taskclk");
    pgtaskbar.not($(`.${list.className}-taskbar`)).removeClass("taskclk");
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

//시작버튼에서 다시시작과 종료버튼 클릭
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

// 시간 표시
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

//시간의 변화가 화면에 보이도록 설정
function clock() {
  setInterval("timeSet()", 1000);
}

//function skills() {}

// https://gahyun-web-diary.tistory.com/93

// function skillChart(gauge, skillClass, firstColor, secondColor) {
//   let i = 1;
//   let func1 = setInterval(function () {
//     if (i < gauge) {
//       gradientColor(i, skillClass, firstColor, secondColor);
//       i++;
//     } else {
//       clearInterval(func1);
//     }
//   }, 10);
// }
function skills() {
  $(".skl-html").click(function () {
    //skillChart(90, ".skl-html", "black", "grey");
    gradientColor(90, ".skl-html", "black", "grey");
  });
}

function gradientColor(i, skillClass, firstColor, secondColor) {
  $(skillClass).css({
    background:
      "conic-gradient(" +
      firstColor +
      "0%," +
      secondColor +
      +i +
      "%, #ffffff " +
      i +
      "% 100%)",
  });
}
