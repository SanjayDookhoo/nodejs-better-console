import { overrideConsole } from '../../lib/index.js';

const config = {
    filter_console_method: ['debug'],
};
overrideConsole(config);

console.log('this is a log message');
console.debug('this is a debug message');