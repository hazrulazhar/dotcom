var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

// Set the banner content
var banner = ['/*!\n',
  ' * Hazrul A Jamari - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2018-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/hazrulazhar/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./dist/vendor/bootstrap'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./dist/vendor/jquery'))

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/css/*',
      '!./node_modules/font-awesome/css/font-awesome.css.map',
      '!./node_modules/font-awesome/css/font-awesome.css'
    ])
    .pipe(gulp.dest('./dist/vendor/font-awesome'))

  gulp.src([
      './node_modules/font-awesome/fonts/*'
    ])
    .pipe(gulp.dest('./dist/vendor/fonts'))

});

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./src/assets/scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./dist/css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './src/assets/css/*.css',
      '!./src/assets/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Default task
gulp.task('default', ['css', 'vendor', 'html']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
});

// Images
gulp.task('images', function() {
  gulp.src([
      './src/assets/images/*'
  ])
  .pipe(gulp.dest('./dist/images/'));
});

// HTML
gulp.task('html', function() {
  gulp.src([
      './src/index.html'
  ])
  .pipe(gulp.dest('./dist/'));
});

// Publish
gulp.task('publish', function() {
  gulp.src([
      './dist/*',
      './dist/*/*',
      './dist/*/*/*'
  ])
  .pipe(gulp.dest('./docs/'));
});

// Dev task
gulp.task('dev', ['css', 'html', 'images', 'browserSync'], function() {
  gulp.watch('./src/assets/scss/*.scss', ['css']);
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/assets/scss/*.scss', browserSync.reload);
  gulp.watch('./src/*.html', browserSync.reload);
});
