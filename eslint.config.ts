import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^vue', '^@[^/]', '^[a-z]'], // Vue, scoped external packages like @tanstack, then other node_modules
            ['^@/'], // Internal aliases starting with '@/'
            ['^~'], // Tilde-prefixed imports (optional, if used)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Relative parent imports
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Relative sibling and same-folder
            ['^.+\\.s?css$'], // Styles
            ['^\\u0000'], // Side effects
          ],
        },
      ],
    },
  },
)
