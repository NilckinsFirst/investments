//loader function
var Loader = function () {};
Loader.prototype = {
  require: function (scripts, callback) {
    this.loadCount = 0;
    this.totalRequired = scripts.length;
    this.callback = callback;
    for (var i = 0; i < scripts.length; i++) {
      this.writeScript(scripts[i]);
    }
  },
  loaded: function (evt) {
    this.loadCount++;
    if (
      this.loadCount == this.totalRequired &&
      typeof this.callback == "function"
    )
      this.callback.call();
  },
  writeScript: function (src) {
    var self = this;
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.defer = true;
    s.src = src;
    s.addEventListener(
      "load",
      function (e) {
        self.loaded(e);
      },
      false
    );
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(s);
  },
};
var lazy;
var callback_loaded = function (element) {
  if (element.closest(".lazy-img")) {
    element.closest(".lazy-img").classList.remove("lazy-progress");
  }
};
//  Указать путь до lazy.js
var l = new Loader();
l.require(["./js/lazy.js"], function () {
  lazy = new LazyLoad({
    elements_selector: ".lazy",
    callback_loaded: callback_loaded,
    unobserve_entered: true,
  });
});

WebFontConfig = {
  google: {
    families: ["Inter:400,500,600,700,800&display=swap"],
    // families: ["Diary of an 8-bit mage"]
  },
};
(function (d) {
  var wf = d.createElement("script"),
    s = d.scripts[0];
  wf.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
  wf.async = true;
  s.parentNode.insertBefore(wf, s);
})(document);

let slider = new Siema({
  selector: ".slides",
  duration: 200,
  easing: "ease-out",
  perPage: 1,
  startIndex: 0,
  draggable: true,
  multipleDrag: true,
  threshold: 20,
  loop: true,
  rtl: false,
  onInit: () => {},
  onChange: () => {},
});

document.querySelector('.prev').addEventListener('click', () => slider.prev());
document.querySelector('.next').addEventListener('click', () => slider.next());

let slideUp = (e, t = 500, s, d) => {
  (e.style.transitionProperty = "height, margin, padding"),
    (e.style.transitionDuration = t + "ms"),
    (e.style.boxSizing = "border-box"),
    (e.style.height = e.offsetHeight + "px"),
    e.offsetHeight,
    (e.style.overflow = "hidden"),
    (e.style.height = 0),
    (e.style.paddingTop = 0),
    (e.style.paddingBottom = 0),
    (e.style.marginTop = 0),
    (e.style.marginBottom = 0),
    window.setTimeout(() => {
      (e.style.display = "none"),
        e.style.removeProperty("height"),
        e.style.removeProperty("padding-top"),
        e.style.removeProperty("padding-bottom"),
        e.style.removeProperty("margin-top"),
        e.style.removeProperty("margin-bottom"),
        e.style.removeProperty("overflow"),
        e.style.removeProperty("transition-duration"),
        e.style.removeProperty("transition-property");
    }, t);
    s.classList.remove(d);

  // setTimeout(() => {
  //   s.classList.remove(d);
  // }, t);
},
slideDown = (e, t = 500, s, d) => {
  e.style.removeProperty("display");
  let o = window.getComputedStyle(e).display;
  "none" === o && (o = "block"), (e.style.display = o);
  let r = e.offsetHeight;
  (e.style.overflow = "hidden"),
    (e.style.height = 0),
    (e.style.paddingTop = 0),
    (e.style.paddingBottom = 0),
    (e.style.marginTop = 0),
    (e.style.marginBottom = 0),
    e.offsetHeight,
    (e.style.boxSizing = "border-box"),
    (e.style.transitionProperty = "height, margin, padding"),
    (e.style.transitionDuration = t + "ms"),
    (e.style.height = r + "px"),
    e.style.removeProperty("padding-top"),
    e.style.removeProperty("padding-bottom"),
    e.style.removeProperty("margin-top"),
    e.style.removeProperty("margin-bottom"),
    window.setTimeout(() => {
      e.style.removeProperty("height"),
        e.style.removeProperty("overflow"),
        e.style.removeProperty("transition-duration"),
        e.style.removeProperty("transition-property");
      }, t);
      s.classList.add(d);

      // setTimeout(() => {
    // s.classList.add(d);
  // }, t);
};
var slideToggle = (e, t = 500, s, d) =>
"none" === window.getComputedStyle(e).display
  ? slideDown(e, t, s, d)
  : slideUp(e, t, s, d);



let menuOpen = document.querySelector('.menu');
let header = document.querySelector('header');
menuOpen.addEventListener('click', function(e){
  header.classList.toggle('menu-show');
})

let accordeons = document.querySelectorAll('.column-list-title');
accordeons.forEach((accordeon) => {
  accordeon.addEventListener("click", function (e) {
      if (window.matchMedia("(max-width: 784px)").matches) {
      let accordeonContainer = accordeon.closest(".header-menu-column");
      let accordeonContent = accordeonContainer.querySelector(
        ".header-column-list"
      );
      slideToggle(accordeonContent, 250, accordeonContainer, "open");
    }
    });
});


let curentScroll = 0;
let prevScroll = 0;
let ticking = false;
let preHeader = document.querySelector(".preheader");
doSomething();
function doSomething(scroll_pos) {
  if (prevScroll > scroll_pos) {
    preHeader.classList.remove("now-scroll");
    preHeader.style.marginTop = "0px";
  } else if (scroll_pos > 100) {
    preHeader.classList.add("now-scroll");
    preHeader.style.marginTop = -preHeader.clientHeight + "px";
  }
  prevScroll = scroll_pos;
}

window.addEventListener("scroll", function (e) {
  curentScroll = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(curentScroll);
      ticking = false;
    });
    ticking = true;
  }
});

let body = document.body;

let modal = document.querySelector(".modal");

let modalOpens = document.querySelectorAll(".open-modal");
modalOpens.forEach((modalOpen) => {
  modalOpen.addEventListener("click", function (e) {
    modal.classList.add("opened");
    modalOpening();
  });
})

let modalClose = document.querySelector(".close-modal");
modalClose.addEventListener("click", function (e) {
  modalClosing();
});

let modalOpenClosing = document.querySelector(".modal");
modalOpenClosing.addEventListener("click", function (e) {
  if (e.target == e.currentTarget) {
    modalClosing();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === 'Escape') {
    modalClosing();
  }
});

function modalOpening() {
  modal.classList.add("opened");
  body.classList.add("block-overflow");
  body.style.paddingRight = getScrollbarWidth() + "px";
  header.style.paddingRight = getScrollbarWidth() + "px";
}

function modalClosing() {
  modal.classList.add("closing")
  setTimeout(() => {
   modal.classList.remove("opened");
   body.classList.remove("block-overflow");
   body.style.paddingRight = "0px";
   header.style.paddingRight = "0px";
   modal.classList.remove("closing");
 }, 190)
}

function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}
