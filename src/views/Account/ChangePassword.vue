<template>
  <div>
    <van-nav-bar
      title="修改密码"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form
      ref="form"
      v-model="form"
      label-position="top"
      label-width="auto"
      :border-bottom="false"
    >
      <van-field
        label="旧密码"
        name="oldPassword"
        v-model="form.oldPassword"
        type="password"
        :rules="rules.oldPassword"
        autocomplete
        clearable
      >
      </van-field>
      <van-field
        label="新密码"
        name="newPassword"
        v-model="form.newPassword"
        type="password"
        :rules="rules.newPassword"
        autocomplete
        clearable
      >
      </van-field>
      <van-field
        label="确认密码"
        name="confirmPassword"
        v-model="form.confirmPassword"
        :rules="rules.confirmPassword"
        type="password"
        autocomplete
        clearable
      >
      </van-field>
    </van-form>
    <div class="px-2 mt-6">
      <van-button type="primary" block @click="updatePassWord()">确认修改</van-button>
    </div>
  </div>
</template>

<script>
import crypto from '@/utils/crypto'
import { updatePassWord } from '@/api/account'

const commonRule = {
  required: true,
  trigger: ['change', 'blur'],
}

const lengthRule = {
  ...commonRule,
  min: 6,
  max: 24,
  message: '长度在6-24个字符之间',
}

export default {
  name: 'ChangePassword',

  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        oldPassword: [
          {
            ...commonRule,
            message: '请输入旧密码',
          },
          lengthRule,
        ],
        newPassword: [
          {
            ...commonRule,
            required: true,
            message: '请输入新密码',
          },
          lengthRule,
        ],
        confirmPassword: [
          {
            ...commonRule,
            message: '请输入确认密码',
          },
          {
            ...commonRule,
            message: '与新密码不一致',
            validator: (rule, value) => {
              if (rule !== this.form.newPassword) return false
            },
          },
          lengthRule,
        ],
      },
    }
  },

  methods: {
    async updatePassWord() {
      await this.$refs.form.validate()
      await this.$promiseLoading(updatePassWord({
        oldPassword: crypto.encrypt(this.form.oldPassword),
        newPassword: crypto.encrypt(this.form.newPassword),
      }))
      await this.$store.dispatch('logout')
    }
    ,
  }
  ,
}
</script>

<style lang="scss" scoped>
::v-deep {
  .van-field{
    flex-direction: column;
  }

  .van-field__label{
    margin-bottom: 5px;
  }

  .van-field__control{
    border: 1px solid #dadbde;
    border-radius: 3px;
    padding: 5px;
  }
}
</style>
