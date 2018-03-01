'use strict';

/**
 * Usage: node extract_video_infos.js PATH_TO_VIDEOS_INFOS PATH_TO_FILE_TO_WRITE
 */


const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream')


const VIDEOS_INFOS_DIR = process.argv[2];
const RESULT_FILENAME = process.argv[3];


// Loop through all the json files in the VIDEOS_INFOS_DIR directory
let files;
try {
    files = fs.readdirSync(VIDEOS_INFOS_DIR);
} catch (err) {
    console.error(`\nCould not list the directory. >>> ${err.message}\n`);
    process.exit(1);
}

const videosInfos = [];

files.forEach(function(file, index) {
    if (path.extname(file) === '.json') {

        console.log(`\n>>> Extracting video info from ${file}`);

        const filename = VIDEOS_INFOS_DIR + file;

        videosInfos.push(getNecessaryVideoInfo(filename));
    }
});

// console.log(videosInfos);
console.log("\nNumber of videos infos >>> ", videosInfos.length);

const HEADERS = [
    "video_id", 
    "video_url", 
    "title", 
    "description", 
    "duration(human)", 
    "duration(secs)", 
    "view_count", 
    "like_count", 
    "dislike_count",
    "upload_date",
    "uploader",
    "uploader_id",
    "uploader_url"
];

let writer;

if (!fs.existsSync(RESULT_FILENAME)) {
    writer = csvWriter({ headers: HEADERS, newline: '\r\n' });
} else {
    // write new line to the existing csv file
    // because the last line in the original file doesn't have symbols for a new line
    fs.appendFileSync(RESULT_FILENAME, '\r\n');
    
    writer = csvWriter({ sendHeaders: false, newline: '\r\n' });
}

writer.pipe(fs.createWriteStream(RESULT_FILENAME, { flags: 'a' }));

videosInfos.forEach(function(videoInfo, index) {
    console.log('\n>>> Writing ... ', index);

    try {
        writer.write(videoInfo);
    } catch (err) {
        console.log("\nSomething went wrong with writing to the csv!!\n");
    }
});

writer.end()


function getNecessaryVideoInfo(filename) {
    const rawVideoInfo = JSON.parse(fs.readFileSync(filename, 'utf8'));

    const durationHuman = convertDurSecToDurHuman(parseInt(rawVideoInfo.duration));

    return {
        "video_id": rawVideoInfo.id,
        "video_url": rawVideoInfo.webpage_url,
        "title": rawVideoInfo.title,
        "description": rawVideoInfo.description,
        "duration(human)": durationHuman,
        "duration(secs)": rawVideoInfo.duration,
        "view_count": rawVideoInfo.view_count,
        "like_count": rawVideoInfo.like_count,
        "dislike_count": rawVideoInfo.dislike_count,
        "upload_date": rawVideoInfo.upload_date,
        "uploader": rawVideoInfo.uploader,
        "uploader_id": rawVideoInfo.uploader_id,
        "uploader_url": rawVideoInfo.uploader_url
    };
}

function convertDurSecToDurHuman(seconds) {
    const secondsInAYear = 31536000; 
    const secondsInADay = 86400; 
    const secondsInAnHour = 3600; 
    const secondsInAMinute = 60;

    let result = "";

    let hours = Math.floor(((seconds % secondsInAYear) % secondsInADay) / secondsInAnHour);
    if (hours) {
        result += `${hours} hours `;
    }

    let minutes = Math.floor((((seconds % secondsInAYear) % secondsInADay) % secondsInAnHour) / secondsInAMinute);
    if (minutes) {
        result += `${minutes} minutes `;
    }

    let secs = (((seconds % secondsInAYear) % secondsInADay) % secondsInAnHour) % secondsInAMinute;
    if (secs) {
        result += `${secs} seconds`;
    }

    return result;
}