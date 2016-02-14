'use strict';

var fs = require('fs');

fs.readFile('build/assets/js/routes.js', 'utf-8', (err, data) => {
  if(err) return console.log(err);
  var result = data.replace(/templates/g, 'http://asamik.github.io/sempai-catalog-project/templates');

  fs.writeFile('build/assets/js/routes.js', result, (err) => {
    if(err) console.log(err);
  });
});

fs.readFile('build/assets/js/app.js', 'utf-8', (err, data) => {
  if(err) return console.log(err);
  var result = data.replace(/templates/g, 'sempai-catalog-project/templates');
  
  fs.writeFile('build/assets/js/app.js', result, (err) => {
    if(err) console.log(err);
  });
});
