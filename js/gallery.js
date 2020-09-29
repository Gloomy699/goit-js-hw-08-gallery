import galleryItems from "./gallery-items.js";

const galleryContainer = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay");
const modalBtnClose = document.querySelector(".lightbox__button");
const modalBtnRight = document.querySelector(".scroll-right");
const modalBtnLeft = document.querySelector(".scroll-left");

galleryContainer.addEventListener("click", modalOpen);
modalBtnClose.addEventListener("click", modalClose);
overlay.addEventListener("click", modalClose);
window.addEventListener("keydown", modalClose);


function createGalleryMarkup(img) {
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
}

galleryContainer.insertAdjacentHTML(
  "beforeend",
  createGalleryMarkup(galleryItems)
);

function modalOpen(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  modal.classList.add("is-open");
  modalImg.src = event.target.dataset.source;
  modalImg.alt = event.target.alt;
  window.addEventListener("keydown", modalImgScrolling);
  window.addEventListener("click", modalImgScrollingWithMouse);
}

function modalClose(event) {
  if (event.currentTarget === event.target || event.code === "Escape") {
    modal.classList.remove("is-open");
    window.removeEventListener("keydown", modalImgScrolling);
    window.removeEventListener("click", modalImgScrollingWithMouse);
  }
}

function modalImgScrolling(event) {
  let imgIndex = galleryItems.findIndex((img) => img.original === modalImg.src);

  if (
   event.code === "ArrowLeft" ||
   event.code === "ArrowDown"  
  ) {
    if (imgIndex === 0) {
      imgIndex += galleryItems.length;
    }
    imgIndex -= 1;
  }
  

  if (
    event.code === "ArrowRight" ||
     event.code === "ArrowUp" 
  ) {
    if (imgIndex === galleryItems.length - 1) {
      imgIndex -= galleryItems.length;
    }
    imgIndex += 1;
  }
  

  modalImg.src = galleryItems[imgIndex].original;
  modalImg.alt = galleryItems[imgIndex].description;
}

function modalImgScrollingWithMouse(event) {
  let imgIndex = galleryItems.findIndex((img) => img.original === modalImg.src);

  if (
  modalBtnLeft === event.target
  ) {
    if (imgIndex === 0) {
      imgIndex += galleryItems.length;
    }
    imgIndex -= 1;
  }
  

  if (
   modalBtnRight === event.target
  ) {
    if (imgIndex === galleryItems.length - 1) {
      imgIndex -= galleryItems.length;
    }
    imgIndex += 1;
  }
  modalImg.src = galleryItems[imgIndex].original;
  modalImg.alt = galleryItems[imgIndex].description;
}
