# MTG Set & Reveal Tracker

**Live:** https://jont2k.github.io/mtg-tracker/

A single-page web app that tracks Magic: The Gathering sets, their release dates, and the date each card was first revealed (previewed/spoiled), using live data from the [Scryfall API](https://scryfall.com/docs/api).

## Features

- **Reveal Feed**: recently revealed cards across all sets, grouped by reveal day, with the outlet that previewed each card. Window of 2 weeks, 45 days or 90 days, with filters for name/rules text, rarity and color.
- **Upcoming**: announced sets grouped by release month with countdowns, plus sets released in the last 90 days.
- **All Sets**: every set, searchable and filterable by product type and year.
- **Set pages**: release date, first/latest reveal dates, reveal progress (cards revealed vs. set size), and cards grouped by reveal date or collector number.
- **Card details**: full card image (both faces for double-faced cards), oracle text with mana symbols, reveal date and source link, artist, price.
- **Reprint tracking**: every card is tagged New or Reprint, with a filter for each. Card details show where a reprint was first printed and its earlier printings.

## Running

No build step and no dependencies. Open `index.html` in a browser, or visit the live version on GitHub Pages. All data is fetched client-side from Scryfall, so it's always current.

## Tech

Vanilla HTML/CSS/JavaScript. Hash-based routing (`#feed`, `#upcoming`, `#sets`, `#set-<code>`), paginated Scryfall search with request throttling per Scryfall's rate-limit guidelines, and localStorage caching of the set list.

## Notes

Reveal dates come from Scryfall's `preview.previewed_at` field; older sets often have no preview record.

Card data and images © Wizards of the Coast, provided by Scryfall. Unofficial fan project, not affiliated with or endorsed by Wizards of the Coast.
