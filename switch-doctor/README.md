# Switch Doctor

**Live:** https://jont2k.github.io/switch-doctor/

A single-page web app that helps you understand network switch port faults and fix them step by step.

## Features

- **Switch view**: a 24-port switch with 4 SFP uplinks. Port lights show each port's state, and there's a health score and a list of issues, worst first. Click a port to see a plain-English explanation, likely causes, impact, and the commands to check it.
- **Guided fixes**: decision-tree troubleshooting with copyable commands at every step. Each path ends in a fix with a way to confirm it worked, or a checklist of what to collect before escalating.
- **Troubleshoot a symptom**: start from what you're seeing ("no network", "slow", "keeps dropping", "PoE device won't power on", "whole network is down") when you don't know which port is at fault.
- **Fault library**: err-disabled, no link, duplex mismatch, CRC errors, VLAN problems, spanning-tree blocking, PoE faults, link flapping, low negotiated speed, and admin-down ports.
- **Import from CLI**: paste `show interfaces status` output from a Cisco-style switch and every port is mapped to a likely fault.

## Running

No build step and no dependencies. Open `index.html` in a browser, or visit the live version on GitHub Pages. Everything runs in the browser; nothing you paste leaves your machine.

## Tech

Vanilla HTML/CSS/JavaScript. Troubleshooting flows are a graph of question and fix nodes, so paths can cross between faults (e.g. CRC errors → duplex mismatch). The CLI parser locates columns from the header line. Port state is saved in localStorage.

## Notes

Commands are Cisco IOS style. Most other vendors have close equivalents.
