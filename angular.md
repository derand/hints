#### Generate application

    ng new test-app --routing --commit=false --directory=web

#### Generate module and component (with lazy loading) inside another module

    ng generate module user-edit --route home --module home

#### Generate component in module

    ng generate component wallboxes -m home

#### Generate service

    ng generate service mqtt

#### Proxy configuration

File `proxy.conf.json`

```
{
    "/api/*": {
        "target": "http://szt_api:3000",
        "changeOrigin": false,
        "secure": false
    }
}
```

File `angulra.json`

```
"serve":
    "options": {
    	...
    	"proxyConfig": "proxy.conf.json"
    }
```
