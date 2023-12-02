// script.js

document.getElementById("download-pdf").addEventListener("click", () => {
    document.getElementById("main-container").style.padding = "0";
    document.getElementById("container-gone").style.border = "none";
    document.getElementById("button-container").style.display = "none";
  
    html2pdf(document.getElementById("main-container")).save();
    setTimeout(() => {
      document.getElementById("main-container").style.padding = "100px 0";
      document.getElementById("container-gone").style.border =
        "1px solid royalblue";
      document.getElementById("button-container").style.display = "flex";
    }, 1000);
  });
  
  setTimeout(function () {
    showSuccessMessage();
  }, 1000);
  
  function showSuccessMessage() {
    console.log("Showing success message");
  
    setTimeout(function () {
      document.getElementById("loader").style.display = "none";
    }, 1000);
  
    setTimeout(function () {
      document.getElementById("success-message").style.display = "block";
    }, 1200);
  
    setTimeout(function () {
      document.getElementById("container-notif").style.display = "none";
      document.getElementById("success-message").style.display = "none";
      document.getElementById("main-container").style.display = "flex";
    }, 2000);
  }
  