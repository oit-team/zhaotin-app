import Vue from 'vue'
import * as basicComponents from './basic'
import * as vantComponents from './vant'
import { setComponentsProps } from '../utils'

const propsConfig = {
  Icon: {
    iconClass: 'zt-icon',
  },
}

Object
  .entries(propsConfig)
  .forEach(([key, value]) => {
    setComponentsProps(basicComponents[key], value)
  })

Object
  .values({
    ...basicComponents,
    ...vantComponents,
  })
  .forEach(component => {
    Vue.component(component.name, component)
  })
