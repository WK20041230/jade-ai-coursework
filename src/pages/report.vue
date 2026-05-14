<template>
  <view class="page">
    <view class="hero">
      <view class="hero-copy">
        <text class="eyebrow">作品成果整理</text>
        <text class="title">作品档案</text>
        <text class="subtitle">把“灵感琢玉”的参数化结果整理成一份可阅读、可提交的设计说明。</text>
      </view>
      <view class="hero-stat">
        <text class="stat-num">144</text>
        <text class="stat-label">本地 AI 玉器方案</text>
      </view>
    </view>

    <view class="workspace">
      <view class="control-panel">
        <view class="panel-head">
          <text class="panel-title">生成档案</text>
          <text class="panel-note">选择一个方案，形成完整作品说明</text>
        </view>

        <view class="form-group">
          <text class="label">作品名称</text>
          <input class="input" v-model="form.name" placeholder="例如：南红玛瑙莲花玉佩" />
        </view>

        <view class="form-grid">
          <view class="form-group">
            <text class="label">材质</text>
            <picker @change="onMaterialChange" :value="materialIndex" :range="materialNames">
              <view class="picker-box">{{ selectedMaterial.name }}</view>
            </picker>
          </view>
          <view class="form-group">
            <text class="label">样式</text>
            <picker @change="onFormChange" :value="formIndex" :range="formNames">
              <view class="picker-box">{{ selectedForm.name }}</view>
            </picker>
          </view>
          <view class="form-group">
            <text class="label">主题</text>
            <picker @change="onThemeChange" :value="themeIndex" :range="themeNames">
              <view class="picker-box">{{ selectedTheme.name }}</view>
            </picker>
          </view>
          <view class="form-group">
            <text class="label">小题材</text>
            <picker @change="onSubjectChange" :value="subjectIndex" :range="subjectNames">
              <view class="picker-box">{{ selectedSubject.name }}</view>
            </picker>
          </view>
        </view>

        <view class="form-group">
          <text class="label">补充说明</text>
          <textarea class="textarea" v-model="form.note" placeholder="可以补充你想强调的设计想法、使用场景或个人偏好。" />
        </view>

        <button class="btn" @tap="makeArchive">生成作品档案</button>
      </view>

      <view class="preview-panel">
        <view class="image-wrap">
          <image class="work-image" :src="assetPath" mode="aspectFit" />
        </view>
        <view class="preview-meta">
          <text class="meta-title">{{ archiveName }}</text>
          <text class="meta-desc">{{ selectedMaterial.feature }} · {{ selectedForm.note }} · {{ selectedTheme.note }}</text>
        </view>
      </view>
    </view>

    <view v-if="archive" class="archive">
      <view class="archive-head">
        <view>
          <text class="archive-kicker">Design Archive</text>
          <text class="archive-title">{{ archiveName }}</text>
        </view>
        <text class="archive-badge">{{ selectedMaterial.name }}</text>
      </view>

      <view class="archive-grid">
        <view class="archive-card" v-for="item in archiveItems" :key="item.label">
          <text class="archive-label">{{ item.label }}</text>
          <text class="archive-value">{{ item.value }}</text>
        </view>
      </view>

      <view class="section">
        <text class="section-title">设计说明</text>
        <text class="section-text">{{ archive.design }}</text>
      </view>

      <view class="section">
        <text class="section-title">传统依据</text>
        <text class="section-text">{{ archive.tradition }}</text>
      </view>

      <view class="section">
        <text class="section-title">AI 创新点</text>
        <text class="section-text">{{ archive.innovation }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

type Material = {
  name: string;
  slug: string;
  feature: string;
  design: string;
};

type FormOption = {
  name: string;
  slug: string;
  note: string;
  craft: string;
};

type Subject = {
  name: string;
  slug: string;
  symbol: string;
};

type Theme = {
  name: string;
  slug: string;
  note: string;
  subjects: Subject[];
};

const localAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const materials: Material[] = [
  { name: '羊脂白玉', slug: 'mutton-white', feature: '温润凝脂', design: '适合表现清雅、柔和、端庄的题材，重点在白度、细腻度与含蓄光泽。' },
  { name: '和田青玉', slug: 'green-jade', feature: '沉静古雅', design: '适合山水、仿古和文人意境，视觉气质更稳重、耐看。' },
  { name: '冰种翡翠', slug: 'ice-jade', feature: '清透水润', design: '适合水滴、莲叶、轻薄造型和现代极简表达，强调透明度与水头。' },
  { name: '南红玛瑙', slug: 'red-agate', feature: '红润明艳', design: '适合吉祥、守护和节庆题材，强调红玉髓的胶质感、温暖色调与俏色可能。' }
];

const forms: FormOption[] = [
  { name: '吊坠', slug: 'diaozhui', note: '小型佩戴', craft: '需要控制孔位、厚度和正面识别度，让题材在小尺度中成立。' },
  { name: '玉佩', slug: 'yupei', note: '正面叙事', craft: '适合组织完整画面，重点在边框、主体、留白和浮雕层次。' },
  { name: '手镯', slug: 'shouzhuo', note: '环形连续', craft: '需要把题材转化为可环绕的连续纹样，同时兼顾佩戴舒适度。' }
];

const themes: Theme[] = [
  {
    name: '花鸟鱼虫',
    slug: 'huahui',
    note: '自然寓意',
    subjects: [
      { name: '莲花', slug: 'lotus', symbol: '以花叶层次表达清雅、洁净和向上的生命感。' },
      { name: '锦鲤', slug: 'koi', symbol: '用鱼身曲线和水纹表达顺遂、富足与好运。' },
      { name: '竹叶', slug: 'bamboo', symbol: '以竹节和竹叶表现清劲、坚韧与文人气质。' }
    ]
  },
  {
    name: '神话故事',
    slug: 'myth',
    note: '守护叙事',
    subjects: [
      { name: '钟馗', slug: 'zhongkui', symbol: '通过人物姿态和面部气势表达镇邪纳福。' },
      { name: '观音', slug: 'guanyin', symbol: '以端庄面相、柔和衣纹表达慈悲与平安。' },
      { name: '哪吒', slug: 'nezha', symbol: '用飘带、武器和动态姿态表达勇气与突破。' }
    ]
  },
  {
    name: '山水意境',
    slug: 'landscape',
    note: '诗意空间',
    subjects: [
      { name: '远山云水', slug: 'mountain-cloud', symbol: '用远近层次、云气和水面留白营造东方空间感。' },
      { name: '松石溪流', slug: 'pine-stream', symbol: '用松、石、溪的节奏表达坚贞与清流。' },
      { name: '孤舟听雨', slug: 'lonely-boat', symbol: '用少量元素营造安静、含蓄的诗意场景。' }
    ]
  },
  {
    name: '现代极简',
    slug: 'modern',
    note: '当代表达',
    subjects: [
      { name: '平安扣', slug: 'peace-buckle', symbol: '以外圆内孔表达圆满、平衡和平安。' },
      { name: '水滴形', slug: 'waterdrop', symbol: '用流线轮廓表达清润、轻盈和生命感。' },
      { name: '方圆结合', slug: 'square-circle', symbol: '用几何秩序表达包容、稳定和现代感。' }
    ]
  }
];

const materialIndex = ref(3);
const formIndex = ref(1);
const themeIndex = ref(0);
const subjectIndex = ref(0);
const archive = ref<{ design: string; tradition: string; innovation: string } | null>(null);

const form = reactive({
  name: '南红玛瑙莲花玉佩',
  note: '希望作品既有传统莲花的清雅寓意，也能体现南红玛瑙温暖、明艳的视觉识别度。'
});

const materialNames = computed(() => materials.map((item) => item.name));
const formNames = computed(() => forms.map((item) => item.name));
const themeNames = computed(() => themes.map((item) => item.name));
const subjectNames = computed(() => selectedTheme.value.subjects.map((item) => item.name));

const selectedMaterial = computed(() => materials[materialIndex.value]);
const selectedForm = computed(() => forms[formIndex.value]);
const selectedTheme = computed(() => themes[themeIndex.value]);
const selectedSubject = computed(() => selectedTheme.value.subjects[subjectIndex.value]);

const archiveName = computed(() => form.name.trim() || `${selectedMaterial.value.name}${selectedSubject.value.name}${selectedForm.value.name}`);
const assetPath = computed(() => localAsset(`static/generated/material-core/${selectedMaterial.value.slug}-${selectedForm.value.slug}-${selectedTheme.value.slug}-${selectedSubject.value.slug}.jpg`));

const archiveItems = computed(() => [
  { label: '材质', value: `${selectedMaterial.value.name}：${selectedMaterial.value.feature}` },
  { label: '样式', value: `${selectedForm.value.name}：${selectedForm.value.note}` },
  { label: '主题', value: `${selectedTheme.value.name}：${selectedTheme.value.note}` },
  { label: '题材', value: `${selectedSubject.value.name}：${selectedSubject.value.symbol}` }
]);

const onMaterialChange = (e: any) => {
  materialIndex.value = Number(e.detail.value);
};

const onFormChange = (e: any) => {
  formIndex.value = Number(e.detail.value);
};

const onThemeChange = (e: any) => {
  themeIndex.value = Number(e.detail.value);
  subjectIndex.value = 0;
};

const onSubjectChange = (e: any) => {
  subjectIndex.value = Number(e.detail.value);
};

const makeArchive = () => {
  const note = form.note.trim();
  archive.value = {
    design: `${archiveName.value}以${selectedMaterial.value.name}为材质，采用${selectedForm.value.name}形制，题材选择“${selectedSubject.value.name}”。材质上，${selectedMaterial.value.design}造型上，${selectedForm.value.craft}题材上，${selectedSubject.value.symbol}${note ? `补充设想是：${note}` : ''}`,
    tradition: `这个方案把传统玉器中的材质审美、器型规范和题材寓意拆解为可选择参数。${selectedTheme.value.name}提供文化语义，${selectedSubject.value.name}提供可识别图像核心，${selectedMaterial.value.name}则决定作品的光泽、色彩和情绪方向。`,
    innovation: `AI 部分不是替代玉雕工艺，而是用于快速预演材质、题材和形制组合后的视觉效果。页面通过本地 144 张预生成图片完成离线展示，使作品既能保留传统玉器语言，也具备数字化生成和网页交互的表达方式。`
  };
  uni.showToast({ title: '档案已生成', icon: 'success' });
};

makeArchive();
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 32rpx;
  background:
    linear-gradient(90deg, rgba(31, 107, 91, 0.035), rgba(31, 107, 91, 0) 18%, rgba(154, 116, 55, 0.05)),
    #f6f4ef;
  box-sizing: border-box;
}

.hero {
  max-width: 1180px;
  margin: 0 auto 28rpx;
  padding: 38rpx 42rpx;
  border-radius: 18rpx;
  background: #173f36;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 18rpx 46rpx rgba(31, 70, 62, 0.16);
}

.hero-copy {
  display: flex;
  flex-direction: column;
}

.eyebrow {
  font-size: 22rpx;
  color: #dfc58f;
  font-weight: 700;
}

.title {
  margin-top: 10rpx;
  font-size: 52rpx;
  line-height: 1.1;
  font-weight: 900;
}

.subtitle {
  margin-top: 14rpx;
  font-size: 26rpx;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.84);
}

.hero-stat {
  width: 180rpx;
  height: 150rpx;
  border-radius: 12rpx;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 180rpx;
}

.stat-num {
  font-size: 48rpx;
  font-weight: 900;
}

.stat-label {
  margin-top: 6rpx;
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.76);
}

.workspace,
.archive {
  max-width: 1180px;
  margin: 0 auto;
}

.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 430rpx;
  gap: 24rpx;
  align-items: start;
}

.control-panel,
.preview-panel,
.archive {
  border-radius: 14rpx;
  background: #fff;
  box-shadow: 0 12rpx 32rpx rgba(44, 53, 48, 0.08);
}

.control-panel {
  padding: 30rpx;
}

.panel-head {
  margin-bottom: 24rpx;
}

.panel-title {
  display: block;
  color: #1f302b;
  font-size: 34rpx;
  font-weight: 900;
}

.panel-note {
  display: block;
  margin-top: 8rpx;
  color: #68736d;
  font-size: 24rpx;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18rpx;
}

.form-group {
  margin-bottom: 22rpx;
}

.label {
  display: block;
  margin-bottom: 10rpx;
  color: #283833;
  font-size: 24rpx;
  font-weight: 800;
}

.input,
.picker-box,
.textarea {
  width: 100%;
  border-radius: 10rpx;
  border: 1px solid #e6dfd2;
  background: #fbfaf7;
  color: #26342f;
  font-size: 25rpx;
  box-sizing: border-box;
}

.input,
.picker-box {
  min-height: 78rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
}

.textarea {
  min-height: 160rpx;
  padding: 18rpx 20rpx;
  line-height: 1.6;
}

.btn {
  height: 84rpx;
  border-radius: 999rpx;
  background: #1f6b5b;
  color: #fff;
  font-size: 28rpx;
  font-weight: 800;
}

.preview-panel {
  overflow: hidden;
}

.image-wrap {
  height: 430rpx;
  background: #e8e1d3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-image {
  width: 100%;
  height: 100%;
  display: block;
}

.preview-meta {
  padding: 22rpx;
}

.meta-title {
  display: block;
  color: #20312c;
  font-size: 30rpx;
  font-weight: 900;
}

.meta-desc {
  display: block;
  margin-top: 10rpx;
  color: #68736d;
  font-size: 23rpx;
  line-height: 1.55;
}

.archive {
  margin-top: 26rpx;
  padding: 30rpx;
}

.archive-head {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
  align-items: flex-start;
  padding-bottom: 24rpx;
  border-bottom: 1px solid #eee8dc;
}

.archive-kicker {
  display: block;
  color: #9a7437;
  font-size: 22rpx;
  font-weight: 800;
}

.archive-title {
  display: block;
  margin-top: 8rpx;
  color: #1f302b;
  font-size: 38rpx;
  font-weight: 900;
}

.archive-badge {
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: #e8f2ed;
  color: #1f6b5b;
  font-size: 22rpx;
  font-weight: 800;
  white-space: nowrap;
}

.archive-grid {
  margin-top: 24rpx;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
}

.archive-card {
  padding: 18rpx;
  border-radius: 10rpx;
  background: #f7f4ec;
}

.archive-label {
  display: block;
  color: #9a7437;
  font-size: 21rpx;
  font-weight: 800;
}

.archive-value {
  display: block;
  margin-top: 8rpx;
  color: #3f4b46;
  font-size: 23rpx;
  line-height: 1.55;
}

.section {
  margin-top: 24rpx;
  padding-top: 22rpx;
  border-top: 1px solid #eee8dc;
}

.section-title {
  display: block;
  color: #1f302b;
  font-size: 28rpx;
  font-weight: 900;
}

.section-text {
  display: block;
  margin-top: 12rpx;
  color: #4f5b56;
  font-size: 25rpx;
  line-height: 1.8;
  text-align: justify;
}

@media screen and (max-width: 860px) {
  .workspace {
    grid-template-columns: 1fr;
  }

  .archive-grid,
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 420px) {
  .hero {
    align-items: flex-start;
  }

  .hero-stat {
    display: none;
  }
}
</style>
