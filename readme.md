# HTML 转 PDF 项目

## 项目介绍
本项目是一个基于 Node.js 的 HTML 转 PDF 工具，使用 Express 作为服务端框架，Puppeteer 进行 HTML 到 PDF 的转换，同时支持使用 EJS 模板引擎渲染动态数据。

## 安装步骤
1. 确保你已经安装了 Node.js 和 npm。你可以在命令行中运行以下命令来检查版本：
```bash
node -v
npm -v
```
## 安装项目依赖，运行以下命令
```bash
pnpm i
```
## 启用步骤
在项目根目录下，通过以下命令启动服务端：moren  3000端口  可以在server.js里面修改port
```bash
node server.js
```
## 服务端启动成功后，你会看到如下提示信息：
```bash
服务器运行在 http://localhost:3000
```

## 生成包含所有示例数据的 PDF：
```bash
http://localhost:3000/convert-to-pdf
```

## 生成包含指定 ID 数据的 PDF（将 {id} 替换为实际的 ID 数值，如 1、2 或 3）：
```bash
http://localhost:3000/convert-to-pdf?id={id}
```
```js
 const id = req.query.id; // 获取 id 参数
  const dataArray = [
    { id: 1, name: '示例1' },
    { id: 2, name: '示例2' },
    { id: 3, name: '示例3' }
  ];
  const data = id ? dataArray.find(item => item.id === parseInt(id)) : dataArray;

  // 使用 EJS 渲染模板
  const html = await ejs.renderFile(path.join(__dirname, 'views', 'template.ejs'), { data });
```
浏览器会自动下载生成的 PDF 文件。

## ejs模版渲染规则
```js
 <% if (Array.isArray(data)) { %>
      <% data.forEach(item => { %>
        <p>ID: <%= item.id %>, 名称: <%= item.name %></p>
      <% }); %>
    <% } else { %>
      <p>ID: <%= data.id %>, 名称: <%= data.name %></p>
    <% } %>
```
```js
<%= %>：输出经过 HTML 转义后的数据，用于安全地显示用户输入。
<p>名称: <%= data.name %></p>
```
```js
<% %>：用于编写 JavaScript 逻辑，如循环、条件判断等。
<% if (data.showMessage) { %>
  <p><%= data.message %></p>
<% } %>
```