# itkomissar.com

Личный блог Андрея Комиссаренко.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Adding posts (GitHub-friendly)

Add a new Markdown file to `src/app/content/posts/` with a frontmatter block at the top:

```md
---
title: Мой пост
section: razmyshlyayu
date: 04 августа
excerpt: Короткий анонс (опционально)
---
```

Sections:
- `razmyshlyayu` (Размышляю)
- `sozdayu` (Создаю)
- `chitayu` (Читаю / книги)
- `motiviruju` (Мотивирую)
- `principy` (Принципы)

Books (`section: chitayu`) can also have:
- `cover: /images/books/....svg`
- `recommendation: рекомендую` or `не рекомендую`

Any published post automatically appears both in its section and on the home page feed.

## Deploy to GitHub Pages

1) Push to branch `main`.
2) GitHub repo settings: `Settings → Pages → Build and deployment → Source: GitHub Actions`.
3) The workflow `.github/workflows/deploy.yml` builds and deploys `dist/` on every push to `main`.

Notes:
- Routing works on GitHub Pages via `public/404.html` + a small redirect script in `index.html`.
- For a custom domain, set it in `Settings → Pages`, and add `public/CNAME` with your domain (one line).
