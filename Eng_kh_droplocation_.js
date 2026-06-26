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
