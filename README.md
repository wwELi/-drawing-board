# drawing-board

用于绘制流程图
[demo地址](https://wweli.github.io/drawing-board/)

## set up

```
npm install
```

## 架构设计

主要两个核心类 Shape 和 Brush, Brush提供了操作画布的接口和一些用于调用redo,undo的Stack，而Shape 由其子类实现具体图形（比如矩形，箭头）的的绘制等功能，这些实现类会push 到brush的shapes，brush 操控这些shapes 来绘制画布

![x](/src/assets/canvas.png)


## 功能清单
- [x] 拖拽画布
- [x] 单个选中图形
- [x] 移动单个图形
- [ ] redo/undo
- [x] 粘贴图片文本
- [x] 插入矩形图形
- [x] 插入箭头图形
- [ ] 插入文本输入