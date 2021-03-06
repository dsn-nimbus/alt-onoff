import gulp from 'gulp';
import uglify from 'gulp-uglify';
import coveralls from 'gulp-coveralls';
import cssmin from 'gulp-cssmin';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import {Server as Karma} from 'karma';

const eslint = require('gulp-eslint');
const babel = require('gulp-babel');

const _coverage = 'coverage/**/lcov.info';
const _scripts = 'src/**/*.js';
const _styles = 'src/**/*.css';
const _script = 'alt-onoff.js';
const _style = 'alt-onoff.css';
const _dist = 'dist';

gulp.task('lint', () => {
  return gulp.src(_script)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
})

gulp.task('build-css', () => {
  return gulp.src(_styles)
    .pipe(concat(_style.toLowerCase()))
    .pipe(gulp.dest(_dist))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(_dist));
});

gulp.task('build', ['lint', 'unit_test', 'build-css'], () => {
  return gulp.src(_scripts)
    .pipe(babel({presets: [
      'es2015'
    ]}))
    .pipe(concat(_script.toLowerCase()))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(_dist));
});

gulp.task('unit_test', (done) => {
  let _opts = {
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['Chrome']
  };

  return Karma.start(_opts, done);
});

gulp.task('test-ci', ['unit_test'], () => {
  return gulp.src(_coverage).pipe(coveralls());
});
