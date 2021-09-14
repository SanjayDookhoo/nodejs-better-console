# Description

Testing a Node.js script as it is right now is considerably different to how it would be if javascript was to be tested on a browser. I believe that debugging in Node.js similarly featureful and easy. This package hopes to provided some of the additional functionality the browser provides for console messages.

## Features

-   Timestamp for console message
-   File path, file name, and line number for console message call
-   Jumping to call of console message in code when clicked using (ctrl + left click). This has only been confirmed to work with vscode, where the Node.js script is executed in the terminal provided by vscode. (Open vscode terminal: ctrl + ` )
-   Viewing Objects of any depth level no matter how nested it is
-   Filtering log messages by any of the following method types ['debug', 'log', 'warn', 'error']
-   Filtering console output. Works exactly as you would expect if you used the browser filter functionality. Supported: JS Primitive Datatypes, Arrays, Objects, Functions (Function Name), Classes (Class Name)

# Javascript Support

Fully Supported: CJS(CommonJS) and ESM(ECMAScript modules, ES6)

# Install

npm -i -D @sanjaydookhoo/nodejs-better-console

# Usage

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
default config = {
	context: './',
	obj_depth: null,
	show_timestamp: true,
	filter_console_method: ['debug', 'log', 'warn', 'error'],
	filter_console_output: '',
}
```

### Usage of config

#### Example 1 (Console Output Filter)

```javascript
const config = {
	filter_console_output: 'cool',
};

console.log('amazing');
console.log('this is so cool');
```

#### Example 2 (Console Method Filter)

```javascript
const config = {
	filter_console_method: ['debug'],
};

console.log('this is a log message');
console.debug('this is a debug message');
```

#### Example 3 (Console Output Filter and Method Filter)

```javascript
const config = {
	filter_console_method: ['debug'],
	filter_console_output: 'cool',
};

console.log('this is a log message');
console.debug('this is a debug message');
console.debug('this is a cooler debug message');
```

#### Example 4 (Context)

```javascript
const config = {
	context: './src',
};

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
console.log(obj);
```

#### Example 6 (Timestamp)

```javascript
const config = {
	timestamp: false,
};

console.log('this is a log message');
```

# Recommendation and Warning

This package is a javascript console override, this means that the override itself is not isolated to this package only. For example, if this package was to be imported and used within your Node.js script, if another package attempts a console message [ie. console.log('some message')], this packages version of the console would be used to output the message.

What this means is that if this package was to be used to create a Node.js package, it should NOT be left in the code and should ONLY be used for development purposes and not a production build.

## Solution

import dotenv from 'dotenv'

```javascript
if (process.env.NODE_ENV === 'development') {
	import { overrideConsole } from '@sanjaydookhoo/nodejs-better-console';

	overrideConsole();
}
```
