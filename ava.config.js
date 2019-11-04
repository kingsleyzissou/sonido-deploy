export default {
  require: ['./test/ava.setup.js'],
  sources: ['**/*.{js,vue***REMOVED***'],
  babel: {
    testOptions: {
    ***REMOVED***
        [
          'module-resolver',
          {
            root: ['.'],
            alias: {
              '@': '.',
              '~': '.'
    ***REMOVED***
  ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***
  tap: true,
  verbose: true
***REMOVED***
