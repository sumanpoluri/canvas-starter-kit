var express = require('express');
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var chapters = require('../models/chapters');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var selected = chapters.list[0].label;
  var fileName = chapters.list[0].fileName;
  res.render(
    'index',
    {
      firstName: '',
      chapters: chapters.list,
      selected: selected,
      result: '',
      newId: '',
      success: false,
      chapterDetails: getChapterDetails(fileName)
    }
  );
});

/* GET chapter page. */
router.get('/chapter/:cFileName', function(req, res, next) {
  var chapterFileName = req.params.cFileName;
  var chapter = chapters.chapterForFileName(chapterFileName);
  var selected = chapter.label;
  var fileName = chapter.fileName;
  res.render(
    'index',
    {
      firstName: '',
      chapters: chapters.list,
      selected: selected,
      result: '',
      newId: '',
      success: false,
      chapterDetails: getChapterDetails(fileName)
    }
  );
});

function getChapterDetails(fileName) {
  var fileContents = fs.readFileSync(__dirname + '/../views/partials/' + fileName + '.ejs', 'utf-8');
  var data = {};
  if (fileName === 'signedRequest') {
    data = {context: 'Salesforce Context'};
  }

  var template = ejs.compile(fileContents);
  fileContents = template(data);
  return fileContents;
}

module.exports = router;
