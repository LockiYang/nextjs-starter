
### run the development server:

```bash
cp .env.example .env.local
npm install
# 生成Prisma Client
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

### 完成功能

1. [x] 使用Next-auth和Prisma实现Github第三方登录
2. [x] 使用@upstash/redis实现统计首页pv
3. [x] Contentlayer


### 参考文档

- [NextAuth.js](https://next-auth.js.org/getting-started/introduction)
- [Prisma](https://www.prisma.io/docs/orm)
- [Tailwindcss](https://tailwindcss.com/)
- [Contentlayer](https://contentlayer.dev/docs)