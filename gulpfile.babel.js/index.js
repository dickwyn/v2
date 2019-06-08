import { task, src, dest, watch, series, parallel } from 'gulp';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cp from 'child_process';
import pug from 'gulp-pug';
import ghpages from 'gh-pages';
import htmlmin from 'gulp-htmlmin';
import csso from 'gulp-csso';
import pump from 'pump';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import sitemap from 'gulp-sitemap';
import path from 'path';

const BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10',
];
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
};

task('jekyll-build', function(done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn(jekyll, ['build'], { stdio: 'inherit' }).on('close', done);
});

task(
  'jekyll-rebuild',
  series('jekyll-build', function() {
    browserSync.reload();
  }),
);

task('sass', function() {
  return src('assets/css/main.scss')
    .pipe(
      sass({
        includePaths: ['css'],
        onError: browserSync.notify,
      }),
    )
    .pipe(autoprefixer({ browsers: BROWSERS }))
    .pipe(csso())
    .pipe(dest('_site/assets/css'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(dest('assets/css'));
});

task('uglify', function(cb) {
  pump([src('assets/js/*.js'), uglify(), dest('_site/assets/js')], cb);
});

task('pug', function() {
  return src('_pugfiles/*.pug')
    .pipe(pug())
    .pipe(dest('_includes'));
});

task('htmlmin', function() {
  return src('_site/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      }),
    )
    .pipe(dest('_site'));
});

task('imagemin', function() {
  return src('assets/images/pre/*')
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
      }),
    )
    .pipe(dest('assets/images'));
});

task('watch', function() {
  watch('assets/css/**', ['sass']);
  watch('assets/js/**', ['uglify']);
  watch(
    ['*.html', '*.yml', '_layouts/*.html', '_includes/*', '_data/*', '_assets/css/**'],
    ['jekyll-rebuild'],
  );
  watch('_pugfiles/*.pug', ['pug']);
  watch('_site/*.html', ['htmlmin']);
});

task(
  'browser-sync',
  series('sass', 'jekyll-build', function() {
    browserSync({
      server: {
        baseDir: '_site',
      },
      notify: true,
    });
  }),
);

task('deploy', function(cb) {
  src('_site/*.html', {
    read: false,
  })
    .pipe(
      sitemap({
        siteUrl: 'http://www.dickwyn.xyz',
      }),
    )
    .pipe(dest('_site'));
  ghpages.publish(path.join(process.cwd(), '_site'), cb);
});

task('default', series('browser-sync', 'watch'));
