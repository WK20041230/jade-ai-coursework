<template>
  <view class="page">
    <view class="header">
      <view>
        <text class="eyebrow">Open Collection Notes</text>
        <text class="title">玉石知识库</text>
      </view>
      <text class="subtitle">用开放馆藏中的真实作品辅助理解材质、工艺和题材寓意，配有来源说明，适合课堂展示与作品分析。</text>
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
          <view class="topic-foot">
            <text class="topic-source">详情页查看馆藏来源与代表案例</text>
            <text class="topic-enter">进入档案</text>
          </view>
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
  padding: 30px 36px 56px;
  background:
    linear-gradient(90deg, rgba(31, 107, 91, 0.035), rgba(31, 107, 91, 0) 18%, rgba(31, 107, 91, 0) 82%, rgba(154, 116, 55, 0.05)),
    #f6f4ef;
  box-sizing: border-box;
  overflow-x: hidden;
}

.header,
.tabs,
.content-panel {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
}

.header {
  min-height: 134px;
  margin-bottom: 18px;
  padding: 24px 30px;
  border-radius: 18px;
  background: #173f36;
  color: #fff;
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(280px, 1.2fr);
  gap: 24px;
  align-items: end;
  box-shadow: 0 18px 46px rgba(31, 70, 62, 0.16);
  box-sizing: border-box;
}

.eyebrow {
  display: block;
  color: #dfc58f;
  font-size: 13px;
  font-weight: 900;
}

.title {
  display: block;
  margin-top: 8px;
  font-size: 38px;
  line-height: 1.05;
  font-weight: 900;
  color: #fff;
}

.subtitle {
  display: block;
  max-width: 620px;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.82);
  overflow-wrap: anywhere;
  white-space: normal;
  word-break: break-all;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 10px 26px rgba(44, 53, 48, 0.06);
}

.tab {
  height: 42px;
  border-radius: 999px;
  background: transparent;
  color: #65706a;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab.active {
  color: #fff;
  background: #1f6b5b;
  font-weight: 800;
}

.content-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.topic-card {
  min-height: 178px;
  padding: 14px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 28px rgba(44, 53, 48, 0.08);
  display: flex;
  gap: 18px;
  align-items: center;
  box-sizing: border-box;
}

.topic-image {
  width: 172px;
  height: 150px;
  flex: 0 0 172px;
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
  font-size: 21px;
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
  line-height: 1.55;
  color: #5f6964;
}

.topic-foot {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.topic-source {
  font-size: 13px;
  color: #9a7437;
}

.topic-enter {
  color: #1f6b5b;
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
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

  .header,
  .content-panel {
    grid-template-columns: 1fr;
  }

  .header {
    min-height: 0;
    padding: 36rpx;
  }

  .title {
    font-size: 50rpx;
  }

  .subtitle {
    font-size: 25rpx;
  }

  .tabs {
    border-radius: 16rpx;
  }

  .topic-card {
    flex-direction: column;
    align-items: stretch;
    min-height: 0;
  }

  .topic-head,
  .topic-foot {
    align-items: flex-start;
    flex-direction: column;
    gap: 8rpx;
  }

  .topic-image {
    width: 100%;
    height: 320rpx;
    flex-basis: auto;
  }
}
</style>
