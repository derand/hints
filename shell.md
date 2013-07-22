###search and delete

    find ./ -name ".svn" -exec echo -n '"{}" ' \; | xargs rm -Rf

###search *.html files and replace text "®" to "&#174;" 
    (find . -name *html) | xargs sed -i "s/®/\&#174;/g"
