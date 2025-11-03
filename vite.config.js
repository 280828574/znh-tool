/**
 * @file Vite配置文件
 * @description 用于构建纯JavaScript工具库的Vite配置
 */
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ZnhTool',
      fileName: format => `znh-tool.${format}.js`,
      formats: ['es', 'umd'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        // 仅具名导出，避免 default+named 混用警告
        exports: 'named',
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
})
