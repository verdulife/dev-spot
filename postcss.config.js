const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	plugins: [
		postcssPresetEnv({
			features: {
				'nesting-rules': true,
				'custom-properties': true,
				'custom-selectors': true,
				'oklab-function': true
			}
		})
	]
};
