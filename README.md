# yourusername.github.io

Personal website built with [Terminal.css](https://terminalcss.xyz) and plain HTML.
Hosted on [GitHub Pages](https://pages.github.com).

## Structure

```
.
├── index.html          # Home page
├── css/
│   └── style.css       # Site-specific styles (Terminal.css loaded from CDN)
├── js/
│   └── theme.js        # Dark/light mode toggle
├── blog/
│   ├── index.html      # Blog listing
│   └── post-title/
│       └── index.html  # Example post — copy to create new ones
├── projects/
│   └── index.html
├── talks/
│   └── index.html
└── about/
    └── index.html
```

## Setup

### 1. Create the repo

Name it exactly `yourusername.github.io` (replace `yourusername` with your GitHub username).

```bash
git init
git remote add origin https://github.com/yourusername/yourusername.github.io.git
```

### 2. Enable GitHub Pages

Go to your repo → **Settings** → **Pages** → Source: `Deploy from a branch` → Branch: `main` / `(root)`.

Your site will be live at `https://yourusername.github.io` within a few minutes.

### 3. Customize

Search for `Your Name`, `yourusername`, `you@example.com`, and replace with your actual info.

**Every page has this section to update:**
```html
<h1><a href="/">Your Name's Website</a></h1>
```
and the footer links.

### 4. Adding a blog post

Copy `blog/post-title/` to a new folder, e.g. `blog/my-new-post/`:

```bash
cp -r blog/post-title blog/my-new-post
```

Edit `blog/my-new-post/index.html`, then add a link to it in `blog/index.html` and `index.html`.

### 5. Dark mode

The toggle button (🌙 / ☀️) uses `localStorage` to remember the user's preference.
`Terminal.css` handles the actual dark/light theme via `data-theme="dark"` on `<html>`.

## Customization Tips

- **Fonts**: Terminal.css uses monospace by default. To use a different monospace font,
  add a `@font-face` or Google Fonts import in `css/style.css` and update `--font-stack`.
- **Color**: Override Terminal.css variables in `css/style.css` under `:root`.
  The key variables are `--primary-color`, `--secondary-color`, `--background-color`.
- **Pages**: Add new pages by creating `pagename/index.html` and adding a nav `<li>` to each page.
- **RSS**: For a real RSS feed, either generate `blog/feed.xml` manually or use a static
  site generator like [Lektor](https://www.getlektor.com) or [Eleventy](https://www.11ty.dev).

## Going further

If you want to scale beyond a few posts, consider migrating to
[Eleventy](https://www.11ty.dev) (the minimal-config JS static site generator)
which supports this same HTML-first approach but adds templating and auto-generated RSS.
The HTML structure here is directly compatible — you'd just turn each page into a template.

## License

MIT — do whatever you want with this.
