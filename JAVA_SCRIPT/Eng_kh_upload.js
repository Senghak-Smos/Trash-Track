const langSelect_upload = document.getElementById("lang-select_up");

const currentPath1 = window.location.pathname;
if (currentPath1.includes("upload_image_khmer.html")) {
  langSelect_upload.value = "upload_image_khmer.html";
} else {
  langSelect_upload.value = "upload_image.html";
}

langSelect_upload.addEventListener("change", function () {
  if (this.value) {
    window.location.href = this.value;
  }
});
