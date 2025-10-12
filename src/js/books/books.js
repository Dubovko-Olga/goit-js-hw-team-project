import {
  createBooks,
  createCategories,
  onLoadMore,
  onCategoryClick,
} from './render-functions';

createCategories();
createBooks();

const category = document.querySelector('.categories');
const loadMoreBtn = document.querySelector('.load-more');

category.addEventListener('click', onCategoryClick);
loadMoreBtn.addEventListener('click', onLoadMore);
