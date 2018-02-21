#!/bin/bash


printf "\n=>> Start uploading all videos from $1\n"

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

# Youtube video formats
# .MOV
# .MPEG4
# .MP4
# .AVI
# .WMV
# .MPEGPS
# .FLV
# 3GPP
# WebM
# DNxHR
# ProRes
# CineForm
# HEVC (h265)


# for video in $(find "$1"* -type f -regex '.*\.\(avi\|mkv\|mp4\|wmv\|flv\|webm\|mov\)'); do
for video in "$1"*; do

    if [[ $video == *.avi || $video == *.mp4 || $video == *.mov || $video == *.mpeg4 || $video == *.wmv || $video == *.mpegps || $video == *.flv ]]
    then
      printf "\nuploading --> $video\n"

      node $SCRIPTPATH/upload_video.js $video

      printf "\n"

      sleep 120
    fi
done


printf "\nEnd of uploading\n"
