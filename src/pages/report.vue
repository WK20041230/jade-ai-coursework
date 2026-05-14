<template>
  <view class="page">
    <view class="header">
      <text class="title">鉴赏报告</text>
      <text class="subtitle">根据观察项生成结构化评价，适合课堂汇报截图展示。</text>
    </view>

    <view class="panel">
      <view class="form-group">
        <text class="label">作品名称</text>
        <input class="input" v-model="form.name" placeholder="例如：青玉山水牌" />
      </view>

      <view class="form-grid">
        <view class="form-group">
          <text class="label">材质判断</text>
          <picker @change="onMaterialChange" :value="materialIndex" :range="materials">
            <view class="picker-box">{{ materials[materialIndex] }}</view>
          </picker>
        </view>
        <view class="form-group">
          <text class="label">工艺类型</text>
          <picker @change="onCraftChange" :value="craftIndex" :range="crafts">
            <view class="picker-box">{{ crafts[craftIndex] }}</view>
          </picker>
        </view>
      </view>

      <view class="form-group">
        <text class="label">观察记录</text>
        <textarea class="textarea" v-model="form.note" placeholder="记录颜色、透明度、纹理、瑕疵、题材等观察结果" />
      </view>

      <button class="btn" @tap="makeReport">生成报告</button>
    </view>

    <view v-if="report" class="report">
      <view class="report-head">
        <text class="report-title">{{ form.name || '未命名玉器' }}</text>
        <text class="report-badge">{{ grade }}</text>
      </view>
      <view class="report-row" v-for="item in reportItems" :key="item.label">
        <text class="row-label">{{ item.label }}</text>
        <text class="row-value">{{ item.value }}</text>
      </view>
      <view class="summary">
        <text class="summary-title">综合评价</text>
        <text class="summary-text">{{ report }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

const materials = ['羊脂白玉', '和田青玉', '冰种翡翠', '南红玛瑙'];
const crafts = ['圆雕', '浮雕', '镂雕', '俏色巧雕', '素面抛光'];

const materialIndex = ref(0);
const craftIndex = ref(1);
const report = ref('');

const form = reactive({
  name: '和田青玉山水牌',
  note: '色泽沉稳，局部有自然纹理，雕刻层次较清楚，题材为山水意境。'
});

const grade = computed(() => {
  const noteLength = form.note.trim().length;
  if (noteLength > 45 && craftIndex.value === 3) return '重点推荐';
  if (noteLength > 25) return '较完整';
  return '待补充';
});

const reportItems = computed(() => [
  { label: '材质', value: materials[materialIndex.value] },
  { label: '工艺', value: crafts[craftIndex.value] },
  { label: '观察', value: form.note || '暂无观察记录' }
]);

const onMaterialChange = (e: any) => {
  materialIndex.value = Number(e.detail.value);
};

const onCraftChange = (e: any) => {
  craftIndex.value = Number(e.detail.value);
};

const makeReport = () => {
  const name = form.name.trim() || '该玉器';
  const note = form.note.trim() || '目前观察信息较少，建议补充色泽、质地、透明度和工艺细节。';
  report.value = `${name}初步判断为${materials[materialIndex.value]}类作品，工艺上以${crafts[craftIndex.value]}为主要表现方式。观察记录显示：${note}。从鉴赏角度看，可围绕材质特征、颜色分布、雕刻层次、抛光完成度和题材寓意进行说明，并与“灵感琢玉”中的四种核心材质保持一致。若用于课程展示，建议补充实物图片、尺寸信息和局部细节图，使报告更具说服力。`;
  uni.showToast({ title: '报告已生成', icon: 'success' });
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 32rpx;
  background: #f6f4ef;
  box-sizing: border-box;
}

.header {
  margin-bottom: 24rpx;
}

.title {
  display: block;
  font-size: 46rpx;
  font-weight: 700;
  color: #1e2d29;
}

.subtitle {
  display: block;
  margin-top: 10rpx;
  font-size: 26rpx;
  line-height: 1.55;
  color: #68736d;
}

.panel,
.report {
  padding: 30rpx;
  border-radius: 18rpx;
  background: #fff;
  box-shadow: 0 12rpx 32rpx rgba(44, 53, 48, 0.08);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18rpx;
}

.form-group {
  margin-bottom: 24rpx;
}

.label {
  display: block;
  margin-bottom: 12rpx;
  font-size: 26rpx;
  color: #283833;
  font-weight: 700;
}

.input,
.picker-box,
.textarea {
  width: 100%;
  border-radius: 12rpx;
  border: 1px solid #e6dfd2;
  background: #fbfaf7;
  color: #26342f;
  font-size: 26rpx;
  box-sizing: border-box;
}

.input,
.picker-box {
  min-height: 84rpx;
  padding: 0 22rpx;
  display: flex;
  align-items: center;
}

.textarea {
  min-height: 170rpx;
  padding: 20rpx 22rpx;
  line-height: 1.55;
}

.btn {
  height: 90rpx;
  border-radius: 45rpx;
  color: #fff;
  background: linear-gradient(135deg, #1f6b5b, #b38a45);
  font-size: 30rpx;
  font-weight: 700;
}

.report {
  margin-top: 26rpx;
}

.report-head {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
  align-items: center;
  padding-bottom: 22rpx;
  border-bottom: 1px solid #eee9de;
}

.report-title {
  font-size: 34rpx;
  color: #22312d;
  font-weight: 700;
}

.report-badge {
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  background: #e8f2ed;
  color: #1f6b5b;
  font-size: 22rpx;
  white-space: nowrap;
}

.report-row {
  padding: 20rpx 0;
  border-bottom: 1px solid #f1ece2;
}

.row-label {
  display: block;
  font-size: 22rpx;
  color: #9a7437;
  font-weight: 700;
}

.row-value {
  display: block;
  margin-top: 8rpx;
  font-size: 26rpx;
  line-height: 1.6;
  color: #5f6964;
}

.summary {
  padding-top: 22rpx;
}

.summary-title {
  display: block;
  font-size: 30rpx;
  color: #24332f;
  font-weight: 700;
}

.summary-text {
  display: block;
  margin-top: 12rpx;
  font-size: 26rpx;
  color: #5f6964;
  line-height: 1.75;
  text-align: justify;
}

@media screen and (max-width: 420px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
