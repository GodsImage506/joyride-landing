const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'longform.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Joyride landing pages running');
});
