import js from '@eslint/js'
import globals from 'globals'
import { globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default [
  globalIgnores(['dist', 'node_modules']),
  js.configs.recommended,
  stylistic.configs['recommended'],
  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
]
