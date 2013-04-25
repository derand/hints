### MySQL

    mysqldump -pPPASSWORD -uUSER BASENAME > backup.sql  
    mysql -h <host> -pPPASSWORD -uUSER DATABASE < ../backup.sql


### rsync

    rsync -rav --delete-after --exclude=.DS_Store --exclude=._ -t -e ssh --rsync-path=/usr/bin/rsync \
    --temp-dir=/tmp <source> <destination>

### ftp

    curl -T ./*.ass ftp://host/media/video/ --user user:pass

### VBox

    VBoxManage export <VM name> -o ~/exp.ova
    VBoxManage import ~/exp.ovf 


