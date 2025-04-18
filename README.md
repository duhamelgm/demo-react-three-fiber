# Demo React Three Fiber

This project is a small 3D modelling application built with React Three Fiber that supports a couple of features

## Features

- **Toolbar**:

  - Change the project name.
  - Undo/redo shape actions.
  - Clear all shapes.
  - Displays the total number of shapes in the scene.
  - _Fiesta_ mode

- **Left Panel**:

  - Add shapes (sphere, cube, cylinder) to the 3D scene at random positions and with random colors.

- **Main View**:

  - Displays 3D shapes using Three.js.
  - Supports camera controls.

- **Right Panel**:
  - Displays the project name and a list of objects in the scene.
  - Edit the name and position of objects in the scene

## Performance

Most of the components in the application are pretty optimized by default, but further measures were implemented for the components rendered inside a list, that are memoized using React.memo. Benchmarks are available in the browser console using `console.count`

## Installation

```bash
npm install
npm run start
```
