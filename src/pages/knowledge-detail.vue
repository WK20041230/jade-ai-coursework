<template>
  <view class="page">
    <view class="article">
      <view class="article-head">
        <text class="eyebrow">{{ category.name }}</text>
        <text class="title">{{ item.title }}</text>
        <text class="desc">{{ item.desc }}</text>
        <view class="chips">
          <text class="chip" v-for="point in item.points" :key="point">{{ point }}</text>
        </view>
      </view>

      <view class="layout">
        <view class="main-column">
          <view class="section intro-section">
            <text class="section-title">条目定位</text>
            <text class="section-text">{{ item.title }}在本知识库中对应“{{ category.name }}”维度，可用于连接真实馆藏、课堂鉴赏和“灵感琢玉”页面的参数化设计。阅读时建议先看右侧大图，判断材质光泽、形制轮廓和主题表达，再回到文字部分理解它为什么适合作为本条目的代表图。</text>
          </view>

          <view class="section lead-section">
            <text class="section-title">概览</text>
            <text class="section-text">{{ item.detail }}</text>
          </view>

          <view class="section">
            <text class="section-title">图像解读</text>
            <text class="section-text">{{ item.imageReading }}</text>
          </view>

          <view v-if="item.history" class="section">
            <text class="section-title">历史与文化背景</text>
            <text class="section-text">{{ item.history }}</text>
          </view>

          <view class="section">
            <text class="section-title">鉴赏要点</text>
            <view class="point-list">
              <view class="point-card" v-for="point in item.appraisal" :key="point">
                <text>{{ point }}</text>
              </view>
            </view>
          </view>

          <view class="section">
            <text class="section-title">代表作品与案例</text>
            <view class="example-grid">
              <view class="example-card" v-for="example in item.examples" :key="example.name">
                <image class="example-photo" :src="example.image.src" :alt="example.image.alt" mode="aspectFill" />
                <view class="example-copy">
                  <text class="example-title">{{ example.name }}</text>
                  <text class="example-note">{{ example.note }}</text>
                  <text class="example-source">{{ example.image.title }} · {{ example.image.source }}</text>
                  <button class="example-button" @tap.stop="openSource(example.image.sourceUrl)">官方来源</button>
                </view>
              </view>
            </view>
          </view>

          <view class="section">
            <text class="section-title">课堂表达</text>
            <text class="section-text">{{ item.presentation }}</text>
          </view>
        </view>

        <view class="info-column">
          <view class="image-panel">
            <image class="hero-photo" :src="item.image.src" :alt="item.image.alt" mode="aspectFit" />
          </view>
          <view class="facts">
            <view class="fact-row">
              <text class="fact-label">馆藏名称 / Collection Title</text>
              <text class="fact-value">{{ item.image.alt }}</text>
              <text class="fact-subvalue">{{ item.image.title }}</text>
            </view>
            <view class="fact-row">
              <text class="fact-label">作品信息 / Object Info</text>
              <text class="fact-value">{{ item.image.objectInfo }}</text>
            </view>
            <view class="fact-row">
              <text class="fact-label">图像来源 / Image Source</text>
              <text class="fact-value">{{ sourceNameZh }}</text>
              <text class="fact-subvalue">{{ item.image.source }}</text>
            </view>
            <view v-if="item.image.note" class="fact-note">
              <text>{{ item.image.note }}</text>
            </view>
            <button class="source-button" @tap="openSource(item.image.sourceUrl)">查看官方来源</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { knowledgeCategories } from '@/data/knowledge';

const categoryIndex = ref(0);
const itemIndex = ref(0);

onLoad((query) => {
  const category = Number(query?.category ?? 0);
  const item = Number(query?.item ?? 0);
  categoryIndex.value = Number.isFinite(category) ? category : 0;
  itemIndex.value = Number.isFinite(item) ? item : 0;
});

const category = computed(() => knowledgeCategories[categoryIndex.value] || knowledgeCategories[0]);
const item = computed(() => category.value.items[itemIndex.value] || category.value.items[0]);
const sourceNameZh = computed(() => {
  if (item.value.image.source.includes('Cleveland')) return '克利夫兰艺术博物馆开放馆藏';
  if (item.value.image.source.includes('Metropolitan')) return '大都会艺术博物馆公共领域馆藏';
  if (item.value.image.source.includes('Los Angeles')) return '洛杉矶郡艺术博物馆公共领域馆藏';
  if (item.value.image.source.includes('Art Institute')) return '芝加哥艺术博物馆公共领域馆藏';
  return '开放馆藏图片';
});

const openSource = (url: string) => {
  // #ifdef H5
  window.open(url, '_blank', 'noopener,noreferrer');
  // #endif
  // #ifndef H5
  uni.setClipboardData({ data: url });
  uni.showToast({ title: '来源链接已复制', icon: 'none' });
  // #endif
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 36px 40px 64px;
  background:
    linear-gradient(90deg, rgba(31, 107, 91, 0.035), rgba(31, 107, 91, 0) 18%, rgba(31, 107, 91, 0) 82%, rgba(154, 116, 55, 0.05)),
    #f6f4ef;
  box-sizing: border-box;
}

.article {
  max-width: 1360px;
  margin: 0 auto;
}

.article-head {
  padding: 28px 0 24px;
  border-bottom: 1px solid #ded8ca;
}

.eyebrow {
  display: block;
  font-size: 18px;
  color: #9a7437;
  font-weight: 800;
}

.title {
  display: block;
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.1;
  color: #152923;
  font-weight: 900;
}

.desc {
  display: block;
  margin-top: 14px;
  max-width: 860px;
  color: #53615b;
  font-size: 17px;
  line-height: 1.6;
}

.chips {
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chip {
  padding: 9px 14px;
  border-radius: 8px;
  background: #e8f2ed;
  color: #2d6c5e;
  font-size: 16px;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 520px;
  gap: 28px;
  align-items: start;
  margin-top: 28px;
}

.main-column,
.info-column {
  min-width: 0;
}

.info-column {
  position: sticky;
  top: 24px;
}

.section,
.image-panel,
.facts {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 26px rgba(44, 53, 48, 0.06);
}

.section {
  margin-bottom: 22px;
  padding: 28px;
}

.lead-section {
  border-top: 5px solid #1f6b5b;
}

.section-title {
  display: block;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee8dc;
  font-size: 22px;
  color: #1f302b;
  font-weight: 900;
}

.section-text {
  display: block;
  margin-top: 16px;
  font-size: 16px;
  line-height: 1.85;
  color: #4f5b56;
  text-align: justify;
}

.image-panel {
  overflow: hidden;
  background: #ebe6dc;
  min-height: 430px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-photo {
  width: 100%;
  height: 430px;
  display: block;
}

.facts {
  margin-top: 16px;
  padding: 22px;
}

.fact-row {
  padding: 16px 0;
  border-bottom: 1px solid #eee8dc;
}

.fact-row:first-child {
  padding-top: 0;
}

.fact-label {
  display: block;
  color: #9a7437;
  font-size: 13px;
  font-weight: 800;
}

.fact-value {
  display: block;
  margin-top: 8px;
  color: #2f3d38;
  font-size: 15px;
  line-height: 1.55;
}

.fact-subvalue {
  display: block;
  margin-top: 5px;
  color: #65706a;
  font-size: 14px;
  line-height: 1.45;
}

.fact-note {
  margin-top: 16px;
  padding: 14px;
  border-radius: 8px;
  background: #f7f4ec;
  color: #6c5a3a;
  font-size: 14px;
  line-height: 1.55;
}

.source-button,
.example-button {
  height: 38px;
  margin-top: 18px;
  padding: 0 16px;
  border-radius: 999px;
  background: #1f6b5b;
  color: #fff;
  font-size: 14px;
  line-height: 38px;
}

.source-button {
  width: 100%;
}

.point-list {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.point-card {
  padding: 18px;
  border-radius: 8px;
  background: #f7f4ec;
  color: #2f3d38;
  font-size: 15px;
  line-height: 1.5;
}

.example-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.example-card {
  overflow: hidden;
  border-radius: 10px;
  background: #f7f4ec;
}

.example-photo {
  width: 100%;
  height: 230px;
  display: block;
  background: #e8e1d3;
}

.example-copy {
  padding: 18px;
}

.example-title {
  display: block;
  font-size: 17px;
  color: #24332f;
  font-weight: 900;
}

.example-note {
  display: block;
  margin-top: 10px;
  color: #5a665f;
  font-size: 15px;
  line-height: 1.6;
}

.example-source {
  display: block;
  margin-top: 12px;
  color: #9a7437;
  font-size: 13px;
  line-height: 1.45;
}

.example-button {
  width: fit-content;
  min-width: 112px;
  margin-left: 0;
  background: #e8f2ed;
  color: #1f6b5b;
  font-weight: 700;
}

@media screen and (max-width: 860px) {
  .page {
    padding: 28rpx 32rpx 54rpx;
  }

  .layout {
    grid-template-columns: 1fr;
  }

  .info-column {
    position: static;
    order: -1;
  }

  .example-grid,
  .point-list {
    grid-template-columns: 1fr;
  }

  .image-panel {
    min-height: 320rpx;
  }

  .hero-photo {
    height: 360rpx;
  }
}
</style>
