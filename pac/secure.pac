function FindProxyForURL(url, host) {
    // i2pd
//    if (dnsDomainIs(host, ".i2p"))
//        return "PROXY rpi2:4446";

    // local network
    if (isInNet(dnsResolve(host), "192.168.1.0", "255.255.255.0") ||
        isInNet(dnsResolve(host), "192.168.95.0", "255.255.255.0"))
        return "DIRECT";

    // redirect to squid
    return "PROXY rpi2:3130";
}
