import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { getDate } from './modules/date.js';
import { ToDo } from './modules/schema.js';
import login from './modules/mongo_connection.js';

const app = express();
const day = getDate();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

mongoose.connect(`mongodb+srv://${login}.rfyjvxe.mongodb.net/todolistDB`);

// Main page
app.get('/', async (req, res) => {
    const listItmes = await ToDo.find({});
    res.render('list', {
        listTitle: day,
        newListItems: listItmes
    });
});

app.post('/', async (req, res) => {
const itemName = req.body.newItem;

const item = await ToDo.create({
    name: itemName
});
res.redirect('/');
});

app.post('/delete', async(req, res) =>{
    const checkedItemId = await ToDo.deleteOne({_id:req.body.checkbox
    });

res.redirect('/')
});



app.listen( PORT, () => console.log('Server running on port 3000'));