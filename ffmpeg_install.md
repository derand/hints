	brew install automake
	brew install libtool
	brew install yasm

### freetype-2.5.2

	curl -O http://download.savannah.gnu.org/releases/freetype/freetype-2.5.3.tar.gz
	tar -xzvf ./freetype-2.5.3.tar.gz
	sh autogen.sh
	./configure
	make
	sudo make install

### autoconf-2.65

	curl -O http://mirrors.kernel.org/gnu/autoconf/autoconf-2.65.tar.gz
	tar -xzvf autoconf-2.65.tar.gz
	cd autoconf-2.65
	./configure --prefix=/usr/local # ironic, isn't it?
	make
	sudo make install

### automake-1.11

	curl -O http://mirrors.kernel.org/gnu/automake/automake-1.11.tar.gz
	tar xzvf automake-1.11.tar.gz
	cd automake-1.11
	./configure --prefix=/usr/local
	make
	sudo make install

### libtool-2.2.6b

	curl -O http://mirrors.kernel.org/gnu/libtool/libtool-2.2.6b.tar.gz
	tar xzvf libtool-2.2.6b.tar.gz
	cd libtool-2.2.6b
	./configure --prefix=/usr/local
	make
	sudo make install

### pkgconfig

	curl -O http://pkgconfig.freedesktop.org/releases/pkgconfig-0.18.tar.gz
	tar xzvf pkgconfig-0.18.tar.gz
	cd ./pkgconfig-0.18
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ./configure --enable-static --prefix=/usr/local
	make
	sudo make install

### openjpeg

	svn checkout http://openjpeg.googlecode.com/svn/trunk/ openjpeg
	cd ./openjpeg/
	cmake .
	make 
	sudo make install

### libpng

	tar xzvf libpng-1.6.13.tar.gz
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ./configure --enable-static --prefix=/usr/local
	make 
	sudo make install

### libogg

	curl -O http://downloads.xiph.org/releases/ogg/libogg-1.3.2.tar.gz
	tar xzvf libogg-1.3.2.tar.gz
	cd ./libogg-1.3.2
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ./configure --enable-static --prefix=/usr/local
	make
	sudo make install

### speex

	curl -O http://downloads.xiph.org/releases/speex/speex-1.2rc1.tar.gz
	tar -xzvf ./speex-1.2rc1.tar.gz
	cd ./speex-1.2rc1
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ./configure --enable-static --prefix=/usr/local
	make
	sudo make install

### faac / faad

	tar xzvf ./faad2-2.0.tar.gz
	cd ./faad2
	# /bin/bash ./bootstrap
	# make
	# sudo make install
	cd ../
	tar xzvf ./faac-1.24.tar.gz
	cd faac
	/bin/bash ./bootstrap
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ./configure --enable-static --prefix=/usr/local
	make
	sudo make install

### libvpx

	git clone https://github.com/webmproject/libvpx.git
	cd libvpx/build
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ../configure --enable-static --as=yasm 
	make
	sudo make install

### libvorbis

	curl -O http://downloads.xiph.org/releases/vorbis/libvorbis-1.3.4.tar.gz
	tar xzvf libvorbis-1.3.4.tar.gz
	cd ./libvorbis-1.3.4
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ./configure --enable-static --prefix=/usr/local
	make
	sudo make install

### libtheora

	curl -O http://downloads.xiph.org/releases/theora/libtheora-1.2.0alpha1.tar.gz
	tar xzvf libtheora-1.2.0alpha1.tar.gz
	cd ./libtheora-1.2.0alpha1
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ./configure --enable-static --prefix=/usr/local
	make
	sudo make install

### xvidcore

	curl -O http://downloads.xvid.org/downloads/xvidcore-1.3.3.tar.gz
	tar xzvf xvidcore-1.3.3.tar.gz
	cd xvidcore/build/generic/
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ./configure --prefix=/usr/local
	make
	sudo make install

### fribidi

	curl -O http://fribidi.org/download/fribidi-0.19.6.tar.bz2
	tar -xvjf ./fribidi-0.19.6.tar.bz2
	cd ./fribidi-0.19.6
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ./configure --enable-static --prefix=/usr/local
	make
	sudo make install

### fontconfig

	curl -O http://www.freedesktop.org/software/fontconfig/release/fontconfig-2.11.1.tar.gz
	tar xzvf fontconfig-2.11.1.tar.gz
	cd fontconfig-2.11.1
	make 
	sudo make install

### libass

	curl -O http://libass.googlecode.com/files/libass-0.10.2.tar.gz
	tar xzvf ./libass-0.10.2.tar.gz
	cd ./libass-0.10.2
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ./configure --enable-static --prefix=/usr/local
	make 
	sudo make install


### libmp3lame

	tar xzvf lame-3.99.5.tar.gz
	cd ./lame-3.99.5
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ./configure --enable-static --prefix=/usr/local
	make
	sudo make install

### x264

	git clone git://git.videolan.org/x264.git
	cd x264/
	CFLAGS=`freetype-config --cflags` LDFLAGS=`freetype-config --libs` ./configure --enable-static --prefix=/usr/local
	make
	sudo make install

### ffmpeg

	git clone git://source.ffmpeg.org/ffmpeg.git ffmpeg
	cd ffmpeg
	CFLAGS="-I/usr/local/include/freetype2 -I/usr/local/include -I/usr/local/include/fribidi" LDFLAGS="-L/usr/local/lib -lx264 -lm -lfontconfig -lexpat -lfreetype -lfribidi -lfreetype -lz -lbz2 -lpng -lass" ./configure --extra-version=derand --enable-gpl --enable-version3 --enable-nonfree --disable-shared --enable-static --enable-ffplay --disable-ffprobe --disable-ffserver --disable-network --enable-pthreads --enable-libx264 --enable-libfaac --enable-libmp3lame --enable-libxvid --enable-libtheora --enable-libvorbis --enable-libvpx --enable-libfreetype --enable-libass --enable-fontconfig --enable-libxvid --enable-openssl --enable-postproc --target-os=darwin --arch=i386  --prefix=/usr/local --extra-ldflags=-liconv
	mkdir ~/Desktop/lib
	sudo mv /usr/local/lib/*.dylib ~/Desktop/lib/
	make
	sudo mv ~/Desktop/lib/* /usr/local/lib/
	rm -fr ~/Desktop/lib

	###--disable-yasm --enable-cross-compile

