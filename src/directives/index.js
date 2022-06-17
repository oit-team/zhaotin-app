import Vue from 'vue'
import scrollRecord from './scroll-record'

const directives = {
  scrollRecord,
}

Object
  .entries(directives)
  .forEach(([name, directive]) => {
    Vue.directive(name, directive)
  })
