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
  document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');
    const address = urlParams.get('address');
    const date = urlParams.get('date')
    const price_total = urlParams.get('price_total')
    const destination = urlParams.get('name_destination')
    const people = urlParams.get('people')
    const location = urlParams.get('location')
    const price = urlParams.get('price')
    // ... retrieve other parameters
    const diskon = 0.06*price*people;
    function formatDate(date = new Date()) {
      const year = date.toLocaleString('default', {year: 'numeric'});
      const month = date.toLocaleString('default', {
        month: '2-digit',
      });
      const day = date.toLocaleString('default', {day: '2-digit'});
    
      return [year, month, day].join('-');
    }
    const total = price_total*people+75000;
    console.log(price_total)
    // Populate the HTML elements with the received data
    document.getElementById('invoiceName').textContent = name;
    document.getElementById('invoiceEmail').textContent = email;
    document.getElementById('invoicePhone').textContent = phone;
    document.getElementById('invoiceAddress').textContent = address;
    document.getElementById('invoiceDate').textContent = formatDate();
    document.getElementById('invoicePrice').textContent = `Rp.${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} x ${people}`;
    document.getElementById('invoiceDestination').textContent = destination;
    document.getElementById('invoiceLocation').textContent = location;
    document.getElementById('invoice-price_total').textContent = `Rp.${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    document.getElementById('invoicePeople').textContent = people; 
    document.getElementById('invoiceDate-1').textContent = date;
    document.getElementById('invoicePrice-based').textContent = `Rp.${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    document.getElementById('invoiceDiscont').textContent = `Rp.${diskon.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    function invoiceNumber(length) {
      const characters = '0123456789';
      let result = '';
    
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
    
      return result;
    }
    document.getElementById('invoiceNumber').textContent = `#${invoiceNumber(9)}-007`
  });
  function goBack() {
    // Menggunakan window.location.href untuk mengarahkan ke halaman index.html
    window.location.href = "index.html";
  
  }