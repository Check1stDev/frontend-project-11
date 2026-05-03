import js from '@eslint/js'
import globals from 'globals'
import { globalIgnores } from 'eslint/config'

export default [
  globalIgnores(['dist', 'node_modules']),
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
]