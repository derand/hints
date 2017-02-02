### Install docker to Raspberry Pi based rasbian

Delete packages that not need

    $ sudo sh -c "for pk in python x11 sound gnome lxde gtk desktop gstreamer avahi dbus freetype penguinspuzzle xkb-data xdg shared-mime-info; do apt-get -y remove `dpkg --get-selections | grep -v "deinstall" | grep $pk | sed s/install//`; done"
    $ sudo apt-get -y autoremove
    $ sudo apt-get clean

Download [docker debian package](http://blog.hypriot.com/downloads/) and install them

    $ curl -sSL https://downloads.hypriot.com/docker-hypriot_1.10.3-1_armhf.deb > /tmp/docker-hypriot_armhf.deb
    $ sudo dpkg -i /tmp/docker-hypriot_armhf.deb
    $ rm -f /tmp/docker-hypriot_armhf.deb
    $ sudo sh -c 'usermod -aG docker $SUDO_USER'
    $ sudo systemctl enable docker.service

Or you can build package yourself and install

    $ git clone https://github.com/hypriot/rpi-docker-builder.git
    $ cd rpi-docker-builder
    $ sudo sh build.sh
    $ sudo sh run-builder.sh

Sources: [github.com/umiddelb/armhf](https://github.com/umiddelb/armhf/wiki/Get-Docker-up-and-running-on-the-RaspberryPi-%28ARMv6%29-in-three-steps), [hypriot.com]((http://blog.hypriot.com/downloads/))
