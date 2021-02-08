import express from 'express';
import morgan from 'morgan';
import { turnOffLightGroup, turnOnLightGroup } from './cinema.js';

const app = express();
const port = 3000;
const groupId = 1;

app.use(morgan('combined'));

app.post('/api/on_start', (req, res) => {
  turnOffLightGroup(groupId);
  res.send('Turned off');
});

app.post('/api/on_resume', (req, res) => {
  turnOffLightGroup(groupId);
  res.send('Turned off');
});

app.post('/api/on_stop', (req, res) => {
  turnOnLightGroup(groupId);
  res.send('Turned on');
});

app.post('/api/on_pause', (req, res) => {
  turnOnLightGroup(groupId);
  res.send('Turned on');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
