
  # Блоговый сайт

  This is a code bundle for Блоговый сайт. The original project is available at https://www.figma.com/design/I9Rir3d2lO2ivPRd5pS0Z8/%D0%91%D0%BB%D0%BE%D0%B3%D0%BE%D0%B2%D1%8B%D0%B9-%D1%81%D0%B0%D0%B9%D1%82.

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

  1) Push this repo to GitHub (branch `main`).
  2) In GitHub repo settings: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
  3) The workflow `.github/workflows/deploy.yml` will build and deploy `dist/` on every push to `main`.

  Notes:
  - Routing works on GitHub Pages via `public/404.html` + a small redirect script in `index.html`.
  - If you use a custom domain, create `public/CNAME` with your domain (one line). The deploy workflow will build with base `/` automatically.
  
