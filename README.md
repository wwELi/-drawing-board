# drawing-board

一个小巧的画版
[demo地址](https://wweli.github.io/drawing-board/)

## set up

```
npm install
```

## 架构设计

主要两个核心类 Shape 和 Brush, Brush提供了操作画布的接口和一些用于调用redo,undo的Stack，而Shape 由其子类实现具体图形（比如矩形，箭头）的的绘制等功能，这些实现类会push 到brush的shapes，brush 操控这些shapes 来绘制画布

![x](/src/assets/canvas.png)
