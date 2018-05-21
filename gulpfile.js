var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cp = require('child_process');
var pug = require('gulp-pug');
var deploy = require('gulp-gh-pages');
var htmlmin = require('gulp-htmlmin');    
var csso = require('gulp-csso');
var pump = require('pump');    
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

const BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: true
    });
});

gulp.task('sass', function () {
    return gulp.src('assets/css/main.scss')
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(autoprefixer({browsers: BROWSERS}))
        .pipe(csso())
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('uglify', function (cb) {
    pump([
          gulp.src('assets/js/*.js'),
          uglify(),
          gulp.dest('_site/assets/js')
      ],
      cb
    );
});

gulp.task('pug', function(){
    return gulp.src('_pugfiles/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('_includes'));
});

gulp.task('htmlmin', function () {
    return gulp.src('_site/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('_site'))
});

gulp.task('imagemin', function(){
    return gulp.src('assets/images/pre/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('assets/images'))
})

gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch('assets/js/**', ['uglify']);
    gulp.watch(['*.html', '*.yml', '_layouts/*.html', '_includes/*', '_data/*'], ['jekyll-rebuild']);
    gulp.watch('_pugfiles/*.pug', ['pug']);
    gulp.watch('_site/*.html', ['htmlmin']);
});

gulp.task('deploy', ['jekyll-build'], function () {
    return gulp.src("./_site/**/*")
        .pipe(deploy({
            remoteUrl: "https://github.com/dickwyn/testorange-dickwyn.git",
            branch: "gh-pages"
        }));
});

gulp.task('default', ['browser-sync', 'watch']);