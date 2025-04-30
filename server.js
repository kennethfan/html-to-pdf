const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
app.use(express.json({ limit: '500mb' }))
const port = 3000;
const path = require('path');
const ejs = require('ejs'); // 引入 ejs 模块
// 设置 EJS 引擎和视图目录
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// 处理 HTML 转 PDF 请求
app.get('/convert-to-pdf', async (req, res) => {
  const id = req.query.id; // 获取 id 参数
  const dataArray = [
    { id: 1, name: '示例1' },
    { id: 2, name: '示例2' },
    { id: 3, name: '示例3' }
  ];
  const data = id ? dataArray.find(item => item.id === parseInt(id)) : dataArray;

  // 使用 EJS 渲染模板
  const html = await ejs.renderFile(path.join(__dirname, 'views', 'template-style.ejs'), { data });
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      devtools: true, // 启用 devtools
      args: [
        '--disable-web-security', // 禁用网络安全策略
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920, 
      height: 1080, 
      deviceScaleFactor: 2 // 设备像素比，值越大越清晰，但文件也会越大
    });
    await page.setContent(html, { waitUntil: 'networkidle2', timeout: 30000 });
    // 生成 PDF
    const pdf = await page.pdf({ 
      format: 'A5', 
      scale: 1 // 缩放比例，可根据需要调整 
     });
    await browser.close();

    // 设置响应头
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
    // 发送 PDF 数据
    res.send(pdf);
  } catch (error) {
    console.error('转换出错:', error);
    res.status(500).send('转换失败');
  }
});
app.post('/convert-to-pdf', async (req, res) => {
  const data = req.body;
  // 打印请求体
  console.log('request body:', req.body);
  console.log('request data:', data);
  // 使用 EJS 渲染模板
  const html = await ejs.renderFile(path.join(__dirname, 'views', 'template-style.ejs'), { data });
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      devtools: true, // 启用 devtools
      args: [
        '--disable-web-security', // 禁用网络安全策略
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920, 
      height: 1080, 
      deviceScaleFactor: 2 // 设备像素比，值越大越清晰，但文件也会越大
    });
    await page.setContent(html, { waitUntil: 'networkidle2', timeout: 30000 });
    // 生成 PDF
    const pdf = await page.pdf({ 
      format: 'A5', 
      scale: 1 // 缩放比例，可根据需要调整 
     });
    await browser.close();

    // 设置响应头
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
    // 发送 PDF 数据
    res.send(pdf);
  } catch (error) {
    console.error('转换出错:', error);
    res.status(500).send('转换失败');
  }
});
app.use(express.static('public'));

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});