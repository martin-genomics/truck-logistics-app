# 🚛 Truck Logistics Planner

A modern web application for planning and managing trucking routes with Hours of Service (HOS) compliance tracking.

## ✨ Features

- 🗺️ Interactive route planning with map visualization
- ⏱️ Hours of Service (HOS) compliance tracking
- 📅 Daily schedule generation
- 📝 Electronic logbook with visual timeline
- 📱 Responsive design for all devices
- 🚀 Built with React, TypeScript, and Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm 8+
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/truck-logistics-app.git
   cd truck-logistics-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure your environment variables:
   ```env
   VITE_APP_NAME="Truck Logistics Planner"
   VITE_API_BASE_URL=/api
   VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Building for Production

Build the application for production:
```bash
npm run build
```

### Testing

Run unit tests:
```bash
npm test
```

Run end-to-end tests:
```bash
npm run test:e2e
```

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and helpers
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## 🛠️ Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Router](https://reactrouter.com/) - Client-side routing
- [React Leaflet](https://react-leaflet.js.org/) - Map components for React
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenStreetMap](https://www.openstreetmap.org/) - For providing map data
- [Leaflet](https://leafletjs.com/) - For the mapping library
- [Heroicons](https://heroicons.com/) - For the beautiful icons

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
