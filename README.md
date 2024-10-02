<div align="center">
  <img width="200" src="/public/screenshots/logo_remove_bg.png" alt="interview-helper logo">

#### Select, organize, print—effortless control over interview prep.

</div>

### Table of contents

- [Overview](#overview)
- [Live demo](#live-demo)
- [Built with](#built-with)
- [Key features](#key-features)
  - [Other features](#other-features)
- [Run locally](#run-locally)
- [File structure](#file-structure)
- [Attribution](#attribution)
- [License](#license)

## Overview

Interview Helper is a question management tool designed to streamline interview preparation. Easily create, categorize, and track questions while customizing print settings, all in one place for efficient prep.

## [Live demo](https://interview-helper-sooolarxi.vercel.app/)

Deployed on [Vercel](https://vercel.com/). See how it works in real-time: https://interview-helper-sooolarxi.vercel.app/

![](/public/screenshots/ih_desktop.png)

![](/public/screenshots/ih_mobile.png)

## Built with

- [Vue.js](https://vuejs.org/) - Progressive framework for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Statically typed superset of JavaScript
- [Element Plus](https://element-plus.org/) - UI library for Vue with customizable components
- [Vue Router](https://router.vuejs.org/) - Official router for navigating between Vue components
- [Pinia](https://pinia.vuejs.org/) - Simple and intuitive state management for Vue
- [Axios](https://axios-http.com/) - Promise-based HTTP client for API requests
- [ECharts](https://echarts.apache.org/en/index.html) - Powerful charting and visualization library
- [Vue Print Next](https://github.com/Alessandro-Pang/vue-print-next) - TypeScript-based printing library for Vue
- [VueQuill](https://vueup.github.io/vue-quill/) - Rich text editor component for Vue

## Key features

View **question statistics** with visual representation through pie charts, directly from the home dashboard.

![](/public/screenshots/ih_demo1.gif)

**Create custom categories** for organizing interview questions, tailored to preparation needs.

![](/public/screenshots/ih_demo2.gif)

**Create interview questions** with titles, categories, and rich text answers for effective preparation management.

![](/public/screenshots/ih_demo3.gif)

**Sort and filter questions** by category or status for easy management and navigation.

![](/public/screenshots/ih_demo4.gif)

**Customizable printing options**, including font size, order, and print question titles without answers.

![](/public/screenshots/ih_demo5.gif)

### Other features

- User authentication with login and registration to manage personal data.
- Easily manage user profiles, allowing for changes to personal information, avatars, and passwords.
- Modern, user-friendly, and fully responsive interface designed for all devices.

## Run locally

1. Clone the project

```bash
git clone https://github.com/sooolarxi/Interview-Helper.git
```

2. Navigate to the project directory

```bash
cd Interview-Helper
```

3. Install dependencies

> This project requires **pnpm** as the package manager.

```bash
pnpm install
```

4. Start the development server

```bash
pnpm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## File structure

```
-- .husky/ # Git hooks configuration
-- .vscode/ # Visual Studio Code settings
-- public/ # Static assets
-- scripts/ # Custom scripts
-- src/ # Source files
  |__ App.vue # Main application component
  |__ api/ # API interactions
  |  |__ category/ # Category-related API
  |  |__ questions/ # Questions-related API
  |  |__ user/ # User-related API
  |__ assets/ # Application assets
  |__ components/ # Reusable components
  |__ router/ # Application routing
  |__ stores/ # State management
  |  |__ modules/ # Store modules
  |__ styles/ # Stylesheets
  |__ utils/ # Utility functions
  |__ views/ # View components
  |__ 404/ # 404 error page
  |__ category/ # Category view
  |__ home/ # Home view
  |  |__ components/ # Components specific to the home view
  |__ layout/ # Layout components
  |  |__ components/ # Components specific to the layout
  |__ login/ # Login view
  |__ questions/ # Questions view
  |__ users/ # Users view
```

## Attribution

- <a href="https://www.freepik.com/free-vector/abstract-colorful-low-poly-triangle-shapes_138280116.htm#fromView=image_search_similar&page=1&position=52&uuid=3f40f3e2-d9d7-405b-92f5-4d25e198db75">Background image by bunny on Freepik</a>

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/).

This project utilizes various libraries, including those listed in the [Built with](#built-with) section.
