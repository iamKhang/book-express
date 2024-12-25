const express = require('express');
const router = express.Router();

const books = [
  {
    title: 'The Catcher in the Rye',
    price: 10,
    discount: 0.1,
    stock: 10,
    imageUri: 'https://cdn0.fahasa.com/media/catalog/product/c/o/combo-8935251401929-8935251418170.jpg'
  },
  {
    title: 'The Catcher in the Rye',
    price: 10,
    discount: 0.1,
    stock: 10,
    imageUri: 'https://cdn0.fahasa.com/media/catalog/product/c/o/combo-8935251401929-8935251418170.jpg'
  },
  {
    title: 'The Catcher in the Rye',
    price: 10,
    discount: 0.1,
    stock: 10,
    imageUri: 'https://cdn0.fahasa.com/media/catalog/product/c/o/combo-8935251401929-8935251418170.jpg'
  },
  {
    title: 'The Catcher in the Rye',
    price: 10,
    discount: 0.1,
    stock: 10,
    imageUri: 'https://cdn0.fahasa.com/media/catalog/product/c/o/combo-8935251401929-8935251418170.jpg'
  },
  {
    title: 'The Catcher in the Rye',
    price: 10,
    discount: 0.1,
    stock: 10,
    imageUri: 'https://cdn0.fahasa.com/media/catalog/product/c/o/combo-8935251401929-8935251418170.jpg'
  },
  {
    title: 'The Catcher in the Rye',
    price: 10,
    discount: 0.1,
    stock: 10,
    imageUri: 'https://cdn0.fahasa.com/media/catalog/product/c/o/combo-8935251401929-8935251418170.jpg'
  },
];

// Calculate original price
books.forEach(book => {
  if (book.discount) {
    book.originalPrice = (book.price / (1 - book.discount)).toFixed(2);
  }
});

router.get('/', (req, res) => {
  res.render('home', { books });
});

module.exports = router;
