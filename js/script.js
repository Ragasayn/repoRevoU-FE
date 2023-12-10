const API_BASE_URL =
  "https://be-2-section-bandung-group-5-production.up.railway.app";
const navbar = document.querySelector("nav");
const sticky = navbar.offsetTop;

document.addEventListener("DOMContentLoaded", async () => {
  // Mengambil ID dari parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  const assetId = urlParams.get("id");

  if (assetId) {
    // Memanggil fungsi untuk mendapatkan data aset berdasarkan ID
    await getAssetById(assetId);
  } else {
    console.error("No asset ID found in the URL");
  }
  const viewAllButton = document.getElementById("viewAllButton");

  if (viewAllButton) {
    viewAllButton.addEventListener("click", () => {
      // Memanggil kembali fungsi fetchAllAsset untuk menampilkan semua data
      fetchAllAsset(true);
    });
  }
  await fetchAllAsset(false);
});

function handleScroll() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("nav-scroll");
  } else {
    navbar.classList.remove("nav-scroll");
  }
}

const menuToggle = document.querySelector(".menu-toggle input");
const nav = document.querySelector("nav ul");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("slide");
});

const fetchAllAsset = async (viewAll) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lunggo_asset`);
    const assets = await response.json();
    console.log(assets);

    // Mendapatkan semua elemen kontainer trip card
    const tripCardContainers = document.querySelectorAll(".trip__card");

    // Membersihkan kontainer trip card sebelum menambahkan asset
    tripCardContainers.forEach((container) => {
      container.innerHTML = "";
    });

    // Membuat HTML untuk setiap aset dan mengganti konten elemen kontainer
    assets.forEach((asset, index) => {
      // Membuat elemen trip card baru
      const newTripCard = document.createElement("div");
      newTripCard.classList.add("trip__card");
      const formattedPrice = `Rp. ${asset.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      const tripCardHTML = `
        <img src="${asset.image}" alt="trip" />
        <div class="trip__details">
          <p class="name_destination">${asset.name_destination}</p>
          <div class="rating"><i class="ri-star-fill"></i> ${asset.rating}</div>
          <div class="booking__price">
            <div class="price">${formattedPrice}</div>
            <a href="cekout.html?id=${asset.id}" class="book__now">Book Now</a>
          </div>
        </div>
      `;

      // Menambahkan HTML ke elemen trip card
      newTripCard.innerHTML = tripCardHTML;

      // Menambahkan event listener untuk tombol "Book Now"
      const bookNowButton = newTripCard.querySelector(".book__now");
      bookNowButton.addEventListener("click", () =>
        redirectToCheckout(asset.id)
      );

      // Menambahkan elemen trip card baru ke semua kontainer trip card
      if (viewAll || index < 8) {
        tripCardContainers.forEach((container) => {
          container.appendChild(newTripCard.cloneNode(true));
        });
      }
    });

    // Menyembunyikan tombol "View All" jika viewAll adalah true
    const viewAllButton = document.getElementById("viewAllButton");
    if (viewAllButton && viewAll) {
      viewAllButton.style.display = "none";
    }
  } catch (error) {
    console.error("Error:", error);
    // Tambahkan penanganan kesalahan sesuai kebutuhan
  }
};

const redirectToCheckout = (assetId) => {
  // Navigasi ke halaman checkout dengan menyertakan ID sebagai parameter
  window.location.href = `cekout.html?id=${assetId}`;
};
const getAssetById = async (assetId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lunggo_asset/${assetId}`);
    const asset = await response.json();

    // Menampilkan data aset di halaman checkout
    displayAssetDetails(asset);
  } catch (error) {
    console.error("Error:", error);
  }
};

const displayAssetDetails = (asset) => {
  // Menampilkan data aset di halaman checkout
  const assetDetailsContainer = document.querySelector(".asset-details");

  const assetDetailsHTML = `
    <div class="BI-img">
      <img src="${asset.image}" alt="" />
    </div>
    <h2 id= "name_destination">${asset.name_destination}</h2>
    <h3 id= "location">${asset.location}</h3>
  </div>
  `;

  assetDetailsContainer.innerHTML = assetDetailsHTML;

  //Deskripsi + Activity
  const deskripDetail = document.querySelector(".Description-container");
  const deskripDetailHtml = `
  <div class="box">
  <h1>Description</h1>
  <p>${asset.information}</p>
  <br />
  <h1>Package/Activity</h1>
  <p>
    ${asset.important_info}
  </p>
  </div>`;
  deskripDetail.innerHTML = deskripDetailHtml;

  //Price
  const diskon = 0.06;
  const priceDiskon = asset.price * (1 - diskon);
  const totalPrice = priceDiskon;
  const formattedPrice = `Rp. ${asset.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  const priceDetail = document.querySelector(".price");
  const priceDetailHtml = `
  <h2>Price</h2>
  <p id= "price">${formattedPrice}</p>`;
  priceDetail.innerHTML = priceDetailHtml;

  const total = document.querySelector(".total");
  const totalPriceHtml = `
  <h2>Total</h2>
  
  <p id= "price_total">Rp ${totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>`;
  total.innerHTML = totalPriceHtml;
  };
async function submitFormWithoutRedirect() {
  if (validateForm()) {
    addUser();
  } else {
    alert("Please fill in all required fields.");
  }
}

 function validateForm() {
  const dateInput = document.getElementById("date");
  const peopleSelect = document.getElementById("people");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  if (!dateInput.checkValidity()) {
    alert("Please enter a valid date.");
    return false;
  }

  if (!peopleSelect.checkValidity()) {
    alert("Please select the number of people.");
    return false;
  }

  if (!nameInput.checkValidity()) {
    alert("Please enter your full name.");
    return false;
  }
  if (!emailInput.checkValidity()) {
    alert("Please enter your full name.");
    return false;
  }
  if (!phoneInput.checkValidity()) {
    alert("Please enter your full name.");
    return false;
  }
  if (!addressInput.checkValidity()) {
    alert("Please enter your full name.");
    return false;
  }

  return true; // Allow form submission
}
async function addUser() {
  // Extract values from form inputs
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const address_office = document.getElementById("address_office").value;
  const date = document.getElementById("date").value;
  const people = document.getElementById("people").value;
  const basePrice = parseFloat(
    document.getElementById("price").textContent.replace(/\D/g, "")
  );//harga setelah dapat diskon

  // Calculate total price
  const price_total = basePrice * people + 75000;

  // Create user data object
  const userData = {
    name,
    email,
    phone,
    address,
    address_office,
    date,
    people,
    price_total: parseInt(price_total, 10),
  };

  try {
    // Send POST request to add the user with calculated price_total
    await fetch(`${API_BASE_URL}/user_booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  } catch (err) {
    console.log(err);
  }
}

async function submitForm() {
  if (validateForm()) {
    // Call addUser() to add the user and calculate price_total
    await addUser();

    // Retrieve values from the form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const address_office = document.getElementById("address_office").value;
    const date = document.getElementById("date").value;
    const people = document.getElementById("people").value;

    const name_destination = document.getElementById("name_destination").textContent;
    const location = document.getElementById("location").textContent;
    const basedPrice = parseFloat(
      document.getElementById("price").textContent.replace(/\D/g, "")
    );
    const price_total = basedPrice * people + 75000;
    // Construct the URL with query parameters
    const url = `invoice.html?name=${encodeURIComponent(
      name
    )}&email=${encodeURIComponent(email)}
    &phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}
    &address_office=${encodeURIComponent(
      address_office
    )}&date=${encodeURIComponent(date)}
    &people=${encodeURIComponent(people)}&price_total=${encodeURIComponent(
      price_total
    )}
    &name_destination=${encodeURIComponent(
      name_destination
    )}&location=${encodeURIComponent(location)}
    &price=${encodeURIComponent(basedPrice)}`;

    // Navigate to the new URL
    window.location.href = url;
  } else {
    alert("Isi Semua Form !");
  }
}


