'use strict';

var gulp = require('gulp');
var litecoreTasks = require('litecore-build');

litecoreTasks('message');

gulp.task('default', ['lint', 'coverage']);
