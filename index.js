#!/usr/bin/env node
const { getSubtitles } = require('youtube-captions-scraper');

// Extract the video ID from the command line argument or the environment variable
const arg = process.argv[2] || process.env.ID || null;
let videoID = arg;

// If the argument is a URL, extract the video ID
if (videoID && videoID.includes('youtube.com') || videoID.includes('youtu.be')) {
    const urlPattern = /(?:v=|\/)([^&\n?]+)/;
    const match = videoID.match(urlPattern);
    if (match && match[1]) {
        videoID = match[1];
    }
}

if (!videoID) {
  console.error('Please provide a YouTube video ID as an argument or set the ID environment variable.');
  process.exit(-1);
}

getSubtitles({
  videoID: videoID, // YouTube video ID
  lang: 'en' // Language of subtitles (use 'en' for English)
}).then(subtitles => {
    const text = subtitles.reduce((acc, iter, index) => {
        return acc + `#${index} ${iter.start}: ${iter.text}\n`;
    }, '');
    console.log(text);
}).catch(error => {
  console.error('Error fetching subtitles:', error);
});
