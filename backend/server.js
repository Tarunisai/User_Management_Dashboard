const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());


app.use('/api/users', require('./routes/users'));


app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
