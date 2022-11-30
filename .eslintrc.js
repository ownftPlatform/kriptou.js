module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: ['prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
    },
    plugins: [
        'sonarjs',
        'eslint-plugin-import',
        'eslint-plugin-no-null',
        'eslint-plugin-jsdoc',
        'eslint-plugin-prefer-arrow',
        'eslint-plugin-unicorn',
        '@typescript-eslint',
        'etc',
        'header'
    ],
    rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'generic'
            }
        ],
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    Object: {
                        message: 'Avoid using the `Object` type. Did you mean `object`?'
                    },
                    Function: {
                        message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'
                    },
                    Boolean: {
                        message: 'Use boolean instead',
                        fixWith: 'boolean'
                    },
                    Number: {
                        message: 'Use number instead',
                        fixWith: 'number'
                    },
                    String: {
                        message: 'Use string instead',
                        fixWith: 'string'
                    },
                    Symbol: {
                        message: 'Avoid using the `Symbol` type. Did you mean `symbol`?'
                    }
                }
            }
        ],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                accessibility: 'explicit',
                overrides: {
                    accessors: 'explicit',
                    constructors: 'off',
                    parameterProperties: 'explicit'
                }
            }
        ],
        '@typescript-eslint/indent': ['off', 4],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            { selector: 'default', format: ['camelCase'] },
            { selector: 'variable', format: ['camelCase', 'UPPER_CASE'], leadingUnderscore: 'allow' },
            { selector: 'function', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'typeLike', format: ['PascalCase'] },
            { selector: 'enumMember', format: ['PascalCase'] },
            { selector: 'typeProperty', format: ['camelCase', 'snake_case'] },
            { selector: 'objectLiteralProperty', format: ['camelCase', 'snake_case', 'UPPER_CASE', 'PascalCase'] },
            { selector: 'classProperty', format: ['UPPER_CASE'], modifiers: ['static'] },
            { selector: 'classProperty', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'classMethod', format: ['camelCase'], leadingUnderscore: 'allow' },
            { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
            {
                selector: 'parameterProperty',
                format: ['camelCase', 'PascalCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow'
            }
        ],
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-extra-semi': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-shadow': [
            'error',
            {
                hoist: 'all'
            }
        ],
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        '@typescript-eslint/require-array-sort-compare': [
            'error',
            {
                ignoreStringArrays: true
            }
        ],
        '@typescript-eslint/semi': ['error'],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/triple-slash-reference': [
            'error',
            {
                path: 'always',
                types: 'prefer-import',
                lib: 'always'
            }
        ],
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        'arrow-parens': ['off', 'always'],
        'brace-style': ['error', '1tbs'],
        'comma-dangle': 'error',
        complexity: 'off',
        'constructor-super': 'error',
        'default-case-last': 'error',
        'dot-notation': 'error',
        eqeqeq: ['error', 'smart'],
        'etc/no-commented-out-code': 'error',
        'guard-for-in': 'error',
        'header/header': [
            2,
            'block',
            [
                '* ***********************', //
                ' * MIT',
                { pattern: ' \\* Copyright \\(c\\) \\d{4} OwNFT Market' },
                ' *************************'
            ]
        ],
        'id-blacklist': ['error', 'any', 'Number', 'number', 'String', 'string', 'Boolean', 'boolean', 'Undefined', 'undefined'],
        'id-match': 'error',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: false
            }
        ],
        'import/no-internal-modules': [
            'error',
            {
                allow: ['rxjs/*', 'build/protobuf/compiled', 'aws-sdk/**', 'source-map-support/register']
            }
        ],
        'import/order': 'off',
        indent: 'off',
        'jsdoc/check-alignment': 'error',
        'jsdoc/check-indentation': 'off',
        'jsdoc/newline-after-description': 'off',
        'linebreak-style': ['error', 'unix'],
        'max-classes-per-file': ['error', 20],
        'max-len': [
            'error',
            {
                code: 250
            }
        ],
        'max-lines-per-function': [
            'error',
            {
                max: 45
            }
        ],
        'max-params': [
            'error',
            {
                max: 18
            }
        ],
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': 'error',
        'no-debugger': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-empty': 'error',
        'no-empty-function': 'off',
        'no-empty-pattern': 'error',
        'no-eval': 'error',
        'no-extra-bind': 'error',
        'no-extra-parens': 'off',
        'no-extra-semi': 'error',
        'no-fallthrough': 'off',
        'no-invalid-this': 'off',
        'no-irregular-whitespace': 'off',
        'no-multi-str': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-null/no-null': 'off',
        'no-redeclare': 'error',
        'no-return-await': 'error',
        'no-self-assign': 'error',
        'no-sequences': 'error',
        'no-shadow': 'off',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'off',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'off',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'padded-blocks': [
            'off',
            {
                blocks: 'never'
            },
            {
                allowSingleLineBlocks: true
            }
        ],
        'prefer-arrow/prefer-arrow-functions': 'error',
        'prefer-const': 'error',
        'prefer-object-spread': 'error',
        quotes: 'off',
        radix: 'error',
        semi: 'error',
        'sonarjs/cognitive-complexity': ['error', 18],
        'sonarjs/max-switch-cases': 'error',
        'sonarjs/no-all-duplicated-branches': 'error',
        'sonarjs/no-collapsible-if': 'error',
        'sonarjs/no-collection-size-mischeck': 'error',
        'sonarjs/no-duplicate-string': 'error',
        'sonarjs/no-duplicated-branches': 'error',
        'sonarjs/no-element-overwrite': 'error',
        'sonarjs/no-identical-conditions': 'error',
        'sonarjs/no-identical-expressions': 'error',
        'sonarjs/no-identical-functions': 'error',
        'sonarjs/no-inverted-boolean-check': 'error',
        'sonarjs/no-one-iteration-loop': 'error',
        'sonarjs/no-redundant-boolean': 'error',
        'sonarjs/no-redundant-jump': 'error',
        'sonarjs/no-same-line-conditional': 'error',
        'sonarjs/no-small-switch': 'error',
        'sonarjs/no-unused-collection': 'error',
        'sonarjs/no-use-of-empty-return-value': 'error',
        'sonarjs/no-useless-catch': 'error',
        'sonarjs/prefer-immediate-return': 'error',
        'space-in-parens': ['off', 'never'],
        'spaced-comment': [
            'error',
            'always',
            {
                markers: ['/']
            }
        ],
        'unicorn/prefer-ternary': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'off'
    }
};
