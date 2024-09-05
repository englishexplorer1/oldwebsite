const handleHideAndReveal = (() => {
  const roots = _getAll(".hide-and-reveal-wrapper");
  const header = _get("#header");

  roots.forEach((root) => {
    const triggers = _getAll(".trigger", root);

    const handleClick = ({ target }) => {
      if (!target.classList.contains("trigger")) {
        return;
      }

      triggers.forEach((trigger) => {
        const content = _get(".hidden-content", trigger);
        const group = trigger.parentElement.parentElement;

        if (trigger !== target || trigger.classList.contains("active")) {
          trigger.classList.remove("active");
          group.classList.remove("active");
          jQuery(content).slideUp();
        } else {
          group.classList.add("active");
          trigger.classList.add("active");
          jQuery(content).slideDown();

          if (window.innerWidth <= 800) {
            setTimeout(() => {
              jQuery("body,html").animate(
                {
                  scrollTop:
                    jQuery(content).offset().top - header.clientHeight * 3,
                },
                500
              );
            }, 500);
          }
        }
      });
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", handleClick);
      trigger.addEventListener("keydown", ({ code, target }) => {
        code === "Enter" ? handleClick({ target }) : null;
      });

      if (trigger.classList.contains("active")) {
        const content = _get(".hidden-content", trigger);
        const group = trigger.parentElement.parentElement;
        group.classList.add("active");
        jQuery(content).slideDown();
      }
    });
  });
})();
