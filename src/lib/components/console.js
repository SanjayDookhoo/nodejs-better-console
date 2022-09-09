import path from 'path';
import util from 'util';

const getStyle = (name, text) => {
	let obj_colors = {
			green: [32, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			red: [31, 39],
			yellow: [33, 39],
			gray: [90, 39],
		},
		color = obj_colors[name];
	return `\u001B[${color[0]}m${text}\u001B[${color[1]}m`;
};

const getText = (config, method_name) => {
	let err = new Error();
	let str_err = err.stack;
	let str_line_err = str_err.split(/\r|\n/)[3];
	let arr_err_result = str_line_err.match(/[^/|:|\\]{1,}/gi);

	let col_num = +arr_err_result.pop();
	let line_num = +arr_err_result.pop();
	let file_name = '/' + arr_err_result.slice(1).join('/');
	file_name = path.relative(config.context, file_name);
	let timestamp = `(${new Date().toLocaleString()})`;
	let method_color;

	switch (method_name) {
		case 'debug':
			method_color = 'magenta';
			break;
		case 'log':
			method_color = 'cyan';
			break;
		case 'warn':
			method_color = 'yellow';
			break;
		case 'error':
			method_color = 'red';
			break;
		default:
			break;
	}

	if (/^[^\.\/]/.test(file_name)) {
		file_name = './' + file_name;
	}

	if (/\\|\//gi.test(str_line_err)) {
		timestamp = getStyle('gray', timestamp);
		timestamp = print_config.show_timestamp ? timestamp + ' ' : '';
		let method_name_and_file_name = getStyle(
			method_color,
			`#${method_name.toUpperCase()}: ${file_name}`
		);
		let line_sep = getStyle('gray', ':');
		line_num = getStyle('green', line_num);

		const heading = `${timestamp}${method_name_and_file_name}${line_sep}${line_num}`;

		return heading;
	} else {
		return undefined;
	}
};

let print_config = {
	context: './',
	obj_depth: null, // object nested depth that is shown in console log, null means show absolutely everything
	show_timestamp: true,
	filter_console_method: ['debug', 'log', 'warn', 'error'],
	filter_console_output: '',
};

const setPrintConfig = (config) => {
	print_config = Object.assign(print_config, config);
};

const filter_output_check = (str) => {
	return str
		.toLowerCase()
		.includes(print_config.filter_console_output.toString().toLowerCase());
};

const should_output = ({ obj }) => {
	if (Array.isArray(obj)) {
		// _console('array');
		const temp = obj.every((obj_el) => {
			if (should_output({ obj: obj_el })) {
				return false;
			}
			return true;
		});
		return !temp;
	} else if (typeof obj === 'function') {
		// _console('function');
		return filter_output_check(obj.name);
	} else if (typeof obj === 'object' && !Array.isArray(obj)) {
		// _console('object');
		const temp = Object.entries(obj).every(([key, value]) => {
			if (filter_output_check(key)) {
				return false;
			}
			if (should_output({ obj: value })) {
				return false;
			}
			return true;
		});
		return !temp;
	} else {
		// _console('primitive');
		return filter_output_check(obj.toString());
	}
};

// let _console; // place here for in line console logging for testing purposes

/**
 * Override console functionality throughout the script
 *
 * @param {object} config - the config param
 *
 */
const overrideConsole = (config) => {
	if (config) {
		setPrintConfig(config);
	}

	['debug', 'log', 'warn', 'error'].forEach((method_name) => {
		let _console = console[method_name]; // necessary to be placed here rather than globally on the file to prevent stack call overflow

		if (print_config.filter_console_method.includes(method_name)) {
			console[method_name] = (...args) => {
				let should_output_temp = true;

				if (print_config.filter_console_output) {
					// if the output is defined in some way, do the extra checks, otherwise dont to save on performance
					should_output_temp = should_output({ obj: args });
					// _console(should_output_temp);
				}

				if (should_output_temp) {
					const new_args = [];

					args.forEach((arg) => {
						if (typeof arg === 'object') {
							new_args.push(
								util.inspect(arg, {
									depth: print_config.obj_depth,
								})
							);
						} else {
							// primitive types
							new_args.push(arg);
						}
					});
					_console(getText(print_config, method_name));
					_console(...new_args);
				}
			};
		} else {
			console[method_name] = () => {};
		}
	});
};

export { overrideConsole };
