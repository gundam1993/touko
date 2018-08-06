import * as Marked from 'marked'
import * as highLight from 'highlight.js'
export const marked = Marked.setOptions({
  renderer: new Marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  langPrefix: 'hljs ',
  highlight: function (code) {
    return highLight.highlightAuto(code).value
  }
})

