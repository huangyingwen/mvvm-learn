// rollup.config.js
import pkg from './package.json';
import babel from 'rollup-plugin-babel'
import license from "rollup-plugin-license"

export default {
  input: 'src/main.js',
  output: [
    { file: pkg.main, format: 'cjs', name: 'Hvue' },
    { file: pkg.module, format: 'es', name: 'Hvue' },
    { file: pkg.unpkg, format: 'umd', name: 'Hvue' }
  ],
  plugins: [
    license({
      //加入文件注释头
      banner: `<%= pkg.name %> v<%= pkg.version %>
              <%= pkg.description %>
              author : <%= pkg.author %>
              homepage : <%= pkg.homepage %>
              bugs : <%= pkg.bugs.url %>`,
    }),
    babel({
      exclude: "node_modules/**" // 排除node_modules文件夹
    })
  ]
}