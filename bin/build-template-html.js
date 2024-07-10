import fs from 'fs'
import path from 'path'
import { buildSass } from './build-sass.js'
import { buildSvg } from './build-svg.js'
import applyIntl from '../webpack/svelte-intl-loader.js'
import { LOCALE } from '../src/routes/_static/intl.js'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const builders = [
  {
    watch: 'src/scss',
    comment: '<!-- inline CSS -->',
    rebuild: buildSass
  },
  {
    watch: 'bin/svgs.js',
    comment: '<!-- inline SVG -->',
    rebuild: buildSvg
  }
]

// array of strings and builder functions, we build this on-the-fly
const partials = buildPartials()

function buildPartials() {
  const rawTemplate = fs.readFileSync(path.resolve(__dirname, '../src/build/template.html'), 'utf8')

  const partials = [rawTemplate]

  builders.forEach(builder => {
    for (let i = 0; i < partials.length; i++) {
      const partial = partials[i]
      if (typeof partial !== 'string') {
        continue
      }
      const idx = partial.indexOf(builder.comment)
      if (idx !== -1) {
        partials.splice(
          i,
          1,
          partial.substring(0, idx),
          builder,
          partial.substring(idx + builder.comment.length)
        )
        break
      }
    }
  })

  return partials
}

async function buildAll () {
  let html = '';
  for(const p of partials) {
    if (typeof p === 'string') {
      html += p;
      continue;
    }
    const rebuilt = await p.rebuild();
    html += p.comment + "\n" + rebuilt;
  }
  html = applyIntl(html)
    .replace('{process.env.LOCALE}', LOCALE)
    fs.writeFileSync(path.resolve(__dirname, '../src/template.html'), html, 'utf8')
}

buildAll();
