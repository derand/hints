
###How to prevent .DS_Store file creation over network connections

    defaults write com.apple.desktopservices DSDontWriteNetworkStores true

### Disable creating .DS_Store on USB volumes

    defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true

### Disable creating ".example.jpg" when copy "example.jpg" from mac to usb.

    sudo mdutil -i off -d /Volumes

