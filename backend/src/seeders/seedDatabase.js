require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./src/models/User');
const Product = require('./src/models/Product');
const bcryptjs = require('bcryptjs');

const sampleUsers = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+1234567890',
    role: 'customer',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'admin123',
    phone: '+1987654321',
    role: 'admin',
    address: {
      street: '456 Admin Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
    },
  },
];

const sampleProducts = [
  {
    name: 'Wireless Headphones Pro',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life',
    price: 199.99,
    discountPrice: 149.99,
    category: 'Electronics',
    subCategory: 'Audio',
    sku: 'WHP-001',
    stock: 50,
    images: [{ url: 'https://via.placeholder.com/300?text=Headphones', altText: 'Headphones' }],
    tags: ['electronics', 'audio', 'wireless'],
    isFeatured: true,
  },
  {
    name: 'Smartphone Case',
    description: 'Durable protective case for smartphones with shock absorption',
    price: 29.99,
    category: 'Accessories',
    subCategory: 'Phone Accessories',
    sku: 'SPC-001',
    stock: 200,
    images: [{ url: 'https://via.placeholder.com/300?text=Phone+Case', altText: 'Phone Case' }],
    tags: ['accessories', 'protection'],
  },
  {
    name: 'USB-C Cable 3M',
    description: 'High-speed USB-C charging and data transfer cable',
    price: 19.99,
    discountPrice: 14.99,
    category: 'Electronics',
    subCategory: 'Cables',
    sku: 'USB-001',
    stock: 150,
    images: [{ url: 'https://via.placeholder.com/300?text=USB+Cable', altText: 'USB Cable' }],
    tags: ['cables', 'charging'],
    isFeatured: true,
  },
  {
    name: 'Portable Charger 20000mAh',
    description: 'Fast-charging portable battery bank with dual USB ports',
    price: 59.99,
    category: 'Electronics',
    subCategory: 'Power Banks',
    sku: 'PB-001',
    stock: 75,
    images: [{ url: 'https://via.placeholder.com/300?text=Charger', altText: 'Charger' }],
    tags: ['power', 'charging'],
  },
  {
    name: 'Screen Protector',
    description: 'Tempered glass screen protector with easy installation',
    price: 9.99,
    category: 'Accessories',
    subCategory: 'Screen Protection',
    sku: 'SP-001',
    stock: 300,
    images: [{ url: 'https://via.placeholder.com/300?text=Screen+Protector', altText: 'Screen Protector' }],
    tags: ['protection', 'screen'],
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 34.99,
    discountPrice: 24.99,
    category: 'Electronics',
    subCategory: 'Computer Accessories',
    sku: 'WM-001',
    stock: 100,
    images: [{ url: 'https://via.placeholder.com/300?text=Mouse', altText: 'Mouse' }],
    tags: ['computer', 'mouse', 'wireless'],
    isFeatured: true,
  },
  {
    name: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand for better ergonomics',
    price: 49.99,
    category: 'Accessories',
    subCategory: 'Computer Accessories',
    sku: 'LS-001',
    stock: 80,
    images: [{ url: 'https://via.placeholder.com/300?text=Laptop+Stand', altText: 'Laptop Stand' }],
    tags: ['accessories', 'computer'],
  },
  {
    name: 'Keyboard Mechanical RGB',
    description: 'Premium mechanical keyboard with RGB backlighting',
    price: 129.99,
    discountPrice: 99.99,
    category: 'Electronics',
    subCategory: 'Computer Accessories',
    sku: 'KBD-001',
    stock: 60,
    images: [{ url: 'https://via.placeholder.com/300?text=Keyboard', altText: 'Keyboard' }],
    tags: ['keyboard', 'computer', 'gaming'],
    isFeatured: true,
  },
];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('✓ Cleared existing data');

    // Seed users
    const users = await User.insertMany(sampleUsers);
    console.log(`✓ Seeded ${users.length} users`);

    // Seed products
    const productsWithCreator = sampleProducts.map(product => ({
      ...product,
      createdBy: users[0]._id,
    }));
    const products = await Product.insertMany(productsWithCreator);
    console.log(`✓ Seeded ${products.length} products`);

    // Create indexes
    await User.collection.createIndex({ email: 1 });
    await Product.collection.createIndex({ name: 'text', description: 'text' });
    console.log('✓ Created indexes');

    console.log('\n✓ Database seeding completed successfully!');
    console.log('\nTest credentials:');
    console.log('Customer - Email: john@example.com, Password: password123');
    console.log('Admin - Email: admin@example.com, Password: admin123');

    await mongoose.disconnect();
  } catch (error) {
    console.error('✗ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
