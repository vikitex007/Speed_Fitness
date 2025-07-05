# Video Setup Guide for Speed Fitness Home Page

## How to Add Your Hero Video

The home page has been updated to use a video background instead of a static image. Here's how to add your video:

### Step 1: Prepare Your Video
- **Format**: MP4 (primary) and WebM (optional for better browser support)
- **Resolution**: 1920x1080 (Full HD) or higher
- **Duration**: 10-30 seconds (recommended for better user experience)
- **File Size**: Keep under 10MB for faster loading
- **Content**: Gym/fitness related video showing:
  - Gym equipment
  - People working out
  - Gym atmosphere
  - Fitness activities

### Step 2: Add Video Files
Place your video files in the `public` folder of your React app:

```
speed-fitness/
├── public/
│   ├── hero-video.mp4    ← Add your MP4 video here
│   ├── hero-video.webm   ← Optional: Add WebM version for better compatibility
│   └── ...
```

### Step 3: Video Specifications
For optimal performance, ensure your video meets these specifications:

#### MP4 Video (Primary)
- **Codec**: H.264
- **Resolution**: 1920x1080 or 1280x720
- **Frame Rate**: 24-30 fps
- **Bitrate**: 2-5 Mbps
- **Audio**: Muted (recommended for background videos)

#### WebM Video (Optional)
- **Codec**: VP9 or VP8
- **Same specifications as MP4**

### Step 4: Testing
1. Start your development server: `npm start`
2. Navigate to the home page
3. The video should automatically play in the background
4. If the video doesn't load, check the browser console for errors

### Fallback Behavior
If the video fails to load or isn't available:
- A gradient background will be displayed instead
- The page will still function normally
- No errors will be shown to users

### Performance Tips
1. **Compress your video** using tools like HandBrake or FFmpeg
2. **Use a CDN** for production to serve videos faster
3. **Consider multiple resolutions** for different screen sizes
4. **Test on different devices** and browsers

### Example Video Sources
You can find free stock videos from:
- Pexels Videos
- Pixabay
- Unsplash (video section)
- Coverr.co

### Troubleshooting
- **Video not playing**: Check file path and format
- **Large file size**: Compress the video
- **Autoplay blocked**: The video is muted, so it should autoplay
- **Mobile issues**: Ensure `playsInline` attribute is present (already added)

The video will automatically loop, play without sound, and cover the entire hero section while maintaining the text overlay. 