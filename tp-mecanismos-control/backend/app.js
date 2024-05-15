const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  res.status(200).send({ data: [] });
});

app.get("/groups", async (req, res) => {
  res.status(200).send({ data: [] });
});

app.get("/actions", async (req, res) => {
  res.status(200).send({ data: [] });
});

app.listen(PORT, () => {
  console.log(`Your app is listening in http://localhost:${PORT}`);
});
