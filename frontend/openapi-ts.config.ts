import { defineConfig } from '@hey-api/openapi-ts';

const OPENAPI_URL = process.env.OPENAPI_SCHEMA_URL || 'http://localhost:8000/openapi.json';

export default defineConfig({
  input: OPENAPI_URL,
  output: 'src/client',
  plugins: [
    '@hey-api/schemas',
    {
      dates: true,
      name: '@hey-api/transformers',
    },
    {
      enums: 'typescript',
      name: '@hey-api/typescript',
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
    },
    {
      dates: true,
      name: '@hey-api/transformers',
    },
  ],
});
