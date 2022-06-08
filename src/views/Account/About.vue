<template>
  <!-- <div class="flex flex-col p-2 bg-gray" max overflow-auto> -->
  <div class="flex flex-col bg-gray">
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$router.back()"
    />
    <div>
      <vc-img
        class="rounded-lg overflow-hidden"
        src="../../static/img/about/e3e499a713d40b0cc548d055b5245e92.png"
        height="140"
        width="100%"
        mode="scaleToFill"
      ></vc-img>
    </div>
    <div>
      <div class="px-100px">
        <van-divider class="text-primary">昭廷企业简介</van-divider>
      </div>
      <div class="bg-white rounded-lg text-sm p-3 space-y-2">
        <div>
          <span class="text-primary">企业使命 ：</span>
          <span>让时尚触手可及</span>
        </div>
        <div>
          <span class="text-primary">企业愿景 ：</span>
          <span>成为中国女装行业一站式集采服务平台</span>
        </div>
        <div>
          <span class="text-primary">价值观 ：</span>
          <span>感恩、诚信、创新、精进、敬畏、成长、利他、共赢</span>
        </div>
      </div>

      <div class="px-100px">
        <van-divider class="text-primary">昭廷企业简介</van-divider>
      </div>
      <div class="grid grid-cols-3 gap-3 text-center">
        <div
          v-for="(text, index) of [
            '以客户为中心',
            '以销售为中心',
            '以奋斗者为本\n长期艰苦奋斗',
          ]"
          :key="index"
          class="bg-white relative flex-center text-sm py-3 rounded-lg"
        >
          <div class="absolute w-full left-0 top-0">
            <span class="inline-block transform -translate-y-1/2 w-1rem h-1rem text-xs rounded-circle bg-primary text-white">
              {{ index }}
            </span>
          </div>
          <div class="whitespace-pre">{{ text }}</div>
        </div>
      </div>

      <div class="px-100px">
        <van-divider class="text-primary">昭廷企业简介</van-divider>
      </div>
      <section class="text-sm bg-white p-2 rounded-lg">
        <p>
          <span class="text-primary">浙江昭廷服饰有限公司</span>始创于2016年，座落于中国观潮圣地皮革之都—海宁。公司注册资本1千万元，是一家以高端时尚女装为主导，集研发设计、生产制造与营销为一体的专业化女装公司，公司总部设立在上海，浙江拥有2家子公司，现有员工200多人，以专业的队伍、以客户为中心的运营体系，以现代企业流程化管理，以成本为核心、以服务为宗旨的管理体系，着力打造高端时尚女装。
        </p>
        <p>
          <span class="text-primary">公司秉承创新发展理念，坚持以质量为企业生命，以信誉为经营根本。</span>公司以国内外市场需求为取向，开发设计高端时尚时装，以独特的现代意识和强烈的亲和力，创新创造时尚品牌产品，在当今服饰市场占领了高地，相继推出“芭姿奥”和“萨凡琪”“奢晗”等品牌。产品热销往全国各省市地区。
        </p>
        <p>
          <span class="text-primary">光荣与梦想同在，责任与使命同行。</span>作为一家创新型公司，本着<span class="text-primary">“感恩、诚信、创新、精进、敬畏、成长、利他、共赢”</span>的价值理念，通过规范、上进的企业文化和稳健、专注的发展模式，竭力为客户提供全程一站式服装解决方案，努力把公司打造成为中国女装行业一站式集采服务平台。
        </p>
      </section>
      <div class="flex my-2">
        <vc-img src="../../static/img/about/a525c4b2f1ecf1e6028349df3b0da1e0.png" width="100%"></vc-img>
      </div>
    </div>

    <div class="text-center text-sm">
      <div class="text-primary divide-x">
        <span class="px-2">用户协议</span>
        <span class="px-2">隐私协议</span>
      </div>
      <div>
        Copyright @ 2022 浙江昭廷服饰有限公司 版权所有
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      title: '账号设置',
    }
  },
  created() {
    if (this.$route.query.info) {
      this.title = '公司简介'
    }
  },
}
</script>

<style scoped>
p {
  margin: 8px 0;
  text-indent: 2em;
}
</style>
