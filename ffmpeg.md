# Video

Cut a video without re-encoding

    ffmpeg -i <inputfile> -ss 00:00:00.0 -t 00:00:01.5 -c copy <outputfile>

Fade out to video and audio example (for video time use frames, for audio — seconds)

    ffmpeg -i <inputfile> -filter:v 'fade=out:7582:60' -c:v libx264 -crf 21 -preset veryfast -af 'afade=t=out:st=253:d=2' <outputfile>.mp4

Blur filter

    ffmpeg -i <inputfile> -vcodec libx264 -crf 18 -refs 4 -threads 2 -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 -subq 12 -trellis 1 -coder 1 -me_range 32 -level 4.1 -profile:v high -bf 12 -vf boxblur=2:2 <outputfile>.mp4

Crop video

    ffmpeg -i <inputfile>.mp4 -filter:v "crop=out_w:out_h:x:y" -c:a copy <outputfile>.mp4

Scale video

    ffmpeg -i <inputfile>.mp4 -filter:v "scale=width:height" -c:a copy <outputfile>.mp4

Delete black lines and create blured background for vertical video

    ffmpeg -y -i <inputfile>.mp4 -filter:v "crop=608:1080:417:0" -c:a copy tmp.mp4
    ffmpeg -y -i tmp.mp4 -filter:v "scale=1920:3410,crop=1920:1080:0:1165,boxblur=12:12" -c:v libx264 -crf 21 -refs 4 -c:a copy background.mp4
    ffmpeg -y -i background.mp4 -vcodec libx264 -crf 18 -refs 4 -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 -subq 12 -trellis 1 -coder 1 -me_range 32 -level 4.1 -profile:v high -bf 12 -vf "movie=tmp.mp4[inner]; [in][inner] overlay=656:0 [out]" -c:a copy <outputfile>.mp4

Create animated-gif from video (1. generate palette, 2. generate gif using the palette, source: [1](http://superuser.com/questions/556029/how-do-i-convert-a-video-to-gif-using-ffmpeg-with-reasonable-quality), [2](http://blog.pkh.me/p/21-high-quality-gif-with-ffmpeg.html))

    ffmpeg -y -ss 30 -t 3 -i <inputfile>.flv -vf fps=10,scale=320:-1:flags=lanczos,palettegen palette.png
    ffmpeg -ss 30 -t 3 -i <inputfile>.flv -i palette.png -filter_complex "fps=10,scale=320:-1:flags=lanczos[x];[x][1:v]paletteuse" <outputfile>.gif

or using convert with frames

    ffmpeg -i <inputfile> -vf scale=320:-1:flags=lanczos,fps=10 frames/ffout%03d.png
    convert -loop 0 frames/ffout*.png <outputfile>.gif

    for i in {<num_frames-1>..1}; do tmp="$(printf "%03d" $i)"; tmp2="$(printf "%03d" $((<2*num_frames>-$i)))"; cp frames/ffout$tmp.png frames/ffout$tmp2.png; done

Convert to webm

    ffmpeg -i <inputfile>.mp4 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis <outputfile>.webm

###Speed up / slow down a video (audio)

To double the speed of the video and change FPS

    ffmpeg -i <inputfile> -r 30 -filter:v "setpts=0.5*PTS" <outputfile>

To slow down your video, you have to use a multiplier greater than 1

    ffmpeg -i <inputfile> -r 30 -filter:v "setpts=2*PTS" <outputfile>

Timelapse example(x120):

    ffmpeg -y -i <inputfile> -r 60 -filter:v "setpts=1/120*PTS" -map "0:v" <outputfile>

To double the speed of audio

    ffmpeg -i <inputfile> -filter:a "atempo=2.0" -vn <outputfile>

Using a complex filtergraph, you can speed up video and audio at the same time

    ffmpeg -i <inputfile> -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" <outputfile>

Rotate video (-2.2 degrees)

    ffmpeg -y -i <inputfile> -vf "rotate=-2.2*2*PI/360" -c:a copy <outputfile>

Make screenshot from video

    ffmpeg -ss hh:mm:ss -i <inputfile> -vframes 1 -q:v 2 <outputfile>.jgp

Make screenshot last frame of video

    LASTFRAME=`ffmpeg -i <inputfile> -vcodec copy -an -f null /dev/null 2>&1 | grep 'frame=' | cut -f 2 -d "=" | awk '{print $1}'`
    let "LASTFRAME = $LASTFRAME - 1"
    ffmpeg -y -i <inputfile> -vf "select='eq(n,$LASTFRAME)'" -vframes 1 <outputfile>.[png,jgp]

Convert video to images and back with custom fps (<FPS>):

    ffmpeg -i <inputfile>  ./imgs/img%04d.png
    ffmpeg -y -i ./imgs/img%04d.png -c:v libx264 -pix_fmt yuv420p -crf 17 -refs 9 -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 -subq 12 -trellis 1 -coder 1 -me_range 32 -level 4.1 -profile:v high -bf 12 -r <FPS> -filter:v "setpts=25/<FPS>*PTS" <outputfile>..mp4

Get video frames count

    ffmpeg -i <inputfile> -vcodec copy -an -f null /dev/null 2>&1 | grep 'frame=' | cut -f 2 -d "=" | awk '{print $1}'

Join few videos (first method — same video params, second — can join with different video params)

    ffmpeg -i "concat:<inputfile1>|<inputfile2>|<inputfile3>" -c copy <outputfile>
    ffmpeg -i <inputfile1> -i <inputfile2> -filter_complex '[0:0] [0:1] [1:0] [1:1] concat=n=2:v=1:a=1 [v] [a]' -map '[v]' -map '[a]' <encoding options> <outputfile>

Create black frame video (1 second)

    ffmpeg -t 1 -s 1920x1080 -f rawvideo -pix_fmt rgb24 -r 60 -i /dev/zero -vcodec libx264 -preset medium -tune stillimage -crf 18 <outputfile>

Fadein and fadeout to black&white video

    LASTFRAME=`ffmpeg -i <inputfile> -vcodec copy -an -f null /dev/null 2>&1 | grep 'frame=' | cut -f 2 -d "=" | awk '{print $1}'`
    DR=`ffmpeg -i <inputfile> 2>&1 | grep Duration | awk '{print $2}' | awk -F, '{print $1}'` # duration in format '02:53:49.82,'
    DR=`echo \"$DR\" | awk -F: '{ print ($1 * 3600) + ($2 * 60) + $3 }'`                      # convert to seconds
    let "FPS = $LASTFRAME / $DR"
    let "FOSF = $FPS / 2"                     # fadein starts from 0.5 second
    FISF=$(( $LASTFRAME - $FPS * 15 / 10 ))   # fadeout stop on DURATION-0.5 second
    ffmpeg -y -i <inputfile> -filter_complex "[0:v]split[base][fade];[fade]format=gray,format=yuva420p,split[fade1][fade2];[fade1]fade=out:s=${FOSF}:d=1:alpha=1[fade1end];[fade2]fade=in:s=${FISF}:d=1:alpha=1,[fade1end]overlay[fadefull];[base][fadefull]overlay" -c:v libx264 -pix_fmt yuv420p -crf 18 <outputfile>.mp4

### Segmented encoding

* Break the fullfile into parts (10 min)

    ffmpeg -i <inputfile>.mp4 -c copy -map 0 -flags +global_header -segment_time 600 -f segment file%03d.mp4

* Encoding

```bash
for i in {000..010}; do ffmpeg -y -i file$i.mp4 -vcodec libx264 -crf 22 -refs 6 -threads 1 -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 -subq 12 -trellis 1 -coder 1 -me_range 32 -level 4.1 -profile:v high -bf 12 -r 30 -vf scale=1280:720 -acodec libfaac -ac 2 -ab 160k -ar 48000 -strict experimental out_$i.mp4; done
```

* Rejoin the encoded parts

  Create a "*textfile*" and put in the name of each rendered file like this

  ```
file 'out_000.mp4'
file 'out_001.mp4'
.... 
file 'out_xxx.mp4'
  ```

  and run

  ```
  ffmpeg -f concat -i textfile -c copy -fflags +genpts <outputfile>.mp4
  ```

  source: [stackexchange.com](http://video.stackexchange.com/a/17062)


# Audio

Get audio DC offset and apply

    ffmpeg -y -i ./2016_06_01.m4a -af astats -f null -
    ffmpeg -y -i ./2016_06_01.m4a -filter_complex "dcshift=shift=0.139284" ./tmp.wav

Change audio volume

    ffmpeg -i <inputfile> -vcodec copy -af "volume=-5dB" <outputfile>

Add offset to audio

    ffmpeg -i <inputfile>.aac -itsoffset -0.7 -i <inputfile>.mp4 -y -c:v copy -c:a copy -bsf:a aac_adtstoasc -strict experimental <outputfile>.mp4

Convert audio to mp3 with constant and variable bitrate

    ffmpeg -i <inputfile>.m4a -c:a libmp3lame -ac 2 -b:a 320k <outputfile>.mp3
    ffmpeg -i <inputfile>.m4a -c:a libmp3lame -ac 2 -q:a 2 <outputfile>.mp3

Mix two audio files

    ffmpeg -y -i  <inputfile>.wav -i <inputfile>.wav -filter_complex amix=duration=longest -c:a libmp3lame -q:a 4 <outputfile>.mp3

Audio visualisation in video ([source](https://trac.ffmpeg.org/wiki/Encode/YouTube#Usingfilters))
![example](images/ffmpeg_vsw.jpg?raw=true "Usage example avectorscope, showspectrum and showwaves filters")

    ffmpeg -y -i <input_audio_file> -filter_complex "[0:a]avectorscope=s=640x518,pad=1280:720[vs]; [0:a]showspectrum=mode=separate:color=intensity:scale=cbrt:slide=scroll:s=640x518[ss]; [0:a]showwaves=s=1280x202:mode=line[sw]; [vs][ss]overlay=w[bg]; [bg][sw]overlay=0:H-h,drawtext=fontfile=/root/.fonts/Verdana.ttf:fontcolor=white:x=10:y=10:text='\"Song name\" by artist'[out]" -map "[out]" -map 0:a -c:v libx264 -preset fast -crf 18 -c:a copy <outputfile>.mkv

with background image

    ffmpeg -y -i <input_audio_file> -i <inputfile>.jpg -filter_complex "[0:a]avectorscope=s=640x518,[1:v]overlay[vs]; [0:a]showspectrum=mode=separate:color=intensity:scale=cbrt:slide=scroll:s=640x518[ss]; [0:a]showwaves=s=1280x202:mode=line[sw]; [vs][ss]overlay=w[bg]; [bg][sw]overlay=0:H-h,drawtext=fontfile=/root/.fonts/AquaKana.ttf:fontcolor=white:x=10:y=10:text='\"тест∫українськоііі\" by かるび太郎',drawtext=fontfile=/root/.fonts/AquaKana.ttf:fontcolor=white:x=10:y=H-30:timecode='00\:00\:50\:00':rate=25[out]" -map "[out]" -map 0:a -c:v libx264 -preset fast -crf 18 -c:a copy <outputfile>.mkv

