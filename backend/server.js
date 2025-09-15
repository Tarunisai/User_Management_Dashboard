const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();


app.use(cors());
app.use(express.json());


const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);


const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));


app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
