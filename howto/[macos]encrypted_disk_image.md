
### Create encrypted disk image with Disk Utility

1. File -> New Image -> Blank image
2. Set "Save as ...", "Name", "Size" fields. 
My settings for transit image: `Format` - `MacOs Extended`, `Encryption` - `128bit AES`.

##### Mount command from terminal:

    hdiutil mount -mountpoint ~/dump/transit/ ~/dump/transit.dmg

