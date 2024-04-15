import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth";

// [...nextauth].ts 动态匹配 nextauth 的所有API路由/api/auth/* (signIn, callback, signOut等）
// 基本配置放在了lib/auth.ts里
// export default NextAuth(authOptions);

// Next.js13.2之后使用app router模式，参考文档https://next-auth.js.org/configuration/initialization#route-handlers-app
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
