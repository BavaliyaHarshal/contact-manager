# Contact Manager

A modern, responsive Contact Manager web application built with **React**, **Vite**, and **Bootstrap**.

> **Note:** This project is primarily a practice, mostly frontend-based website created for learning and demonstration purposes. It showcases CRUD operations, UI/UX patterns, and integration with a mock backend using JSON Server.

Easily add, edit, delete, and favorite contacts, with features like search, sort, pagination, and more.

## Features

- Add, edit, and delete contacts
- Mark contacts as favorites
- Search and sort contacts by name
- Pagination for large contact lists
- Responsive design for all devices
- View contact details with profile images
- Modal dialogs for confirmation and image previews

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [JSON Server](https://github.com/typicode/json-server) (for mock backend)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/BavaliyaHarshal/contact-manager.git
   cd contact-manager/contact
   ```

2. **Install dependencies for the React app:**

   ```sh
   npm install
   ```

3. **Install dependencies for the JSON server:**

   ```sh
   cd ../json-server
   npm install
   cd ../contact
   ```

### Running the App

#### 1. Start the JSON Server (Mock Backend)

In a terminal, run:

```sh
cd ../json-server
npm start
```

This will start the backend at [http://localhost:3010](http://localhost:3010).

#### 2. Start the React App

In a new terminal, run:

```sh
npm run dev
```

The app will open at [http://localhost:3005](http://localhost:3005).

### Project Structure

contact/
  src/
    Components/
    pages/
    api/
    ...
  public/
    Dummy/         # Profile images
    ...
  package.json
  vite.config.js
  ...
json-server/
  contacts-db.json # Mock database
  package.json

### Customization

- **Profile Images:** Place your images in `public/Dummy/` and reference them by filename in the contact data.
- **API URL:** The frontend expects the backend at `http://localhost:3010/`. Change this in [`src/api/contacts.jsx`](src/api/contacts.jsx) if needed.

### Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Lint the code
