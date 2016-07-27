### Resize root partiotion at Raspberry Pi

    $ sudo raspi-config

### With fdisk

    $ sudo fdisk /dev/mmcblk0

In fdisk:

* Press `p` to print the partition table:

```
Disk /dev/mmcblk0: 15.9 GB, 15931539456 bytes
4 heads, 16 sectors/track, 486192 cylinders, total 31116288 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x00084078

   Device Boot           Start         End      Blocks   Id  System
/dev/mmcblk0p1            2048      124927       61440   83  Linux
/dev/mmcblk0p2          124928    31116287    15495680   83  Linux
```
* Press `d` to delete a partition:

* Enter `2` to choose the second partition.

* Press `n` to create a new partition:

* Enter `p` to select primary as partition type.

* Partition number: `enter` to accept 2 as default partition number.

* First sector: `enter` to accept default (this should be 124928).

* Last sector: `enter` to accept default.

* Press `w` to write the new partition table.

Reboot to force the kernel to recognise the new partition table.

    $ sudo shutdown -r now

After the system has come back up you still have to resize the partition.

    $ sudo resize2fs /dev/mmcblk0p2

Source: [gleenders.blogspot.com](http://gleenders.blogspot.com/2014/08/banana-pi-resizing-sd-card-root.html)
