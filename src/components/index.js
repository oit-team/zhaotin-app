import Vue from 'vue'
import * as basicComponents from './basic'
import * as vantComponents from './vant'
import { setComponentProps } from '../utils'

const propsConfig = {
  Icon: {
    iconClass: 'zt-icon',
  },
  Img: {
    fit: 'cover',
  },
}

Object
  .entries(propsConfig)
  .forEach(([key, value]) => {
    setComponentProps(basicComponents[key], value)
  })

function registryComponents(components) {
  Object
    .values(components)
    .forEach(component => {
      Vue.component(component.name, component)
    })
}

registryComponents(basicComponents)
registryComponents(vantComponents)
