const calculateSlideLeft = (slides, slide, activeIndex) => {
  slides.forEach((_slide, i) => {
    _slide !== slide ? _slide.classList.remove("active") : null;

    _slide.classList.remove("before-active", "after-active");

    if (i < activeIndex) {
      _slide.classList.add("before-active");
      _slide.style.left = `${85 * i}px`;
    }

    if (i === activeIndex) {
      _slide.style.left = `${85 * i}px`;
    }

    if (i > activeIndex) {
      _slide.classList.add("after-active");

      const offset = slides.length - i - 1;
      // const left = _slide.getBoundingClientRect().height - 85 * offset;
      const left = _slide.getBoundingClientRect().height - 85 * offset;
      _slide.style.left = `${left + 21}px`;
    }
  });
};

const handleTabbedCarousel = (() => {
  const roots = _getAll(".tabbed-carousel-swiper");

  const setTimer = (root) => {
    const interval = root.dataset.speed;

    return setInterval(() => {
      const active = _get(".slide.active", root);
      const next = active.nextElementSibling;
      const first = _get(".slide.first", root);
      next ? next.click() : first.click();
    }, interval);
  };

  roots.forEach((root) => {
    const slides = _getAll(".slide", root);
    let timer = setTimer(root);

    slides.forEach((slide, i) => {
      let activeIndex = 1;

      calculateSlideLeft(slides, slides[1], activeIndex);

      slide.addEventListener("click", (e) => {
        if (!e.target.classList.contains("active")) {
          e.preventDefault();
        }

        if (e.isTrusted) {
          clearInterval(timer);
          timer = setTimer(root);
        }

        const activeIndex = slides.indexOf(slide);

        root.className = `tabbed-carousel-swiper active-${activeIndex}`;

        slide.classList.add("active");

        calculateSlideLeft(slides, slide, activeIndex);
      });
    });
  });

  roots.forEach((root) => {});
})();
