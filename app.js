const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const config = require("./config/config");
const routes = require("./routes/routes");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_DB_URI,{ 
	useNewUrlParser: true 
});

app.use(bodyParser.urlencoded({
	extended:false
}));
app.use(bodyParser.json());

app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
	console.log(`Listening on ${port}`);
});

