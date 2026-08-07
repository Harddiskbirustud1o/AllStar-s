/* ===========================================================
   AllStar's Guitar Collection — interactions
   Reads product data from js/guitars-data.js (loaded first).
   =========================================================== */

const formatIDR = (n) => "Rp" + n.toLocaleString("id-ID");

const showcaseImg       = document.getElementById("showcaseImg");
const showcaseWatermark = document.getElementById("showcaseWatermark");
const showcaseName      = document.getElementById("showcaseName");
const showcasePrice     = document.getElementById("showcasePrice");
const carTrack           = document.getElementById("carTrack");

let activeIndex = 0;

function renderShowcase(index){
  // wrap around so prev/next never dead-ends
  index = (index + guitars.length) % guitars.length;
  const g = guitars[index];

  showcaseImg.style.opacity = 0;
  showcaseWatermark.style.opacity = 0;

  setTimeout(() => {
    showcaseImg.src = g.image;
    showcaseImg.alt = g.name;
    showcaseImg.classList.remove("is-fallback");
    showcaseImg.onerror = () => {
      showcaseImg.onerror = null;
      showcaseImg.src = "images/guitar-icon.svg";
      showcaseImg.classList.add("is-fallback");
    };
    showcaseWatermark.textContent = g.brand;
    showcaseImg.style.opacity = 1;
    showcaseWatermark.style.opacity = 1;
  }, 120);

  showcaseName.textContent = g.name;
  showcasePrice.textContent = formatIDR(g.price);

  [...carTrack.children].forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });
  activeIndex = index;
}

function renderCarousel(){
  carTrack.innerHTML = "";
  guitars.forEach((g, i) => {
    const card = document.createElement("button");
    card.className = "car-card" + (i === 0 ? " active" : "");
    card.type = "button";
    card.innerHTML = `
      <span class="car-thumb">
        <img src="${g.image}" alt="${g.name}" onerror="this.onerror=null;this.src='images/guitar-icon.svg'; this.classList.add('is-fallback');">
      </span>
      <span class="car-info">
        <span class="name">${g.name}</span>
        <span class="price">${formatIDR(g.price)}</span>
      </span>
    `;
    card.addEventListener("click", () => {
      renderShowcase(i);
      card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
    carTrack.appendChild(card);
  });
}

renderCarousel();
renderShowcase(0);

document.getElementById("ctaBtn").addEventListener("click", () => {
  const g = guitars[activeIndex];
  alert(`Terima kasih! Kami akan menghubungi kamu soal "${g.name}" (${formatIDR(g.price)}).`);
});

// prev/next now move the *selection*, not just the scroll position,
// so the showcase + watermark update to match, then bring the picked
// card into view.
document.querySelector(".car-prev").addEventListener("click", () => {
  renderShowcase(activeIndex - 1);
  carTrack.children[activeIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
});
document.querySelector(".car-next").addEventListener("click", () => {
  renderShowcase(activeIndex + 1);
  carTrack.children[activeIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
});

/* ---- Reviews: placeholder cards (swap copy with real reviews) ---- */
const reviews = [
  { name: "Andra P.", role: "Kolektor Gitar", text: "Prosesnya cepat dan gitarnya sesuai deskripsi. Sangat puas!", photo: "images/reviews/andra.jpg" },
  { name: "Nadia R.", role: "Musisi Studio", text: "Koleksinya lengkap, jarang ada toko yang punya model selangka ini.", photo: "images/reviews/nadia.jpg" },
  { name: "Fajar S.", role: "Gitaris Band", text: "Pelayanan ramah, pengiriman aman, bakal beli lagi ke sini.", photo: "images/reviews/fajar.jpg" },
  { name: "Citra W.", role: "Guru Musik", text: "Harga bersaing untuk kualitas gitar impor yang didapat.", photo: "images/reviews/citra.jpg" },
];
const reviewGrid = document.getElementById("reviewGrid");
reviews.forEach(r => {
  const card = document.createElement("article");
  card.className = "review-card";
  const photoTag = r.photo
    ? `<img src="${r.photo}" alt="${r.name}" onerror="this.remove();">`
    : "";
  card.innerHTML = `
    <div class="r-text">
      <strong>${r.name}</strong>
      <span>${r.role}</span>
      <p>&ldquo;${r.text}&rdquo;</p>
    </div>
    <div class="r-photo">${photoTag}</div>
  `;
  reviewGrid.appendChild(card);
});

/* ---- Mobile nav toggle ---- */
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
navToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
  mainNav.style.display = mainNav.classList.contains("open") ? "flex" : "";
});
