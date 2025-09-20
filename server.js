require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const connectDB = require('./config/db');
const supplierRoutes = require('./routes/suppliers');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối MongoDB
connectDB();

// View engine + layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Start server
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
