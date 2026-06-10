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
