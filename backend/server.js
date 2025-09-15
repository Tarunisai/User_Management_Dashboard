const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


const userRoutes = require('./routes/users'); 
app.use('/api/users', userRoutes);

const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
