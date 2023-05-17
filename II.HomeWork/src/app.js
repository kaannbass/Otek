const form = document.querySelector("form");
const galleryList = document.querySelector(".search-gallery");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
let currentSlideIndex = 0;
let gallery = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector("#search-input").value;
  galleryList.innerHTML = "";

  fetch(
    `https://api.unsplash.com/search/photos?query=${search}&client_id=Je0UqxQNYCz-x9R1uVow91Z2O0kCGkyus6cbwacZ3Kk`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.total != 0) {
        if (data.results.length > 0) {
          data.results.forEach((item) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("gallery-item");
            const image = document.createElement("img");
            image.src = item.urls.small;
            image.srcset = item.urls.full;
            itemElement.appendChild(image);
            galleryList.appendChild(itemElement);
          });
        }
      } else {
        const aa = "Arama kısmını boş bırakamazsınız..!";
        const text = document.createElement("div");
        text.classList.add("error");
        text.innerText = aa;
        galleryList.appendChild(text);
      }
    })
    .finally(() => {
      gallery = document.querySelectorAll(".search-gallery img");
      gallery.forEach((img) => {
        img.addEventListener("click", openModal);
      });
    });
});

function plusSlides(e) {
  if (e.length === 0) {
    return;
  }

  if (e === "next") {
    currentSlideIndex = (currentSlideIndex + 1) % gallery.length;
  } else if (e === "prev") {
    currentSlideIndex =
      (currentSlideIndex - 1 + gallery.length) % gallery.length;
  }

  const currentSlide = gallery[currentSlideIndex];
  const bigImage = currentSlide.srcset;

  const image = modal.querySelector("img");
  image.src = bigImage;
}

const openModal = (e) => {
  modal.classList.add("show");
  const clickedImage = e.target;
  const bigImage = clickedImage.srcset;
  const image = document.createElement("img");
  image.src = bigImage;
  modal.append(image);
};

const closeModal = () => {
  modal.classList.remove("show");
};

close.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

const nextBtn = document.querySelector(".fa-arrow-right");
const prevBtn = document.querySelector(".fa-arrow-left");

nextBtn.addEventListener("click", () => {
  plusSlides("next");
});

prevBtn.addEventListener("click", () => {
  plusSlides("prev");
});
