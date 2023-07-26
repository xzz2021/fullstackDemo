/*
 * @Date: 2023-01-29 08:39:40
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-07 08:49:00
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//auto import ele
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/, /\.vue\?vue/, // .vue
      // /\.md$/, // .md
    ],
    imports: [
      'vue',
      'pinia',
      // {
      //     './piniaStore': ['piniaStore', 'userStore']
      // }
      
    ],
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    // dirs:['src'],
    resolvers: [ElementPlusResolver()],
  }),
]
})
