const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist/apps/stimulator')))

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: 'dist/apps/stimulator'});
});

app.listen(process.env.PORT || 4200);
