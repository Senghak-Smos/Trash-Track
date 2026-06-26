const langSelect_descript = document.getElementById("descript");

const currentPath3 = window.location.pathname;
if (currentPath3.includes("description_khmer.html")) {
  langSelect_descript.value = "description_khmer.html";
} else {
  langSelect_descript.value = "description.html";
}

langSelect_descript.addEventListener("change", function () {
  if (this.value) {
    window.location.href = this.value;
  }
});
