module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        'no-console': 'off',
        'no-use-before-define': 'off',
        'linebreak-style': 'off',
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "warn",
            "always"
        ]
    }
};