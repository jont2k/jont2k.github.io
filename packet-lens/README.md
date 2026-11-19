# Packet Lens

**Live:** https://jont2k.github.io/packet-lens/

A single-page web app for analyzing packet captures. Open a `.pcap` or `.pcapng` file (or drop one on the page) and inspect it the way you would in Wireshark, without installing anything.

## Features

- **Packet list**: number, time, source, destination, protocol, length and a one-line summary for every packet, color-coded by protocol. Virtualized, so large captures stay responsive. Arrow keys, Page Up/Down, Home and End move the selection.
- **Display filters**: Wireshark-style syntax with `&&`, `||`, `!`, parentheses and `== != > < >= <= contains matches`. Examples: `tcp.port == 443 && ip.addr == 10.0.0.0/8`, `dns.qry.name contains "example"`, `tls.sni matches "\.example\.net$"`, `frame contains "password"`. Filters are validated as you type, with plain-English errors.
- **Protocol tree and hex view**: each layer broken into fields. Clicking a field highlights its bytes; clicking a byte selects the field it belongs to.
- **Decoders**: Ethernet, 802.1Q VLAN, Linux cooked capture (SLL and SLL2), loopback and raw IP link types; ARP, IPv4, IPv6 (with extension headers), ICMP, ICMPv6 (including neighbor discovery), IGMP, TCP (flags and options), UDP, DNS, mDNS, LLMNR, HTTP/1.x, TLS (records, Client/Server Hello, SNI, ALPN, cipher suites), DHCP, NTP, QUIC headers and SSDP.
- **TCP analysis**: relative sequence and acknowledgment numbers, stream indexes, and flags for suspected retransmissions and zero-window segments.
- **Follow stream**: the full payload of a TCP or UDP conversation, both directions, as ASCII or hex.
- **Statistics**: totals, traffic over time (click a bar to filter to that interval), protocol breakdown, top endpoints, conversations, DNS lookups, TLS/HTTP hostnames, and a list of problems (resets, retransmissions, DNS errors, ICMP unreachables, malformed packets). Every row filters the packet list.
- **Paste hex**: decode a single packet from a Wireshark hex stream, `tcpdump -xx` output or an offset hex dump.

A generated sample capture of home-network traffic (ARP, DNS, HTTP, TLS 1.3 with a retransmission, ping, a refused SSH connection, NTP and mDNS) loads on first open.

## Running

No build step and no dependencies. Open `index.html` in a browser, or visit the live version on GitHub Pages. Captures are parsed in the browser; nothing is uploaded. Gzipped captures are decompressed in the browser where it supports `DecompressionStream`.

## Tech

Vanilla HTML/CSS/JavaScript. The pcap and pcapng readers handle both byte orders, microsecond and nanosecond timestamps, and per-interface `if_tsresol`. Each packet is decoded once into a summary and a field map that the filter engine queries; the full field tree is rebuilt only for the selected packet, with byte offsets for every field. Filters are compiled by a small recursive-descent parser into closures.

## Limits

TCP segments are not reassembled before application-layer decoding, so an HTTP message or TLS record split across segments is decoded from its first segment only. Checksums are shown but not verified. Encrypted payloads are not decrypted.
