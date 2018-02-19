'use strict';

/**
 * Usage: node upload_video.js PATH_TO_VIDEO_FILE
 */

const { google } = require('googleapis');
// const sampleClient = require('../sampleclient');
const fs = require('fs');

const FILENAME = process.argv[2];
