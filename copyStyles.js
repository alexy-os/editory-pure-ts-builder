const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', 'editor-styles.css');
const destPath = path.join(__dirname, 'dist', 'editor-styles.css');

fs.copyFile(srcPath, destPath, (err) => {
  if (err) throw err;
  console.log('Styles file copied successfully');
});