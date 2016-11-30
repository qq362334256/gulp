/**
 * Created by Administrator on 2016/11/28 0028.
 */
// 定义常量
const
    fs = require('fs'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    sprite = require('gulp-css-spriter-retina'),
    notify = require('gulp-notify'),
    browser = require('browser-sync'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    {setTheme: setColor} = require('colors');

// 定义变量
let jsTaskS = [],
    cssTaskS = [],
    imgTaskS = [],
    config;

/**
 * 《自动化构建配置》
 */
config = {
    entry: './src',
    module: ['common', 'index', 'about'],
    outputDev: './srcdev',
    outputPro: './srcstatic',
};

/**
 * 配置输出颜色
 */
setColor({
    error: 'red',
    success: 'green'
});

/**
 * clean:dev 任务
 * 介绍：
 */
gulp.task('clean:dev', () => gulp.src(config.outputDev, {read: false})
                                 .pipe(clean())
                                 .on('end', () => console.log('[clean-task] ----- success -----'.success)));

/**
 * clean:dev 任务
 * 介绍：
 */
config.module.forEach(function(val) {
    const
        {entry, outputDev} = config,
        taskName = `${val}-css:dev`;

    // 加入css任务集合
    cssTaskS.push(taskName);

    // 生成各个模块的css任务
    gulp.task(taskName, () => gulp.src(`${entry}/${val}/css/*.less`)
                                                 .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
                                                 .pipe(less())
                                                 .pipe(autoprefixer({
                                                     browsers: ['last 4 versions'],
                                                     cascade: true,
                                                     remove: true
                                                 }))
                                                 .pipe(concat(`${val}.css`))
                                                 .pipe(gulp.dest(`${outputDev}/css`))
                                                 .on('end', () => console.log(`[${val}-css:dev] ----- ${val}-css:success -----`.success)));
});

/**
 * clean:dev 任务
 * 介绍：
 */
gulp.task('all-css:dev', [...cssTaskS], callback => callback());

/**
 * clean:dev 任务
 * 介绍：
 */
gulp.task('watch-css:dev', ['all-css:dev'], () => gulp.watch(`${config.entry.substring(2)}/**/*.less`, function(event) {
    if (/.+\\(.+)\\css\\.+\.less/i.test(event.path)) gulp.start(`${RegExp.$1}-css:dev`);
}));

/**
 * js:dev 任务
 * 介绍：
 */
config.module.forEach(function(val) {
    const
        {entry, outputDev} = config,
        taskName = `${val}-js:dev`;

    // 加入js任务集合
    jsTaskS.push(taskName);

    // 生成各个模块的js任务
    gulp.task(taskName, () => gulp.src(`${entry}/${val}/js/*.js`)
                                                 .pipe(concat(`${val}.js`))
                                                 .pipe(gulp.dest(`${outputDev}/js`))
                                                 .on('end', () => console.log(`[${val}-js:dev] ----- ${val}-js:success -----`.success)));
});

/**
 * clean:dev 任务
 * 介绍：
 */
gulp.task('all-js:dev', [...jsTaskS], callback => callback());

/**
 * clean:dev 任务
 * 介绍：
 */
gulp.task('watch-js:dev', ['all-js:dev'], () => gulp.watch(`${config.entry.substring(2)}/**/*.js`, function(event) {
    if (/.+\\(.+)\\js\\.+\.js/i.test(event.path)) gulp.start(`${RegExp.$1}-js:dev`);
}));

/**
 * clean:dev 任务
 * 介绍：
 */
config.module.forEach(function(val) {
    const
        {entry, outputDev} = config,
        taskName = `${val}-img:dev`;

    imgTaskS.push(taskName);
    gulp.task(taskName, () => gulp.src(`${entry}/${val}/images/*.{jpg,png,gif}`)
                                  .pipe(gulp.dest(`${outputDev}/images`))
                                  .on('end', () => console.log('图片复制完毕')));
});

/**
 * clean:dev 任务
 * 介绍：
 */
gulp.task('all-img:dev', [...imgTaskS], callback => callback());

/**
 * clean:dev 任务
 * 介绍：
 */
gulp.task('dev', ['clean:dev'], () => gulp.start('watch-js:dev', 'watch-css:dev', 'all-img:dev'));