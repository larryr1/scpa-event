import { RootRouter } from './routes/index.mjs';
import session from 'express-session';

import express from 'express';
import cors from 'cors';

import hbs from 'hbs';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("src/public"));
app.use(express.json());

app.set('view engine', 'hbs')
app.set("views", "./src/views");

app.use(session({
	secret: 'youve been trolled hahahaha',
	resave: true,
	saveUninitialized: true
}));

app.use("/", RootRouter);

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log("Listening at " + port);
});