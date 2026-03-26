const express = require('express');
const path = require('path');
const https = require('https');
const app = express();

const REP_URLS = {
  'tyler':    'https://consumer.autocorp.ai/w/a302cb787550/credit?assignee=tyler%40joyridefinancial.ca',
  'travis':   'https://consumer.autocorp.ai/w/ca4b0aed7ad7/credit?assignee=travis%40joyridefinancial.ca',
  'taylor':   'https://consumer.autocorp.ai/w/589b85d0b5b5/credit?assignee=taylor%40joyridefinancial.ca',
  'taylor-m': 'https://consumer.autocorp.ai/w/6db182752f61/credit?assignee=taylorm%40joyridefinancial.ca',
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
  'amanda-k': 'https://consumer.autocorp.ai/w/a20a352fb6bc/credit?assignee=amanda.k%40joyridefinancial.ca',
  'amanda':   'https://consumer.autocorp.ai/w/c605331e678b/credit?assignee=amanda%40joyridefinancial.ca',
};

// Shell page — no AVA URL exposed
app.get('/apply/:rep', (req, res) => {
  const rep = req.params.rep.toLowerCase();
  if (!REP_URLS[rep]) return res.status(404).send('Not found');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Apply Now</title>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;height:100%;overflow:hidden}
  iframe{display:block;width:100%;height:100%;border:none}
</style>
</head>
<body>
<iframe src="/apply/${rep}/frame" scrolling="yes" allowfullscreen></iframe>
</body>
</html>`);
});

// Proxy endpoint — fetches AVA page server-side, AVA URL never reaches the browser
app.get('/apply/:rep/frame', (req, res) => {
  const rep = req.params.rep.toLowerCase();
  const url = REP_URLS[rep];
  if (!url) return res.status(404).send('Not found');

  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (upstream) => {
    res.status(upstream.statusCode);
    // Strip headers that would block rendering inside our proxy response
    const skip = new Set(['x-frame-options', 'content-security-policy', 'transfer-encoding']);
    for (const [k, v] of Object.entries(upstream.headers)) {
      if (!skip.has(k.toLowerCase())) res.setHeader(k, v);
    }
    upstream.pipe(res);
  }).on('error', () => res.status(502).send('Upstream error'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'longform.html'));
});

app.use(express.static(path.join(__dirname)));

app.listen(process.env.PORT || 3000, () => {
  console.log('Joyride landing pages running');
});
