import { overrideConsole } from '../../lib/index.js';

const config = {
    timestamp: false,
};
overrideConsole(config);

console.log('this is a log message');