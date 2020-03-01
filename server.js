const express = require('express');
const ShortUrl = require('./models/shortUrl')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/urlShortener', {
   useUnifiedTopology: true, useNewUrlParser: true
}).then(() => {
   console.log('Connection to mongodb established....')
}).catch((error) => { console.log(`failed to connect to mongodb !!: ${error.message}`) });

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.get('/', async (req, res) => {
   try {
      const shortUrls = await ShortUrl.find()
      res.render('index', { shortUrls: shortUrls });

   } catch (error) {
      console.error(error.message)
   }
});

app.post('/shortUrls', async (req, res) => {
   try {
      await ShortUrl.create({ full: req.body.fullUrl });

      res.redirect('/');

   } catch (error) {
      console.error(error.message)
   }
})

app.get('/:shortUrl', async (req, res) => {
   try {
      const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

      if (shortUrl == null) return res.sendStatus(404);

      shortUrl.clicks++
      shortUrl.save()

      res.redirect(shortUrl.full);

   } catch (error) {
      console.error(error.message);
   }
})

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`listening on port ${port}....`) });