<template>
  <view class="page">
    <view class="hero">
      <view class="hero-copy">
        <text class="eyebrow">玉石鉴赏期末作品</text>
        <text class="title">玉语 AI</text>
        <text class="subtitle">围绕四种核心材质，把玉石知识、AI 设计和作品档案放进一个轻量小程序。</text>
      </view>
      <view class="jade-scene" aria-hidden="true">
        <view class="jade-disc"></view>
        <view class="jade-hole"></view>
        <view class="shine shine-a"></view>
        <view class="shine shine-b"></view>
      </view>
    </view>

    <view class="quick-grid">
      <view class="feature-card" @tap="go('/pages/design')">
        <text class="feature-icon">琢</text>
        <text class="feature-title">灵感琢玉</text>
        <text class="feature-desc">选择材质、器型和题材，生成设计说明。</text>
      </view>
      <view class="feature-card" @tap="go('/pages/knowledge')">
        <text class="feature-icon">识</text>
        <text class="feature-title">知识库</text>
        <text class="feature-desc">用开放馆藏真图复习材质、工艺与题材。</text>
      </view>
      <view class="feature-card" @tap="go('/pages/report')">
        <text class="feature-icon">档</text>
        <text class="feature-title">作品档案</text>
        <text class="feature-desc">整理生成方案，形成可提交的设计说明。</text>
      </view>
    </view>

    <view class="section">
      <view class="section-head">
        <text class="section-title">创作流程</text>
        <text class="section-note">从知识到作品</text>
      </view>
      <view class="timeline">
        <view class="step" v-for="item in steps" :key="item.title">
          <text class="step-num">{{ item.num }}</text>
          <view class="step-copy">
            <text class="step-title">{{ item.title }}</text>
            <text class="step-desc">{{ item.desc }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const steps = [
  { num: '01', title: '查知识', desc: '用真实馆藏理解材质、工艺和题材寓意。' },
  { num: '02', title: '琢方案', desc: '选择材质、样式、主题和小题材生成 AI 玉器图像。' },
  { num: '03', title: '成档案', desc: '把图像、传统依据和创新说明整理成作品成果。' }
];

const go = (url: string) => {
  uni.navigateTo({ url });
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 32rpx;
  background: #f6f4ef;
  box-sizing: border-box;
}

.hero {
  min-height: 420rpx;
  padding: 40rpx;
  border-radius: 24rpx;
  background: linear-gradient(135deg, #123c35 0%, #2e6b5d 52%, #e7ddc5 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 20rpx 50rpx rgba(31, 70, 62, 0.18);
}

.hero-copy {
  width: 55%;
  display: flex;
  flex-direction: column;
}

.eyebrow {
  font-size: 22rpx;
  opacity: 0.86;
}

.title {
  margin-top: 16rpx;
  font-size: 64rpx;
  font-weight: 700;
  line-height: 1.05;
}

.subtitle {
  margin-top: 18rpx;
  font-size: 28rpx;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.9);
}

.jade-scene {
  position: relative;
  width: 260rpx;
  height: 260rpx;
  flex: 0 0 260rpx;
}

.jade-disc {
  position: absolute;
  inset: 18rpx;
  border-radius: 50%;
  background:
    radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.78), transparent 18%),
    radial-gradient(circle at 70% 72%, rgba(28, 117, 92, 0.45), transparent 32%),
    linear-gradient(135deg, #f7fff7, #9ed8c2 44%, #387a68);
  box-shadow: inset -22rpx -28rpx 42rpx rgba(21, 71, 60, 0.28), 0 22rpx 42rpx rgba(0, 0, 0, 0.22);
}

.jade-hole {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 86rpx;
  height: 86rpx;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #1f574d;
  box-shadow: inset 8rpx 10rpx 16rpx rgba(0, 0, 0, 0.24);
}

.shine {
  position: absolute;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.68);
  transform: rotate(-28deg);
}

.shine-a {
  width: 76rpx;
  height: 16rpx;
  left: 66rpx;
  top: 68rpx;
}

.shine-b {
  width: 48rpx;
  height: 10rpx;
  right: 64rpx;
  bottom: 80rpx;
}

.quick-grid {
  margin-top: 28rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18rpx;
}

.feature-card {
  min-height: 210rpx;
  padding: 22rpx;
  border-radius: 16rpx;
  background: #fff;
  box-shadow: 0 10rpx 28rpx rgba(44, 53, 48, 0.08);
  display: flex;
  flex-direction: column;
}

.feature-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  background: #e5f1ea;
  color: #1d6a59;
  font-size: 28rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-title {
  margin-top: 18rpx;
  font-size: 28rpx;
  font-weight: 700;
  color: #21312c;
}

.feature-desc {
  margin-top: 10rpx;
  font-size: 22rpx;
  line-height: 1.5;
  color: #69746f;
}

.section {
  margin-top: 34rpx;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.section-title {
  font-size: 34rpx;
  font-weight: 700;
  color: #1e2d29;
}

.section-note {
  font-size: 22rpx;
  color: #7d857f;
}

.timeline {
  margin-top: 18rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 10rpx 26rpx;
}

.step {
  display: flex;
  gap: 22rpx;
  padding: 24rpx 0;
  border-bottom: 1px solid #eee9de;
}

.step:last-child {
  border-bottom: 0;
}

.step-num {
  color: #b48a45;
  font-weight: 700;
  font-size: 28rpx;
}

.step-copy {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.step-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #26342f;
}

.step-desc {
  margin-top: 8rpx;
  font-size: 24rpx;
  line-height: 1.55;
  color: #6d7772;
}

@media screen and (max-width: 420px) {
  .hero {
    align-items: flex-start;
  }

  .hero-copy {
    width: 62%;
  }

  .title {
    font-size: 54rpx;
  }

  .jade-scene {
    width: 210rpx;
    height: 210rpx;
    flex-basis: 210rpx;
  }

  .quick-grid {
    grid-template-columns: 1fr;
  }

  .feature-card {
    min-height: 150rpx;
  }
}
</style>
