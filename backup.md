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

## Time Machine

### Disable/ Enable

	sudo tmutil disable

	sudo tmutil enable

### Disable local storage

Since your laptop isn’t always connected to its backup disk, Time Machine retains “local snapshots,” or files that it will copy to your backup disk the next time it is available. However, these local snapshots take up space, and you may want to turn this feature off if you don’t have much room on your hard disk. You can do so with the following command:

	sudo tmutil disablelocal

### Exclude files and folders

	sudo tmutil addexclusion ~/Downloads

### Manage remote backups

	tmutil destinationinfo

	tmutil removedestination

	tmutil setdestination <volume_name>

### Get Time Machine stats

	tmutil listbackups

	tmutil calculatedrift <backup_folder>


### Delete backup

	sudo tmutil delete snapshot-dir

### [U]Mount Time Machine backup

    hdiutil attach test.sparsebundle -readonly
    hdiutil detach /dev/disk3s2
    hdiutil eject /dev/disk3s2
