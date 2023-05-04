import express from "express";
import dotenv from "dotenv";
import db from "./models";
import notesRoutes from "./routes/NotesRoutes";
import tagsRoutes from "./routes/TagRoutes";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/tags", tagsRoutes);
app.use("/notes", notesRoutes);

try {
  app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    await db();
  });
} catch (error) {
  console.log(error);
}
