import { initializeBizMap, addPointsToMap} from "./biz-map.js";

function initFilters(bizpoints, map) {
    const filterCheckboxes = document.querySelectorAll('[name="biz-filters"]');
  
    for (const cb of filterCheckboxes) {
      cb.addEventListener('change', () => {
        applyFilters();
      });
    }


    function applyFilters() {
    let checkedBusinessTypes = [];
    for (const checkbox of filterCheckboxes) {
        if (checkbox.checked) {
            checkedBusinessTypes.push(checkbox.value);
        }
    }

    if (checkedBusinessTypes.length === 0) {
        // If no checkboxes are checked, display all points
        map.dataLayer.clearLayers();
        addPointsToMap(bizpoints);
    } else {
        // Filter and display points based on checked checkboxes
        let filteredBusinesses = bizpoints.features.filter(b => checkedBusinessTypes.includes(b.properties["Type of Business"]));
        map.dataLayer.clearLayers();

        for (const point of filteredBusinesses) {
          const [lon, lat] = point.geometry.coordinates;
          const name = point.properties.Business;

          const marker = L.circleMarker([lat, lon], {
              radius: 3,
              title: name,
              fillColor: 'red',
              color: 'red',
              alt: name,
              // Use the same styling options as in addPointsToMap in map.js
          });

          marker.bindTooltip(name);
          map.dataLayer.addLayer(marker);
        }


         }
        } 

  }
  
export {
    initFilters,
}