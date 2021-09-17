const sharedPresets = [];
const shared = {
	presets: sharedPresets,
};

const babel_config = {
	env: {
		esmUnbundled: shared,
		esmBundled: {
			...shared,
			presets: [
				[
					'@babel/env',
					{
						targets: '> 0.25%, not dead',
					},
				],
				...sharedPresets,
			],
		},
		cjs: {
			...shared,
			presets: [
				[
					'@babel/env',
					{
						modules: 'commonjs',
					},
				],
				...sharedPresets,
			],
		},
		test: {
			presets: ['@babel/env', ...sharedPresets],
		},
	},
};

export default babel_config;
