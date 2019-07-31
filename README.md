## Enhancer三方组件 data-widget 使用说明
### 简介
- data-widget是基于[Enhancer](https://enhancer.io)平台开发的组件, 能在此平台上良好运行。
- data-widget通过自定义模板快速将数据生成成品。

### 生成界面
![](https://github.com/ZengXiangJun/data-widget/blob/master/imgs/img_2.png)
### 配置界面
![](https://github.com/ZengXiangJun/data-widget/blob/master/imgs/img_1.png)

### 使用说明
- 在[Enhancer](https://enhancer.io)上注册，新建项目使用此组件。
- 在图二界面设置组件的数据源，模板以及相关配置。

### 数据源设置
- 数据源格式说明：必须是对象数组，一个对象通过模板生成一个对应的单元，如 1 所示。
```
[{                                 
    "key": "value",
    ...
}, {                               
    "key": "value",
    ...
}...]
```

### 模板设置
- 模板分为上下两部分，上部分可包含图片，标题，段落，图标；下部分可包含按钮。如 5 所示。
- 通过拖动 6 位置调节模板的大小。
- 通过 3 位置的操作按钮在模板中添加元素。双击模板中的元素，会弹出对应的编辑框，如 4 所示，并在对应的编辑框中对元素进行编辑。

元素类型|可编辑内容|说明
---|---|---
图片|地址来源，高度，宽度，透明度，倒角|来源设置：固定的文本或 @key@, @var@ 从数据源,变量中取值。
标题|文本来源，字体，字号，字间距，字粗|来源设置：同上。
段落|文本来源，字体，字号，行距，有无边框，字粗，透明度|来源设置：同上。
图标|样式， 字号
按钮|是否显示图标，图标的样式，按钮的名称|每增加一个按钮，会生成此按钮唯一的id和点击事件，可设置按钮点击事件触发时的脚本。

特别说明：
1. 标题和段落支持富文本，可以在里面添加html标签。
2. 如 `<a style='color:red'></a>`, 标签里面需要设置style,class等时，请用 '' 代替 ""  。 

### 组件配置
- 通过组件配置设置组件的全局特性，见 2 所示
- 设置间距：每个单元的间距，请设置 >= 1 的正整数
- 选中高亮：是否支持选中并高亮显示
- 单项选中：是否单项选中，需勾选 选中高亮 才生效
- 悬浮高亮：单元鼠标悬浮时是否高亮
- 支持排序：单元可通过拖动改变顺序
- 设置分页：分页显示单元，此功能仅在数据源是从数据库获取时有效
- 分页位置：分页器的位置，可为左中右
- 每页数量：分页显示时，每页显示的数量，请设置 >= 1 的正整数

### 分层显示【新增】
组件支持分层显示，需在数据源中新增 `unit_floor` 字段：
```js
[{                                 
    "key": "value",
    "unit_floor": 1
    ...
}, {                               
    "key": "value",
    "unit_floor": 2
    ...
}...]
```
增加功能详情：
1. 是否开启分层显示。若开启分层显示，支持排序功能将失效。
2. 可设置按降序还是升序分层。

情况说明：
1. 若开启分层显示，组件会读取数据源中 `unit_floor` 字段，若无 `unit_floor` 字段，默认此行此字段值为 0。
2. 组件会将 `unit_floor` 字段值相同的单元渲染在同一行，不换行。
3. 默认为降序分层，即按照 `unit_floor` 字段值从大到小的顺序渲染层级。

### 可用事件说明
#### 单击单元（On unit click）
- 【事件 ID】onUnitClick
- 【触发时机】单击单元时。

#### 选中单元（On unit selected）
- 【事件 ID】onUnitSelected
- 【触发时机】选中单元时。

#### 选中单元变化（On selected units change）
- 【事件 ID】onSelectedUnitsChange
- 【触发时机】选中单元变化时。

#### 单元顺序变化（On unit index change）
- 【事件 ID】onUnitIndexChange
- 【触发时机】单元顺序变化时。

#### 点击按钮 （On button click）
- 【事件 ID】随机生成
- 【触发时机】点击按钮时。

#### 数据加载完毕 （On Data Complete）
- 【事件 ID】onDataComplete
- 【触发时机】数据加载完毕时。

### 可用变量说明
#### Units
- 【类型】array
- 【说明】所有单元数据
- 【示例】[{"key": "value"}]

#### CURR_UNIT_INDEX
- 【类型】number
- 【说明】当前单元序号
- 【示例】0

#### CURR_UNIT_DATA
- 【类型】object
- 【说明】当前单元数据
- 【示例】{"key": "value"}

#### SELECTED_UNITS_INDEX
- 【类型】array
- 【说明】选中单元序号
- 【示例】[1, 2, 3]

#### LAST_SELECTED_UNIT_INDEX
- 【类型】number
- 【说明】最后选中单元序号
- 【示例】0

#### BUTTON_EVENT_ID
- 【类型】string
- 【说明】按钮事件ID
- 【示例】"button1524448415166"

#### BUTTON_EVENT_NAME
- 【类型】string
- 【说明】按钮事件名称
- 【示例】"按钮-1"

### 其它
- [Enhancer 教程](https://enhancer.io/tutorials)
- [Enhancer 社区](https://forum.enhancer.io/#p=1&t=5)

[{
	"title": "标题-1"
}, {
	"title": "标题-2"
}, {
	"title": "标题-3"
}, {
	"title": "标题-4"
}, {
	"title": "标题-5"
}, {
	"title": "标题-6"
}, {
	"title": "标题-7"
}, {
	"title": "标题-8"
}, {
	"title": "标题-9"
}, {
	"title": "标题-10"
}, {
	"title": "标题-11"
}]