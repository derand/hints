### Start Chrome with pac script on Mac OS X

On Mac, Chrome uses the proxy settings listed under the Network Control Panel. These are the same settings that Safari uses. On this acticle we set custom proxy for Chrome.

##### Show current proxy settings on Chrome

    [chrome://net-internals/#proxy](chrome://net-internals/#proxy)

##### Command line arguments to change proxy settings

    --no-proxy-server
    --proxy-auto-detect
    --proxy-bypass-list=XXX
    --proxy-pac-url=XXX - example: --proxy-pac-url="file:///home/foobar/tmp/myscript.js"
    --proxy-server=XXX - example: --proxy-server="socks5://foobar:1080" or --proxy-server="foo:6233" for HTTP

##### Run from terminal

    open -b com.google.Chrome --args --proxy-pac-url="file:///home/foobar/tmp/myscript.js"

or

    open -a /Applications/Google\ Chrome.app --args --proxy-pac-url="https://raw.githubusercontent.com/derand/hints/master/pac/secure.pac"

##### Apple Script

    do shell script "open -b com.google.Chrome --args --proxy-pac-url='https://raw.githubusercontent.com/derand/hints/master/pac/secure.pac'"

or

    do shell script "open -a /Applications/Google\ Chrome.app --args --proxy-pac-url='file:///home/foobar/tmp/myscript.js'"


Sources: [www.chromium.org](https://www.chromium.org/developers/design-documents/network-stack/debugging-net-proxy) and [superuser.com](http://superuser.com/questions/16750/how-can-i-run-an-application-with-command-line-arguments-in-mac-os)
