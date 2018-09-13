const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoURL = 'mongodb://doudbanks:MAtraque69$*@ds153609.mlab.com:53609/tableau-de-bord';

MongoClient.connect(mongoURL, (err, database) => {
  if (err) return console.log(err);

  db = database;

  app.use(bodyParser.json());

  app.listen(3000, () => {
    console.log('Express écoute le port 3000');
  });

  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });

  app.post('/todos', (req, res) => {
    db.collection('todos').save(req.body, (err, result) => {
      if (err) return console.log(err);
      console.log('Sauvegardé');
      res.status(201).send();
    });
  });

  app.get('/todos', (req, res) => {
    db.collection('todos').find().toArray((err, documents) => {
      console.log(documents);
      res.json(documents);
    });
  });

  app.delete('/todo/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    db.collection('todos').deleteOne({"_id": new ObjectId(id)});
  });
});
