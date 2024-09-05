//  A formatted version of a popular md5 implementation.
//  Original copyright (c) Paul Johnston & Greg Holt.
//  The function itself is now 42 lines long.

function md5(inputString) {
  var hc = "0123456789abcdef";
  function rh(n) {
    var j,
      s = "";
    for (j = 0; j <= 3; j++)
      s +=
        hc.charAt((n >> (j * 8 + 4)) & 0x0f) + hc.charAt((n >> (j * 8)) & 0x0f);
    return s;
  }
  function ad(x, y) {
    var l = (x & 0xffff) + (y & 0xffff);
    var m = (x >> 16) + (y >> 16) + (l >> 16);
    return (m << 16) | (l & 0xffff);
  }
  function rl(n, c) {
    return (n << c) | (n >>> (32 - c));
  }
  function cm(q, a, b, x, s, t) {
    return ad(rl(ad(ad(a, q), ad(x, t)), s), b);
  }
  function ff(a, b, c, d, x, s, t) {
    return cm((b & c) | (~b & d), a, b, x, s, t);
  }
  function gg(a, b, c, d, x, s, t) {
    return cm((b & d) | (c & ~d), a, b, x, s, t);
  }
  function hh(a, b, c, d, x, s, t) {
    return cm(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a, b, c, d, x, s, t) {
    return cm(c ^ (b | ~d), a, b, x, s, t);
  }
  function sb(x) {
    var i;
    var nblk = ((x.length + 8) >> 6) + 1;
    var blks = new Array(nblk * 16);
    for (i = 0; i < nblk * 16; i++) blks[i] = 0;
    for (i = 0; i < x.length; i++)
      blks[i >> 2] |= x.charCodeAt(i) << ((i % 4) * 8);
    blks[i >> 2] |= 0x80 << ((i % 4) * 8);
    blks[nblk * 16 - 2] = x.length * 8;
    return blks;
  }
  var i,
    x = sb(inputString),
    a = 1732584193,
    b = -271733879,
    c = -1732584194,
    d = 271733878,
    olda,
    oldb,
    oldc,
    oldd;
  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = ad(a, olda);
    b = ad(b, oldb);
    c = ad(c, oldc);
    d = ad(d, oldd);
  }
  return rh(a) + rh(b) + rh(c) + rh(d);
}

// document.querySelectorAll wrapper for convieniece.
const _getAll = (selector, parent = document) => {
  return Array.from(parent.querySelectorAll(selector));
};

// document.querySelector wrapper for convieniece.
const _get = (selector, parent = document) => {
  return parent.querySelector(selector);
};

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function wait_for_dimensions(jq, callback, iterations) {
  if (typeof iterations == "undefined") iterations = 0;

  var item = jq.get(0);
  if (typeof item.naturalWidth != "undefined" && item.naturalWidth > 0) {
    callback(item.naturalWidth, item.naturalHeight, iterations);
  } else {
    var me = this;
    //slowly increase the time between each call
    setTimeout(function () {
      wait_for_dimensions(jq, callback, ++iterations);
    }, iterations + 1);
  }
}
function image_zoom(container, src) {
  var min_zoom = 1.5;
  var max_zoom = 2.5;
  var zoom = jQuery(
    '<div class="image-zoom" style="position: absolute;z-index: 10000;top: 0;left: 0;right: 0;bottom: 0;overflow: hidden;background:black;"/>'
  );
  var img = jQuery(
    '<img src="' + src + '" style="position:absolute;top:0;left:0;">'
  );
  var btn_close = jQuery(
    '<div class="image-zoom-close" style="position:absolute;z-index:10001;top:0;right:0;cursor:pointer;"><span>X</span></div>'
  );
  var running = true;

  zoom.append(img, btn_close);
  container.append(zoom);

  btn_close.click(function () {
    if (running) {
      running = false;
      zoom.remove();
    }
  });

  wait_for_dimensions(img, function (width, height) {
    var container_width = zoom.width();
    var container_height = zoom.height();

    var max_width = container_width * max_zoom;
    var max_height = container_height * max_zoom;
    var min_width = container_width * min_zoom;
    var min_height = container_height * min_zoom;

    if (width > max_width) {
      height = (max_width / width) * height;
      width = max_width;
    } else if (width < min_width) {
      height = (min_width / width) * height;
      width = min_width;
    }
    if (height > max_height) {
      width = (max_height / height) * width;
      height = max_height;
    } else if (height < min_height) {
      width = (min_height / height) * width;
      height = min_height;
    }

    var top = (container_height - height) / 2;
    var left = (container_width - width) / 2;
    var min_left = -width + container_width;
    var min_top = -height + container_height;
    var updated_left = 0;
    var updated_top = 0;

    img.css({
      width: width,
      height: height,
      top: top,
      left: left,
    });

    track_movement(
      zoom,
      function () {},
      function (x_delta, y_delta) {
        updated_top = top + y_delta;
        updated_left = left + x_delta;

        if (updated_top > 0) updated_top = 0;
        else if (updated_top < min_top) updated_top = min_top;
        if (updated_left > 0) updated_left = 0;
        else if (updated_left < min_left) updated_left = min_left;

        img.css({
          top: updated_top,
          left: updated_left,
        });
      },
      function () {
        top = updated_top;
        left = updated_left;
      },
      true
    );
  });
}

function track_movement(
  jq,
  start_callback,
  move_callback,
  release_callback,
  track_mouse,
  ignore_y
) {
  var is_down = false;
  var start_x = 0;
  var start_y = 0;
  if (typeof ignore_y == "undefined") ignore_y = false;
  if (typeof track_mouse == "undefined") track_mouse = false;
  if (track_mouse)
    jq.mouseleave(function () {
      if (is_down) {
        is_down = false;
        setTimeout(function () {
          jq.removeClass("noclick");
        }, 125);
        release_callback();
      }
    });
  if (track_mouse)
    jq.on("mousedown", function (ev) {
      is_down = true;
      start_x = ev.clientX;
      start_y = ev.clientY;
      start_callback(start_x, start_y);
      return false;
    });
  if (track_mouse)
    jq.on("mouseup", function (ev) {
      if (is_down) {
        is_down = false;
        setTimeout(function () {
          jq.removeClass("noclick");
        }, 125);
        release_callback();
      }
    });
  if (track_mouse)
    jq.on("mousemove", function (ev) {
      if (is_down) {
        var x_delta = ev.clientX - start_x;
        var y_delta = ev.clientY - start_y;
        move_callback(x_delta, y_delta, ev.clientX, ev.clientY);
        jq.addClass("noclick");
        return false;
      }
    });
  jq.on("touchstart", function (ev) {
    var touches = ev.originalEvent.touches;
    if (touches.length >= 1) {
      start_x = touches[0].clientX;
      start_y = touches[0].clientY;
      is_down = true;
      start_callback(start_x, start_y);
    }
  });
  jq.on("touchend", function (ev) {
    if (is_down) {
      is_down = false;
      release_callback();
    }
  });
  jq.on("touchmove", function (ev) {
    var touches = ev.originalEvent.touches;
    if (touches.length >= 1) {
      var x_delta = touches[0].clientX - start_x;
      var y_delta = touches[0].clientY - start_y;
      if (ignore_y && Math.abs(y_delta) > Math.abs(x_delta)) {
        return true;
      }
      move_callback(x_delta, y_delta, touches[0].clientX, touches[0].clientY);
      ev.stopImmediatePropagation();
      ev.preventDefault();
      return false;
    }
  });
}

function getPageScroll() {
  return document.body.scrollTop || jQuery(window).scrollTop();
}

function wait_for_visible(jq, callback, delay_callback) {
  if (jq.length == 0) return;

  if (typeof delay_callback == "undefined") delay_callback = 10;

  var jq_win = jQuery(window);

  var chk_timer = setInterval(function () {
    if (jq.is(":visible")) {
      var t = getPageScroll();
      var h = jq_win.height();
      var item_pos = jq.offset().top;
      if (item_pos > t && item_pos < t + h) {
        clearInterval(chk_timer);
        setTimeout(function () {
          callback(jq);
        }, delay_callback);
      }
    }
  }, 250);

  return chk_timer;
}

(function () {
  var lastTime = 0;
  var vendors = ["ms", "moz", "webkit", "o"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] ||
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
})();

(function () {
  // Reasonable defaults
  var PIXEL_STEP = 10;
  var LINE_HEIGHT = 40;
  var PAGE_HEIGHT = 800;

  window.normalizeWheel = function (/*object*/ event) /*object*/ {
    var sX = 0,
      sY = 0, // spinX, spinY
      pX = 0,
      pY = 0; // pixelX, pixelY

    // Legacy
    if ("detail" in event) {
      sY = event.detail;
    }
    if ("wheelDelta" in event) {
      sY = -event.wheelDelta / 120;
    }
    if ("wheelDeltaY" in event) {
      sY = -event.wheelDeltaY / 120;
    }
    if ("wheelDeltaX" in event) {
      sX = -event.wheelDeltaX / 120;
    }

    // side scrolling on FF with DOMMouseScroll
    if ("axis" in event && event.axis === event.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }

    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;

    if ("deltaY" in event) {
      pY = event.deltaY;
    }
    if ("deltaX" in event) {
      pX = event.deltaX;
    }

    if ((pX || pY) && event.deltaMode) {
      if (event.deltaMode == 1) {
        // delta in LINE units
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        // delta in PAGE units
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }

    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY,
    };
  };
})();

var video = {
  // Instances are indexed by the video id rather than 1,2,3,etc so that videos are able to be
  // accessed if they get shuffled around in the UI
  instances: new Object(),

  // Initialize the videos
  // opts - an object of options for the videos. With no options set, the videos will default
  //      - to a looping, muted background video
  init: function (opts) {
    if (typeof opts.selector == "undefined") opts.selector = ".fld-video";
    if (typeof opts.autoplay == "undefined") opts.autoplay = true;
    if (typeof opts.controls == "undefined") opts.controls = "none";
    if (typeof opts.loop == "undefined") opts.loop = true;
    if (typeof opts.muted == "undefined") opts.muted = true;
    if (typeof opts.playBtn == "undefined") {
      opts.playBtn = "images/play-btn.svg";
    }
    if (typeof opts.pauseBtn == "undefined") {
      opts.pauseBtn = "images/pause-btn.svg";
    }

    jQuery(opts.selector).each(function () {
      video.buildVideoHTML(jQuery(this), opts);
    });

    // Hover In:
    // -    Requests a gif of the video, and displays it once it is ready.
    // -    If the gif already exists, show the gif
    // Hover Out:
    // -    Hide the gif
    jQuery(opts.selector).hover(
      function () {
        var previews = jQuery(this).find(".video-previews");
        var gif = jQuery(this).find(".gif");
        if (jQuery(window).width() > 760 && gif.length == 0) {
          var id = jQuery(this).data("id");
          var gif = jQuery(
            '<img class="gif" src="https://videodelivery.net/' +
              id +
              '/thumbnails/thumbnail.gif?time=0s&duration=1s">'
          );
          gif.on("load", function () {
            previews.append(gif);
          });
        } else {
          previews.find(".gif").show();
        }
      },
      function () {
        var previews = jQuery(this).find(".video-previews");
        previews.find(".gif").hide();
      }
    );

    // Hides the video previews (thumbnail and gif) and filter and plays the video
    jQuery(opts.selector).click(function () {
      var id = jQuery(this).data("id");
      jQuery(this).addClass("playing");
      // video.instances[id].player.play().catch(function() {
      //     video.instances[id].player.muted = true;
      //     video.instances[id].player.play();
      // });
    });
  },

  // Create the HTML of the video previews and video. Video properties have defaults,
  // but can be changed by setting the data-{property} attriutes
  // jq   - a jQuery object of an instance of the selector specified in the init function
  // opts - an object of options for the videos.
  buildVideoHTML: function (jq, opts) {
    if (jq.data("id") !== undefined) {
      var id = jq.data("id");
      var html = jQuery(
        '<div class="filter"><div class="button" style="background-image: url(' +
          opts.playBtn +
          ')"></div></div><div class="video-previews"><img class="still" src="https://videodelivery.net/' +
          id +
          '/thumbnails/thumbnail.jpg?time=0s&fit=fill"></div><iframe class="video" src="https://iframe.videodelivery.net/' +
          id +
          '" allow="autoplay; accelerometer; gyroscope; encrypted-media; picture-in-picture;"  allowfullscreen="true"></iframe>'
      );
      jq.append(html);
      video.instances[id] = {
        jq: jq,
        player: Stream(jq.find(".video")[0]),
        playBtn: opts.playBtn,
        pauseBtn: opts.pauseBtn,
      };
      var controls =
        typeof jq.data("controls") !== "undefined"
          ? jq.data("controls")
          : opts.controls;
      if (controls == "full") {
        video.instances[id].player.controls = true;
      } else {
        video.instances[id].player.controls = false;
      }
      // video.instances[id].player.controls = (typeof jq.data('controls') !== 'undefined' ? jq.data('controls') : opts.controls);
      video.instances[id].player.autoplay =
        typeof jq.data("autoplay") !== "undefined"
          ? jq.data("autoplay")
          : opts.autoplay;
      video.instances[id].player.muted =
        typeof jq.data("muted") !== "undefined" ? jq.data("muted") : opts.muted;
      video.instances[id].player.loop =
        typeof jq.data("loop") !== "undefined" ? jq.data("loop") : opts.loop;

      if (video.instances[id].player.autoplay) {
        video.instances[id].player.play();
      }

      if (controls == "none") {
        jq.find(".filter").remove();

        video.instances[id].player.addEventListener("canplay", function () {
          jq.find(".video-previews").remove();
        });
      } else if (controls == "limited") {
        jq.find(".filter").css("pointer-events", "all");

        jq.find(".filter").click(function () {
          if (video.instances[id].player.paused) {
            video.instances[id].player.play();
          } else {
            video.instances[id].player.pause();
          }
        });
      } else if (controls == "full") {
        jq.find(".filter").click(function () {
          jQuery(this).remove();
          video.instances[id].player.play();
        });
      }

      video.instances[id].player.addEventListener("play", function () {
        video.onPlay(video.instances[id]);
      });
      video.instances[id].player.addEventListener("pause", function () {
        video.onPause(video.instances[id]);
      });
    }
  },

  onPlay: function (instance) {
    instance.jq.removeClass("paused");
    instance.jq
      .find(".button")
      .css("background-image", 'url("' + instance.pauseBtn + '")');
  },
  onPause: function (instance) {
    instance.jq.addClass("paused");
    instance.jq
      .find(".button")
      .css("background-image", 'url("' + instance.playBtn + '")');
  },
};

const isInViewport = (elem, direction) => {
  var bounding = elem.getBoundingClientRect();

  if (direction === "left") {
    return bounding.right >= 0;
  } else {
    return bounding.left <= window.innerWidth;
  }
};
