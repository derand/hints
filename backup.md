### MySQL

    mysqldump -pPPASSWORD -uUSER BASENAME > backup.sql  
    mysql -h <host> -pPPASSWORD -uUSER DATABASE < ../backup.sql


### rsync

    rsync -rav --delete-after --exclude=.DS_Store --exclude=*.pyc -t -e ssh --rsync-path=/usr/bin/rsync --temp-dir=/tmp <source> <destination>
