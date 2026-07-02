const langSelect_droplocat = document.getElementById("droplocation");

const currentPath2 = window.location.pathname;
if (currentPath2.includes("droplocation_khmer.html")) {
  langSelect_droplocat.value = "droplocation_khmer.html";
} else {
  langSelect_droplocat.value = "droplocation.html";
}

langSelect_droplocat.addEventListener("change", function () {
  if (this.value) {
    window.location.href = this.value;
  }
});


// ================= Get location ==========================
let pickerMap;
let pickerMarker;

// ទីតាំងត្រៀមបម្រុង (RUPP) ករណីចាប់ GPS ទូរស័ព្ទមិនបាន
const backupLat = 11.5682;
const backupLon = 104.8907;

function openInteractiveMap() {
  document.getElementById("beforeMap").style.display = "none";
  document.getElementById("pickerMap").style.display = "block";
  document.getElementById("locationStatus").innerText =
    "⏳ ឧបករណ៍កំពុងទាញយកទីតាំងបច្ចុប្បន្នរបស់អ្នក...";

  // ពិនិត្យមើលថាតើឧបករណ៍/Browser គាំទ្រការចាប់ទីតាំងដែរឬទេ
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // បើចាប់ទីតាំងបាន៖ យកកូអរដោនេពិតរបស់អ្នកប្រើប្រាស់
        initMap(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        // បើចាប់មិនបាន (User បដិសេធ)៖ យកទីតាំង RUPP មកប្រើជំនួស
        console.warn("Geolocation error: " + error.message);
        initMap(backupLat, backupLon);
      },
      { enableHighAccuracy: true, timeout: 8000 }, // កំណត់ឱ្យចាប់ឱ្យច្បាស់លាស់បំផុត
    );
  } else {
    // បើ Browser មិនគាំទ្រសោះ៖ យកទីតាំង RUPP មកប្រើជំនួស
    initMap(backupLat, backupLon);
  }
}

// មុខងារបង្កើត ឬរំកិលផែនទី
function initMap(lat, lon) {
  if (!pickerMap) {
    // បង្កើតផែនទីដំបូងចំកន្លែងដែលចាប់បាន
    pickerMap = L.map("pickerMap").setView([lat, lon], 15); // Zoom level 15 ឱ្យឃើញផ្ទះច្បាស់ជាងមុន

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(pickerMap);

    // បង្កើត Pin ដែលអាចអូសទាញបាន
    pickerMarker = L.marker([lat, lon], { draggable: true }).addTo(pickerMap);

    // ១. ពេលអ្នកប្រើប្រាស់អូស Pin ទម្លាក់
    pickerMarker.on("dragend", function (e) {
      const coords = pickerMarker.getLatLng();
      saveCoords(coords.lat, coords.lng);
    });

    // ២. ពេលអ្នកប្រើប្រាស់ចុចចំកន្លែងណាមួយលើផែនទី
    pickerMap.on("click", function (e) {
      pickerMarker.setLatLng(e.latlng);
      saveCoords(e.latlng.lat, e.latlng.lng);
    });
  } else {
    // ប្រសិនបើផែនទីធ្លាប់បង្កើតរួចហើយ គ្រាន់តែរំកិលវាទៅកន្លែងថ្មី
    pickerMap.setView([lat, lon], 15);
    pickerMarker.setLatLng([lat, lon]);
  }

  saveCoords(lat, lon);

  // បង្ខំឱ្យផែនទី Refresh ទំហំដើម្បីកុំឱ្យចេញផ្ទាំងប្រផេះ
  setTimeout(() => {
    pickerMap.invalidateSize();
  }, 100);
}

function saveCoords(lat, lon) {
  document.getElementById("userLat").value = lat;
  document.getElementById("userLon").value = lon;

  document.getElementById("locationStatus").innerHTML =
    `Done get location! (Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)})`;
}
