const langSelect_track = document.getElementById("trackadsolve");

const currentPath3 = window.location.pathname;
if (currentPath3.includes("trackandsolve_khmer.html")) {
  langSelect_track.value = "trackandsolve_khmer.html";
} else {
  langSelect_track.value = "trackandsolve.html";
}

langSelect_track.addEventListener("change", function () {
  if (this.value) {
    window.location.href = this.value;
  }
});
