### Securing Docker engine with TLS.

Working on /etc/docker/ directory

    cd /etc/docker/

##### Generate CA (authority) certificates

    openssl genrsa -out ca-key.pem 2048
    openssl req -x509 -new -nodes -days 10000 -subj '/CN=docker-CA' -key ca-key.pem -out ca.pem

##### Generate Server side certs

```
openssl genrsa -out key.pem 2048
cat << EOF > openssl.cnf
[req]
req_extensions = v3_req
distinguished_name = req_distinguished_name
[req_distinguished_name]
[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth, clientAuth
subjectAltName = @alt_names

[alt_names]
IP.1 = 123.123.123.123
IP.2 = 0.0.0.0
EOF
```

its important to replace IP.1 with your real server IP where Docker-Engine will run. With second line (IP.2) we allow to use certs in connections from local host (for debug purposes).

    openssl req -new -subj '/CN=docker-server' -key key.pem -config openssl.cnf -out cert.csr
    openssl x509 -req -in cert.csr -CA ca.pem -CAkey ca-key.pem -extfile openssl.cnf -out cert.pem -days 365 -extensions v3_req -CAcreateserial


##### Generate Client side certs

Before generating certs on Docker-client side please ensure you copy CA certs and CA key file ( /etc/docker/ca.pem, /etc/docker/ca-key.pem ) to client instance

    openssl genrsa -out key.pem 2048

```
cat << EOF > openssl.cnf
[req]
req_extensions = v3_req
distinguished_name = req_distinguished_name
[req_distinguished_name]
[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth, clientAuth
EOF
```

    openssl req -new -subj '/CN=docker-client' -key key.pem -config openssl.cnf -out cert.csr
    openssl x509 -req -CAcreateserial -days 365 -extensions v3_req -CA ca.pem -CAkey ca-key.pem -in cert.csr -extfile openssl.cnf -out cert.pem


##### Configure Docker-Engine to listen on tcp and respect TLS.

Add to dockerd start command (file /etc/systemd/system/docker.service.d/overlay.conf)

    -H 0.0.0.0:2376 --tlsverify --tlscacert=/etc/docker/ca.pem --tlscert=/etc/docker/cert.pem --tlskey=/etc/docker/key.pem

file should looks like (you can create if not exist):

```
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd --storage-driver overlay --default-ulimit nofile=1024:4096 -H unix:///var/run/docker.sock -H 0.0.0.0:2376 --tlsverify --tlscacert=/etc/docker/ca.pem --tlscert=/etc/docker/cert.pem --tlskey=/etc/docker/key.pem
```

restart service

    systemctl daemon-reload
    service docker restart

##### Configure Docker-Engine to listen on tcp and respect TLS for Ubuntu

You should change "/lib/systemd/system/docker.service", replace

    ExecStart=/usr/bin/dockerd -H fd:// $DOCKER_OPTS

to

    ExecStart=/usr/bin/dockerd

and create /etc/docker/daemon.json file:

```
cat << EOF > /etc/docker/daemon.json
{
    "hosts": ["unix:///var/run/docker.sock", "0.0.0.0:2376"],
    "tls": true,
    "tlsverify": true,
    "tlscacert": "/etc/docker/ca.pem",
    "tlscert": "/etc/docker/cert.pem",
    "tlskey": "/etc/docker/key.pem"
}
EOF
```

##### Test client

    docker --tlsverify --tlskey=key.pem --tlscacert=ca.pem --tlscert=cert.pem -H=123.123.123.123:2376 version

Source: [ogavrisevs.github.io](https://ogavrisevs.github.io/2016/03/30/secure-docker/)

#### Another way to setting up Docker with TLS on systemd (Ubuntu 16.04)

First a quick edit of the docker systemd service file is necessary. It is located at `/lib/systemd/system/docker.service`. By default it will launch the docker daemon with a unix socket bound to `-H fd://`, however in my opinion it’s nicer to have all config options at a central place, namely the `daemon.json` config file that is read by the docker daemon on start.

So first we’ll remove the `-H fd://` flag from the ExecStart line of the docker.service file and leave it plain without flags:
```
$ cat /lib/systemd/system/docker.service
[...]
ExecStart=/usr/bin/docker daemon
[...]
```
Next we create the /etc/docker/daemon.json file and add our settings there:
```
{
  "tlsverify": true,
  "tlscacert": "/etc/docker/YOUR_DOMAIN/ca.pem",
  "tlscert"  : "/etc/docker/YOUR_DOMAIN/cert.pem",
  "tlskey"   : "/etc/docker/YOUR_DOMAIN/key.pem",
  "hosts"    : ["fd://", "tcp://BIND:2376"]
}
```

As you can see I stored my TLS files in the subdirectory __YOUR_DOMAIN__ in the `/etc/docker/` directory. The certificates are usually specific to a domain name so it makes it more obvious. I bound the daemon to two hosts, first the default unix socket for nicer docker management on the server itself and the TLS secured TCP address. I use my domain name for BIND for the same reason stated previously.

And that should be it, __reload__ and __restart__ your docker service and use __enable__ to boot it on startup and you should be able to connect:
```
sudo systemctl daemon-reload
sudo systemctl restart docker
sudo systemctl enable docker
```
You could add your server user to the docker group (the unix socket is owned by this group), however since I manage docker via TCP I opt not to use it and run docker via sudo if necessary.

Note: don’t forget to distribute certificates to your clients, and set the __DOCKER_HOST__ and __DOCKER_TLS_VERIFY__ environment variables.

Source: [chjdev.com](https://chjdev.com/2016/06/07/docker-ubuntu/)
