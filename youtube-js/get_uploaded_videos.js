'use strict';

/**
 * Usage: node get_uploaded_videos.js
 */


const { google } = require('googleapis');
const OAuth2Client = google.auth.OAuth2;

var fs = require('fs');
var readline = require('readline');


var SCOPES = [
 'https://www.googleapis.com/auth/youtube'
];

var TOKEN_DIR = '/Users/petarivanov/Projects/My-Random-Scripts/youtube-js/';
var TOKEN_PATH = TOKEN_DIR + 'test_youtube_parlamak_credentials.json';
// var TOKEN_PATH = TOKEN_DIR + 'youtube_parlamak_token.json';

var RESULT_PATH = '/Users/petarivanov/Downloads/youtube-test-video/test-folder/';


// Load client secrets from a local file.
fs.readFile(TOKEN_DIR + 'client_secret.json', function processClientSecrets(err, content) {
// fs.readFile(TOKEN_DIR + 'client_secret_youtube_parlamak.json', function processClientSecrets(err, content) {
 if (err) {
  console.log('Error loading client secret file: ' + err);
  return;
 }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  authorize(JSON.parse(content), getMyChannels);
})


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  // var auth = new googleAuth();
  var oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}


/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}


/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getMyChannels(auth) {
  var service = google.youtube('v3');
  service.channels.list({
    auth: auth,
    part: 'snippet,contentDetails,statistics',
    mine: true
  }, function(err, response) {
    if (err) {
      console.log('[getMyChannels] The API returned an error: ' + err);
      return;
    }

    // console.log(response);

    console.log('-------------------------------');

    var channels = response.data.items;
    // console.log(channels);

    var  myUploadedVideosChannelId = channels[0].contentDetails.relatedPlaylists.uploads;

    playlistItemsListByPlaylistId(auth, myUploadedVideosChannelId);

    if (channels.length == 0) {
      console.log('No channel found.');
    } else {
      console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                  'it has %s videos.',
                  channels[0].id,
                  channels[0].snippet.title,
                  channels[0].statistics.videoCount);
    }
  });
}


/**
 * Lists the videos IDs from a given playlist ID.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {playlistId} a playlist ID
 */
function playlistItemsListByPlaylistId(auth, playlistId) {
  var service = google.youtube('v3');

  console.log('playlistId >>> ', playlistId);

  service.playlistItems.list({
    auth: auth,
    part: 'snippet,contentDetails',
    playlistId: playlistId
  }, function(err, response) {
    if (err) {
      console.log('[playlistItemsListByPlaylistId] The API returned an error: ' + err);
      return;
    }

    console.log('-------------------------------');

    var playlistItems = response.data.items;
    console.log(playlistItems);
    console.log("number of videos >> ", playlistItems.length);

    var allUploadedVideosIds = [];

    playlistItems.forEach((video) => {
      allUploadedVideosIds.push(video.contentDetails.videoId);
    });

    saveVideosIdsToFile(allUploadedVideosIds);

    console.log('array of all videos ids >>>> ', allUploadedVideosIds);
  });
}


function saveVideosIdsToFile(videosIds) {
  const resultFilename = RESULT_PATH + 'myUploadedVideosIds.txt';

  const resultFileContent = videosIds.join(',');

  fs.writeFileSync(resultFilename, resultFileContent, function(err) {
    if (err) {
      console.error("write error:  " + err.message);
    } else {
      console.log("Successful Write to " + resultFilename);
    }
  });
}
