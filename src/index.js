import { overrideConsole } from './lib/index.js';
import test from './component/test.js';

const context_test = () => {
	overrideConsole({ context: '../' });

	console.log('test');
};

const method_test = () => {
	overrideConsole({});

	console.log('test');
	console.debug('test');
	console.warn('test');
	console.error('test');
};

const single_item_in_console_test = () => {
	const int = 1;
	const str = 'x';
	const boolean = true;

	console.log(int);
	console.log(str);
	console.log(boolean);
};

const multiple_items_in_console_test = () => {
	const int = 1;
	const str = 'x';
	const boolean = true;

	console.log(int, str, boolean);
};

const obj_depth_test_test = () => {
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

	// overrideConsole({ obj_depth: 5 });
	// console.log(very_nested_obj);

	overrideConsole({ obj_depth: null });
	console.log(very_nested_obj);
};

const timestamp_test = () => {
	// overrideConsole({ show_timestamp: true });
	// console.log('with timestamp');

	overrideConsole({ show_timestamp: false });
	console.log('without timestamp');
};

const imported_module_test = () => {
	overrideConsole();

	test();
};

const filter_method_test = () => {
	const test_1 = () => {
		overrideConsole({
			filter_console_method: ['debug', 'log', 'warn', 'error'],
		});
		console.log('test');
	};

	const test_2 = () => {
		overrideConsole({
			filter_console_method: ['debug'],
		});
		console.log('test');
	};

	const test_3 = () => {
		overrideConsole({
			filter_console_method: ['debug'],
		});
		console.log('log');
		console.debug('debug');
	};

	// test_1()
	// test_2();
	test_3();
};

const filter_output_test = () => {
	const test_1 = () => {
		overrideConsole({
			filter_console_output: 1,
		});

		console.log(11);
		console.log(23);
		console.log(1);
		console.log('12');
		console.log(true);
	};

	const test_2 = () => {
		overrideConsole({
			filter_console_output: 'true',
		});

		console.log(11);
		console.log(true);
		console.log(false);
		console.log('true');
		console.log(true);
	};

	const test_3 = () => {
		overrideConsole({
			filter_console_output: 'x',
		});

		const arr1 = ['X'];
		const arr2 = ['Y'];
		const obj1 = { lol: 'x' };
		const obj2 = { test: 'value' };
		class Rectangle {
			constructor(height, width) {
				this.height = height;
				this.width = width;
			}
		}
		class X {
			constructor(height, width) {
				this.height = height;
				this.width = width;
			}
		}
		const function_x = () => {
			console.log('test');
		};
		const function_y = () => {
			console.log('test');
		};

		console.log('x');
		console.log('X');
		console.log('y');
		console.log('x', 'y');
		console.log('xy');
		console.log(arr1);
		console.log(arr2);
		console.log(arr1, arr2);
		console.log(obj1);
		console.log(obj2);
		console.log(obj1, obj2);
		console.log(X);
		console.log(Rectangle);
		console.log(X, Rectangle);
		console.log(function_x);
		console.log(function_y);
		console.log(function_x, function_y);
	};

	// test_1();
	// test_2();
	test_3();
};

const filter_method_and_output_test = () => {
	overrideConsole({
		filter_console_method: ['debug', 'log'],
		filter_console_output: 'x',
	});

	console.log('x');
	console.debug('x');
	console.debug('y');
	console.warn('x');
};

// context_test();
// method_test();
// single_item_in_console_test();
// multiple_items_in_console_test();
// obj_depth_test_test();
// timestamp_test();
// imported_module_test();
// filter_method_test();
// filter_output_test();
// filter_method_and_output_test();
