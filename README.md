# meri-design
- 基于vue的ui库，github地址 `ssh://git@101.254.183.198:5522/xiongshuang/meri-design.git`

## config
- 开发预览 `dev.js`
- 打包 `prod.js`
- 所有组件打包 `components.js`
- 单组件打包 `single.js`


## 安装
- `npm install -S meri-design`

## 全局引入
```
    import MeriD from 'meri-design';
    import 'meri-design/dist/index.css'；
    
    Vue.use(MeriD);
```
- 安装依赖包   `npm i -D babel-plugin-component`
- 在 .babelrc中的plugins里添加
```json
    [
          "component",
          {
            "libraryName": "meri-design",
            "camel2Dash": false,
            "libDir": "dist",
            "style": false
          }
    ]
```
