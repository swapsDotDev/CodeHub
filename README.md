# CodeHub

CodeHub React is a modern web application built with Vite and React that aggregates over 50 online compilers and sandboxes for various programming languages. It provides a unified interface for developers to discover, preview, and access coding environments directly from one place. The app features live favicon fetching, categorized browsing, and quick previews, making it a valuable resource for learning, experimenting, and comparing different online coding platforms.

## Project Information

- **Tech Stack:** Vite, React, JavaScript, CSS
- **Main Entry:** `src/main.jsx`, `src/App.jsx`
- **UI Components:** Located in `src/components/`
- **Data Source:** Compiler metadata is stored in `src/data/compilers.json`
- **Styling:** Custom styles in `src/styles.css`
- **Configuration:** Vite config in `vite.config.js`

### Folder Structure

```
codehub-compliers/
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── src/
	├── App.jsx
	├── main.jsx
	├── styles.css
	├── components/
	└── data/
		└── compilers.json
```

### Data Source

The `compilers.json` file contains metadata for each compiler/sandbox, including name, description, category, and URL. This data is used to render the list and details in the UI.

## Installation
Clone the repository and install dependencies:

```sh
git clone https://github.com/your-username/codehub-compliers.git
cd codehub-compliers
npm install
```

## Usage
To start the development server:

```sh
npm run dev
```
Open your browser and navigate to the local server URL (usually http://localhost:5173).

## Contribution Guidelines
Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes
4. Open a pull request

Please follow the existing code style and add tests where appropriate.

## Future Updates
- Backend integration for user authentication and saving favorite compilers
- API endpoints for compiler metadata and user profiles
- Enhanced search and filtering capabilities

## Features

## Run locally
1. `npm install`
2. `npm run dev`

## Notes
