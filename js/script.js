const API_BASE_URL = "https://be-2-section-bandung-group-5-production.up.railway.app";
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

  // if (window.location.pathname.includes("index.html")) {
    await fetchAllAsset();
  // } else if (window.location.pathname.includes("checkout.html")) {
  //   await getUser();
  //   // Implementasi lain yang mungkin diperlukan di halaman checkout
  // }
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

const fetchAllAsset = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/lunggo_asset`);
    const assets = await response.json();
    console.log(assets);

    // Mendapatkan semua elemen kontainer trip card
    const tripCardContainers = document.querySelectorAll(".trip__card");

    // Membuat HTML untuk setiap aset dan mengganti konten elemen kontainer
    assets.forEach((asset) => {
      // Membuat elemen trip card baru
      const newTripCard = document.createElement("div");
      newTripCard.classList.add("trip__card");

      const tripCardHTML = `
				<img src="${asset.image}" alt="trip" />
				<div class="trip__details">
				  <p class="name_destination">${asset.name_destination}</p>
				  <div class="rating"><i class="ri-star-fill"></i> ${asset.rating}</div>
				  <div class="booking__price">
					<div class="price"><span>From</span> Rp.${asset.price}</div>
					<a href="cekout.html?id=${asset.id}" class="book__now">Book Now</a>
				  </div>
				</div>
			`;

      // Menambahkan HTML ke elemen trip card
      newTripCard.innerHTML = tripCardHTML;

      // Menambahkan event listener untuk tombol "Book Now"
      const bookNowButton = newTripCard.querySelector(".book__now");
      bookNowButton.addEventListener("click", () =>
        redirectToCheckout(assetId)
      );

      // Menambahkan elemen trip card baru ke semua kontainer trip card
      tripCardContainers.forEach((container) => {
        container.appendChild(newTripCard.cloneNode(true));
      });
    });
  } catch (error) {
    console.error("Error:", error);
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
  const priceDetail = document.querySelector(".price");
  const priceDetailHtml = `
<h2>Price</h2>
<p id= "price">Rp.${asset.price}</p>`;
  priceDetail.innerHTML = priceDetailHtml;
};

// const getUser = async () => {
//   try {
//     // Implementasi fungsi getUser
//   } catch (err) {
//     console.log(err);
//   }
// };
