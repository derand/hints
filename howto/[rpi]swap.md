*** Adding swap enabled after reboot

'''
mkdir -p /var/cache/swap/
dd if=/dev/zero of=/var/cache/swap/myswap bs=1M count=256
chmod 0600 /var/cache/swap/myswap
mkswap /var/cache/swap/myswap
swapon /var/cache/swap/myswap
echo "/var/cache/swap/myswap    none    swap    sw    0   0" >> /etc/fstab
'''

Source: [askubuntu.com](http://askubuntu.com/questions/126018/adding-a-new-swap-file-how-to-edit-fstab-to-enable-swap-after-reboot)
