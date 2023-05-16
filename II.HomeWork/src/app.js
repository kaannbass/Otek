const form = document.querySelector("form");
const galleryList = document.querySelector(".search-gallery");
const modal = document.querySelector(".modal");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector("#search-input").value;
  const aa = "car";
  galleryList.innerHTML = "";

  fetch(
    `https://api.unsplash.com/search/photos?query=${aa}&client_id=Je0UqxQNYCz-x9R1uVow91Z2O0kCGkyus6cbwacZ3Kk`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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
    })
    .finally(() => {
      const gallery = document.querySelectorAll(".search-gallery img");
      gallery.forEach((img) => {
        img.addEventListener("click", openModal);
      });
    });
});

const openModal = (e) => {
  modal.classList.add("show");
  const clickedImage = e.target;
  const bigImage = clickedImage.srcset;

  const image = document.createElement("img");
  image.src = bigImage;
  modal.append(image);
};

const closeModel = (e)=>{
    const modal = document.querySelector('')
}
