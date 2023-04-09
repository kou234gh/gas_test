cf) https://github.com/google/clasp/blob/master/docs/typescript.md


# tsconfig????
{
  //Note that the options isolatedModules, noLib, noResolve and module cannot be changed.
  "compilerOptions": {
    "isolatedModules": true,
    "noLib": true,
    "noResolve": true,
    //If your Apps Script project is configured to use the V8 Engine, you should set "target": "ES2019" in your tsconfig.json.
    "target": "ES2019",
    "module": "None",
    "noImplicitUseStrict": true,
    "experimentalDecorators": true,
  },
  "include": [
    "src/**/*",
    "src/appsscript.json"
  ],
  "exclude": []
}

# how to import/export? cf)https://github.com/google/clasp/blob/master/docs/typescript.md#modules-exports-and-imports
1. The exports declaration workaround
2. The namespace statement workaround
3. The third party build-chain workaround
