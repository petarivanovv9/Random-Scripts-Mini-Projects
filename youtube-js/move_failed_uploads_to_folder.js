'use strict';

/**
 * Usage: node move_failed_uploads_to_folder.js PATH_TO_VIDEOS_FOLDER
 */


const fs = require('fs');

const VIDEOS_FOLDER_PATH = process.argv[2];
const VIDEO_UPLOADS_FAILURES_PATH = VIDEOS_FOLDER_PATH + 'failures/';
const RESULT_FILENAME = VIDEOS_FOLDER_PATH + 'result.txt';

const rawResultContent = fs.readFileSync(RESULT_FILENAME).toString();

let lines = rawResultContent.split('\r\n');
lines.splice(-1, 1);

let linesItems = [];

lines.forEach((line) => {
  linesItems.push(line.split(','));
});

linesItems.forEach((item) => {
  if (item[1] !== '200' || item[2] !== 'uploaded') {
    moveFileToFolder(item[0], VIDEO_UPLOADS_FAILURES_PATH);
  }
});


function getVideoIdFromUrl(url) {
  const youtubeInitUrl = 'https://www.youtube.com/watch?v=';

  return url.substring(youtubeInitUrl.length, url.length);
}


function moveFileToFolder(file, targetFolderPath) {
  const filename = VIDEOS_FOLDER_PATH + file;
  const targetFilename = targetFolderPath + file;

  if (!fs.existsSync(targetFolderPath)){
    fs.mkdirSync(targetFolderPath);
  }

  fs.rename(filename, targetFilename, function(err) {
    if (err) {
      console.error("\nmove error:  " + err.message + "\n");
    } else {
      console.log("\nMove complete to " + targetFilename + "\n");
    }
  });
}
