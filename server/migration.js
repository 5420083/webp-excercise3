import { sequelize, Rank } from "./models.js";
import * as data from "./sample-data.js";

await sequelize.sync({ force: true });

for (const { id, sub, point } of data.rank) {
  await Rank.create({ id, sub, point });
}
