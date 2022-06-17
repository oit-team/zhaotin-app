import { PullRefresh, List } from 'vant'

import './List.scss'

const REFRESH_STATUS = {
  SUCCESS: 0,
  ERROR: 1,
}

// @vue/components
export default {
  name: 'VcList',

  props: {
    promise: {
      type: Function,
      required: true,
    },
    refresh: Boolean,
    pageNum: [String, Number],
    pageSize: [String, Number],
    total: [String, Number],
    firstLoad: Boolean,
  },

  data() {
    return {
      refreshing: false,
      refreshStatus: null,
      innerTotal: this.total,
      innerPageNum: this.pageNum,
      loading: false,
      finished: false,
      error: false,
    }
  },

  watch: {
    total() {
      this.innerTotal = this.total
    },
  },

  methods: {
    /**
     * 加载数据
     * @public
     */
    async load() {
      if (!(typeof this.promise === 'function')) {
        this.loading = false
        return
      }

      try {
        this.loading = true
        const total = await this.execPromise(this.getPageParams())
        if (!isNaN(total)) this.innerTotal = total
        this.updateFinished()
        this.innerPageNum++
      } catch (err) {
        this.error = true
        throw err
      } finally {
        this.loading = false
      }
    },
    /**
     * 重置分页
     */
    reset() {
      this.innerPageNum = this.pageNum
      this.finished = false
      return this
    },
    genPullRefreshList(h) {
      const tips = {
        [REFRESH_STATUS.SUCCESS]: '刷新成功',
        [REFRESH_STATUS.ERROR]: '刷新失败，请稍后重试',
      }

      const data = {
        class: 'vc-pull-refresh',
        props: {
          successText: tips[this.refreshStatus],
        },
        on: {
          refresh: this.onRefresh,
        },
        directives: [{ name: 'scroll-record' }],
      }

      return (
        <PullRefresh vModel={this.refreshing} {...data}>
          {this.genList(h)}
        </PullRefresh>
      )
    },
    genList(h) {
      const data = {
        props: {
          finished: this.finished,
          finishedText: '没有更多了',
          error: this.error,
          errorText: '加载失败，点击重试',
          immediateCheck: this.firstLoad,
          offset: 150,
        },
        on: {
          load: this.load,
          'update:error': (e) => {
            this.error = e
          },
        },
        directives: !this.refresh ? [{ name: 'scroll-record' }] : [],
      }

      return (
        <List vModel={this.loading} {...data}>
          {this.$slots.default}
        </List>
      )
    },
    getPageParams(reset) {
      return {
        pageNum: reset ? this.pageNum : this.innerPageNum,
        pageSize: this.pageSize,
      }
    },
    async onRefresh() {
      if (!(typeof this.promise === 'function')) {
        this.refreshStatus = null
        this.refreshing = false
        return
      }

      try {
        await this.execPromise(this.getPageParams(true))
        this.refreshStatus = REFRESH_STATUS.SUCCESS
        this.innerPageNum = this.pageNum
        this.updateFinished()
      } catch (err) {
        this.refreshStatus = REFRESH_STATUS.ERROR
      } finally {
        this.refreshing = false
      }
    },
    execPromise(...args) {
      const promise = this.promise(...args)
      if (promise instanceof Promise) {
        return promise
      } else {
        console.error('prop promise 必须返回 Promise')
      }
    },
    updateFinished() {
      this.finished = (this.innerPageNum * this.pageSize) >= this.innerTotal
    },
  },

  render(h) {
    let vNode

    if (this.refresh) vNode = this.genPullRefreshList(h)

    return h('div', { class: 'vc-list' }, [vNode])
  },
}
