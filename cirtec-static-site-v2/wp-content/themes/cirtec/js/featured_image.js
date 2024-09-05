// https://gomakethings.com/how-to-get-an-elements-distance-from-the-top-of-the-page-with-vanilla-javascript/
const getOffsetTop = (elem) => {
  // Set our distance placeholder
  let distance = 0;

  // Loop up the DOM
  if (elem.offsetParent) {
    do {
      distance += elem.offsetTop;
      elem = elem.offsetParent;
    } while (elem);
  }

  // Return our distance
  return distance < 0 ? 0 : distance;
};

const handleWrapHeight = (wrap, left, right) => {
  if (window.innerWidth >= 1050) {
    const biggest =
      right.getBoundingClientRect().height >
      left.firstElementChild.getBoundingClientRect().height
        ? right.getBoundingClientRect().height
        : left.firstElementChild.getBoundingClientRect().height;

    wrap.style.height = `${biggest}px`;
  } else {
    wrap.style.height = `100%`;
  }
};

const handleFeaturedImage = (() => {
  const roots = _getAll(".featured-image-wrapper");

  roots.forEach((root) => {
    const wrap = root.firstElementChild;
    const left = wrap.children[0];
    const right = wrap.children[1];

    const endSection = _get(".end-marker", root);

    handleWrapHeight(wrap, left, right);

    window.addEventListener("scroll", () => {
      if (window.innerWidth <= 800) {
        left.style.top = `0`;
        right.style.top = `0`;
      } else {
        // scroll position, start and end of element
        const position = getPageScroll();

        // subtract innerHeight to get when element is at bottom of view
        const start = getOffsetTop(wrap) - window.innerHeight;

        // get number of pixels from top of window
        const end = getOffsetTop(endSection);

        // get progress into section, # of pixels in section and how much we've progressed
        const progess = position - start;
        const range = end - start;
        const percent = (progess / range) * 100;

        if (percent >= -1 && percent <= 100) {
          if (window.innerWidth < 1050) {
            // accomdate layout at 1050 to 800px
            right.style.top = `${percent * 1.5}px`;
            left.style.top = `${100 - percent * 3.5}px`;
          } else {
            left.style.top = `${percent * 1.5}px`;
            right.style.top = `${100 - percent * 2.5}px`;
          }
        }
      }
    });

    window.addEventListener("resize", () => {
      handleWrapHeight(wrap, left, right);
    });
  });
})();
