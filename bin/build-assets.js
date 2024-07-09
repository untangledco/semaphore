import path from 'path'
import fs from 'fs'
import { promisify } from 'util'
import { LOCALE } from '../src/routes/_static/intl.js'
import { getIntl, trimWhitespace } from './getIntl.js'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const copyFile = promisify(fs.copyFile)

// Try 'en-US' first, then 'en' if that doesn't exist
const PREFERRED_LOCALES = [LOCALE, LOCALE.split('-')[0]]

// emojibase seems like the most "neutral" shortcodes, but cldr is available in every language
const PREFERRED_SHORTCODES = ['emojibase', 'cldr']

async function getEmojiI18nFile (locale, shortcode) {
  const filename = path.resolve(__dirname,
    '../node_modules/emoji-picker-element-data',
    locale,
    shortcode,
    'data.json')
  try {
    return JSON.parse(await readFile(filename, 'utf8'))
  } catch (err) { /* ignore */ }
}

async function buildEmojiI18nFile () {
  const json = await getFirstExistingEmojiI18nFile()

  await writeFile(
    path.resolve(__dirname, `../static/emoji-${LOCALE}.json`),
    JSON.stringify(json),
    'utf8'
  )
}

async function buildManifestJson () {
  const template = await readFile(path.resolve(__dirname, '../src/build/manifest.json'), 'utf8')
  // replace {@intl.foo}
  const output = template
    .replace(/{intl\.([^}]+)}/g, (match, p1) => trimWhitespace(getIntl(p1)))

  await writeFile(
    path.resolve(__dirname, '../static/manifest.json'),
    JSON.stringify(JSON.parse(output)), // minify json
    'utf8'
  )
}

async function main () {
  await Promise.all([
    buildManifestJson(),
  ])
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
