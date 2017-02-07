### Securing Docker engine with TLS.

Working on /etc/docker/ directory

    cd /etc/docker/

##### Generate CA (authority) certificates

    openssl genrsa -out ca-key.pem 2048
    openssl req -x509 -new -nodes -days 10000 -subj '/CN=docker-CA' -key ca-key.pem -out ca.pem

##### Generate Server side certs

'''
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
'''

its important to replace IP.1 with your real server IP where Docker-Engine will run. With second line (IP.2) we allow to use certs in connections from local host (for debug purposes).

    openssl req -new -subj '/CN=docker-server' -key key.pem -config openssl.cnf -out cert.csr
    openssl x509 -req -in cert.csr -CA ca.pem -CAkey ca-key.pem -extfile openssl.cnf -out cert.pem -days 365 -extensions v3_req -CAcreateserial


##### Generate Client side certs

Before generating certs on Docker-client side please ensure you copy CA certs and CA key file ( /etc/docker/ca.pem, /etc/docker/ca-key.pem ) to client instance

    openssl genrsa -out key.pem 2048

'''
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
'''

    openssl req -new -subj '/CN=docker-client' -key key.pem -config openssl.cnf -out cert.csr
    openssl x509 -req -CAcreateserial -days 365 -extensions v3_req -CA ca.pem -CAkey ca-key.pem -in cert.csr -extfile openssl.cnf -out cert.pem


##### Configure Docker-Engine to listen on tcp and respect TLS.

Add to dockerd start command (file /etc/systemd/system/docker.service.d/overlay.conf)

    -H 0.0.0.0:2376 --tlsverify --tlscacert=/etc/docker/ca.pem --tlscert=/etc/docker/cert.pem --tlskey=/etc/docker/key.pem

file should looks like (you can create if not exist):

'''
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd --storage-driver overlay --default-ulimit nofile=1024:4096 -H unix:///var/run/docker.sock -H 0.0.0.0:2376 --tlsverify --tlscacert=/etc/docker/ca.pem --tlscert=/etc/docker/cert.pem --tlskey=/etc/docker/key.pem
'''

restart service

    systemctl daemon-reload
    service docker restart


##### Test client

    docker --tlsverify --tlskey=key.pem --tlscacert=ca.pem --tlscert=cert.pem -H=123.123.123.123:2376 version

Source: [ogavrisevs.github.io](https://ogavrisevs.github.io/2016/03/30/secure-docker/)
