import { overrideConsole } from '../../lib/index.js';

const config = {
    context: './src',
};
overrideConsole(config);

console.log('this is a log message');