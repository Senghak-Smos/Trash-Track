const langSelect = document.getElementById("lang-select");

const currentPath = window.location.pathname;
if (currentPath.includes("index_khmer.html")) {
  langSelect.value = "index_khmer.html";
} else {
  langSelect.value = "index.html";
}

langSelect.addEventListener("change", function () {
  if (this.value) {
    window.location.href = this.value;
  }
});

// ============== for upload image =================
const imageInput = document.getElementById("imageinput");
const imagePreview = document.getElementById("imagepreview");
const browserBtn = document.getElementById("browserBtn");

const texttitle = document.querySelector(".container-title h4");
const textsupport = document.querySelector(".container-title p");

browserBtn.addEventListener("click", function () {
  imageInput.click();
});

imagePreview.addEventListener("click", function () {
  imageInput.click();
});

imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const read = new FileReader();
    read.addEventListener("load", function () {
      imagePreview.setAttribute("src", this.result);

      if (texttitle) texttitle.style.display = "none";
      if (textsupport) textsupport.style.display = "none";
    });
    read.readAsDataURL(file);
  }
});

// ================= Get location ==========================
let pickerMap;
let pickerMarker;

const backupLat = 11.5682;
const backupLon = 104.8907;

function openInteractiveMap() {
  document.getElementById("beforeMap").style.display = "none";
  document.getElementById("pickerMap").style.display = "block";
  document.getElementById("locationStatus").innerText =
    "⏳Tracking your location...";

  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        
        initMap(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        
        console.warn("Geolocation error: " + error.message);
        initMap(backupLat, backupLon);
      },
      { enableHighAccuracy: true, timeout: 8000 }, 
    );
  } else {
    
    initMap(backupLat, backupLon);
  }
}


function initMap(lat, lon) {
  if (!pickerMap) {
    
    pickerMap = L.map("pickerMap").setView([lat, lon], 15); 

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(pickerMap);

  
    pickerMarker = L.marker([lat, lon], { draggable: true }).addTo(pickerMap);

   
    pickerMarker.on("dragend", function (e) {
      const coords = pickerMarker.getLatLng();
      saveCoords(coords.lat, coords.lng);
    });

    
    pickerMap.on("click", function (e) {
      pickerMarker.setLatLng(e.latlng);
      saveCoords(e.latlng.lat, e.latlng.lng);
    });
  } else {
    
    pickerMap.setView([lat, lon], 15);
    pickerMarker.setLatLng([lat, lon]);
  }

  saveCoords(lat, lon);


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
