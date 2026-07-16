// ============================================================
// eslint.config.mjs — ESLint 配置文件
//
// ESLint 是一个「代码纠错」工具，检查你的代码有没有：
//   - 语法问题（比如定义了变量却不用）
//   - 风格问题（比如缩进不一致）
//   - React/Next.js 特有的问题（比如缺少 useEffect 依赖）
//
// 运行 npm run lint 就会执行 ESLint
// ============================================================

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // ...nextVitals — Next.js 核心 Web 性能规则
  // 检查影响 Core Web Vitals 的代码模式
  ...nextVitals,

  // ...nextTs — Next.js 的 TypeScript 规则
  // 在 Vitals 基础上增加 TS 相关的检查
  ...nextTs,

  // globalIgnores — 哪些文件/目录不需要检查
  globalIgnores([
    ".next/**",       // Next.js 构建输出
    "out/**",         // 静态导出目录
    "build/**",       // 构建目录
    "next-env.d.ts",  // Next.js 自动生成的类型文件
  ]),
]);

export default eslintConfig;
