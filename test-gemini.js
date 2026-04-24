const https = require('https');

const req = https.request('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', { method: 'POST' }, (res) => {
  console.log('Status:', res.statusCode);
});
req.end();
