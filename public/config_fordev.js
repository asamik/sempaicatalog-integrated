'use strict';

var fs = require('fs');

fs.readFile('build/assets/js/routes.js', 'utf-8', (err, data) => {
  if(err) console.log(err);
  var result = data.replace(/http:\/\/asamik.github.io\/sempai-catalog-project\//g, "");

  fs.writeFile('build/assets/js/routes.js', result, (err) => {
    if(err) console.log(err);
  });
});

fs.readFile('build/assets/js/app.js', 'utf-8', (err, data) => {
  if(err) return console.log(err);

  var result = data.replace(/sempai-catalog-project\/templates/g, 'templates');

  fs.writeFile('build/assets/js/app.js', result, (err) => {
  if(err) console.log(err);
  });
});
