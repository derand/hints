### Enable AirDrop

    defaults write com.apple.NetworkBrowser BrowseAllInterfaces 1

### Open Yandex.Browser with disabled web security

    open -n -a Yandex --args --disable-web-security

    open -a Google\ Chrome --args --allow-file-access-from-files --disable-web-security

### In an "Open File" dialog you can use Command-Shift-. to see dot files.

### Go to sleep

    pmset sleepnow

### Purge memory

    sudo purge

### Print Mac OS X operating system version information

    sw_vers

### Get trash info

    du -ch $HOME/.Trash/* 2>/dev/null | tail -n 1 | awk '{print "Size: ", $1}'
    find $HOME/.Trash/* 2>/dev/null | wc -l | awk '{print "Number of files:", $1}'

### Volume (mute, unmute, setvalue, getvalue)

    osascript -e "set volume output muted true"
    osascript -e "set volume output muted false"
    osascript -e "set volume output volume 50"
    osascript -e "output volume of (get volume settings)


Some more options can see at [https://github.com/rgcr/m-cli](https://github.com/rgcr/m-cli/tree/master/plugins).