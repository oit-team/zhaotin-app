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
  List: {
    refresh: true,
    pageNum: 1,
    pageSize: 15,
  },
}

vantComponents.Popup.mixins.push({
  deactivated() {
    this.$nextTick(() => {
      this.shouldReopen = false
    })
  },
})

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
