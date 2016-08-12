### Video

Cut a video without re-encoding

    ffmpeg -i <inputfile> -ss 00:00:00.0 -t 00:00:01.5 -c copy <outputfile>

Fade out to video and audio example (for video time use frames, for audio — seconds)

    ffmpeg -i <inputfile> -filter:v 'fade=out:7582:60' -c:v libx264 -crf 21 -preset veryfast -af 'afade=t=out:st=253:d=2' <outputfile>.mp4

Blur filter

    ffmpeg -i <inputfile> -vcodec libx264 -crf 18 -refs 4 -threads 2 -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 -subq 12 -trellis 1 -coder 1 -me_range 32 -level 4.1 -profile:v high -bf 12 -vf boxblur=2:2 <outputfile>.mp4

Crop video

    ffmpeg -i <inputfile>.mp4 -filter:v "crop=out_w:out_h:x:y" -c:a copy <outputfile>.mp4

Create animated-gif from video (1. generate palette, 2. generate gif using the palette, source: [1](http://superuser.com/questions/556029/how-do-i-convert-a-video-to-gif-using-ffmpeg-with-reasonable-quality), [2](http://blog.pkh.me/p/21-high-quality-gif-with-ffmpeg.html))

    ffmpeg -y -ss 30 -t 3 -i <inputfile>.flv -vf fps=10,scale=320:-1:flags=lanczos,palettegen palette.png
    ffmpeg -ss 30 -t 3 -i <inputfile>.flv -i palette.png -filter_complex "fps=10,scale=320:-1:flags=lanczos[x];[x][1:v]paletteuse" <outputfile>.gif

or using convert with frames

    ffmpeg -i <inputfile> -vf scale=320:-1:flags=lanczos,fps=10 frames/ffout%03d.png
    convert -loop 0 frames/ffout*.png <outputfile>.gif

    for i in {<num_frames-1>..1}; do tmp="$(printf "%03d" $i)"; tmp2="$(printf "%03d" $((<2*num_frames>-$i)))"; cp frames/ffout$tmp.png frames/ffout$tmp2.png; done

Convert to webm

    ffmpeg -i <inputfile>.mp4 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis <outputfile>.webm

#### Segmented encoding 

1. Break the fullfile into parts (10 min)

    ffmpeg -i <inputfile>.mp4 -c copy -flags +global_header -segment_time 600 -f segment file%03d.mp4

2. Encoding

```bash
for i in {000..010}; do ffmpeg -y -i file$i.mp4 -vcodec libx264 -crf 22 -refs 6 -threads 1 -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 -subq 12 -trellis 1 -coder 1 -me_range 32 -level 4.1 -profile:v high -bf 12 -r 30 -vf scale=1280:720 -acodec libfaac -ac 2 -ab 160k -ar 48000 -strict experimental out_$i.mp4; done
```

3. Rejoin the encoded parts

Create a "textfile" and put in the name of each rendered file like this

```
file 'out_000.mp4'
file 'out_001.mp4'
.... 
file 'out_xxx.mp4'
```

and run

    ffmpeg -f concat -i textfile -c copy -fflags +genpts <outputfile>.mp4


### Audio

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
