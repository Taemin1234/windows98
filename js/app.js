$(function () {
  loading(); // 로딩창
  icon(); // 아이콘 설정
  icondbl(); //아이콘 더블클릭
  type(); // 글자 타이핑
  surpriseShow(); // 글자 나타나기
  taskbarClk(); // 태스크바 클릭
  pageBtn(); //페이지 버튼
  pageSet(); //페이지 속성
  startBtn(); // 시작버튼 클릭
  startEvents(); //시작버튼 이벤트
  clock(); // 시간
  skills(); // 스킬 게이지
  fileCount(); // 창 하단 숫자
});

let wd = $(window);

let content = [
  { img: "book", name: "포트폴리오 가이드", className: "internet" },
  { img: "folder", name: "Portfolio", className: "portfolio" },
  { img: "people", name: "About me", className: "aboutme" },
  { img: "emptyfolder", name: "가마우지", className: "newfolder" },
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

function type() {
  var typingEnd = false;

  function typingStart(turn) {
    if (!typingEnd) {
      var typingBool = false;
      var typingIdx = 0;
      var typingTxt = $(`.typing-txt-${turn}`).val(); // 타이핑될 텍스트를 가져온다
      typingTxt = typingTxt.split(""); // 한글자씩 자른다.
      if (typingBool == false) {
        // 타이핑이 진행되지 않았다면
        typingBool = true;

        var tyInt = setInterval(typing, 200); // 반복동작(타이핑 시간을 제어할 수 있음)
      }

      function typing() {
        if (typingIdx < typingTxt.length) {
          // 타이핑될 텍스트 길이만큼 반복
          $(`.type-${turn}`).append(typingTxt[typingIdx]); // 한글자씩 이어준다.
          typingIdx++;
        } else {
          clearInterval(tyInt); //끝나면 반복종료
          typingEnd = true;
        }
      }
    }
  }

  //매개변수가 있고 setTimeout을 사용할 시 함수로 묶어주기
  setTimeout(function () {
    typingStart("first");
  }, 4000);
  setTimeout(function () {
    typingStart("second");
  }, 8000);
}

function surpriseShow() {
  function spShow() {
    $(".btm-alert").fadeIn();
  }

  setTimeout(spShow, 11000);
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
    maxWidth: 1400,
    minHeight: 240,
    minWidth: 240,
  });
}

function startBtn() {
  let btnStart = $(".btn-start");
  let startlist = $(".start-list");

  btnStart.on("click", function () {
    btnStart.toggleClass("btn-start-clk");
    startlist.toggleClass("start-list-up");
  });

  //다른곳을 눌렀을때 시작버튼 사라짐
  $("html").on("click", function (event) {
    if (!$(event.target).hasClass("hideCheck")) {
      btnStart.removeClass("btn-start-clk");
      startlist.removeClass("start-list-up");
    }
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

// https://gahyun-web-diary.tistory.com/93

function skills() {
  $(".icon-wrap")
    .eq(2)
    .on("dblclick", function () {
      skillChart(50, ".skl-figma", "#cf0af4", "#5a0af4");
      skillChart(90, ".skl-html", "#9AE60D", "#2ff40a");
      skillChart(90, ".skl-css", "#9AE60D", "#2ff40a");
      skillChart(60, ".skl-js", "#9AE60D", "#2ff40a");
      skillChart(85, ".skl-jq", "#9AE60D", "#2ff40a");
      skillChart(70, ".skl-sass", "#9AE60D", "#2ff40a");
      skillChart(30, ".skl-react", "#0af4cf", "#011ffd");
    });
}

function skillChart(gauge, skillClass, firstColor, secondColor) {
  let i = 1;
  let func1 = setInterval(function () {
    if (i < gauge) {
      gradientColor(i, skillClass, firstColor, secondColor);
      i++;
    } else {
      clearInterval(func1);
    }
  }, 10);
}

function gradientColor(i, skillClass, firstColor, secondColor) {
  const bgCss = {
    background: `conic-gradient(${firstColor} 0%, ${secondColor} ${i}%, #fff ${i}% 100%)`,
  };
  $(skillClass).css(bgCss);
}

function fileCount() {
  let sklCount = $(".skills").length;
  let porfolCount = $(".page-inner .icon-wrap").length;

  $(".skillCount").text(sklCount);
  $(".porfolCount").text(porfolCount);
}
