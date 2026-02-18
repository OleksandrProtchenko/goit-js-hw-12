import { perPage, request } from './js/pixabay-api';
import {
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  loadBtn,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';
import { clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);
loadBtn.addEventListener('click', onLoadMoreClick);

let resInput = '';
let pageNum = 1;
let totalPages = 0;

hideLoader();

async function onSubmitForm(event) {
  event.preventDefault();
  pageNum = 1;

  hideLoadMoreButton();
  clearGallery();

  resInput = new FormData(form).get('search-text').trim();

  try {
    if (resInput === '') {
      rejectUserInput();
      return;
    }

    showLoader();

    const { hits, totalHits } = await request(resInput, pageNum);
    totalPages = Math.ceil(totalHits / perPage);

    if (!hits || hits.length === 0) {
      rejectEmptyRequest();
      return;
    }

    createGallery(hits);

    if (pageNum < totalPages) {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoadMoreButton();
    console.log(error.message);
    displayToast(
      'Sorry, there are no images matching your search query. Please try again!',
      'error'
    );
  } finally {
    form.reset();
    hideLoader();
  }
}

async function onLoadMoreClick() {
  try {
    showLoader();
    pageNum += 1;
    const { hits } = await request(resInput, pageNum);

    if (pageNum === totalPages) {
      displayToast(
        "We're sorry, but you've reached the end of search results.",
        'info'
      );
      hideLoadMoreButton();
    }

    createGallery(hits);
    scrollDown();
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

//? Helper functions

function displayToast(message, toastType = 'error') {
  iziToast.settings({
    position: `topRight`,
    maxWidth: `432px`,
    messageColor: `#ffffff`,
  });
  switch (toastType) {
    case 'error':
      iziToast.error({
        message: message,
      });
      break;
    case 'info':
      iziToast.info({
        message: message,
      });
      break;
    default:
      break;
  }
}

function rejectUserInput() {
  displayToast('Please enter a search query!', 'error');
  hideLoadMoreButton();
  hideLoader();
  clearGallery();
}

function rejectEmptyRequest() {
  displayToast(
    'Sorry, there are no images matching your search query. Please try again!',
    'error'
  );
  hideLoader();
}

function scrollDown() {
  const el = document.querySelector('.gallery');
  const liEl = el.firstElementChild;

  if (!liEl) return;

  const { height } = liEl.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
