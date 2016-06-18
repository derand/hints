### Environment for [2iDevice](https://github.com/derand/video2iDevice) script

First install custom [ffmpeg with x264 codec](https://github.com/derand/hints/blob/master/howto/%5Blinux%5Dffmpeg%2Bx264.md)

##### AtomicParsley

    $ cd ~/src
    $ hg clone https://bitbucket.org/wez/atomicparsley
    $ cd ./atomicparsley/
    $ ./autogen.sh
    $ ./configure
    $ make -j3
    $ sudo checkinstall --pkgname=AtomicParsley --pkgversion="0.9.6" --backup=no --deldoc=yes --fstrans=no --default

##### MediaInfo

Download from [http://mediainfo.sourceforge.net/en/Download/Source](http://mediainfo.sourceforge.net/en/Download/Source)

    $ tar -xjvf ./MediaInfo_CLI_*
    $ cd ./MediaInfo_CLI_GNU_FromSource/
    $ ./CLI_Compile.sh
    $ sudo cp ./MediaInfo/Project/GNU/CLI/mediainfo /usr/local/bin/

##### MKVToolnix, MP4Box

    $ sudo apt-get install mkvtoolnix gpac

##### ?

    $ sudo apt-get install mencoder
