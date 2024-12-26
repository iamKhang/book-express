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


exports.getBookByCode = async (req, res) => {
  try {
    const bookId = req.params.code; 
    const book = await Book.findById(bookId);
    console.log("Book:", book);
    if (!book) {
      return res.status(404).send('Book not found');
    }
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
    res.render('product-detail', { book });
  } catch (err) {
    console.error('Error fetching book by id:', err);
    res.status(500).send('Internal Server Error');
  }
};
