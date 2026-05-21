<template>
  <view class="page">
    <view class="hero">
      <view class="hero-copy">
        <text class="eyebrow">AI 时代玉器的传承与创新</text>
        <text class="title">玉语 AI</text>
        <text class="subtitle">用真实馆藏建立知识线索，用本地 AI 图像生成设计方案，最后沉淀为可提交的作品档案。</text>
        <view class="hero-actions">
          <button class="primary-action" @tap="go('/pages/design')">开始琢玉</button>
          <button class="secondary-action" @tap="go('/pages/knowledge')">查看知识库</button>
        </view>
      </view>

      <view class="hero-art" @tap="go('/pages/report')">
        <image class="hero-image" :src="heroImage" mode="aspectFit" />
        <view class="hero-art-caption">
          <text class="caption-title">南红玛瑙莲花玉佩</text>
          <text class="caption-desc">作品档案示例</text>
        </view>
      </view>
    </view>

    <view class="module-grid">
      <view class="module-card" v-for="item in modules" :key="item.title" @tap="go(item.url)">
        <view class="module-index">
          <text>{{ item.index }}</text>
        </view>
        <text class="module-title">{{ item.title }}</text>
        <text class="module-desc">{{ item.desc }}</text>
        <view class="module-foot">
          <text>{{ item.note }}</text>
          <text class="module-arrow">进入</text>
        </view>
      </view>
    </view>

    <view class="gallery-section">
      <view class="section-head">
        <view>
          <text class="section-kicker">Selected Works</text>
          <text class="section-title">精选 AI 玉器方案</text>
        </view>
        <text class="section-note">本地素材库 · 离线可看</text>
      </view>

      <view class="work-grid">
        <view class="work-card" v-for="work in works" :key="work.title" @tap="go('/pages/report')">
          <image class="work-image" :src="work.src" mode="aspectFill" />
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
const localAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const heroImage = localAsset('static/generated/material-core/red-agate-yupei-huahui-lotus.jpg');

const modules = [
  {
    index: '01',
    title: '玉石知识库',
    desc: '用真实开放馆藏理解材质、工艺和题材寓意。',
    note: '馆藏真图',
    url: '/pages/knowledge'
  },
  {
    index: '02',
    title: '灵感琢玉',
    desc: '通过有限参数组合生成 144 种 AI 玉器方案。',
    note: 'AI 生成方案',
    url: '/pages/design'
  },
  {
    index: '03',
    title: '作品档案',
    desc: '选择作品图，整理设计说明、传统依据和创新点。',
    note: '设计说明',
    url: '/pages/report'
  }
];

const works = [
  {
    title: '冰种翡翠水滴吊坠',
    meta: '现代极简 · 水滴形',
    src: localAsset('static/generated/material-core/ice-jade-diaozhui-modern-waterdrop.jpg')
  },
  {
    title: '和田青玉远山玉佩',
    meta: '山水意境 · 远山云水',
    src: localAsset('static/generated/material-core/green-jade-yupei-landscape-mountain-cloud.jpg')
  },
  {
    title: '羊脂白玉观音玉佩',
    meta: '神话故事 · 观音',
    src: localAsset('static/generated/material-core/mutton-white-yupei-myth-guanyin.jpg')
  },
  {
    title: '南红玛瑙锦鲤手镯',
    meta: '花鸟鱼虫 · 锦鲤',
    src: localAsset('static/generated/material-core/red-agate-shouzhuo-huahui-koi.jpg')
  }
];

const steps = [
  { num: 'A', title: '看真实玉器', desc: '从开放馆藏建立材质、工艺和题材的可靠参照。' },
  { num: 'B', title: '生成设计方案', desc: '用本地 AI 素材库呈现不同组合的视觉结果。' },
  { num: 'C', title: '整理作品档案', desc: '把图像、传统依据和创新说明整合成最终成果。' }
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
  min-height: 560rpx;
  padding: 46rpx;
  border-radius: 18rpx;
  background: #173f36;
  color: #fff;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 430rpx;
  gap: 42rpx;
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
  font-size: 24rpx;
  font-weight: 800;
}

.title {
  margin-top: 14rpx;
  font-size: 72rpx;
  line-height: 1.05;
  font-weight: 900;
}

.subtitle {
  margin-top: 22rpx;
  max-width: 760rpx;
  color: rgba(255, 255, 255, 0.86);
  font-size: 29rpx;
  line-height: 1.7;
}

.hero-actions {
  margin-top: 34rpx;
  display: flex;
  gap: 16rpx;
  flex-wrap: wrap;
}

.primary-action,
.secondary-action {
  height: 78rpx;
  min-width: 180rpx;
  padding: 0 28rpx;
  border-radius: 999rpx;
  font-size: 27rpx;
  font-weight: 800;
  line-height: 78rpx;
}

.primary-action {
  background: #dfc58f;
  color: #173f36;
}

.secondary-action {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.hero-art {
  overflow: hidden;
  border-radius: 16rpx;
  background: #e9e2d5;
  box-shadow: 0 18rpx 42rpx rgba(0, 0, 0, 0.18);
}

.hero-image {
  width: 100%;
  height: 430rpx;
  display: block;
}

.hero-art-caption {
  padding: 22rpx 24rpx;
  background: #fff;
}

.caption-title {
  display: block;
  color: #1f302b;
  font-size: 28rpx;
  font-weight: 900;
}

.caption-desc {
  display: block;
  margin-top: 6rpx;
  color: #9a7437;
  font-size: 22rpx;
}

.module-grid {
  margin-top: 26rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18rpx;
}

.module-card {
  min-height: 230rpx;
  padding: 26rpx;
  border-radius: 14rpx;
  background: #fff;
  box-shadow: 0 12rpx 30rpx rgba(44, 53, 48, 0.08);
  display: flex;
  flex-direction: column;
}

.module-index {
  width: 58rpx;
  height: 58rpx;
  border-radius: 50%;
  background: #e8f2ed;
  color: #1f6b5b;
  font-size: 22rpx;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

.module-title {
  margin-top: 22rpx;
  color: #1f302b;
  font-size: 31rpx;
  font-weight: 900;
}

.module-desc {
  margin-top: 12rpx;
  color: #68736d;
  font-size: 24rpx;
  line-height: 1.6;
}

.module-foot {
  margin-top: auto;
  padding-top: 22rpx;
  display: flex;
  justify-content: space-between;
  color: #9a7437;
  font-size: 22rpx;
  font-weight: 800;
}

.module-arrow {
  color: #1f6b5b;
}

.gallery-section {
  margin-top: 34rpx;
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

.work-image {
  width: 100%;
  height: 260rpx;
  display: block;
  background: #e8e1d3;
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
  margin-top: 34rpx;
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
  }

  .hero-image {
    height: 520rpx;
  }
}
</style>
