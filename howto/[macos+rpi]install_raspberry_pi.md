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

New raspbian os version does not have default user, need to create it (get password hash and save it into file):

Create a file named `userconf` in the boot folder to create a user. The contents of the file are as follows

    username:password-hash

The password hash is generated using the following command

    echo "password" | openssl passwd -6 -stdin

For example (password: `raspberry` for `pi` user):

    $ echo 'pi:$6$3NruXMMQLONjVtDE$0YRjc4303DatDHCyCbrQBUT5ibJSAQnYfVyydV10LV.r9ek2qibWzbAxuIoaTJFGzLzVUxguUedqheJRVQu720' > /Volumes/boot/userconf


Put them into RPi and plug it on.

Search RPi ip (do you remember all ip's in your local network? right?):

    $ nmap -sP 192.168.1.0/24


You can ssh to RPi:

    $ ssh pi@192.168.1.101

Adjust some settings:

    $ sudo apt-get update
    $ sudo apt-get dist-upgrade
    $ sudo raspi-config


Autojoin to WiFi network

Create file `/etc/wpa_supplicant/wpa_supplicant.conf` with context
```
country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="<your ssid>"
    psk="<password>"
    key_mgmt=WPA-PSK
    scan_ssid=1
}
```

For static Wi-Fi IP edit file `/etc/dhcpcd.conf`:

```
interface wlan0
static ip_address=192.168.1.12
static routers=192.168.1.1
static domain_name_servers=8.8.8.8
```

Sources: [raspberrypi.org](https://www.raspberrypi.org/downloads), [hypriot.com](http://blog.hypriot.com/getting-started-with-docker-and-mac-on-the-raspberry-pi/), [circuitbasics.com](http://www.circuitbasics.com/raspberry-pi-basics-setup-without-monitor-keyboard-headless-mode/), [hypriot.com](https://blog.hypriot.com/post/run-docker-rpi3-with-wifi/), [electrondust.com](https://electrondust.com/2017/11/25/setting-raspberry-pi-wifi-static-ip-raspbian-stretch-lite/)
