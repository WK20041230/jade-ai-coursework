<template>
  <view class="page">
    <view class="hero">
      <view class="hero-copy">
        <text class="eyebrow">AI 时代玉器的传承与创新</text>
        <text class="title">玉语 AI</text>
        <text class="subtitle">从真实馆藏学习玉器文化，再用 AI 辅助生成设计方案，最后整理为可提交的作品档案。</text>
      </view>

      <view class="hero-flow">
        <view class="flow-item" v-for="item in heroFlow" :key="item.title">
          <text class="flow-num">{{ item.num }}</text>
          <view class="flow-copy">
            <text class="flow-title">{{ item.title }}</text>
            <text class="flow-desc">{{ item.desc }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="module-grid">
      <view class="module-card" v-for="item in modules" :key="item.title" @tap="go(item.url)">
        <view class="module-index">
          <text>{{ item.index }}</text>
        </view>
        <text class="module-label">{{ item.label }}</text>
        <text class="module-title">{{ item.title }}</text>
        <text class="module-desc">{{ item.desc }}</text>
        <view class="module-foot">
          <text>{{ item.note }}</text>
          <text class="module-arrow">{{ item.action }}</text>
        </view>
      </view>
    </view>

    <view class="gallery-section">
      <view class="section-head">
        <view>
          <text class="section-kicker">Selected Works</text>
          <text class="section-title">精选 AI 玉器方案</text>
        </view>
        <text class="section-note">AI 生成图像 · 玉器文化解读</text>
      </view>

      <view class="work-grid">
        <view class="work-card" v-for="work in works" :key="work.title" @tap="go(work.url)">
          <view class="work-image-frame">
            <image class="work-image" :src="work.src" mode="aspectFit" />
          </view>
          <view class="work-copy">
            <text class="work-title">{{ work.title }}</text>
            <text class="work-meta">{{ work.meta }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="process-band">
      <view class="process-item" v-for="item in steps" :key="item.title">
        <text class="process-num">{{ item.num }}</text>
        <view class="process-copy">
          <text class="process-title">{{ item.title }}</text>
          <text class="process-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const assetVersion = '20260524-full-artwork-1410';
const localAsset = (path: string) => `${import.meta.env.BASE_URL}${path}?v=${assetVersion}`;

const heroFlow = [
  { num: '01', title: '馆藏参照', desc: '用真实玉器建立材质与题材依据' },
  { num: '02', title: 'AI 生成', desc: '把设计条件转化为视觉方案' },
  { num: '03', title: '档案整理', desc: '形成可阅读、可提交的成果说明' }
];

const modules = [
  {
    index: '01',
    label: 'Knowledge',
    title: '玉石知识库',
    desc: '从开放馆藏中的真实玉器出发，理解材质、工艺和题材寓意。',
    note: '馆藏真图',
    action: '进入智库',
    url: '/pages/knowledge'
  },
  {
    index: '02',
    label: 'Create',
    title: '灵感琢玉',
    desc: '选择材质、样式、主题和题材，生成一件 AI 玉器视觉方案。',
    note: 'AI 辅助生成',
    action: '开始琢玉',
    url: '/pages/design'
  },
  {
    index: '03',
    label: 'Archive',
    title: '作品档案',
    desc: '把作品图、设计说明和文化依据整理成可阅读的成果档案。',
    note: '成果整理',
    action: '整理档案',
    url: '/pages/report?random=1'
  }
];

const works = [
  {
    title: '冰种翡翠水滴吊坠',
    meta: '现代极简 · 水滴形',
    src: localAsset('static/generated/material-core/ice-jade-diaozhui-modern-waterdrop.jpg'),
    url: '/pages/report?material=ice-jade&form=diaozhui&theme=modern&subject=waterdrop'
  },
  {
    title: '和田青玉远山玉佩',
    meta: '山水意境 · 远山云水',
    src: localAsset('static/generated/material-core/green-jade-yupei-landscape-mountain-cloud.jpg'),
    url: '/pages/report?material=green-jade&form=yupei&theme=landscape&subject=mountain-cloud'
  },
  {
    title: '羊脂白玉观音玉佩',
    meta: '神话故事 · 观音',
    src: localAsset('static/generated/material-core/mutton-white-yupei-myth-guanyin.jpg'),
    url: '/pages/report?material=mutton-white&form=yupei&theme=myth&subject=guanyin'
  },
  {
    title: '南红玛瑙锦鲤手镯',
    meta: '花鸟鱼虫 · 锦鲤',
    src: localAsset('static/generated/material-core/red-agate-shouzhuo-huahui-koi.jpg'),
    url: '/pages/report?material=red-agate&form=shouzhuo&theme=huahui&subject=koi'
  }
];

const steps = [
  { num: 'A', title: '看真实玉器', desc: '从开放馆藏建立材质、工艺和题材的可靠参照。' },
  { num: 'B', title: '生成设计方案', desc: '用 AI 辅助呈现不同材质、器型和题材组合的视觉结果。' },
  { num: 'C', title: '整理作品档案', desc: '把图像、传统依据和 AI 参与说明整合成最终成果。' }
];

const go = (url: string) => {
  uni.navigateTo({ url });
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 34rpx;
  background:
    linear-gradient(90deg, rgba(31, 107, 91, 0.035), rgba(31, 107, 91, 0) 20%, rgba(154, 116, 55, 0.055)),
    #f6f4ef;
  box-sizing: border-box;
}

.hero,
.module-grid,
.gallery-section,
.process-band {
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
}

.hero {
  min-height: 250px;
  padding: 30px;
  border-radius: 18rpx;
  background: #173f36;
  color: #fff;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 30px;
  align-items: center;
  box-shadow: 0 20rpx 52rpx rgba(31, 70, 62, 0.18);
  box-sizing: border-box;
}

.hero-copy {
  display: flex;
  flex-direction: column;
}

.eyebrow {
  color: #dfc58f;
  font-size: 16px;
  font-weight: 800;
}

.title {
  margin-top: 12px;
  font-size: 46px;
  line-height: 1.05;
  font-weight: 900;
}

.subtitle {
  margin-top: 14px;
  max-width: 610px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 18px;
  line-height: 1.65;
}

.hero-flow {
  padding: 20px;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.flow-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.flow-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(223, 197, 143, 0.2);
  color: #dfc58f;
  font-size: 15px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 40px;
}

.flow-copy {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.flow-title {
  color: #fff;
  font-size: 18px;
  font-weight: 900;
}

.flow-desc {
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 14px;
  line-height: 1.5;
}

.module-grid {
  margin-top: 26rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18rpx;
}

.module-card {
  min-height: 270rpx;
  padding: 28rpx;
  border-radius: 14rpx;
  background: #fff;
  box-shadow: 0 12rpx 30rpx rgba(44, 53, 48, 0.08);
  display: flex;
  flex-direction: column;
}

.module-index {
  width: 62rpx;
  height: 62rpx;
  border-radius: 50%;
  background: #e8f2ed;
  color: #1f6b5b;
  font-size: 22rpx;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

.module-label {
  margin-top: 24rpx;
  color: #9a7437;
  font-size: 21rpx;
  font-weight: 900;
}

.module-title {
  margin-top: 8rpx;
  color: #1f302b;
  font-size: 32rpx;
  font-weight: 900;
}

.module-desc {
  margin-top: 14rpx;
  color: #68736d;
  font-size: 24rpx;
  line-height: 1.65;
}

.module-foot {
  margin-top: auto;
  padding-top: 22rpx;
  display: flex;
  justify-content: space-between;
  gap: 18rpx;
  color: #9a7437;
  font-size: 22rpx;
  font-weight: 800;
}

.module-arrow {
  color: #1f6b5b;
}

.gallery-section {
  margin-top: 38rpx;
}

.section-head {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
  align-items: flex-end;
  margin-bottom: 18rpx;
}

.section-kicker {
  display: block;
  color: #9a7437;
  font-size: 22rpx;
  font-weight: 800;
}

.section-title {
  display: block;
  margin-top: 6rpx;
  color: #1f302b;
  font-size: 38rpx;
  font-weight: 900;
}

.section-note {
  color: #68736d;
  font-size: 22rpx;
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
}

.work-card {
  overflow: hidden;
  border-radius: 14rpx;
  background: #fff;
  box-shadow: 0 12rpx 30rpx rgba(44, 53, 48, 0.08);
}

.work-image-frame {
  width: 100%;
  height: 300px;
  background: #ebe4d8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-image {
  width: 100%;
  height: 100%;
  display: block;
}

.work-copy {
  padding: 18rpx;
}

.work-title {
  display: block;
  color: #20312c;
  font-size: 25rpx;
  font-weight: 900;
}

.work-meta {
  display: block;
  margin-top: 8rpx;
  color: #9a7437;
  font-size: 21rpx;
}

.process-band {
  margin-top: 30rpx;
  padding: 26rpx 30rpx;
  border-radius: 14rpx;
  background: #fff;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  box-shadow: 0 12rpx 30rpx rgba(44, 53, 48, 0.08);
}

.process-item {
  display: flex;
  gap: 18rpx;
}

.process-num {
  color: #9a7437;
  font-size: 30rpx;
  font-weight: 900;
}

.process-copy {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.process-title {
  color: #21312c;
  font-size: 26rpx;
  font-weight: 900;
}

.process-desc {
  margin-top: 8rpx;
  color: #68736d;
  font-size: 22rpx;
  line-height: 1.55;
}

@media screen and (max-width: 860px) {
  .hero,
  .module-grid,
  .work-grid,
  .process-band {
    grid-template-columns: 1fr;
  }

  .hero {
    padding: 38rpx;
    min-height: auto;
  }

  .work-image-frame {
    height: 560rpx;
  }
}
</style>
