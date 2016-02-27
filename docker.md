
### Start boot2docker

    boot2docker start
    $(boot2docker shellinit)

### Start temp container and attach

    docker run -i -t resin/rpi-raspbian:wheezy bash

### Remove all unused images

    docker images -a -q |xargs docker rmi

### Save exist container to image

    docker commit -a "name <email>" -m "<commit message>" <container_id> <image_name>:<image_tag>

### Save/load images

    docker save -o <save image to path> <image name>

    docker load -i <path to image tar file> 

