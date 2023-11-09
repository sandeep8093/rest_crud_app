const express = require('express');
const { createRecord, getRecord, updateRecord, deleteRecord } = require('./src/dbHandler');
const { loadSchemas } = require('./src/schemaLoader');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.post('/:collection', async (req, res) => {
  const result = await createRecord(req.params.collection, req.body);
  res.json(result);
});

app.get('/:collection/:id', async (req, res) => {
  const result = await getRecord(req.params.collection, req.params.id);
  res.json(result);
});

app.put('/:collection/:id', async (req, res) => {
  const result = await updateRecord(req.params.collection, req.params.id, req.body);
  res.json(result);
});

app.delete('/:collection/:id', async (req, res) => {
  const result = await deleteRecord(req.params.collection, req.params.id);
  res.json(result);
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await loadSchemas();
});
