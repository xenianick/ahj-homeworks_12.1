const standardRestrictedGlobals = require('eslint-restricted-globals');
const noRestrictedGlobals = ["error", "isNaN", "isFinite"].concat(standardRestrictedGlobals);
const noRestrictedGlobalsWorker = noRestrictedGlobals.filter(o => o !== 'self');

module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
        "worker": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "page": true,
        "browser": true,
        "context": true,
        "jestPuppeteer": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "import/extensions": [
            "error",
            "ignorePackages"
        ],
        "no-restricted-globals": noRestrictedGlobals
    },
    "overrides": [
        {
            "files": ["*-worker.js"],
            "rules": {
                "no-restricted-globals": noRestrictedGlobalsWorker
            }
        }
    ]
}