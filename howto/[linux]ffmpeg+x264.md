*** Instalation ffmpeg with x264, lame, vpx from sources on Ubuntu Linux

***** Install supported packeges

    $ sudo apt-get remove libmp3lame-dev ffmpeg
    $ sudo apt-get -y install quilt libsdl1.2-dev libogg-dev libvorbis-dev liba52-dev libdts-dev libimlib2-dev texi2html libraw1394-dev libdc1394-22-dev libtheora-dev libgsm1-dev libxvidcore-dev libfaac-dev libfaad-dev build-essential git-core checkinstall yasm texi2html libopencore-amrnb-dev libopencore-amrwb-dev libtheora-dev libvorbis-dev libx11-dev libxfixes-dev zlib1g-dev nasm autoconf mercurial libass-dev python-chardet

***** Yasm

    $ mkdir src && cd ~/src 
    $ wget http://www.tortall.net/projects/yasm/releases/yasm-1.2.0.tar.gz
    $ tar xzvf yasm-1.2.0.tar.gz
    $ cd yasm-1.2.0
    $ ./configure
    $ make -j3
    $ sudo checkinstall --pkgname=yasm --pkgversion="1.2.0" --backup=no --deldoc=yes --fstrans=no --default

***** x264

    $ cd ~/src
    $ git clone git://git.videolan.org/x264
    $ cd x264
    $ ./configure
    $ make -j3
    $ sudo checkinstall --pkgname=x264 --default --pkgversion="3:$(./version.sh | awk -F'[" ]' '/POINT/{print $4"+git"$5}')" --backup=no --deldoc=yes
    $ sudo make install-lib-dev
    $ sudo cp libx264.a /usr/local/lib/

***** liblame

    $ cd ~/src
    $ sudo mkdir -p /usr/local/share/doc/lame
    $ wget http://downloads.sourceforge.net/project/lame/lame/3.99/lame-3.99.5.tar.gz
    $ tar xzvf lame-3.99.5.tar.gz
    $ cd lame-3.99.5
    $ ./configure --enable-nasm --disable-shared
    $ make -j3
    $ sudo checkinstall --pkgname=lame-ffmpeg --pkgversion="3.99.5" --backup=no --default --deldoc=yes

***** libvpx

    $ cd ~/src
    $ git clone https://github.com/webmproject/libvpx.git
    $ cd libvpx
    $ ./configure
    $ make -j3
    $ sudo checkinstall --pkgname=libvpx --pkgversion="$(date +%Y%m%d%H%M)-git" --backup=no --default --deldoc=yes

***** ffmpeg

    $ cd ~/src
    $ git clone git://source.ffmpeg.org/ffmpeg
    $ cd ffmpeg
    $ ./configure --enable-gpl --enable-postproc --enable-swscale --enable-pthreads --enable-x11grab --enable-libdc1394 --enable-libfaac --enable-libgsm --enable-libmp3lame --enable-libtheora --enable-libvorbis --enable-libx264 --enable-libxvid --enable-nonfree --enable-version3 --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libvpx --enable-libass
    $ make -j3
    $ sudo checkinstall --pkgname=ffmpeg --pkgversion="0.11.2-git" --backup=no --deldoc=yes --default

    $ hash x264 ffmpeg ffplay ffprobe
