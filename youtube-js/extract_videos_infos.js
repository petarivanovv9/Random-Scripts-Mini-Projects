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

    return {
        "video_id": rawVideoInfo.id,
        "video_url": rawVideoInfo.webpage_url,
        "title": rawVideoInfo.title,
        "description": rawVideoInfo.description,
        "duration(human)": '-1',
        "duration(secs)": rawVideoInfo.duration,
        "view_count": rawVideoInfo.view_count,
        "like_count": rawVideoInfo.like_count,
        "dislike_count": rawVideoInfo.dislike_count,
        "upload_date": rawVideoInfo.upload_date,
        "uploader_id": rawVideoInfo.uploader_id,
        "uploader_url": rawVideoInfo.uploader_url
    };
}