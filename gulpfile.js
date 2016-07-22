// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');//监听
var cssmin = require('gulp-cssmin');//样式压缩
var del = require('del');//删除

// 检查脚本
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

//压缩全部JS
gulp.task('minifyjs',function(){
   return gulp.src('js/*.js')
   .pipe(concat('main.js'))   //合并所有JS到mian.js
   .pipe(gulp.dest('minijs/js'))  //输出mian.js到文件夹
   .pipe(rename({suffix:'.min'})) //rename压缩后的文件名
   .pipe(uglify())  //压缩
   .pipe(gulp.dest('minijs/js'));  //输出
});
//单个JS压缩
gulp.task('singlejs',function(){
  return gulp.src('js/mobil.js')
  .pipe(rename({suffix:'e'}))
  .pipe(uglify())
  .pipe(gulp.dest('js'));
});
//单个scheJS压缩
gulp.task('schejs',function(){
  return gulp.src('js/schelue.js')
  .pipe(rename({suffix:'s'}))
  .pipe(uglify())
  .pipe(gulp.dest('js'));
});

//ci单个压缩文件jsci
gulp.task('jsci',function(){
  return gulp.src('jsci/*.js')
  .pipe(rename({suffix:'s'}))
  .pipe(uglify())
  .pipe(gulp.dest('jsci/dist'));
});
//ci单个压缩文件jsci
gulp.task('jsfans',function(){
  return gulp.src('jsfans/*.js')
  .pipe(rename({suffix:''}))
  .pipe(uglify())
  .pipe(gulp.dest('jsfans/dist'));
});
//wap_oshop中jswaposhop压缩js文件dist
gulp.task('jswaposhop',function(){
   return gulp.src('jswaposhop/*.js')
   .pipe(rename({suffix:'s'}))
   .pipe(uglify())
   .pipe(gulp.dest('jswaposhop/dist'));
})
//样式合并
gulp.task('css',function(){
  gulp.src('css/*.css')
     .pipe(cssmin())
     .pipe(rename({suffix:'.min'}))
     .pipe(gulp.dest('dist'));
    //gulp.run('lint', 'sass', 'scripts');

    // 监听文件变化
   // gulp.watch('./js/*.js', function(){
        //gulp.run('lint', 'sass', 'scripts');
    //});
});
// 默认任务
gulp.task('detault', function(){
    //gulp.watch('singlejs','css')
});
//压缩前，先删除文件夹内容
gulp.task('clean',function(cb){
   del(['wat_css','dist','minijs'],cb)
});
//监听文件变化watch
gulp.task('watch',function(){
  gulp.watch('js/mobil.js',['singlejs']);
  gulp.watch('js/schelue.js',['schejs']);
  gulp.watch('jsci/*.js',['jsci']);
  gulp.watch('jsfans/*.js',['jsfans']);
  gulp.watch('jswaposhop/*.js',['jswaposhop']);
  gulp.watch('css/*.css',['css']);
});


