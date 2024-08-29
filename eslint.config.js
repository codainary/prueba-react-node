// Usa 'import' en lugar de 'require' ya que estás en un entorno ESM
import eslintPluginReact from 'eslint-plugin-react'
import babelParser from '@babel/eslint-parser'

export default [
    {
        // Ignorar archivos de configuración u otros archivos no relevantes
        ignores: ['**/*.config.js'],

        // Configurar el parser para JSX
        languageOptions: {
            parser: babelParser, // Usar Babel como parser
            parserOptions: {
                ecmaVersion: 'latest', // Soportar la última versión de ECMAScript
                sourceType: 'module', // Permitir el uso de import/export
                ecmaFeatures: {
                    jsx: true, // Habilitar JSX
                },
            },
        },

        // Plugins de ESLint
        plugins: {
            react: eslintPluginReact,
        },

        // Reglas de ESLint
        rules: {
            semi: 'error',
            'no-unused-vars': 'error',
            'no-console': 'warn',
            'prefer-const': 'error',
            'react/jsx-uses-react': 'error', // Asegura que JSX esté importado
            'react/jsx-uses-vars': 'error', // Evita errores con variables usadas en JSX
            // ...
        },
    },
]
