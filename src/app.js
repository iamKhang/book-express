const express = require('express');
const exphbs = require('express-handlebars'); // Sửa dòng import này
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
app.engine('hbs', exphbs.engine({ // Sửa phần cấu hình này
    extname: '.hbs',
    defaultLayout: 'main',
    partialsDir: [
        path.join(__dirname, 'views/partials'),
        path.join(__dirname, 'views/components')  // Thêm đường dẫn components
    ]
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
