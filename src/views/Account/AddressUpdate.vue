<template>
  <div class="bg-white">
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$router.back()"
    />

    <van-form
      label-position="left"
      label-width="5rem"
      ref="addressForm"
      @failed="onFailed"
    >
      <van-field
        label="姓名"
        border-bottom
        v-model="form.consignee"
        :rules="[{required: true, message: '请填写姓名'}]"
      >
      </van-field>
      <van-field
        label="手机号"
        type="number"
        maxlength="11"
        v-model="form.contactNum"
        border-bottom
        :rules="telRules"
      >
      </van-field>
      <van-field
        label="收货地址"
        v-model="form.address"
        border-bottom
        :rules="[{required: true, message: '请填写收货地址'}]"
      >
      </van-field>
      <van-field
        label="默认地址"
        border-bottom
      >
        <template #input>
          <van-switch v-model="defaultAddress" size="16"></van-switch>
        </template>
      </van-field>
    </van-form>

    <div class="p-2">
      <van-button type="primary" block @click="submit">保存</van-button>
    </div>
  </div>
</template>

<script>
import { addReceiving, getReceivingById, updateReceiving } from '../../api/account'

export default {
  name: 'AddressUpdate',

  data: () => ({
    form: {
      consignee: '',
      contactNum: '',
      address: '',
    },
    telRules: [{
      required: true,
      message: '手机号码不能为空',
      trigger: 'onBlur',
    }, {
      // 自定义校验规则
      validator: value => {
        return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
          .test(value)
      },
      message: '请输入正确格式的手机号码',
      trigger: 'onBlur',
    }],
    defaultAddress: false,
    title: '新增地址',
  }),

  created() {
    const { id } = this.$route.params
    if (id) {
      this.title = '修改地址'
      this.isEdit = true
      this.loadData(id)
    }
  },

  methods: {
    async submit() {
      await this.$refs.addressForm.validate()
      const api = this.isEdit ? updateReceiving : addReceiving
      await this.$promiseLoading(api({
        ...this.form,
        defaultNum: Number(this.defaultAddress),
        customerId: this.$store.state.userData.id,
      }))
      this.$toast(this.isEdit ? '修改成功' : '新增成功')
      this.$router.back()
    },
    async loadData(id) {
      const res = await this.$promiseLoading(getReceivingById(id))
      const data = res.body.resultList
      console.log(data)
      Object.keys(this.form).forEach(dataKey => {
        this.form[dataKey] = data[dataKey]
      })
      this.form.receivingId = id
      this.defaultAddress = !!data.defaultNum
    },
    onFailed(errorInfo) {
      this.$message(errorInfo)
    },
  },
}
</script>

<style scoped>
::v-deep .van-field__control{
  padding: 2.133333vw;
  border-radius: 0.5rem;
  --tw-bg-opacity: 1;
  background-color: rgba(242, 242, 242, var(--tw-bg-opacity));
}
::v-deep .van-field__control--custom{
  background-color: white !important;
}
::v-deep .van-field__label{
  padding: 2.133333vw;
}

</style>
