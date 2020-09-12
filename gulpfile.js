const gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require("gulp-notify"),
	cli = require("cli"),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	livereload = require('gulp-livereload'),
	babel = require('gulp-babel'),
	browserSync = require('browser-sync');


gulp.task('sass', ()=> 
	gulp.src('assets/sass/style.scss')
	.pipe(sourcemaps.init())
	.pipe(plumber({ errorHandler: function(err) {
    notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.toString()
        })(err);
    }}))
	.pipe(sass({
		outputStyle: 'expanded',
	}))
	.pipe(autoprefixer({
		versions: ['last 2 browsers']
	}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./assets/dist/'))
	//.pipe(livereload())
	.pipe(browserSync.stream())
	.pipe(notify({message: "Sass task complete"}))
);

gulp.task('scripts', ()=> 
	gulp.src('assets/js/*.js')
		.pipe(babel())
  	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  	.pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/dist/'))
    .pipe(browserSync.reload({
    	stream: true
    }))
    .pipe(notify({message: "Scripts task complete"}))
    //.pipe(livereload())
);


gulp.task('watch', () => {
	var files = [
      './assets/dist/style.css',
      './assets/dist/js/**/*.js',
      '**/*.html'
   	];
	browserSync.init(files,{
      	proxy: 'http://localhost:8888/yms'
  	});
	//livereload.listen();
	
	gulp.watch('assets/sass/**/**.scss', gulp.series('sass'));


	gulp.watch('**/*.html').on('change', browserSync.reload);
	gulp.watch('assets/js/**.js', gulp.series('scripts'));
})

gulp.task('default', gulp.series('watch'));
