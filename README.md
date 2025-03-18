# Multi-page Application React Template

This repository is a template repository for quick starting a multi-page react project. It comes equipped with TypeScript and Tailwind CSS

## Overview

The application is built with the following technologies:

- **Vite**: A fast build tool and development server for modern web applications.
- **React**: A library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, providing better tooling and type safety.
- **Multi-Page Configuration**: The app is configured to handle multiple entry points, enabling better performance and separation of concerns.

With a **Multi-Page Configuration** setup, we are able to handle routing with different HTML index files in their respective folder routes -- /osint would go to the index.html file in ./osint directory

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the application in your browser:
   - By default, the development server runs on `http://localhost:5173`.

4. Create a .env file in your root directory and then add in the env variables in the discord

## Adding a new route entry point

1. Within the root folder, create your routing folder and its respective index.html -- If I wanted to created a /food routing, create a /food folder in the root directory and a index.html file in the food directory
2. In the new index.html file, you can copy and paste the contents from the src index.html and change the page entry point on line 11.
3. Run the dev server with ```npm run dev``` and going to your page route should work as expected, just dont forgot the slash at the end -- `http://localhost:5173/food/`
4. In order to add this new entry point to the build, edit the vite.config.ts config file to include it -- there is an example of it on line 12

## Important Scripts

The following most used scripts are available:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase.

## Folder Structure (src)

```
src/  <-- Source code
   assets/ <-- Pictures, videos, other assets
   components/ <-- React Components (.tsx extension)
   lib/ <-- Configurations for firebase
   pages/ <-- React pages (.tsx extension)
   index.css <-- Base Tailwind styles
   vite-env.d.ts <-- TypeScript Intellisense for VITE env variables stored here
```

## Testing for Responsiveness

If you are implementing a component or page and need to look at how it looks on other devices such as phones or tablets, do the following **first**

[Test a local website on phone (starting at 3:30)](https://youtu.be/uRYHX4EwYYA?si=CmiI0zMpJ_2bzQkx&t=210)

Afterwards, run `npx vite --host` to expose the site to other devices on the network and then type in the link next to `network` into your mobile device. 

**Note**: If you're on Mac, you don't need to follow the video, you should be able to just do the `npx vite --host` command and then copy the link onto your phone. 