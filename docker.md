
### Start boot2docker

    boot2docker start
    $(boot2docker shellinit)

### Start temp container and attach

    docker run -i -t resin/rpi-raspbian:wheezy bash

### Remove all unused images

    docker images -a -q |xargs docker rmi
    docker rmi $(docker images -q -f dangling=true)

### Save exist container to image

    docker commit -a "name <email>" -m "<commit message>" <container_id> <image_name>:<image_tag>

### Save/load images

    docker save -o <save image to path> <image name>

    docker load -i <path to image tar file> 

### Run screen into running container

    docker exec -i -t tf_tcore sh -c "exec >/dev/tty 2>/dev/tty </dev/tty && export TERM=vt100 && /usr/bin/screen -s /bin/bash"
