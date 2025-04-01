const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const methodOverride = require('method-override')
const app = express();
mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true, useUnifiedTopology: true
  })
  

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
        const articles = await Article.find().sort({ createdAt: 'desc'})
        res.render('index', { articles: articles });
});

app.use('/articles', articleRouter);

app.listen(8005, () => console.log('Server running on port 8005'));
