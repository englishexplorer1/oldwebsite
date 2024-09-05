const handleTabs = (() => {
  const roots = _getAll(".tabs-wrapper");

  roots.forEach((root) => {
    const triggers = _getAll(".tabs-header button", root);
    const tabs = _getAll(".tabs-content.desktop .hidden-content", root);
    const mobileTabs = _getAll(".tabs-content.mobile .hidden-content", root);

    const handleClick = (e) => {
      e.preventDefault();
      const view = window.innerWidth >= 600 ? "desktop" : "mobile";
      const target = _get(`.${view} ${e.target.dataset.target}`, root);

      if (window.innerWidth >= 600) {
        tabs.forEach((tab) => {
          target === tab
            ? tab.classList.add("active")
            : tab.classList.remove("active");
        });
      } else {
        const targetTab = e.target.nextElementSibling;

        mobileTabs.forEach((tab) => {
          targetTab.firstElementChild === tab
            ? jQuery(targetTab.firstElementChild).slideDown()
            : jQuery(tab).slideUp();
        });

        const header = _get("#header");

        setTimeout(() => {
          jQuery("body,html").animate(
            {
              scrollTop: jQuery(target).offset().top - header.clientHeight * 2,
            },
            500
          );
        }, 500);
      }

      triggers.forEach((trigger) => {
        trigger === e.target
          ? trigger.classList.add("active")
          : trigger.classList.remove("active");
      });
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", handleClick);
    });
  });
})();
