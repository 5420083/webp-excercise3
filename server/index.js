import express from "express";
import cors from "cors";
import sequelize from "sequelize";
import{Rank} from "./models.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ranking", async (req, res) => {
  const ranking = await Rank.findAll();
  res.json(ranking);
});


app.post("/ranking/vote", async (req, res) => {
  const id=req.body.id;
  const breed = await Rank.findByPk(id);
  
  breed.point = breed.point + 1;

  res.json(breed);
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});