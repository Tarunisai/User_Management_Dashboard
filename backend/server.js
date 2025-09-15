const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Backend API is running. Use /api/users for requests.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
