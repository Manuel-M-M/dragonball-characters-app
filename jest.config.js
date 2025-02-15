// /** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
// };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Cambia a 'jsdom' si pruebas componentes React
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
