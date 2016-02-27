### Search and delete

    find ./ -name ".svn" -exec echo -n '"{}" ' \; | xargs rm -Rf
    find . -name ‘*.DS_Store’ -type f -delete

### Search *.html files and replace text "®" to "&#174;" 

    (find . -name *html) | xargs sed -i "s/®/\&#174;/g"

### Group rename files format "Изображение 123.jpg" to "img_123.jpg"

    find ./backup/photo -name '*[0-9][0-9][0-9].jpg' -exec bash -c 'mv "$0" "${0/Изображение /img_}"' {} \;

### Get difference between ntp server and local time

    ntpdate -q pool.ntp.org

### Show current connections

    lsof -i | grep -E "(ESTABLISHED|LISTEN)"

autoupldate

    watch -n 5 "lsof -i | grep -E '(ESTABLISHED|LISTEN)'"