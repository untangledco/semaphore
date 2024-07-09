import svgs from '../bin/svgs.js'

const inlineSvgs = svgs.filter(_ => _.inline).map(_ => `#${_.id}`)
const mode = process.env.NODE_ENV || 'production'
const dev = mode === 'development'

const resolve = {
  extensions: ['.js', '.json', '.html'],
  mainFields: ['svelte', 'module', 'browser', 'main'],
  alias: {
    'svelte/store.umd.js': 'svelte/store.js' // have to use UMD for Mocha, but in Webpack we can use the ESM version
  }
}

export {
  mode,
  dev,
  resolve,
  inlineSvgs
}
