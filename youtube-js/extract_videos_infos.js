'use strict';

/**
 * Usage: node extract_video_infos.js PATH_TO_VIDEO_INFO_FILE PATH_TO_FILE_TO_WRITE
 */


const fs = require('fs');


const VIDEO_INFO_FILENAME = process.argv[2];
const RESULT_FILENAME = process.argv[3];


const videoInfo = getNecessaryVideoInfo(VIDEO_INFO_FILENAME);

console.log(videoInfo);


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

    let hours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    if (hours) {
        result += `${hours} hours `;
    }

    let minutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    if (minutes) {
        result += `${minutes} minutes `;
    }

    let secs = (((seconds % 31536000) % 86400) % 3600) % 60;
    if (secs) {
        result += `${secs} seconds`;
    }

    return result;
}