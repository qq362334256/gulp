/**
 * Created by Administrator on 2016/11/28 0028.
 *《gulp 任务集合》
 * ---------- 测试任务 ----------
 * - clean:dev       —— 清空测试目录任务
 * - 模块名-css:dev  —— 指定css模块编译任务
 * - all-css:dev     —— 全部css模块编译任务
 * - watch-css:dev   —— 监听全部css模编译任务
 * - 模块名-js:dev   —— 指定js模块编译任务
 * - all-js:dev      —— 全部js模块编译任务
 * - watch-js:dev    —— 监听全部js模块编译任务
 * - 模块名-img:dev  —— 指定img模块复制任务
 * - all-img:dev     —— 全部img模块复制任务
 * - watch-img:dev   —— 监听全部img模块复制任务
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
let jsTaskS, cssTaskS, imgTaskS, config, reloadServer;

/**
 *《自动化构建配置》
 * - entry     —— 开发入口目录
 * - module    —— 开发模块集合，此为src下的各个模块
 * - outputDev —— 测试环境的输出目录
 * - outputPro —— 生产环境的输出目录
 */
config = {
    entry: './src',
    module: ['common', 'index', 'about'],
    outputDev: './dev',
    outputPro: './static',
};

/**
 *《配置输出颜色》
 * - error   —— 错误输出颜色
 * - success —— 成功输出颜色
 */
setColor({
    error: 'red',
    success: 'green'
});

/**
 *《配置测试服务》
 * - 介绍：
 *         该方法可以在本地环境起一个静态测试服务环境进行资源调试
 */
(() => {
    const 
        {outputDev, module: moduleS} = config,
        devServer = browser.create('devServer');
    let routes = {};

    // 遍历路由
    moduleS.forEach((val) => {
        if (val !== 'common' && val !== 'public') routes[`/${val}`] = `/view/${val}.html`;
    });

    // 初始化服务
    devServer.init({
        ui: false,                                   // 是否启动ui服务
        host: '127.0.0.1',                           // 静态服务ip地址
        port: 5001,                                  // 静态服务端口号
        server: {                                    // 静态服务器配置
            baseDir: outputDev,                      // 服务器映射静态资源目录
            index: `/view/index.html`,               // 初始打开的网页path
            routes: routes                           // 服务器路由配置
        },
        logPrefix: 'dev-server-update',              // 控制台输出前缀
        reloadDelay: 100                             // 延迟刷新毫秒
    });

    // 挂在刷新服务方法
    reloadServer = devServer.reload;
})();

/**
 *《创建更多测试任务》
 * - 介绍：
 *         通过 _createMoreDevTask 利用forEach循环多次创建同样的 gulp 任务
 * - 参数：
 *         taskNameSuffix(string) —— 创建 gulp 任务的统一后缀，将会创建出 xxx-xxx:dev 这样的任务形式
 *         callback(function)     —— 为每次循环需要执行的回调，一般是回调里面执行 gulp 任务，回调返回参数：
 *                 1）taskName   —— gulp.task的任务名称
 *                 2）moduleName —— 模块的名称
 *                 3）entry      —— 入口的路径
 *                 4）outputDev  —— 测试出口路径
 * - 返回值：
 *         array，返回 gulp.task 的任务名称集合
 */
function _createMoreDevTask(taskNameSuffix, callback) {
    const {entry, outputDev, module: moduleS} = config;
    let taskS = [];

    // 循环遍历任务
    moduleS.forEach(function(val) {
        let taskName = `${val}-${taskNameSuffix}:dev`;

        // 添加任务集合
        taskS.push(taskName);

        // 执行回调
        callback(taskName, val, entry, outputDev);
    });

    return taskS;
};

/**
 *《clean:dev 任务》
 * - 介绍：
 *         清空了 config.outputDev 的目录
 * - 命令：
 *         gulp clean:dev
 */
gulp.task('clean:dev', () => gulp.src(config.outputDev, {read: false})
                                 .pipe(clean())
                                 .on('end', () => console.log('[gulp-task] ----- clean:dev —— success -----'.success)));

/**
 *《模块名-css:dev 任务》
 * - 介绍：
 *         该任务通过模块名来具体知道执行哪个模块需要 编译LESS、添加游览器私有前缀和美化 然后将代码进行合并
 * - 命令：
 *         gulp 模块名-css:dev
 */
cssTaskS = _createMoreDevTask('css', (taskName, moduleName, entry, outputDev) => gulp.task(taskName, () => gulp.src(`${entry}/${moduleName}/css/*.less`)
                                                                                                                .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})) // less语法错误提示，并不停止watch           
                                                                                                                .pipe(less())                                                                 // 编译less
                                                                                                                .pipe(autoprefixer({                                                          // 自动添加游览器私有前缀
                                                                                                                    browsers: ['last 4 versions'],                                            // 兼容版本为游览器后4个版本
                                                                                                                    cascade: true,                                                            // 是否美化属性值
                                                                                                                    remove: true}))                                                           // 是否去掉不必要的前缀
                                                                                                                .pipe(concat(`${moduleName}.css`))                                            // 合并CSS为单个文件
                                                                                                                .pipe(gulp.dest(`${outputDev}/css`))                                          // 输出CSS到测试目录
                                                                                                                .on('end', () => console.log(`[gulp-task] ----- ${moduleName}-css:dev —— success -----`.success))));

/**
 *《all-css:dev 任务》
 * - 介绍：
 *         该任务将调用所有的 《模块名-css:dev 任务》进行
 * - 命令：
 *         gulp all-css:dev
 */
gulp.task('all-css:dev', [...cssTaskS], callback => callback());

/**
 *《watch-css:dev 任务》
 * - 介绍：
 *         该任务将监听工程下所有less模块是否修改，修改则调起对应的 《模块名-css:dev 任务》进行
 * - 命令：
 *         gulp watch-css:dev
 */
gulp.task('watch-css:dev', ['all-css:dev'], () => gulp.watch(`${config.entry.substring(2)}/**/*.less`, (event) => {
    if (/.+\\(.+)\\css\\.+\.less/i.test(event.path)) gulp.start(`${RegExp.$1}-css:dev`);
}));

/**
 *《模块名-js:dev 任务》
 * - 介绍：
 *         该任务通过模块名来具体知道执行哪个模块需要将代码进行合并
 * - 命令：
 *         gulp 模块名-js:dev
 */
jsTaskS = _createMoreDevTask('js', (taskName, moduleName, entry, outputDev) => gulp.task(taskName, () => gulp.src(`${entry}/${moduleName}/js/*.js`)
                                                                                                             .pipe(concat(`${moduleName}.js`))
                                                                                                             .pipe(gulp.dest(`${outputDev}/js`))
                                                                                                             .on('end', () => console.log(`[gulp-task] ----- ${moduleName}-js:dev —— success -----`.success))));

/**
 *《all-js:dev 任务》
 * - 介绍：
 *         该任务将调用所有的 《模块名-js:dev 任务》进行
 * - 命令：
 *         gulp all-js:dev
 */
gulp.task('all-js:dev', [...jsTaskS], callback => callback());

/**
 *《watch-js:dev 任务》
 * - 介绍：
 *         该任务将监听工程下所有js模块是否修改，修改则调起对应的 《模块名-js:dev 任务》进行
 * - 命令：
 *         gulp watch-js:dev
 */
gulp.task('watch-js:dev', ['all-js:dev'], () => gulp.watch(`${config.entry.substring(2)}/**/*.js`, (event) => {
    if (/.+\\(.+)\\js\\.+\.js/i.test(event.path)) gulp.start(`${RegExp.$1}-js:dev`);
}));

/**
 *《模块名-img:dev 任务》
 * - 介绍：
 *         该任务通过模块名来具体知道执行哪个模块需要 img 进行复制
 * - 命令：
 *         gulp 模块名-img:dev
 */
imgTaskS = _createMoreDevTask('img', (taskName, moduleName, entry, outputDev) => gulp.task(taskName, () => gulp.src(`${entry}/${moduleName}/images/*.{jpg,png,gif}`)
                                                                                                               .pipe(gulp.dest(`${outputDev}/images`))
                                                                                                               .on('end', () => console.log(`[gulp-task] ----- ${moduleName}-img:dev —— success -----`.success))));

/**
 *《all-img:dev 任务》
 * - 介绍：
 *         该任务将调用所有的 《模块名-img:dev 任务》进行
 * - 命令：
 *         gulp all-img:dev
 */
gulp.task('all-img:dev', [...imgTaskS], callback => callback());

/**
 *《watch-img:dev 任务》
 * - 介绍：
 *         该任务将监听工程下所有img模块是否修改，修改则调起对应的 《模块名-img:dev 任务》进行
 * - 命令：
 *         gulp watch-img:dev
 */
gulp.task('watch-img:dev', ['all-img:dev'], () => gulp.watch(`${config.entry.substring(2)}/**/*.{jpg,png,gif}`, (event) => {
    if (/.+\\(.+)\\images\\.+\.(jpg|png|gif)/i.test(event.path)) gulp.start(`${RegExp.$1}-img:dev`);
}));



/**
 *《dev 任务》
 * - 介绍：
 *         该任务将集成系列开发需要的操作
 * - 命令：
 *         gulp dev
 */
gulp.task('dev', ['clean:dev'], () => gulp.start('watch-js:dev', 'watch-css:dev', 'watch-img:dev'));