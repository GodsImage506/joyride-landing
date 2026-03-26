const express = require('express');
const path = require('path');
const app = express();

const REP_URLS = {
  'tyler':    'https://consumer.autocorp.ai/w/a302cb787550/credit/?assignee=tyler@joyridefinancial.ca',
  'travis':   'https://consumer.autocorp.ai/w/ca4b0aed7ad7/credit/?assignee=travis@joyridefinancial.ca',
  'taylor':   'https://consumer.autocorp.ai/w/589b85d0b5b5/credit/?assignee=taylor@joyridefinancial.ca',
  'taylor-m': 'https://consumer.autocorp.ai/w/6db182752f61/credit/?assignee=taylorm@joyridefinancial.ca',
  'summer':   'https://consumer.autocorp.ai/w/331a5029bd97/credit/?assignee=summer@joyridefinancial.ca',
  'rome':     'https://consumer.autocorp.ai/w/b7c10ff987fe/credit/?assignee=rome@joyridefinancial.ca',
  'roman':    'https://consumer.autocorp.ai/w/b2fc58b66bf3/credit/?assignee=roman@joyridefinancial.ca',
  'kelly':    'https://consumer.autocorp.ai/w/be5bea931b17/credit/?assignee=kelly@joyridefinancial.ca',
  'kaytlyn':  'https://consumer.autocorp.ai/w/0e04e893e8e4/credit/?assignee=kaytlyn@joyridefinancial.ca',
  'jordan':   'https://consumer.autocorp.ai/w/9f6fa55951f1/credit/?assignee=jordan@joyridefinancial.ca',
  'jeremy':   'https://consumer.autocorp.ai/w/2b294b48e1c1/credit/?assignee=jeremy@joyridefinancial.ca',
  'jacob':    'https://consumer.autocorp.ai/w/d5e47376b471/credit/?assignee=jacob@joyridefinancial.ca',
  'graham':   'https://consumer.autocorp.ai/w/e6eebbdb78d2/credit/?assignee=graham@joyridefinancial.ca',
  'dessa':    'https://consumer.autocorp.ai/w/de31ed8c9272/credit/?assignee=dessa@joyridefinancial.ca',
  'dave':     'https://consumer.autocorp.ai/w/0da19b994648/credit/?assignee=dave@joyridefinancial.ca',
  'channing': 'https://consumer.autocorp.ai/w/73108f36fddb/credit/?assignee=channing@joyridefinancial.ca',
  'brooke':   'https://consumer.autocorp.ai/w/b34621e80f8a/credit/?assignee=brooke@joyridefinancial.ca',
  'amanda-k': 'https://consumer.autocorp.ai/w/a20a352fb6bc/credit/?assignee=amanda.k@joyridefinancial.ca',
  'amanda':   'https://consumer.autocorp.ai/w/c605331e678b/credit/?assignee=amanda@joyridefinancial.ca',
};

app.get('/apply/:rep', (req, res) => {
  const url = REP_URLS[req.params.rep];
  if (!url) return res.status(404).send('Not found');
  res.set('Location', url).status(302).end();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'longform.html'));
});

app.use(express.static(path.join(__dirname)));

app.listen(process.env.PORT || 3000, () => {
  console.log('Joyride landing pages running');
});
