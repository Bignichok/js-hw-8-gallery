import images from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalImage = document.querySelector(".lightbox__image");

const originalLinks = images.map((element) => element.original);

const setImgAttributes = function (img, imgUrl, bigImgUrl, index, alt) {
  img.src = imgUrl;
  img.dataset.source = bigImgUrl;
  img.dataset.index = index;
  img.dataset.alt = alt;
};

const renderHtml = function (images) {
  return images.map((image, index) => {
    const galleryItem = document.createElement("li");
    galleryItem.classList.add("gallery__item");

    const galleryImage = document.createElement("img");
    galleryImage.classList.add("gallery__image");

    const galleryLink = document.createElement("a");
    galleryLink.classList.add("gallery__link");

    galleryItem.appendChild(galleryLink);
    galleryLink.appendChild(galleryImage);

    galleryLink.href = image.original;

    setImgAttributes(
      galleryImage,
      image.preview,
      image.original,
      index,
      image.description
    );

    return galleryItem;
  });
};

const addHtmlImages = function (imagesArr) {
  gallery.append(...imagesArr);
};

const openModal = function () {
  modal.classList.add("is-open");
  modalImage.src = "";
  modalImage.alt = "";
  document.addEventListener("keydown", keysHandler);
};

const closeModal = function () {
  modal.classList.remove("is-open");
  document.removeEventListener("keydown", keysHandler);
};

const prevImgSrc = function () {
  const currentImgSrc = originalLinks.findIndex((el) => el === modalImage.src);
  if (currentImgSrc !== 0) {
    const prevImg = originalLinks[currentImgSrc - 1];
    modalImage.src = prevImg;
  }
};

const nextImageSrc = function () {
  const currentImgSrc = originalLinks.findIndex((el) => el === modalImage.src);
  if (currentImgSrc !== originalLinks.length - 1) {
    const nextImg = originalLinks[currentImgSrc + 1];
    modalImage.src = nextImg;
  }
};

const keysHandler = function (event) {
  const code = event.code;

  if (code === "Escape") {
    closeModal();
  }

  if (code === "ArrowLeft") {
    prevImgSrc();
  }

  if (code === "ArrowRight") {
    nextImageSrc();
  }
};

gallery.addEventListener("click", (event) => {
  event.preventDefault();
  openModal();
  const target = event.target;
  const src = target.dataset.source;
  const alt = target.alt;
  modalImage.src = src;
  modalImage.alt = alt;
});

modal.addEventListener("click", (event) => {
  const target = event.target;

  if (target !== modalImage) {
    closeModal();
  }
});

const galleryItems = renderHtml(images);
addHtmlImages(galleryItems);
