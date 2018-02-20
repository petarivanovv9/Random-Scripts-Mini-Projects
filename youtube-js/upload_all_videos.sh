#!/bin/bash


printf "\n=>> Start uploading all videos from $1\n"

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

for video in "$1"*; do
    printf "\nuploading --> $video\n"

    node $SCRIPTPATH/upload_video.js $video

    printf "\n"
done


printf "End of uploading\n"
