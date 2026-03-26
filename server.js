const express = require('express');
const path = require('path');
const app = express();

const REP_URLS = {
  'tyler':    'https://consumer.autocorp.ai/w/a302cb787550/credit?assignee=tyler%40joyridefinancial.ca',
  'travis':   'https://consumer.autocorp.ai/w/ca4b0aed7ad7/credit?assignee=travis%40joyridefinancial.ca',
  'taylor':   'https://consumer.autocorp.ai/w/589b85d0b5b5/credit?assignee=taylor%40joyridefinancial.ca',
  'taylorm':  'https://consumer.autocorp.ai/w/6db182752f61/credit?assignee=taylorm%40joyridefinancial.ca',
  'summer':   'https://consumer.autocorp.ai/w/331a5029bd97/credit?assignee=summer%40joyridefinancial.ca',
  'rome':     'https://consumer.autocorp.ai/w/b7c10ff987fe/credit?assignee=rome%40joyridefinancial.ca',
  'roman':    'https://consumer.autocorp.ai/w/b2fc58b66bf3/credit?assignee=roman%40joyridefinancial.ca',
  'kelly':    'https://consumer.autocorp.ai/w/be5bea931b17/credit?assignee=kelly%40joyridefinancial.ca',
  'kaytlyn':  'https://consumer.autocorp.ai/w/0e04e893e8e4/credit?assignee=kaytlyn%40joyridefinancial.ca',
  'jordan':   'https://consumer.autocorp.ai/w/9f6fa55951f1/credit?assignee=jordan%40joyridefinancial.ca',
  'jeremy':   'https://consumer.autocorp.ai/w/2b294b48e1c1/credit?assignee=jeremy%40joyridefinancial.ca',
  'jacob':    'https://consumer.autocorp.ai/w/d5e47376b471/credit?assignee=jacob%40joyridefinancial.ca',
  'graham':   'https://consumer.autocorp.ai/w/e6eebbdb78d2/credit?assignee=graham%40joyridefinancial.ca',
  'dessa':    'https://consumer.autocorp.ai/w/de31ed8c9272/credit?assignee=dessa%40joyridefinancial.ca',
  'dave':     'https://consumer.autocorp.ai/w/0da19b994648/credit?assignee=dave%40joyridefinancial.ca',
  'channing': 'https://consumer.autocorp.ai/w/73108f36fddb/credit?assignee=channing%40joyridefinancial.ca',
  'brooke':   'https://consumer.autocorp.ai/w/b34621e80f8a/credit?assignee=brooke%40joyridefinancial.ca',
  'amandak':  'https://consumer.autocorp.ai/w/a20a352fb6bc/credit?assignee=amanda.k%40joyridefinancial.ca',
  'amanda':   'https://consumer.autocorp.ai/w/c605331e678b/credit?assignee=amanda%40joyridefinancial.ca',
};

app.get('/app/', (req, res) => {
  const key = (req.query.a || '').toLowerCase();
  const url = REP_URLS[key];
  if (!url) return res.status(404).send('Not found');
  res.redirect(302, url);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'longform.html'));
});

app.use(express.static(path.join(__dirname)));

app.listen(process.env.PORT || 3000, () => {
  console.log('Joyride landing pages running');
});
