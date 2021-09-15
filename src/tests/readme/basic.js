import { overrideConsole } from '../../lib/index.js';

overrideConsole();

console.log('log test');
console.debug('debug test');
console.warn('warn test');
console.error('error test');