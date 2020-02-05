const vow = require('jasmine-vow');
const matchers = require('jasmine-node-promise-matchers');
const jasmineSlowReporter = require('jasmine-slow-reporter');

vow(jasmine);
beforeEach(() => jasmine.addMatchers(matchers));
jasmineSlowReporter.threshold = 500; // It is 100ms by default.
jasmine.getEnv().addReporter(jasmineSlowReporter);
