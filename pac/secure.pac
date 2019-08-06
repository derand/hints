function FindProxyForURL(url, host) {
    // i2pd
//    if (dnsDomainIs(host, ".i2p"))
//        return "PROXY rpi2:4446";

    // local network
    if (isPlainHostName(host) ||
        dnsDomainIs(host, "127.0.0.1") ||
        dnsDomainIs(host, "localhost") ||
        dnsDomainIs(host, "rpi") ||
        dnsDomainIs(host, "rpi2") ||
//        isInNet(dnsResolve(host), "192.168.1.0", "255.255.255.0") ||
        isInNet(host, "192.168.1.0", "255.255.255.0") ||
        isInNet(host, "192.168.95.0", "255.255.255.0"))
        return "DIRECT";

    // redirect to squid
    return "PROXY rpi:3130";
}
