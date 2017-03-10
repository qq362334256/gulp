# LIVEADMIN - 直播管家
### 使用
1、控制台进入到项目根目录下，示例: cd E:\www\pro\liveManager\webadmin

2、执行相应任务
* 1）执行开发任务: gulp dev
* 2）执行生产任务: gulp pro

### 项目结构
----- 根目录下 -----
    
    ├── build
      └── config.json - 构建配置文件
      └── ...其他构建文件
    ├── src              // 开发目录
        ├── common       // 公共模块
            ├── config   // 配置文件目录
            ├── js       // js文件目录
            ├── css      // css文件目录
            ├── ...      // 其他文件目录
            └── entry.js // common模块入口，这是模块入口命名规范，不能随意改变
        ├── index        // index模块
            ├── config   // 配置文件目录
            ├── js       // js文件目录
            ├── css      // css文件目录
            ├── images   // iamges文件目录
            ├── view     // html文件目录
            ├── ...      // 其他文件目录
            ├── entry.js // index模块入口，这是模块入口命名规范，不能随意改变
    ├── dev                  // 测试打包文件目录
    ├── static               // 生产打包文件目录
    ├── gulpfile.js          // gulp构建配置
    ├── package.json
