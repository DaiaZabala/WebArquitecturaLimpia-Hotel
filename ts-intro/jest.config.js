const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

module.exports = {
  // Configuración base para usar TypeScript con Jest
  preset: 'ts-jest',
  testEnvironment: 'node',

  // 1. SOLUCIÓN para evitar el error de 'leaking' (cierre forzado)
  forceExit: true, 

  // 2. SOLUCIÓN para que Jest solo busque archivos .ts y .tsx en las carpetas correctas.
  // Esto evita que ejecute los archivos .js compilados en 'dist'.
  testMatch: [
    "**/domain/src/**/*.test.ts",
    "**/domain/src/**/*.spec.ts"
  ],

  // 3. SOLUCIÓN para excluir archivos o carpetas innecesarias de la búsqueda.
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/apps/backend/dist/"
  ],

  // 4. Mapeo para que las importaciones de TS funcionen dentro de Jest (el alias @domain).
  moduleNameMapper: {
    "^@domain/(.*)$": "<rootDir>/domain/src/$1"
  }
};
