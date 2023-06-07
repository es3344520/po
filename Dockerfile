# 使用官方 Node.js 镜像作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制应用程序代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD [ "node", "app.js" ]
```
