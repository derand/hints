###search and delete

    find ./ -name ".svn" -exec echo -n '"{}" ' \; | xargs rm -Rf
    find . -name ‘*.DS_Store’ -type f -delete

###search *.html files and replace text "®" to "&#174;" 
    (find . -name *html) | xargs sed -i "s/®/\&#174;/g"

###group rename files format "Изображение 123.jpg" to "img_123.jpg"
    find ./backup/photo -name '*[0-9][0-9][0-9].jpg' -exec bash -c 'mv "$0" "${0/Изображение /img_}"' {} \;

