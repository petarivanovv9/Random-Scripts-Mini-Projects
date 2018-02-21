'use strict';

/**
  * Usage: node check_videos_uploaded.js PATH_TO_VIDEOS_FOLDER
*/


const fs = require('fs');


const VIDEOS_FOLDER_PATH = process.argv[2];

const VIDEOS_IDS_TO_UPLOAD_FILENAME = VIDEOS_FOLDER_PATH + 'videosIdsToUpload.txt';

const MY_UPLOADED_VIDEOS_IDS_FILENAME = VIDEOS_FOLDER_PATH + 'myUploadedVideosIds.txt';


let videosIdsToUpload = fs.readFileSync(VIDEOS_IDS_TO_UPLOAD_FILENAME).toString().split(',');
videosIdsToUpload.splice(-1, 1);

const myUploadedVideosIds = fs.readFileSync(MY_UPLOADED_VIDEOS_IDS_FILENAME).toString().split(',');


// check if all elements from videosIdsToUpload exist in myUploadedVideosIds
console.log('Result >>> ', arrayContainsArray(myUploadedVideosIds, videosIdsToUpload));


/**
 * Returns TRUE if the first specified array contains all elements
 * from the second one. FALSE otherwise.
 *
 * @param {array} superset
 * @param {array} subset
 *
 * @returns {boolean}
 */
function arrayContainsArray (superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value) {
    return (superset.indexOf(value) >= 0);
  });
}
