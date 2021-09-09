import { overrideConsole } from './lib/index.js';
import test from './component/test.js';

// overrideConsole({context: '../'});
// overrideConsole({ depth: 5 });
overrideConsole({});

// console.log('test');
// console.debug('test');
// console.warn('test');
// console.error('test');

// const very_nested_obj = {
// 	y: {
// 		a: {
// 			b: {
// 				c: {
// 					d: {
// 						e: {
// 							f: {
// 								f: 's',
// 							},
// 						},
// 					},
// 				},
// 			},
// 		},
// 	},
// };
// console.log(very_nested_obj);

test();
