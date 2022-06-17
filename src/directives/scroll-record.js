export default {
  bind(el, binding, vNode) {
    const ctx = vNode.context
    let scrollTop = 0

    ctx.$options.activated = (ctx.$options.activated ?? []).concat(() => {
      el.scrollTop = scrollTop
    })
    ctx.$options.deactivated = (ctx.$options.deactivated ?? []).concat(() => {
      scrollTop = el.scrollTop
    })
  },
}
