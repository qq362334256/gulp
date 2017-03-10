# LIVEADMIN - 直播管家
### 使用
1、控制台进入到项目根目录下，示例: cd E:\www\pro\liveManager\webadmin

2、执行相应任务
* 1）执行开发任务: gulp dev
* 2）执行生产任务: gulp pro

### 项目结构
----- 根目录下 -----

    ├── build
        └── config.json 						- 构建配置文件
        └── ... 							- 其他构建文件
    ├── node_modules 							- js依赖模块
    ├── src 								- 开发目录
        ├── components 							- 组件模块
            └── container.vue 						- 内容组件
            └── pages.vue 						- 分页组件
            └── popup.vue 						- 弹出框组件
            └── seldate.vue 						- 时间选择组件
            └── selmonth.vue 						- 月份选择组件
        ├── config 							- 配置模块
            └── api.config.js 						- api配置文件
            └── env.config.js 						- 环境配置文件
            └── resource.config.js 					- ajax配置文件
            └── router.config.js 					- 总路由配置文件
        ├── filters 							- 过滤器模块
            └── date.filter.js 						- 时间日期过滤器
            └── morh.filter.js 						- 分钟转换小时过滤器
            └── torate.filter.js 					- 百分比计算过滤器
        ├── public 							- 公共文件
            ├── font 							- 字体存放目录
            ├── images 							- 图片存放目录
            ├── style 							- 样式存放目录
        ├── service 							- 服务模块
        	└── browsertitle.service.js 				- 设置网页title服务
        	└── pageloading.service.js 				- 页面加载loading服务
        	└── seturl.service.js 					- 设置url服务
        	└── storage.service.js 					- 本地储存服务
        ├── store 							- 储存模块
        	├── module
        		└── common.store.js 				- 核心储存
        		└── user.store.js 				- 用户储存
        	└── store.config.js 					- 储存配置
        ├── view 							- 视图模块
        	├── anchor 						- 主播管理
        		├── images 					- 图片目录
        		├── view
        			└── ahdetail.page.vue 			- 主播详情页
        			└── ahhistory.page.vue 			- 直播历史页
        			└── ahmanage.page.vue 			- 主播管理页
        			└── ahrecord.page.vue 			- 日直播记录页
        		└── router.config.js 				- 分路由配置
        	├── check 						- 主播管理
        		├── view
        			└── ckday.page.vue 			- 日考勤记录页
        			└── ckmonth.page.vue 			- 月考勤记录页
        		└── router.config.js 				- 分路由配置
        	├── guild 						- 公会管理
        		├── view
        			└── agentset.page.vue 			- 经纪人设置页
        			└── anchorset.page.vue 			- 主播设置页
        			└── brushset.page.vue 			- 自刷账号页
        			└── levelset.page.vue 			- 直播等级页
        			└── theanchor.page.vue 			- 经纪人详情页
        			└── updatepass.page.vue 		- 密码修改页
        		└── router.config.js 				- 分路由配置
        	├── live 						- 直播管理
        		├── view
        			└── addfans.page.vue 			- 增粉管理页
        			└── income.page.vue 			- 收入分析页
        			└── todayall.page.vue 			- 今日总览页
        			└── currafanchor.page.vue 		- 今日增粉最高页
        			└── curricanchor.page.vue 		- 今日收入最高页
        			└── currolanchor.page.vue 		- 今日在线最高页
        			└── currtlanchor.page.vue 		- 今日上播最高页
        			└── ysafanchor.page.vue 		- 昨日增粉最高页
        			└── ysicanchor.page.vue 		- 昨日收入最高页
        			└── ysolanchor.page.vue 		- 昨日在线最高页
        			└── ystlanchor.page.vue 		- 昨日上播最高页
        		└── router.config.js 				- 分路由配置
        	└── nav.tem.vue 					- 导航组件
        	└── toolbar.tem.vue 					- 工具栏组件
			└── admin.page.vue 				- 后台管理总组件
        	└── 404.page.vue 					- 404错误页
        	└── debug.page.vue 					- 测试页面
        	└── login.page.vue 					- 登陆页
        	└── retrieve.page.vue 					- 找回密码页
        └── entry.js 							- 入口配置文件
        └── index.html  						- 入口html文件
	├── static 							- pro生产打包资源目录
		├── css 						- 样式资源
		├── font 						- 字体资源
		├── images 						- 图片资源
		├── js 							- js资源
		└── index.html 						- 入口资源
	└── .babelrc 							- babel配置
	└── gulpfile.js 						- gulp任务配置
	└── package.json 						- 依赖说明
	└── README.md 							- 说明文档
