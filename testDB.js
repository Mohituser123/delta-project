const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB!");
  mongoose.connection.close();
})
.catch(err => {
  console.error("❌ Error:", err);
});
