# 🎨 QR Code Generator

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

A modern, fast, and intuitive QR code generator built with React, TypeScript, and Vite.

[Live Demo](https://iqrcode.vercel.app/) • [Report Bug](#) • [Request Feature](#)

---

## ✨ Features

- 🚀 **Fast & Responsive** - Built with React and Vite for optimal performance
- 📱 **QR Code Generation** - Generate QR codes from any text or URL
- 💾 **Download Support** - Save generated QR codes as images
- 🎯 **Clean UI** - Intuitive and user-friendly interface
- 🔒 **TypeScript** - Fully typed for better development experience
- ⚡ **HMR** - Hot Module Replacement for seamless development
- 🎨 **Modern Styling** - Beautiful and responsive design

---

## 📋 Table of Contents

- [🎨 QR Code Generator](#-qr-code-generator)
  - [✨ Features](#-features)
  - [📋 Table of Contents](#-table-of-contents)
  - [🔧 Installation](#-installation)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [🚀 Quick Start](#-quick-start)
    - [Development](#development)
    - [Build](#build)
    - [Preview Production Build](#preview-production-build)
    - [Lint](#lint)
  - [📁 Project Structure](#-project-structure)
  - [🛠️ Technology Stack](#️-technology-stack)
  - [💻 Development Guide](#-development-guide)
    - [Component Architecture](#component-architecture)
    - [Code Style](#code-style)
    - [Adding New Features](#adding-new-features)
  - [🏗️ Building for Production](#️-building-for-production)
    - [Deployment](#deployment)
  - [🤝 Contributing](#-contributing)
    - [Development Guidelines](#development-guidelines)
  - [📝 License](#-license)

---

## 🔧 Installation

### Prerequisites

- **Node.js** 16+ or higher
- **pnpm** or npm (pnpm recommended)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/qr-gen.git
   cd qr-gen
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

---

## 🚀 Quick Start

### Development

Start the development server with hot module replacement:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
pnpm build
```

### Preview Production Build

Preview the production build locally:

```bash
pnpm preview
```

### Lint

Check code quality:

```bash
pnpm lint
```

---

## 📁 Project Structure

```
qr-gen/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── DownloadButton.tsx
│   │   ├── QRCodeCanvas.tsx
│   │   ├── QRCodeImage.tsx
│   │   └── QRForm.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useQRForm.ts
│   ├── libs/                # Utility libraries
│   │   ├── qrGenerator.ts
│   │   └── utils.ts
│   ├── constants/           # Application constants
│   │   └── constants.ts
│   ├── assets/              # Static assets
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Application entry point
│   ├── App.css              # Application styles
│   └── index.css            # Global styles
├── public/                  # Static files
├── eslint.config.js         # ESLint configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies
└── README.md                # This file
```

---

## 🛠️ Technology Stack

| Technology            | Version | Purpose                 |
| --------------------- | ------- | ----------------------- |
| **React**             | 18+     | UI Framework            |
| **TypeScript**        | 5+      | Type Safety             |
| **Tailwind CSS**      | 4+      | UI Styling              |
| **Vite**              | 5+      | Build Tool & Dev Server |
| **Vite Plugin React** | -       | React Integration       |
| **ESLint**            | -       | Code Quality            |

---

## 💻 Development Guide

### Component Architecture

- **QRForm** - Handles user input for QR code generation
- **QRCodeCanvas/QRCodeImage** - Renders the generated QR code
- **DownloadButton** - Provides download functionality
- **useQRForm** - Custom hook managing form state and logic

### Code Style

This project uses ESLint with modern configuration. Run linting with:

```bash
pnpm lint
```

### Adding New Features

1. Create components in `src/components/`
2. Create hooks in `src/hooks/` if needed
3. Add utilities to `src/libs/`
4. Import and use in your components

---

## 🏗️ Building for Production

```bash
pnpm build
```

The build output will be in the `dist/` directory, optimized and ready for deployment.

### Deployment

Deploy the `dist/` folder to your hosting provider:

```bash
# Example with Vercel
vercel deploy ./dist

# Example with Netlify
netlify deploy --prod --dir=dist
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Developed by [Kevin Cabanilla](https://kevincabanilla.vercel.app/)

[⬆ Back to Top](#-qr-code-generator)
