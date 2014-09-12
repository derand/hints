### profile

    python -m cProfile -s time myscript.py <args>

or:

*PyCallGraph* : a tool to create call graph images 

install:

    sudo easy_install pycallgraph

run:

    pycallgraph myscript.py args

dot: graph is too large for cairo-renderer bitmaps. Scaling by 0.257079 to fit
which makes my images unusably small. So I generally create svg files:

    pycallgraph -f svg -o pycallgraph.svg mine.py <args>

PS> If you are using Ubuntu, make sure to install graphviz (which provides the dot program):

    sudo apt-get install graphviz


## Virtualenv

### create python virtualenv

    virtualenv venv

### activate virtual

    source venv/bin/activate

## Other

### upload file over ftp

	import ftplib
	ftp = ftplib.FTP(HOST)
	ftp.login(USER, PASS)
	ftp.cwd(PATH)
	ftp.storbinary('STOR ' + os.path.basename(fn), open(fn, 'rb'), 1024)
	ftp.quit()
