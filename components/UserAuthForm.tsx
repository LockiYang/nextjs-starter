"use client";

import * as React from "react";
import { signIn } from "next-auth/react";

import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { useState } from "react";

// React.HTMLAttributes<HTMLDivElement> 用于描述 React 中 DOM 元素的属性
// 例如：onClick, className, style 等
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);

  const login = async () => {
    setIsGitHubLoading(true);
    signIn("github", {
      // 登录方法，第一个参数标注平台
      callbackUrl: `${window.location.origin}`, // 设置登录成功后的回调地址
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <button
        type="button"
        className={cn(buttonVariants())}
        onClick={login}
        disabled={isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
  );
}
