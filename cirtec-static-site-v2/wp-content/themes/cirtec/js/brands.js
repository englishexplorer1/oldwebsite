const handleBrands = (() => {
  const roots = _getAll(".brands-wrapper");

  roots.forEach((root) => {
    const triggers = _getAll(".trigger:not(.mobile)", root);
    const mobileTriggers = _getAll(".trigger:not(mobile)", root);
    const tabs = _getAll(".tab", root);

    triggers.forEach((trigger, i) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();

        const target = _get(trigger.dataset.target);

        triggers.forEach((_trigger) => {
          _trigger === trigger
            ? _trigger.classList.add("active")
            : _trigger.classList.remove("active");
        });

        if (target) {
          tabs.forEach((tab) => {
            tab === target
              ? tab.classList.add("active")
              : tab.classList.remove("active");
          });
        }
      });
    });

    mobileTriggers.forEach((trigger, i) => {
      trigger.style.zIndex = i * -1;

      trigger.addEventListener("click", (event) => {
        event.preventDefault();

        mobileTriggers.forEach((_trigger) => {
          const tab = _get(".bottom", _trigger);

          _trigger === trigger
            ? jQuery(tab).slideDown()
            : jQuery(tab).slideUp();

          _trigger === trigger
            ? _trigger.classList.add("show")
            : _trigger.classList.remove("show");
        });
      });
    });
  });
})();
