import { overrideConsole } from './lib/index.js';
import test from './component/test.js';

// overrideConsole({context: '../'});
// overrideConsole({ depth: 5 });
// overrideConsole({});

// console.log('test');
// console.debug('test');
// console.warn('test');
// console.error('test');

const very_nested_obj = {
	y: {
		a: {
			b: {
				c: {
					d: {
						e: {
							f: {
								f: 's',
							},
						},
					},
				},
			},
		},
	},
};
// console.log(very_nested_obj);

// test();

overrideConsole({
	context: './',
	obj_depth: null, // object nested depth that is shown in console log, null means show absolutely everything
	show_timestamp: true,
	filter: {
		console_method: ['debug', 'log', 'warn', 'error'],
		output: '',
	},
});

const arr = ['X'];
const obj = { lol: 'x' };
class Rectangle {
	constructor(height, width) {
		this.height = height;
		this.width = width;
	}
}
const func = () => {
	console.log('test');
};
const string = '';
// console.log(arr, obj, Rectangle, func,string);
console.log([very_nested_obj]);
