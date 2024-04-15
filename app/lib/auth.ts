import { UserInfo } from "@/types/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/app/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // 自定义登录登出页面
  // pages: {
  //   signIn: "/auth/login",
  //   signOut: "/auth/logout",
  // },
  providers: [
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      httpOptions: {
        timeout: 50000,
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      console.log("token", token);
      /**
       token {
          name: 'LockiYang',
          picture: 'https://avatars.githubusercontent.com/u/7954586?v=4',
          sub: '7954586',
          iat: 1713181610,
          exp: 1715773610,
          jti: '797680fb-2302-4db0-8240-2bc3555470f7'
        }
       */
      const resp = await prisma.user.upsert({
        where: { sub: token.sub },
        update: {
          sub: token.sub + "",
          username: token.name + "",
          avatar: token.picture + "",
        },
        create: {
          sub: token.sub + "",
          username: token.name + "",
          email: "",
          avatar: token.picture + "",
          platform: "github",
        },
      });

      if (resp) {
        session.user = {
          sub: resp.sub,
          platform: resp.platform,
          username: resp.username,
          avatar: resp.avatar,
          email: resp.email,
        } as UserInfo;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
