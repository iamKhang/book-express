const Book = require("../models/book");
const diacritics = require("diacritics");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    // Calculate discounted price and format prices in VND
    books.forEach((book) => {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      if (book.discount) {
        book.discountedPrice = formatter.format(
          book.originalPrice * (1 - book.discount / 100)
        );
      } else {
        book.discountedPrice = formatter.format(book.originalPrice);
      }
      book.originalPriceFormatted = formatter.format(book.originalPrice);
    });
    res.render("home", { books });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getBookByCode = async (req, res) => {
  try {
    const bookId = req.params.code;
    const book = await Book.findById(bookId);
    console.log("Book:", book);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    if (book.discount) {
      book.discountedPrice = formatter.format(
        book.originalPrice * (1 - book.discount / 100)
      );
    } else {
      book.discountedPrice = formatter.format(book.originalPrice);
    }
    book.originalPriceFormatted = formatter.format(book.originalPrice);
    res.render("product-detail", { book });
  } catch (err) {
    console.error("Error fetching book by id:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { category, priceRange, keyword } = req.query;
    let query = {};

    // Add category filter if selected
    if (category) {
      query.listCategory = category;
    }

    // Add price range filter if selected
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      query.originalPrice = { $gte: min, $lte: max };
    }

    // Add keyword search if provided
    if (keyword && keyword.trim()) {
      const searchKeyword = keyword.trim();
      console.log("Search keyword without accents:", searchKeyword);
      query.title = { $regex: searchKeyword, $options: "i" }; // Case-insensitive partial match
    }


    // Log query for debugging
    console.log("Search query:", JSON.stringify(query, null, 2));

    const books = await Book.find(query);
    console.log("Found books:", books.length);

    // Format prices using the existing formatter
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    books.forEach((book) => {
      if (book.discount) {
        book.discountedPrice = formatter.format(
          book.originalPrice * (1 - book.discount / 100)
        );
      } else {
        book.discountedPrice = formatter.format(book.originalPrice);
      }
      book.originalPriceFormatted = formatter.format(book.originalPrice);
    });

    res.render("home", {
      books,
      searchParams: { category, priceRange, keyword },
    });
  } catch (err) {
    console.error("Error searching books:", err);
    res.status(500).send("Internal Server Error");
  }
};
