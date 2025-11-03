/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Asegúrate de que no ignores la transformación de uuid (ESM)
  transformIgnorePatterns: ['node_modules/(?!(uuid)/)'], // Permite que `uuid` sea transformado

  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,  // Permitir el uso de módulos ESM en TypeScript
      tsconfig: 'tsconfig.json',  // Asegúrate de que el path del tsconfig sea correcto
    }],
  },

  extensionsToTreatAsEsm: ['.ts'], // Permite a Jest tratar los archivos TS como ESM

  forceExit: true, // Forzar que Jest termine cuando haya procesos pendientes

  testMatch: [
    '**/domain/src/**/*.test.ts',
    '**/domain/src/**/*.spec.ts',
  ],

  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/apps/backend/dist/',
  ],

  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/domain/src/$1', // Mapea los alias de módulos
  },
};
