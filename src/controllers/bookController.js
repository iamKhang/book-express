const Book = require('../models/book');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    // Calculate discounted price and format prices in VND
    books.forEach(book => {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      });
      if (book.discount) {
        book.discountedPrice = formatter.format(book.originalPrice * (1 - book.discount / 100));
      } else {
        book.discountedPrice = formatter.format(book.originalPrice);
      }
      book.originalPriceFormatted = formatter.format(book.originalPrice);
    });
    res.render('home', { books });
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).send('Internal Server Error');
  }
};
