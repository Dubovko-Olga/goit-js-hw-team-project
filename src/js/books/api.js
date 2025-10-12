import axios from 'axios';

const base = 'https://books-backend.p.goit.global/books/';
export async function getCategories() {
  const response = await axios(`${base}category-list`);
  return response.data;
}

export async function getAllBooks() {
  const response = await axios(`${base}top-books`);
  return response.data;
}

export async function getBookByCat(category) {
  const response = await axios(
    `${base}category?category=${encodeURIComponent(category.trim())}`
  );
  return response.data;
}

export async function getBookById(id) {
  const response = await axios(`${base}${id}`);
  return response.data;
}
