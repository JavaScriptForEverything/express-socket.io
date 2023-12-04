module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
				"node" : true
    },
		"globals" : {
			"io": true
		},
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
				"sourceType": "module",
    },
    "rules": {
			"no-constant-condition" : "warn",
			"no-unused-vars" : [
				"warn",{
					"argsIgnorePattern": "^_",
					"varsIgnorePattern": "^_"
				}
			]

    }
}
