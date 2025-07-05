# Quick Video Setup

## Current Status
✅ Video functionality is now working with a sample video for testing

## To Add Your Own Video:

### Option 1: Add to Public Folder (Recommended)
1. Place your video file in the `public` folder
2. Name it `hero-video.mp4`
3. Uncomment this line in `src/pages/Home.jsx`:
   ```jsx
   <source src="/hero-video.mp4" type="video/mp4" />
   ```
4. Comment out the sample video line

### Option 2: Add to Assets Folder
1. Place your video file in the `src/assets` folder
2. Name it `hero-video.mp4`
3. Uncomment this line in `src/pages/Home.jsx`:
   ```jsx
   import HeroVideo from '../assets/hero-video.mp4';
   ```
4. Uncomment this line:
   ```jsx
   <source src={HeroVideo} type="video/mp4" />
   ```

## Video Requirements:
- Format: MP4
- Resolution: 1920x1080 or 1280x720
- Duration: 10-30 seconds
- File size: Under 10MB
- Content: Gym/fitness related

## Test Your Video:
1. Run `npm start`
2. Go to the home page
3. You should see your video playing in the background

## If Video Doesn't Play:
- Check browser console for errors
- Ensure video file is in the correct location
- Verify video format is MP4
- Try refreshing the page 