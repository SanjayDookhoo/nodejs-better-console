import path from 'path';
import util from 'util';

const getStyle = (name, text) => {
	let objColors = {
			green: [32, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			red: [31, 39],
			yellow: [33, 39],
			gray: [90, 39],
		},
		color = objColors[name];
	return `\u001B[${color[0]}m${text}\u001B[${color[1]}m`;
};

const getText = (config, methodName) => {
	let err = new Error(),
		strErr = err.stack,
		strLineErr = strErr.split(/\r|\n/)[3],
		arrErrResult = strLineErr.match(/[^/|:|\\]{1,}/gi),
		temp = {};

	temp.colNum = +arrErrResult.pop();
	temp.lineNum = +arrErrResult.pop();
	temp.fileName = '/' + arrErrResult.slice(1).join('/');
	temp.fileName = path.relative(config.context, temp.fileName);
	temp.timestamp = `(${new Date().toLocaleString()})`;

	switch (methodName) {
		case 'debug':
			temp.methodColor = 'magenta';
			break;
		case 'log':
			temp.methodColor = 'cyan';
			break;
		case 'warn':
			temp.methodColor = 'yellow';
			break;
		case 'error':
			temp.methodColor = 'red';
			break;
		default:
			break;
	}

	if (/^[^\.\/]/.test(temp.fileName)) {
		temp.fileName = './' + temp.fileName;
	}

	if (/\\|\//gi.test(strLineErr)) {
		const heading = `${getStyle('gray', temp.timestamp)} ${getStyle(
			temp.methodColor,
			`#${methodName.toUpperCase()}: ${temp.fileName}`
		)}${getStyle('gray', ':')}${getStyle('green', temp.lineNum)}`;
		return heading;
	} else {
		return undefined;
	}
};

let printConfig = {
	context: process.cwd(),
	depth: null, // object nested depth that is shown in console log, null means show absolutely everything
};

const setPrintConfig = (config) => {
	printConfig = Object.assign(printConfig, config);
};

const overrideConsole = (config) => {
	if (config) {
		setPrintConfig(config);
	}

	['debug', 'log', 'warn', 'error'].forEach((methodName) => {
		const _console = console[methodName];
		console[methodName] = (...args) => {
			const new_args = [];
			args.forEach((arg) => {
				if (typeof arg === 'object') {
					new_args.push(
						util.inspect(arg, { depth: printConfig.depth })
					);
				} else {
					new_args.push(arg);
				}
			});
			_console(getText(printConfig, methodName));
			_console(...new_args);
		};
	});
};

export { overrideConsole };
