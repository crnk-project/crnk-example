// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('@angular-devkit/build-angular/plugins/karma'),
			require('karma-chrome-launcher'),
			require('karma-firefox-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('karma-junit-reporter')
		],
		client: {
			// leave Jasmine Spec Runner output visible in browser
			clearContext: false
		},
		files: [
			{pattern: './src/test.ts', watched: false}
		],
		preprocessors: {
			
		},
		mime: {
			'text/x-typescript': ['ts', 'tsx']
		},
		coverageIstanbulReporter: {
			dir: require('path').join(__dirname, 'coverage'), reports: ['html', 'lcovonly'],
			fixWebpackSourcePaths: true
		},
		angularCli: {
			config: './.angular-cli.json',
			environment: 'dev'
		},
		reporters: ['progress', 'junit', 'kjhtml'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Firefox'],
		singleRun: false,
		browserNoActivityTimeout: 30000,
		junitReporter: {
			outputDir: 'build/test/log/karma',
			outputFile: 'unit.xml',
			useBrowserName: false,
			suite: 'moap-movie-management',
			nameFormatter: function classNameOmittingNameFormatter(browser, result) {
				var descriptions = result.suite.slice(1);
				descriptions.push(result.description);
				return descriptions.join(' ');
			}
		}
	});
};
