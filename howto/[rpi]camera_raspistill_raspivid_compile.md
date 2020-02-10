### Fixin Raspistill and Raspivid for Headless Streaming on the Raspberry Pi

It's can be done on debian docker container with privilegied access.

    $ docker run -it --privileged -p 5200:5200 -v ~/docker/share:/mnt --name video_stream debian /bin/bash

```
# apt-get update
# apt-get install --no-install-recommends git gcc build-essential cmake vim-tiny
$ git clone git://github.com/raspberrypi/userland.git
$ cd userland/
$ sed -i 's/if (DEFINED CMAKE_TOOLCHAIN_FILE)/if (NOT DEFINED CMAKE_TOOLCHAIN_FILE)/g' makefiles/cmake/arm-linux.cmake
$ mkdir build && cd build
$ cmake -DCMAKE_BUILD_TYPE=Release ..
$ make
# make install 
```

Some commands for working with camera:

    $ ./bin/raspivid -rot 90 -o /mnt/video004.h264 -t 10000
    $ ./bin/raspistill -rot 90 -o /mnt/cam001.jpg

Bonus `gstreamer`

    # apt-get install --no-install-recommends gstreamer1.0-tools gstreamer1.0-plugins-good

Source [darkoperator.com](https://www.darkoperator.com/blog/2013/5/23/fixin-raspistill-and-raspivid-for-headless-streaming-on-the.html)
