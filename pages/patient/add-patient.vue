<template>
  <view>
    <u--form labelPosition='left' :model="model1" :rules="rules" ref="form1">
      <u-form-item label="" prop="userInfo.name" ref="item1">
        <u--input v-model="model1.userInfo.name" placeholder="姓名">
        </u--input>
      </u-form-item>
      <u-form-item label="" prop="userInfo.sex" ref="item1">
        <u-radio-group v-model="radiovalue1" placement="row">
          <u-radio activeColor="orange" v-for="(item, index) in radiolist1" :key="index" :label="item.name"
            :name="item.name"></u-radio>
        </u-radio-group>
      </u-form-item>
      <u-form-item label="" prop="userInfo.temperature" ref="item1">
        <u--input v-model="model1.userInfo.temperature" type="number" placeholder="温度">
        </u--input>
      </u-form-item>
      <u-form-item label="" prop="userInfo.symptoms" ref="item1">
        <u--input v-model="model1.userInfo.symptoms" placeholder="病症">
        </u--input>
      </u-form-item>
      <u-form-item label="" prop="userInfo.allergic" ref="item1">
        <u--input v-model="model1.userInfo.allergic" placeholder="过敏信息">
        </u--input>
      </u-form-item>
      <u-form-item label="" prop="userInfo.guardian_name" ref="item1">
        <u--input v-model="model1.userInfo.guardian_name" placeholder="监护人姓名">
        </u--input>
      </u-form-item>
      <u-form-item label="" prop="userInfo.guardian_relation" ref="item1">
        <u--input v-model="model1.userInfo.guardian_relation" placeholder="监护人关系">
        </u--input>
      </u-form-item>
      <u-form-item label="" prop="userInfo.guardian_ID" ref="item1">
        <u--input v-model="model1.userInfo.guardian_ID" type="idcard" placeholder="监护人身份证号码">
        </u--input>
      </u-form-item>
      <u-form-item label="" prop="userInfo.guardian_phone" ref="item1">
        <u--input v-model="model1.userInfo.guardian_phone" type="phone" placeholder="监护人联系电话号码">
        </u--input>
      </u-form-item>
    </u--form>
    <!--    <u-button @click="submit">提交</u-button> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showSex: false,
        model1: {
          userInfo: {
            name: '',
            sex: '',
            temperature: '',
            symptoms: '',
            allergic: '',
            guardian_name: '',
            guardian_relation: '',
            guardian_id: '',
            guardian_phone: '',
          }
        },
        rules: {
          'userInfo.name': {
            type: 'string',
            required: true,
            message: '请输入姓名',
            trigger: ['blur', 'change']
          },
          'userInfo.temperature': {
            type: number,
            required: true,
            message: '请输入患者温度',
            trigger: ['blur', 'change']
          },
          'userInfo.guardian_name': {
            type: 'string',
            required: true,
            message: '请输入监护人姓名',
            trigger: ['blur', 'change']
          },
          'userInfo.guardian_relation': {
            type: 'string',
            required: true,
            message: '请输入监护人关系',
            trigger: ['blur', 'change']
          },
          'userInfo.guardian_ID': {
            type: 'string',
            required: true,
            message: '请输入监护人身份证号码',
            trigger: ['blur', 'change']
          },
          'userInfo.guardian_phone': {
            type: 'string',
            required: true,
            message: '请输入监护人联系电话号码',
            trigger: ['blur', 'change']
          },
        },
        radiolist1: [{
            name: '男',
            disabled: false
          },
          {
            name: '女',
            disabled: false
          }
        ],
        radiovalue1: '男'
      }
    },
    methods: {
      // submit() {
      //   this.$refs.uForm.validate().then(res => {
      //     uni.$u.toast('校验通过')
      //   }).catch(errors => {
      //     uni.$u.toast('校验失败')
      //   })
      // }
    },
    onReady() {
      // this.$refs.form1.setRules(this.rules)
    }
  }
</script>

<style>

</style>
