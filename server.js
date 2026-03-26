const express = require('express');
const path = require('path');
const app = express();

const REP_EMAILS = {
  'tyler':    'tyler@joyridefinancial.ca',
  'travis':   'travis@joyridefinancial.ca',
  'taylor':   'taylor@joyridefinancial.ca',
  'taylor-m': 'taylorm@joyridefinancial.ca',
  'summer':   'summer@joyridefinancial.ca',
  'rome':     'rome@joyridefinancial.ca',
  'roman':    'roman@joyridefinancial.ca',
  'kelly':    'kelly@joyridefinancial.ca',
  'kaytlyn':  'kaytlyn@joyridefinancial.ca',
  'jordan':   'jordan@joyridefinancial.ca',
  'jeremy':   'jeremy@joyridefinancial.ca',
  'jacob':    'jacob@joyridefinancial.ca',
  'graham':   'graham@joyridefinancial.ca',
  'dessa':    'dessa@joyridefinancial.ca',
  'dave':     'dave@joyridefinancial.ca',
  'channing': 'channing@joyridefinancial.ca',
  'brooke':   'brooke@joyridefinancial.ca',
  'amanda-k': 'amanda.k@joyridefinancial.ca',
  'amanda':   'amanda@joyridefinancial.ca',
};

app.get('/apply/:rep', (req, res) => {
  const email = REP_EMAILS[req.params.rep];
  if (!email) return res.status(404).send('Not found');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Apply Now</title>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;height:100%;overflow:auto;background:#fff}
</style>
<script src="https://assets.askava.ai/v2/api.js?widgetId=63f06a97d270&features=modal,customCta" async defer></script>
</head>
<body>
<div class="AskAva-embed" data-product="creditTool" data-assignee="${email}"></div>
</body>
</html>`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'longform.html'));
});

app.use(express.static(path.join(__dirname)));

app.listen(process.env.PORT || 3000, () => {
  console.log('Joyride landing pages running');
});
