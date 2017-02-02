### Install Raspberry Pi system to flash from Mac OS

First, download base image from [raspberrypi.org](https://www.raspberrypi.org/downloads) (I'm using "Lite" version of raspbian).

Unzip downloaded image:

    $ unzip 2016-05-27-raspbian-jessie-lite.zip

Insert SD card and show all disks:

    $ diskutil list

Found your SD card disk and unmount them:

    $ diskutil unmountdisk /dev/disk5

Write image to SD card (be careful with "of" parameter):

    $ sudo dd if=2016-05-27-raspbian-jessie-lite.img of=/dev/rdisk5 bs=1m

Eject your SD card:

    $ diskutil eject /dev/disk5

Insert SD card back and create "ssh" file on boot partiotion for enable ssh:

    $ touch /Volumes/boot/ssh

Put them into RPi and plug it on.

Search RPi ip (do you remember all ip's in your local network? right?):

    $ nmap -sP 192.168.1.0/24

You can ssh to RPi:

    $ ssh pi@192.168.1.101

Adjust some settings:

    $ sudo apt-get update
    $ sudo apt-get dist-upgrade
    $ sudo raspi-config


Sources: [raspberrypi.org](https://www.raspberrypi.org/downloads), [hypriot.com](http://blog.hypriot.com/getting-started-with-docker-and-mac-on-the-raspberry-pi/), [circuitbasics.com](http://www.circuitbasics.com/raspberry-pi-basics-setup-without-monitor-keyboard-headless-mode/)
