require('dotenv').config(); // Load variables from .env file

const mongoose = require('mongoose');

// Use the cloud MongoDB URL from .env
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.log("❌ MongoDB connection error:", err));

// User Schema
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('user', userSchema);
