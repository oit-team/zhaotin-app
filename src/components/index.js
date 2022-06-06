import Vue from 'vue'
import * as basicComponents from './basic'
import * as vantComponents from './vant'

console.log(basicComponents)

Object
  .values({
    ...basicComponents,
    ...vantComponents,
  })
  .forEach(component => {
    Vue.component(component.name, component)
  })
