### Instalation docker and ffmpeg for fresh system  

Sets locale and axpand file system, do not reduce video memory it's need for hardware decoding

    $ sudo raspi-config

### Docker

    $ sudo apt-get install -y --no-install-recommends apt-transport-https ca-certificates software-properties-common

    $ curl -fsSL get.docker.com -o get-docker.sh && sh get-docker.sh

    $ sudo usermod -aG docker pi

Not need but lets keep newest version of docker from repo

    $ sudo vim.tiny /etc/apt/sources.list

add:

    deb https://download.docker.com/linux/raspbian/ stretch stable

    $ sudo apt-get update && sudo apt-get upgrade

    $ sudo systemctl start docker.service

    $ docker info

### Ffmpeg from repo

    $ sudo apt-get update && sudo apt-get upgrade

    $ sudo apt-get install -y --no-install-recommends ffmpeg

    $ ffmpeg -encoders | grep h264
    $ ffmpeg -decoders | grep h264

Source: [1](https://www.docker.com/blog/happy-pi-day-docker-raspberry-pi/)
