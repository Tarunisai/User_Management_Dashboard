const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.js');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
