import galleryItems from "./gallery-items.js";
const refs = {
  galleryContainer: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  modalImg: document.querySelector(".lightbox__image"),
  overlay: document.querySelector(".lightbox__overlay"),
  btnToClose: document.querySelector(".lightbox__button"),
  btnSlideToRight: document.querySelector(".scroll-right"),
  btnSlideToLeft: document.querySelector(".scroll-left"),
};

const createGalleryMarkup = (img) => {
  return img
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`;
    })
    .join("");
};

refs.galleryContainer.insertAdjacentHTML(
  "beforeend",
  createGalleryMarkup(galleryItems)
);

const modalOpen = (event) => {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  refs.modal.classList.add("is-open");
  refs.modalImg.src = event.target.dataset.source;
  refs.modalImg.alt = event.target.alt;
  window.addEventListener("keydown", modalImgScrolling);
  window.addEventListener("click", modalImgScrollingWithMouse);
};

const modalClose = (event) => {
  if (event.currentTarget === event.target || event.code === "Escape") {
    refs.modal.classList.remove("is-open");
    window.removeEventListener("keydown", modalImgScrolling);
    window.removeEventListener("click", modalImgScrollingWithMouse);
  }
};

const modalImgScrolling = (event) => {
  let imgIndex = galleryItems.findIndex(
    (img) => img.original === refs.modalImg.src
  );

  if (event.code === "ArrowLeft" || event.code === "ArrowDown") {
    if (imgIndex === 0) {
      imgIndex += galleryItems.length;
    }
    imgIndex -= 1;
  }

  if (event.code === "ArrowRight" || event.code === "ArrowUp") {
    if (imgIndex === galleryItems.length - 1) {
      imgIndex -= galleryItems.length;
    }
    imgIndex += 1;
  }

  refs.modalImg.src = galleryItems[imgIndex].original;
  refs.modalImg.alt = galleryItems[imgIndex].description;
};

const modalImgScrollingWithMouse = (event) => {
  let imgIndex = galleryItems.findIndex(
    (img) => img.original === refs.modalImg.src
  );

  if (refs.btnSlideToLeft === event.target) {
    if (imgIndex === 0) {
      imgIndex += galleryItems.length;
    }
    imgIndex -= 1;
  }

  if (refs.btnSlideToRight === event.target) {
    if (imgIndex === galleryItems.length - 1) {
      imgIndex -= galleryItems.length;
    }
    imgIndex += 1;
  }
  refs.modalImg.src = galleryItems[imgIndex].original;
  refs.modalImg.alt = galleryItems[imgIndex].description;
};

refs.galleryContainer.addEventListener("click", modalOpen);
refs.btnToClose.addEventListener("click", modalClose);
refs.overlay.addEventListener("click", modalClose);
window.addEventListener("keydown", modalClose);
