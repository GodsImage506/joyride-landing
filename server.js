const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'longform.html'));
});

app.use(express.static(path.join(__dirname)));

app.listen(process.env.PORT || 3000, () => {
  console.log('Joyride landing pages running');
});
