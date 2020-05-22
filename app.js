const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const todoRoutes = require('./routes/todos');
const path = require('path');

const PORT = process.env.PORT || 4000;

const app = express();
const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
//register router like middleware
app.use(todoRoutes);
app.use(express.static(path.join(__dirname, 'public')));

async function start() {
	try {
		await mongoose.connect('mongodb+srv://mypassword@cluster0-f0zjz.azure.mongodb.net/databases',
			{
				useNewUrlParser: true,
				useFindAndModify: true,
				useUnifiedTopology: true
			});

		app.listen(PORT, () => {
			console.log('Server has been started ...');
		});
	} catch (error) {
		console.log(error);
	}
}


start();

