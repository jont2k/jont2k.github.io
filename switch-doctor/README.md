# Switch Doctor

**Live:** https://jont2k.github.io/switch-doctor/

A single-page web app that helps you understand network switch port faults and fix them step by step.

## Features

- **Switch view**: a 24-port switch with 4 SFP uplinks. Port lights show each port's state, and there's a health score and a list of issues, worst first. Click a port to see a plain-English explanation, likely causes, impact, and the commands to check it.
- **Guided fixes**: decision-tree troubleshooting with copyable commands at every step. Each path ends in a fix with a way to confirm it worked, or a checklist of what to collect before escalating.
- **Troubleshoot a symptom**: start from what you're seeing ("no network", "slow", "keeps dropping", "PoE device won't power on", "whole network is down") when you don't know which port is at fault.
- **Fault library**: err-disabled, no link, duplex mismatch, CRC errors, VLAN problems, spanning-tree blocking, PoE faults, link flapping, low negotiated speed, and admin-down ports.
- **Cisco and Dell support**: a Switch menu changes every command, port name and config snippet to match Cisco IOS, Dell N-Series (OS6) or Dell OS10. Platform differences are handled, e.g. BPDU protection is switch-wide on N-Series, and OS10 needs `errdisable detect cause bpduguard` before BPDU guard shuts a port.
- **Import from CLI**: paste `show interfaces status` (Cisco, Dell N-Series) or `show interface status` (Dell OS10). The format is detected automatically and every port is mapped to a likely fault.

## Running

No build step and no dependencies. Open `index.html` in a browser, or visit the live version on GitHub Pages. Everything runs in the browser; nothing you paste leaves your machine.

## Tech

Vanilla HTML/CSS/JavaScript. Troubleshooting flows are a graph of question and fix nodes, so paths can cross between faults (e.g. CRC errors → duplex mismatch). Each command is written once in Cisco syntax and translated per vendor through a line-by-line map. The CLI parser detects the vendor from the header line and reads each row by its tokens. Port state and the chosen vendor are saved in localStorage.

## Notes

Dell OS10 data-center switches don't supply PoE; Dell's PoE models (N1100, N1500, N2200, N3200) run OS6, so pick Dell N-Series for those. Exact syntax can vary by firmware version, so check `?` on your switch if a command is rejected.
