Split video to images 

    ffmpeg -y -i <inputfile>.MOV -r 60 -filter:v "setpts=1/90*PTS" -map "0:v" <tmp_dir>/img%04d.png

input video has 30fps and I wanna greate 90x faster with 60 fps

If not need brightness balance at first step save output to video

    ffmpeg -y -i <inputfile>.MOV -map "0:v" -c:v libx264 -pix_fmt yuv420p -crf 16 -refs 9 -threads 12 -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 -subq 12 -trellis 1 -coder 1 -me_range 32 -level 4.1 -profile:v high -bf 12 -filter:v "setpts=1/90*PTS,fps=60" <outputfile>.mp4

If need brightness balance use [imagemagic](https://www.imagemagick.org/script/index.php) with [histmatch](http://www.fmwconcepts.com/imagemagick/histmatch/index.php) script

    for i in {0001..0460}; do echo img$i.png; ./histmatch -c rgb <tmp_dir>/img0461.png <tmp_dir>/img$i.png <tmp2_dir>/img$i.png; done

where '0460' – number of frames, 'img0461.png' – image with best look brightness

Convert images to video

    ffmpeg -y -i <tmp2_dir>/img%04d.png -c:v libx264 -pix_fmt yuv420p -crf 16 -refs 9 -threads 12 -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 -subq 12 -trellis 1 -coder 1 -me_range 32 -level 4.1 -profile:v high -bf 12 -filter:v "setpts=25/60*PTS,fps=60" <outputfile>.mp4
