
/**
 * Module dependencies.
 */
var prismic = require('express-prismic').Prismic;
var app = require('./config');
var PORT = app.get('port');

function handleError(err, req, res) {
  if (err.status == 404) {
    res.status(404).send("404 not found");
  } else {
    res.status(500).send("Error 500: " + err.message);
  }
}

app.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT);
});

app.route('/').get(function(req, res) {
  var latitude = 48.8768767,
      longitude = 2.3338802,
      distance = 10 //km;

  var p = prismic.withContext(req, res);
  p.query(
    [prismic.Predicates.at("document.type", "store"),
    prismic.Predicates.near("my.store.location", latitude, longitude, distance)],
    { pageSize : 10 },
    function(err, documents) {
      res.render('index', {
        prismicdoc: documents.results[0]
      })
    }
  );
});

app.route('/preview').get(prismic.preview);
