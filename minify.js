// npm i --save-dev minifier fs-jetpack

const jetpack = require('fs-jetpack');
const path = require('path');
const minifier = require('minifier');

const files = jetpack.list(path.join(__dirname, 'functions/dist/ebooksden'));

console.log(files);

for (const file of files) {
  if (/.*(\.js|\.css)$/g.test(file)) {
    console.log(`Start ${file}`);
    const filePath = path.join(__dirname, 'functions/dist/ebooksden', file);
    if(file !=="ngsw-worker.js" && file != 'safety-worker.js' && file != 'worker-basic.min.js')
       minifier.minify(filePath, {output: filePath});
    
      
  }
  var filePath1 = path.join(__dirname, 'functions/dist/ebooksden/assets/css/', 'elegant-fonts.css');
  minifier.minify(filePath1, {output: filePath1});
   filePath1 = path.join(__dirname, 'functions/dist/ebooksden/assets/js/', 'adsbygoogle.js');
  minifier.minify(filePath1, {output: filePath1});
  ///Users/thulasiram/ebooksden_work_space/ebooksdenpwa/functions/dist/ebooksden/index.html
  //filePath1 = path.join(__dirname, 'functions/dist/ebooksden/', 'index.html');
  //minifier.minify(filePath1, {output: filePath1});
}

console.log('End');
