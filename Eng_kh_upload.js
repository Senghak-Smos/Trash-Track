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

// ============== for upload image =================
const imageInput = document.getElementById("imageinput");
const imagePreview = document.getElementById("imagepreview");

const texttitle = document.querySelector(".container-title h4");
const textsupport = document.querySelector(".container-title p");

// លុប Event Listener លើការ click ចេញ ព្រោះយើងបានប្រើ <label for="imageinput"> នៅក្នុង HTML រួចហើយ

imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const read = new FileReader();
    read.addEventListener("load", function () {
      // ប្ដូររូបភាព preview ទៅជារូបភាពដែលបានជ្រើសរើស
      imagePreview.setAttribute("src", this.result);

      // លាក់អក្សរផ្សេងៗពេលមានរូបភាព
      if (texttitle) texttitle.style.display = "none";
      if (textsupport) textsupport.style.display = "none";
    });
    read.readAsDataURL(file);
  }
});