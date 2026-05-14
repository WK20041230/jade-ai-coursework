<template>
  <view class="page">
    <view class="header">
      <text class="title">玉石知识库</text>
      <text class="subtitle">用开放馆藏中的真实作品辅助理解材质、工艺和题材寓意，图片已本地化保存，适合离线展示。</text>
    </view>

    <view class="tabs">
      <view
        v-for="(tab, index) in tabs"
        :key="tab"
        class="tab"
        :class="{ active: activeIndex === index }"
        @tap="activeIndex = index"
      >
        <text>{{ tab }}</text>
      </view>
    </view>

    <view class="content-panel">
      <view class="topic-card" v-for="(item, index) in activeItems" :key="item.title" @tap="openDetail(index)">
        <view class="topic-image">
          <image class="topic-photo" :src="item.image.src" :alt="item.image.alt" mode="aspectFill" />
        </view>
        <view class="topic-copy">
          <view class="topic-head">
            <text class="topic-title">{{ item.title }}</text>
            <text class="topic-tag">{{ item.tag }}</text>
          </view>
          <text class="topic-desc">{{ item.desc }}</text>
          <text class="topic-source">详情页查看馆藏来源与代表案例</text>
          <view class="points">
            <text class="point" v-for="point in item.points" :key="point">{{ point }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { knowledgeCategories } from '@/data/knowledge';

const tabs = knowledgeCategories.map((item) => item.name);
const activeIndex = ref(0);

const activeItems = computed(() => knowledgeCategories[activeIndex.value].items);

const openDetail = (itemIndex: number) => {
  uni.navigateTo({
    url: `/pages/knowledge-detail?category=${activeIndex.value}&item=${itemIndex}`
  });
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 32px 36px 56px;
  background:
    linear-gradient(90deg, rgba(31, 107, 91, 0.035), rgba(31, 107, 91, 0) 18%, rgba(31, 107, 91, 0) 82%, rgba(154, 116, 55, 0.05)),
    #f6f4ef;
  box-sizing: border-box;
}

.header,
.tabs,
.content-panel {
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
}

.header {
  margin-bottom: 20px;
}

.title {
  display: block;
  font-size: 34px;
  font-weight: 900;
  color: #1e2d29;
}

.subtitle {
  display: block;
  margin-top: 10px;
  font-size: 15px;
  line-height: 1.55;
  color: #68736d;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 18px;
}

.tab {
  height: 46px;
  border-radius: 999px;
  background: #fff;
  color: #65706a;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab.active {
  color: #fff;
  background: #1f6b5b;
  font-weight: 700;
}

.content-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.topic-card {
  min-height: 140px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 28px rgba(44, 53, 48, 0.08);
  display: flex;
  gap: 18px;
  align-items: center;
}

.topic-image {
  width: 190px;
  height: 126px;
  flex: 0 0 190px;
  border-radius: 10px;
  background: #e9e4d8;
  overflow: hidden;
  position: relative;
}

.topic-photo {
  width: 100%;
  height: 100%;
  display: block;
}

.topic-copy {
  flex: 1;
  min-width: 0;
}

.topic-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}

.topic-title {
  font-size: 23px;
  font-weight: 900;
  color: #22312d;
}

.topic-tag {
  padding: 6px 12px;
  border-radius: 999px;
  background: #f0eadc;
  color: #9a7437;
  font-size: 13px;
  white-space: nowrap;
}

.topic-desc {
  display: block;
  margin-top: 8px;
  font-size: 15px;
  line-height: 1.6;
  color: #5f6964;
}

.topic-source {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: #9a7437;
}

.points {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.point {
  padding: 5px 9px;
  border-radius: 6px;
  background: #eef5f1;
  color: #2f6a5d;
  font-size: 13px;
}

@media screen and (max-width: 760px) {
  .page {
    padding: 28rpx 32rpx 54rpx;
  }

  .topic-card {
    flex-direction: column;
    align-items: stretch;
    min-height: 0;
  }

  .topic-image {
    width: 100%;
    height: 300rpx;
    flex-basis: auto;
  }
}
</style>
