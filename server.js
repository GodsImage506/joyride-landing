const express = require('express');
const path = require('path');
const app = express();

const REP_WIDGETS = {
  'tyler':    'a302cb787550',
  'travis':   'ca4b0aed7ad7',
  'taylor':   '589b85d0b5b5',
  'taylor-m': '6db182752f61',
  'summer':   '331a5029bd97',
  'rome':     'b7c10ff987fe',
  'roman':    'b2fc58b66bf3',
  'kelly':    'be5bea931b17',
  'kaytlyn':  '0e04e893e8e4',
  'jordan':   '9f6fa55951f1',
  'jeremy':   '2b294b48e1c1',
  'jacob':    'd5e47376b471',
  'graham':   'e6eebbdb78d2',
  'dessa':    'de31ed8c9272',
  'dave':     '0da19b994648',
  'channing': '73108f36fddb',
  'brooke':   'b34621e80f8a',
  'amanda-k': 'a20a352fb6bc',
  'amanda':   'c605331e678b',
};

app.get('/apply/:rep', async (req, res) => {
  const widgetId = REP_WIDGETS[req.params.rep];
  if (!widgetId) return res.status(404).send('Not found');

  try {
    const apiRes = await fetch('https://api.autocorp.ai/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ widgetId }),
    });
    const data = await apiRes.json();
    const widgetUrl = data.widgetUrl || (data.accessToken && `https://consumer.autocorp.ai/w/${widgetId}/credit/?accessToken=${data.accessToken}`);
    if (!widgetUrl) {
      console.error('AVA API response:', JSON.stringify(data));
      return res.status(502).send('Could not generate link');
    }
    res.redirect(302, widgetUrl);
  } catch (e) {
    console.error('AVA API error:', e);
    res.status(502).send('Error contacting AVA');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'longform.html'));
});

app.use(express.static(path.join(__dirname)));

app.listen(process.env.PORT || 3000, () => {
  console.log('Joyride landing pages running');
});
