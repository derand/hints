## Video

### Fade out to video and audio example (for video time use frames, for audio — seconds)

    ffmpeg -i <inputfile> -filter:v 'fade=out:7582:60' -c:v libx264 -crf 21 -preset veryfast -af 'afade=t=out:st=253:d=2' <outputfile>.mp4

### Blur filter

    ffmpeg -i <inputfile> -vcodec libx264 -crf 18 -refs 4 -threads 2 -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 -subq 12 -trellis 1 -coder 1 -me_range 32 -level 4.1 -profile:v high -bf 12 -vf boxblur=2:2 <outputfile>.mp4


## Audio

### Get audio DC offset and apply

    ffmpeg -y -i ./2016_06_01.m4a -af astats -f null -
    ffmpeg -y -i ./2016_06_01.m4a -filter_complex "dcshift=shift=0.139284" ./tmp.wav

### Change audio volume

    ffmpeg -i <inputfile> -vcodec copy -af "volume=-5dB" <outputfile>

### Add offset to audio

    ffmpeg -i <inputfile>.aac -itsoffset -0.7 -i <inputfile>.mp4 -y -c:v copy -c:a copy -bsf:a aac_adtstoasc -strict experimental <outputfile>.mp4

### Convert audio to mp3 with constant and variable bitrate

    ffmpeg -i <inputfile>.m4a -c:a libmp3lame -ac 2 -b:a 320k <outputfile>.mp3
    ffmpeg -i <inputfile>.m4a -c:a libmp3lame -ac 2 -q:a 2 <outputfile>.mp3
