const API_BASE_URL = 'https://be-2-section-bandung-group-5-production.up.railway.app';
const navbar = document.querySelector("nav");
const sticky = navbar.offsetTop;

document.addEventListener("DOMContentLoaded", async () => {
	if (window.location.pathname.includes("index.html")) {
		await fetchAllAsset();
	} else if (window.location.pathname.includes("checkout.html")) {
		await getUser();
	}
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

		// Mendapatkan elemen kontainer
		const tripCardContainer = document.querySelector('.trip__card');

		// Membuat HTML untuk setiap aset dan mengganti konten elemen kontainer
		assets.forEach((asset) => {
			const newTripCard = document.createElement('div');
			newTripCard.classList.add('trip__card');
      const tripCardHTML = `
				<img src="${asset.image}" alt="trip" />
				<div class="trip__details">
				  <p id="name_destination">${asset.name_destination}</p>
				  <div class="rating"><i class="ri-star-fill"></i> ${asset.rating}</div>
				  <div class="booking__price">
					<div class="price"><span>From</span> Rp.${asset.price}</div>
					<a href="cekout.html" class="book__now">Book Now</a>
				  </div>
				</div>
			`;

			// Menambahkan elemen trip card baru ke dalam kontainer
			
			newTripCard.innerHTML = tripCardHTML;

			tripCardContainer.appendChild(newTripCard);
		});
	} catch (error) {
		console.error("Error:", error);
	}
};

const getUser = async () => {
  try {
    // Implementasi fungsi getUser
  } catch (err) {
    console.log(err);
  }
};
