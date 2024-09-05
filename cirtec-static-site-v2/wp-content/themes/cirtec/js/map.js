//map
(function () {
  let zoom = 3;

  if (window.innerWidth < 1050) {
    zoom = 2;
  }

  if (window.innerWidth < 800) {
    zoom = 1;
  }

  var map = L.map("locations-map", {
    scrollWheelZoom: false,
  }).setView([38.6644197, -39.6350272], zoom);

  const root = _get("#locations-map");
  const locations = _getAll(".location", root);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution:
      '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);

  var icon = L.icon({
    iconUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25.982' height='37.223' viewBox='0 0 25.982 37.223'%3E%3Cg id='Group_1186' data-name='Group 1186' transform='translate(0 0)'%3E%3Cpath id='Path_42' data-name='Path 42' d='M384.457,99a12.991,12.991,0,0,0-12.991,12.991c0,12.183,12.991,24.232,12.991,24.232s12.991-12.049,12.991-24.232A12.991,12.991,0,0,0,384.457,99Z' transform='translate(-371.466 -98.999)' fill='%233044b5'/%3E%3Ccircle id='Ellipse_4' data-name='Ellipse 4' cx='4.937' cy='4.937' r='4.937' transform='translate(8.068 8.453)' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E%0A",
    iconSize: [25, 37],
    iconAnchor: [12, 37], // in pixels
    popupAnchor: [100, 50], // in percentages
  });

  var markers = [];

  function create_marker({ lat, lng, state, country, title, slug }, i) {
    var marker = L.marker([lat, lng], {
      icon,
      title,
      alt: title,
    });

    let displayCountry = country === "United States" ? "US" : country;

    const popup = `<div class="std-content"><b>${
      title === "Corporate" ? "Headquarters" : title
    }</b><br><p>${
      state ? `${state}, ${displayCountry}` : displayCountry
    }</p><a class="map-trigger" onClick="handleClick('.trigger-0${i}')" href="#${slug}">Details</a></div>`;
    marker.bindPopup(popup);
    marker.addTo(map);

    markers.push(marker);
  }

  locations.forEach((location, i) => {
    create_marker(location.dataset, i);
  });

  window.update_map_markers = function (result) {
    for (var i in result) {
      if (result[i]) {
        markers[i].addTo(map);
      } else {
        markers[i].remove();
      }
    }
  };
})();

function handleClick(target) {
  const trigger = _get(target);
  const header = _get("header");

  if (trigger) {
    if (!trigger.classList.contains("active")) {
      trigger.click();
    }

    // wait for tab tpo open before scrolling to properly calculate offset
    setTimeout(() => {
      jQuery("body,html").animate(
        { scrollTop: jQuery(trigger).offset().top - header.clientHeight * 2 },
        500
      );
    }, 500);
  }
}
