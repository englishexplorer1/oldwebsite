jQuery(document).ready(function () {
  if (window.location.hash === "") {
    jQuery(window).scrollTop(0);
  }
});

//nav show/hide when scrolling
jQuery(function () {
  var visible = true;
  var jq_header = jQuery("body > header");
  var jq_body = jQuery("body");
  var last_position = 0;

  function make_visible(vis) {
    if (vis) {
      jq_header.removeClass("hidden");
    } else {
      jq_header.addClass("hidden");
    }
  }

  setInterval(function () {
    var p = getPageScroll();

    if (p == last_position) return;

    if (jq_body.hasClass("menu-open")) {
      last_position = p;
      return;
    }

    if (p > jq_header.height()) {
      jq_header.addClass("small");
    } else {
      jq_header.removeClass("small");
    }

    p > 0 ? jq_header.addClass("shadow") : jq_header.removeClass("shadow");

    last_position = p;
  }, 100);
});

//main menu
jQuery(function () {
  var submenu_hovered = false;
  var hovered_ids = {};
  var tmr_close = 0;
  var last_hover = 0;

  jQuery("header #menu-header > li > a").each(function () {
    var jq_a = jQuery(this);
    var id = jq_a.parent().attr("id");

    jq_a.hover(
      function () {
        last_hover = Date.now();
        hovered_ids[id] = true;
        show_menu(id);
      },
      function () {
        hovered_ids[id] = false;
        restart_close_timer();
      }
    );
    jq_a.on("keydown", function (ev) {
      if (ev.keyCode == 13) {
        //escape
        if (
          Date.now() - last_hover < 750 ||
          typeof hovered_ids[id] == "undefined" ||
          !hovered_ids[id]
        ) {
          hovered_ids[id] = true;
          show_menu(id);
          return false;
        }
      }
    });
    jq_a.on("click", function (ev) {
      if (
        Date.now() - last_hover < 250 ||
        typeof hovered_ids[id] == "undefined" ||
        !hovered_ids[id]
      ) {
        hovered_ids[id] = true;
        show_menu(id);
        return false;
      }
    });
  });
  jQuery("header").hover(
    function () {
      submenu_hovered = true;
    },
    function () {
      submenu_hovered = false;
      restart_close_timer();
    }
  );

  function restart_close_timer() {
    clearTimeout(tmr_close);
    tmr_close = setTimeout(function () {
      if (!submenu_hovered) {
        for (var id in hovered_ids) {
          if (hovered_ids[id]) {
            return;
          }
        }
        hide_menu();
      }
    }, 10);
  }

  function show_menu(id) {
    if (window.innerWidth >= 760) {
      jQuery("header .active").removeClass("active");
      jQuery("header #menu-header > li > ul").hide();

      var active_li = jQuery("#" + id).addClass("active");
      var target_menu = active_li.children("ul");
      if (target_menu.length) {
        jQuery("header").addClass("dropdown-visible");
        target_menu.show();
        if (active_li.hasClass("flex")) {
          target_menu.css({ display: "flex" });
        } else {
          target_menu.css({ display: "block" });
        }
      } else {
        jQuery("header").removeClass("dropdown-visible");
      }
    }
  }

  function hide_menu() {
    if (window.innerWidth >= 760) {
      jQuery("header .active").removeClass("active");
      jQuery("header #menu-header > li > ul").hide();
      jQuery("header").removeClass("dropdown-visible");
    }
  }
});

//mobile menu
jQuery(function () {
  var open = false;
  jQuery(".mobile-menu-button").click(function () {
    open = !open;
    if (open) {
      jQuery(window).scrollTop(0);
      jQuery("body").css("overflow", "hidden");
      jQuery("body > header").addClass("menu-open");
      jQuery(".mobile-menu-button").addClass("close");
    } else {
      jQuery("body").css("overflow", "");
      jQuery("body > header").removeClass("menu-open");
      jQuery(".mobile-menu-button").removeClass("close");

      const show = _getAll(".show");
      const open = _getAll(".open");

      show.forEach((s) => s.classList.remove("show"));
      open.forEach((s) => s.classList.remove("show"));
    }
    return false;
  });
});

const handleMobileMenu = (() => {
  const menu = _get("#menu-header-1");
  const menuItemsWithChildren = _getAll(
    "#menu-header-1 > li.menu-item-has-children"
  );

  menuItemsWithChildren.forEach((item) => {
    const submenu = _get(".sub-menu", item);

    if (submenu) {
      submenu.insertAdjacentHTML(
        "afterbegin",
        '<li class="back"><a href="#">Back</a></li>'
      );
    }

    item.addEventListener("click", (e) => {
      const submenu = item.children[1];

      var ua = window.navigator.userAgent;
      var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
      var webkit = !!ua.match(/WebKit/i);
      var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

      console.log(iOS, webkit, iOSSafari);

      if (iOS && e.target.innerText === "Capabilities") {
        jQuery(".mobile-menu").css({ paddingBottom: "400px" });
      } else {
        jQuery(".mobile-menu").css({ paddingBottom: "100px" });
      }

      if (
        submenu &&
        !item.classList.contains("open") &&
        !submenu.classList.contains("show")
      ) {
        item.classList.add("open");
        submenu.classList.add("show");
      }
    });
  });

  const backButtons = _getAll(".back", menu);

  backButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // top level li
      setTimeout(() => {
        button.parentElement.parentElement.classList.remove("open");
      }, 250);

      // previous submenu
      button.parentElement.classList.remove("show");
    });
  });
})();

const handleHeaderSearchForm = (() => {
  const header = _get("#header");
  const trigger = _get("li.search", header);
  const searchMenu = _get(".search-form", header);
  const close = _get(".close", searchMenu);
  const input = _get("input", searchMenu);

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    searchMenu.classList.add("show");
  });

  close.addEventListener("click", (e) => {
    e.preventDefault();
    if (input.value !== "") {
      searchMenu.submit();
    } else {
      searchMenu.classList.remove("show");
    }
  });
})();

const handleAnnouncementCookies = (() => {
  const root = _get(".announcement-wrapper");
  const closeButtons = _getAll("a", root);

  closeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log(e.target);

      if (e.target.classList.contains("close")) {
        e.preventDefault();
      }

      const parent = button.parentElement.parentElement;
      if (parent) {
        parent.style.opacity = "0";

        // set cookie
        setCookie(
          `${parent.classList[0]}-close-cookie`,
          parent.dataset.version,
          7
        );

        setTimeout(() => {
          parent.style.display = "none";
        }, 500);
      }
    });
  });
})();

var swiper = new Swiper(".tabbed-carousel-mobile-swiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
  centeredSlides: true,
  // loop: true,
  rewind: true,
  initialSlide: 1,
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: false,
  // },
});

var swiper = new Swiper(".eventsSwiper", {
  slidesPerView: "auto",
  // spaceBetween: 15,
  navigation: {
    nextEl: ".arrow-button.next",
    prevEl: ".arrow-button.prev",
  },
  breakpoints: {
    // 1280: {
    //   slidesPerView: 3,
    //   spaceBetween: 30,
    // },
  },
});

const handleExternalLinkButton = (() => {
  const buttons = _getAll(".external-link-button-wrapper");

  buttons.forEach((button) => {
    const span = _get("span", button);

    // we only want to do this to those without added markup
    if (!span) {
      button.insertAdjacentHTML(
        "afterBegin",
        `<span class="external-link-button"></span>`
      );
    }
  });
})();

const handleDownloadButton = (() => {
  const buttons = _getAll(".download-button-wrapper");

  buttons.forEach((button) => {
    const span = _get("span", button);

    // we only want to do this to those without added markup
    // if (!span) {
    button.insertAdjacentHTML(
      "afterBegin",
      `<span class="download-button"></span>`
    );
    // }
  });
})();

const handleCardHoverAnimation = (() => {
  const cards = _getAll(".card:not(.none)");
  cards.forEach((card) => {
    const bg = _get(".learn-more div", card);

    if (bg) {
      const text = _get("span", bg);
      bg.style.maxWidth = `${text.clientWidth + 40}px`;
    }
  });
})();

const handleTableSafariFix = (() => {
  const tables = _getAll(".std-content table");

  tables.forEach((table) => {
    const tds = _getAll("td", table);

    tds.forEach((td) => {
      if (td.children.length === 0) {
        const text = td.innerText;
        td.innerHTML = `<span>${text}</span>`;
      }
    });
  });
})();

const handleBreadcrumbsFix = (() => {
  const breadcrumbs = _getAll(".breadcrumbs");

  breadcrumbs.forEach((b) => {
    b.ariaLabel = "Breadcrumbs";
    console.log(b.ariaLabel);
  });
})();
