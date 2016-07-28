### Compilation rtl_sdr from sources

    $ sudo apt-get install git cmake libusb-1.0-0.dev build-essential checkinstall
    $ git clone git://git.osmocom.org/rtl-sdr.git
    $ cd rtl-sdr
    $ mkdir build  && cd build
    $ cmake ..
    $ make
    $ checkinstall --pkgname=rtl-sdr --pkgversion="0.5.3.1" --backup=no --default --deldoc=yes
    $ sudo ldconfig

[Github](https://github.com/osmocom/rtl-sdr) repository mirror.

More links:

* [sdr.osmocom.org track](http://sdr.osmocom.org/trac/wiki/rtl-sdr)
* [rtl_sdr.pdf](https://dl.dropboxusercontent.com/u/2200287/rtl_sdr.pdf)
* [dxing.ru forum](http://dxing.ru/forum.html?func=view&catid=26&id=21481)
