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
    ├── node_modules - js依赖模块
    ├── src - 开发目录
        ├── components - 组件模块
            └── container.vue - 内容组件
            └── pages.vue - 分页组件
            └── popup.vue - 弹出框组件
            └── seldate.vue - 时间选择组件
            └── selmonth.vue - 月份选择组件
        ├── config - 配置模块
            └── api.config.js - api配置文件
            └── env.config.js - 环境配置文件
            └── resource.config.js - ajax配置文件
            └── router.config.js - 路由配置文件
        ├── filters - 过滤器模块
        ├── public - 公共文件
        ├── service - 服务模块
        ├── store - 储存模块
        ├── view - 视图模块
        └── entry.js - 入口配置文件
        └── index.html  入口html文件
