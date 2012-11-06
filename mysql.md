
### show database schema

    $ mysqldump --no-data --skip-opt --skip-comments --compact "databasename"

or

    mysql> desc TABLE_NAME

### backup

    mysqldump -pPPASSWORD -uUSER BASENAME > backup.sql  
    mysql -h <host> -pPPASSWORD -uUSER DATABASE < ../backup.sql
