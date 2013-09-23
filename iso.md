###create iso from drive

    dd if=/dev/disk1 of=~/disk.iso bs=2048

###create iso from folder

    hdiutil makehybrid -iso -joliet -o <output file> <folder with files>/

###convert dmg to iso

    hdiutil convert file.dmg  -format UDTO -o <output iso file>
    mv <output iso file>.cdr <output iso file>
