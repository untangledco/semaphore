import sass from 'sass'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const file = path.join(__dirname, '../src/scss/global.scss')

export function buildSass () {
  const rendered = sass.renderSync({ file }).css;
  return `<style>${rendered}</style>`;
}
