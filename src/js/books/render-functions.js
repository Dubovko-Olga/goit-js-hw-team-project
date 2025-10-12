import { getAllBooks, getCategories, getBookByCat, getBookById } from './api';

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const counter = document.querySelector('.counter');

let allBooks = [];
let currentBooks = [];
let currentIndex = 0;
let selectedCategory = 'All categories';
let allCategories = [];

const LOAD_MORE_COUNT = 4;
let isMobileView = window.innerWidth < 1440;

// =====================
//   CREATE CATEGORIES
// =====================
export async function createCategories() {
  try {
    if (allCategories.length === 0) {
      const categories = await getCategories();

      const validCategories = categories.filter(
        cat => cat.list_name && cat.list_name.trim() !== ''
      );

      allCategories = [{ list_name: 'All categories' }, ...validCategories];
    }

    const select = document.querySelector('#categories-select');
    const categoriesList = document.querySelector('.categories-list');

    select.innerHTML = '';
    categoriesList.innerHTML = '';

    const isMobile = window.innerWidth < 1440;

    if (isMobile) {
      // ---------- СЕЛЕКТ ДЛЯ МОБИЛКИ ----------
      allCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.list_name;
        option.textContent = cat.list_name;
        select.appendChild(option);
      });

      select.addEventListener('change', async e => {
        selectedCategory = e.target.value;

        if (selectedCategory === 'All categories') {
          renderBooks(allBooks);
        } else {
          try {
            const data = await getBookByCat(selectedCategory);
            renderBooks(data);
          } catch (error) {
            console.error('Error loading category books:', error);
          }
        }
      });

      if (allBooks.length > 0) {
        renderBooks(allBooks);
      } else {
        const data = await getAllBooks();
        allBooks = data.flatMap(cat => cat.books);
        renderBooks(allBooks);
      }
    } else {
      // ---------- СПИСОК ДЛЯ ДЕСКТОПА ----------
      const markup = allCategories
        .filter(cat => cat.list_name && cat.list_name.trim() !== '')
        .map(
          cat => `
            <li class="category-item ${
              cat.list_name === 'All categories' ? 'active' : ''
            }">${cat.list_name}</li>`
        )
        .join('');

      categoriesList.insertAdjacentHTML('beforeend', markup);
      categoriesList.addEventListener('click', onCategoryClick);

      if (allBooks.length > 0) {
        renderBooks(allBooks);
      } else {
        const data = await getAllBooks();
        allBooks = data.flatMap(cat => cat.books);
        renderBooks(allBooks);
      }
    }
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}
// =====================
//   CREATE BOOKS
// =====================
export async function createBooks() {
  try {
    const data = await getAllBooks();
    allBooks = data.flatMap(category => category.books);
    selectedCategory = 'All categories';
    renderBooks(allBooks);
  } catch (error) {
    console.error('Error loading books:', error);
  }
}

// =====================
//   RENDER BOOKS
// =====================
function renderBooks(books) {
  currentBooks = books;
  currentIndex = 0;
  gallery.innerHTML = '';
  const initialCount = window.innerWidth < 768 ? 10 : 24;
  renderNextBooks(initialCount);
}

// =====================
//   LOAD MORE BOOKS
// =====================
function renderNextBooks(count) {
  const nextBooks = currentBooks.slice(currentIndex, currentIndex + count);

  if (nextBooks.length === 0) {
    loadMoreBtn.style.display = 'none';
    return;
  }

  const markup = nextBooks
    .map(
      ({ author, title, book_image, price = '10.00' }) => `
      <li class="gallery-item">
        <img src="${book_image}" alt="${title}">
        <div class = 'book-header'>
        <p class="book-title">${title}</p>
        <p class="book-price">$${price === '0.00' ? '10.00' : price}</p>
        </div>
        <p class="book-author">${author}</p>
        
        
        <button class="learn-more">Learn More</button>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  currentIndex += count;

  loadMoreBtn.style.display =
    currentIndex >= currentBooks.length ? 'none' : 'block';

  updateCounter();
  addLearnMoreListeners();
}

// =====================
//   COUNTER
// =====================
function updateCounter() {
  counter.textContent = `Showing ${Math.min(
    currentIndex,
    currentBooks.length
  )} from ${currentBooks.length}`;
}

// =====================
//   LOAD MORE BUTTON
// =====================
export function onLoadMore() {
  renderNextBooks(LOAD_MORE_COUNT);
  smoothScroll();
}

// =====================
//   CATEGORY CLICK
// =====================
export async function onCategoryClick(event) {
  const clicked = event.target;
  if (!clicked.classList.contains('category-item')) return;

  const category = clicked.textContent.trim();
  selectedCategory = category;

  document
    .querySelectorAll('.category-item')
    .forEach(item => item.classList.remove('active'));
  clicked.classList.add('active');

  if (category === 'All categories') {
    renderBooks(allBooks);
    return;
  }

  try {
    const data = await getBookByCat(category);
    renderBooks(data);
  } catch (error) {
    console.error('Error loading category books:', error);
  }
}

// =====================
//   HANDLE RESIZE
// =====================
window.addEventListener('resize', () => {
  const newIsMobile = window.innerWidth < 1440;
  if (newIsMobile !== isMobileView) {
    isMobileView = newIsMobile;
    createCategories(); // 🔄 перестроить категории
  }
});
function addLearnMoreListeners() {
  const buttons = document.querySelectorAll('.learn-more');

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
      try {
        const book = currentBooks[index];
        const fullBookData = await getBookById(book._id);

        console.log(fullBookData);
      } catch (error) {
        console.error('Error fetching book by ID:', error);
      }
    });
  });
}

function smoothScroll() {
  const { height } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
