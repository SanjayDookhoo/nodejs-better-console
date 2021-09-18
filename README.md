[![NodeJs][nodejs-image]][nodejs-url] 
[![Maintained Status][maintained-image]][maintained-url] 
[![Ask Me Anything][ask-image]][ask-url] 
[![Issues Count][issues-image]][issues-url]
[![Size][size-image]][size-url] 

[nodejs-image]:https://img.shields.io/badge/Node.js-43853D
[nodejs-url]:https://nodejs.org/

[maintained-image]:https://img.shields.io/badge/Maintained%3F-yes-green.svg
[maintained-url]:https://github.com/SanjayDookhoo/nodejs-better-console

[ask-image]:https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg
[ask-url]:mailto:sanjaydookhoo@msn.com?subject=nodejs-better-console

[issues-image]:https://img.shields.io/github/issues/SanjayDookhoo/nodejs-better-console.svg
[issues-url]:https://github.com/SanjayDookhoo/nodejs-better-console/issues

[size-image]:https://img.shields.io/bundlephobia/min/nodejs-better-console
[size-url]:https://www.npmjs.com/package/nodejs-better-console

# Description

Testing a `node.js` script is considerably different than testing javascript in a browser. Debugging `node.js` can be fun and easy. This package provides additional functionality for debugging `node.js` via console messages. Only one function call is necessary at the entrance JavaScript file (ie. `index.js`) to override console functionality throughout the script.

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

npm -i nodejs-better-console

# Basic

```javascript
import { overrideConsole } from 'nodejs-better-console';
// CJS import example
// const {overrideConsole} = require('nodejs-better-console');

overrideConsole();

console.log('log test');
console.debug('debug test');
console.warn('warn test');
console.error('error test');
```
![alt text](https://github.com/SanjayDookhoo/nodejs-better-console/blob/media/basic.png?raw=true)

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
![alt text](https://github.com/SanjayDookhoo/nodejs-better-console/blob/media/intermediate_example_1.png?raw=true)

#### Example 2 (Console Method Filter)

```javascript
const config = {
    filter_console_method: ['debug'],
};
overrideConsole(config);

console.log('this is a log message');
console.debug('this is a debug message');
```
![alt text](https://github.com/SanjayDookhoo/nodejs-better-console/blob/media/intermediate_example_2.png?raw=true)

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
![alt text](https://github.com/SanjayDookhoo/nodejs-better-console/blob/media/intermediate_example_3.png?raw=true)

#### Example 4 (Context)

```javascript
const config = {
    context: './src',
};
overrideConsole(config);

console.log('this is a log message');
```
![alt text](https://github.com/SanjayDookhoo/nodejs-better-console/blob/media/intermediate_example_4.png?raw=true)

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
![alt text](https://github.com/SanjayDookhoo/nodejs-better-console/blob/media/intermediate_example_5.png?raw=true)

#### Example 6 (Timestamp)

```javascript
const config = {
    timestamp: false,
};
overrideConsole(config);

console.log('this is a log message');
```
![alt text](https://github.com/SanjayDookhoo/nodejs-better-console/blob/media/intermediate_example_6.png?raw=true)

## Advanced

### Install

npm i -D nodejs-better-console<br/>
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
    console.log('test console message NOT from development');
}

if (process.env.NODE_ENV === 'development') {
    const { overrideConsole } = await import(
        'nodejs-better-console'
    );
    // CJS import example
    // const {overrideConsole} = require('nodejs-better-console')

    overrideConsole();

    console.log('test console message from development');
}
```
![alt text](https://github.com/SanjayDookhoo/nodejs-better-console/blob/media/advanced.png?raw=true)

# Recommendation and Warning

This package is a javascript console override, this means that the override itself is not isolated to this package only. For example, if this package was to be imported and used within your `node.js` script, if another package attempts a console message [i.e., console.log('some message')], this package's version of the console would be used to output the message.

### This package should ONLY be used for development purposes and not for production.

## See Advanced Usage for fix
