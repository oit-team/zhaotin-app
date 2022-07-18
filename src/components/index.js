import Vue from 'vue'
import { setComponentProps } from '../utils'
import * as basicComponents from './basic'
import * as vantComponents from './vant'
import * as businessComponents from './business/registry'

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

// 配置组件默认props
Object
  .entries(propsConfig)
  .forEach(([key, value]) => {
    setComponentProps(basicComponents[key].default, value)
  })

setComponentProps(businessComponents.NavBar.default, {
  back: true,
  leftArrow: true,
})

// 修改Popup，页面返回时不再重新显示
vantComponents.Popup.mixins.push({
  deactivated() {
    this.$nextTick(() => {
      this.shouldReopen = false
    })
  },
})

function registryComponents(components) {
  Object
    .values(components)
    .forEach((component) => {
      component = component.default ?? component
      Vue.component(component.name, component)
    })
}

registryComponents(basicComponents)
registryComponents(businessComponents)
registryComponents(vantComponents)
