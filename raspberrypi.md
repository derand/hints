###install raspberri os to flash drive 

    sudo dd if=./2013-02-09-wheezy-raspbian.img of=/dev/disk2 bs=1m

###intall raspbmc os to flash (need install raspberri os before)

	curl -O http://svn.stmlabs.com/svn/raspbmc/release/installers/python/install.py
	chmod +x install.py
	sudo python install.py
