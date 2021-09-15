import { overrideConsole } from '../../lib/index.js';

const config = {
    filter_console_output: 'cool',
};
overrideConsole(config);

console.log('amazing');
console.log('this is so cool');