# Description

Testing a `node.js` script is considerably different than testing javascript in a browser. Debugging `node.js` can be fun and easy. This package provides additional functionality for debugging `node.js` via console messages.

## Features

-   Timestamp for console message
-   File path, file name, and line number for console message call
-   Automatic traversal to location of console.log command via CTRL + LEFT CLICK.
    -   Caveat: This has only been confirmed to work with vscode, where the `node.js` script is executed in the terminal provided by vscode. (Open vscode terminal: CTRL + ` )
-   Viewing Objects of all depth levels
-   Filtering log messages by any of the following method types: ['debug', 'log', 'warn', 'error']
-   Filtering console output.
    -   Works exactly as you would expect if you used the browser filter functionality. Supported: JS Primitive Datatypes, Arrays, Objects, Functions (Function Name), Classes (Class Name)

# Javascript Support

Fully Supported: CJS(CommonJS) and ESM(ECMAScript modules, ES6)

# Usage

# Basic and Intermediate Install

npm -i @sanjaydookhoo/nodejs-better-console

# Basic

```javascript
import { overrideConsole } from '@sanjaydookhoo/nodejs-better-console';
// CJS import example
// const {overrideConsole} = require('@sanjaydookhoo/nodejs-better-console');

overrideConsole();

console.log('log test');
console.debug('debug test');
console.warn('warn test');
console.error('error test');
```

## Intermediate

Additional configuration parameters can be passed in to unlock the full potential of this package (Filter Features) and/or limit other features

### Default config if nothing is passed in

```javascript
const config = {
    context: './',
    obj_depth: null,
    show_timestamp: true,
    filter_console_method: ['debug', 'log', 'warn', 'error'],
    filter_console_output: '',
};
```

### Usage of config

#### Example 1 (Console Output Filter)

```javascript
const config = {
    filter_console_output: 'cool',
};
overrideConsole(config);

console.log('amazing');
console.log('this is so cool');
```

#### Example 2 (Console Method Filter)

```javascript
const config = {
    filter_console_method: ['debug'],
};
overrideConsole(config);

console.log('this is a log message');
console.debug('this is a debug message');
```

#### Example 3 (Console Output Filter and Method Filter)

```javascript
const config = {
    filter_console_method: ['debug'],
    filter_console_output: 'cool',
};
overrideConsole(config);

console.log('this is a log message');
console.debug('this is a debug message');
console.debug('this is a cooler debug message');
```

#### Example 4 (Context)

```javascript
const config = {
    context: './src',
};
overrideConsole(config);

console.log('this is a log message');
```

#### Example 5 (Object Depth)

```javascript
const config = {
    obj_depth: 3,
};
const obj = {
    a: {
        b: {
            c: {
                d: {
                    e: 5,
                },
            },
        },
    },
};
overrideConsole(config);

console.log(obj);
```

#### Example 6 (Timestamp)

```javascript
const config = {
    timestamp: false,
};
overrideConsole(config);

console.log('this is a log message');
```

## Advanced

### Install

npm i -D @sanjaydookhoo/nodejs-better-console<br/>
npm i dotenv

### Example

.env

```
NODE_ENV=development
```

index.js

```javascript
import dotenv from 'dotenv';
// CJS import example
// const dotenv = require('dotenv')
dotenv.config();

if (process.env.NODE_ENV !== 'development') {
    console.log('test');
}

if (process.env.NODE_ENV === 'development') {
    const { overrideConsole } = await import(
        '@sanjaydookhoo/nodejs-better-console'
    );
    // CJS import example
    // const {overrideConsole} = require('@sanjaydookhoo/nodejs-better-console')

    overrideConsole();

    console.log('test');
}
```

# Recommendation and Warning

This package is a javascript console override, this means that the override itself is not isolated to this package only. For example, if this package was to be imported and used within your `node.js` script, if another package attempts a console message [i.e., console.log('some message')], this package's version of the console would be used to output the message.

### This package should ONLY be used for development purposes and not for production.

## See Advanced Usage for fix
