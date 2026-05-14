<template>
  <view class="page">
    <view class="hero">
      <view class="hero-copy">
        <text class="eyebrow">作品成果整理</text>
        <text class="title">作品档案</text>
        <text class="subtitle">以作品图为中心，把 AI 玉器方案整理成可阅读、可提交的设计说明。</text>
      </view>
      <button class="hero-action" @tap="openSelector">打开作品库</button>
    </view>

    <view class="showcase">
      <view class="art-stage" @tap="openSelector">
        <image class="work-image" :src="assetPath" mode="aspectFit" />
        <view class="stage-hint">
          <text>点击图片更换作品</text>
        </view>
      </view>

      <view class="side-panel">
        <view class="panel-head">
          <text class="panel-kicker">Selected Work</text>
          <text class="panel-title">{{ archiveName }}</text>
        </view>

        <view class="tag-row">
          <text class="tag">{{ selectedMaterial.name }}</text>
          <text class="tag">{{ selectedForm.name }}</text>
          <text class="tag">{{ selectedTheme.name }}</text>
          <text class="tag">{{ selectedSubject.name }}</text>
        </view>

        <view class="form-group">
          <text class="label">作品名称</text>
          <input class="input" v-model="form.name" placeholder="为当前作品命名" />
        </view>

        <view class="form-group">
          <text class="label">补充说明</text>
          <textarea class="textarea" v-model="form.note" placeholder="补充你想强调的设计想法、使用场景或个人偏好。" />
        </view>

        <view class="action-row">
          <button class="ghost-btn" @tap="openSelector">更换作品</button>
          <button class="primary-btn" @tap="makeArchive">生成档案</button>
        </view>
      </view>
    </view>

    <view v-if="archive" class="archive">
      <view class="archive-head">
        <view>
          <text class="archive-kicker">Design Archive</text>
          <text class="archive-title">{{ archiveName }}</text>
        </view>
        <text class="archive-badge">{{ selectedMaterial.feature }}</text>
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
    <view v-else class="archive-empty">
      <text class="empty-title">尚未生成作品档案</text>
      <text class="empty-text">确认当前作品后，点击“生成档案”，下方会出现完整的设计说明、传统依据和 AI 创新点。</text>
    </view>

    <view v-if="selectorOpen" class="selector-mask" @tap="closeSelector">
      <view class="selector" @tap.stop>
        <view class="selector-head">
          <view>
            <text class="selector-title">作品库</text>
            <text class="selector-note">先切换材质和样式，再从 12 张作品中选择。</text>
          </view>
          <button class="close-btn" @tap="closeSelector">×</button>
        </view>

        <view class="filter-panel">
          <view class="filter-group">
            <text class="filter-label">材质</text>
            <view class="filter-options material-options">
              <button
                v-for="(material, index) in materials"
                :key="material.name"
                class="filter-btn"
                :class="{ active: materialIndex === index }"
                @tap="chooseMaterial(index)"
              >
                {{ material.name }}
              </button>
            </view>
          </view>

          <view class="filter-group">
            <text class="filter-label">样式</text>
            <view class="filter-options form-options">
              <button
                v-for="(formOption, index) in forms"
                :key="formOption.name"
                class="filter-btn"
                :class="{ active: formIndex === index }"
                @tap="chooseForm(index)"
              >
                {{ formOption.name }}
              </button>
            </view>
          </view>
        </view>

        <scroll-view class="gallery-scroll" scroll-y>
          <view class="gallery-grid">
            <view
              v-for="item in galleryItems"
              :key="item.key"
              class="gallery-card"
              :class="{ active: item.themeIndex === themeIndex && item.subjectIndex === subjectIndex }"
              @tap="selectGalleryItem(item)"
            >
              <image class="gallery-image" :src="item.src" mode="aspectFill" />
              <view class="gallery-copy">
                <text class="gallery-name">{{ item.subject.name }}</text>
                <text class="gallery-theme">{{ item.theme.name }}</text>
              </view>
            </view>
          </view>
        </scroll-view>
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

type GalleryItem = {
  key: string;
  src: string;
  theme: Theme;
  subject: Subject;
  themeIndex: number;
  subjectIndex: number;
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
const selectorOpen = ref(false);
const archive = ref<{ design: string; tradition: string; innovation: string } | null>(null);

const form = reactive({
  name: '南红玛瑙莲花玉佩',
  note: '希望作品既有传统莲花的清雅寓意，也能体现南红玛瑙温暖、明艳的视觉识别度。'
});

const selectedMaterial = computed(() => materials[materialIndex.value]);
const selectedForm = computed(() => forms[formIndex.value]);
const selectedTheme = computed(() => themes[themeIndex.value]);
const selectedSubject = computed(() => selectedTheme.value.subjects[subjectIndex.value]);

const archiveName = computed(() => form.name.trim() || comboName.value);
const comboName = computed(() => `${selectedMaterial.value.name}${selectedSubject.value.name}${selectedForm.value.name}`);
const assetPath = computed(() => makeAssetPath(selectedTheme.value, selectedSubject.value));

const archiveItems = computed(() => [
  { label: '材质', value: `${selectedMaterial.value.name}：${selectedMaterial.value.feature}` },
  { label: '样式', value: `${selectedForm.value.name}：${selectedForm.value.note}` },
  { label: '主题', value: `${selectedTheme.value.name}：${selectedTheme.value.note}` },
  { label: '题材', value: `${selectedSubject.value.name}：${selectedSubject.value.symbol}` }
]);

const galleryItems = computed<GalleryItem[]>(() =>
  themes.flatMap((theme, tIndex) =>
    theme.subjects.map((subject, sIndex) => ({
      key: `${theme.slug}-${subject.slug}`,
      src: makeAssetPath(theme, subject),
      theme,
      subject,
      themeIndex: tIndex,
      subjectIndex: sIndex
    }))
  )
);

function makeAssetPath(theme: Theme, subject: Subject) {
  return localAsset(`static/generated/material-core/${selectedMaterial.value.slug}-${selectedForm.value.slug}-${theme.slug}-${subject.slug}.jpg`);
}

const openSelector = () => {
  selectorOpen.value = true;
};

const closeSelector = () => {
  selectorOpen.value = false;
};

const chooseMaterial = (index: number) => {
  materialIndex.value = index;
  form.name = comboName.value;
  archive.value = null;
};

const chooseForm = (index: number) => {
  formIndex.value = index;
  form.name = comboName.value;
  archive.value = null;
};

const selectGalleryItem = (item: GalleryItem) => {
  themeIndex.value = item.themeIndex;
  subjectIndex.value = item.subjectIndex;
  form.name = comboName.value;
  archive.value = null;
  closeSelector();
};

const makeArchive = (showToast = true) => {
  const note = form.note.trim();
  archive.value = {
    design: `${archiveName.value}以${selectedMaterial.value.name}为主要材质，采用${selectedForm.value.name}形制，题材选择“${selectedSubject.value.name}”。材质上，${selectedMaterial.value.design}因此作品的第一视觉不只是颜色，而是由光泽、透明度、厚薄关系和表面抛光共同形成的玉质感。造型上，${selectedForm.value.craft}这决定了画面不能只追求装饰堆叠，还需要兼顾佩戴结构、观看重心和边缘处理。题材上，${selectedSubject.value.symbol}在作品档案中，这一方案可以被理解为“材质特征 + 传统题材 + 当代图像生成”的组合实验。${note ? `补充设想是：${note}` : ''}`,
    tradition: `${selectedTheme.value.name}为作品提供了清晰的文化语义，${selectedSubject.value.name}则提供了可识别的图像核心。传统玉器并不只是把纹样刻在材料表面，而是会根据玉料的颜色、润度、透明度和形制来调整题材表达；例如温润材质更适合含蓄柔和的线面，色彩鲜明的材质更适合强调守护、吉祥或节庆气质。这个方案把传统玉器中的材质审美、器型规范和题材寓意拆解为可选择参数，再重新组合成一个具体作品，使观看者能够从“为什么选这种玉、为什么做这种形、为什么用这个题材”三个层面理解它。`,
    innovation: `AI 在这里不是替代玉雕工艺，而是作为前期视觉预演工具：它可以快速呈现不同材质、样式和题材组合后的视觉效果，帮助比较哪一种方案更有辨识度、更适合网页展示，也更容易形成完整说明。页面使用 144 张本地预生成图像，不依赖实时接口，因此适合离线提交和长期展示。作品档案把 AI 图像、传统依据、材质说明和设计意图放在同一页面中，使结果不只是单张图片，而是一个可以被阅读、比较和归档的数字玉器设计方案。`
  };
  if (showToast) {
    uni.showToast({ title: '档案已生成', icon: 'success' });
  }
};
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

.hero,
.showcase,
.archive {
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
}

.hero {
  margin-bottom: 24rpx;
  padding: 34rpx 38rpx;
  border-radius: 18rpx;
  background: #173f36;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx;
  box-shadow: 0 18rpx 46rpx rgba(31, 70, 62, 0.16);
}

.hero-copy {
  display: flex;
  flex-direction: column;
}

.eyebrow {
  color: #dfc58f;
  font-size: 22rpx;
  font-weight: 800;
}

.title {
  margin-top: 10rpx;
  font-size: 52rpx;
  line-height: 1.1;
  font-weight: 900;
}

.subtitle {
  margin-top: 14rpx;
  color: rgba(255, 255, 255, 0.84);
  font-size: 26rpx;
  line-height: 1.6;
}

.hero-action,
.primary-btn,
.ghost-btn {
  height: 76rpx;
  border-radius: 999rpx;
  font-size: 26rpx;
  font-weight: 800;
  line-height: 76rpx;
}

.hero-action {
  width: 190rpx;
  flex: 0 0 190rpx;
  background: #dfc58f;
  color: #173f36;
}

.showcase {
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(360rpx, 0.82fr);
  gap: 24rpx;
  align-items: stretch;
}

.art-stage,
.side-panel,
.archive,
.selector {
  border-radius: 16rpx;
  background: #fff;
  box-shadow: 0 12rpx 32rpx rgba(44, 53, 48, 0.08);
}

.art-stage {
  position: relative;
  min-height: 650rpx;
  overflow: hidden;
  background: #e9e2d5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-image {
  width: 100%;
  height: 650rpx;
  display: block;
}

.stage-hint {
  position: absolute;
  left: 28rpx;
  bottom: 28rpx;
  padding: 12rpx 18rpx;
  border-radius: 999rpx;
  background: rgba(23, 63, 54, 0.88);
  color: #fff;
  font-size: 22rpx;
}

.side-panel {
  padding: 30rpx;
}

.panel-kicker {
  display: block;
  color: #9a7437;
  font-size: 22rpx;
  font-weight: 800;
}

.panel-title {
  display: block;
  margin-top: 8rpx;
  color: #1f302b;
  font-size: 38rpx;
  line-height: 1.2;
  font-weight: 900;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin: 20rpx 0 26rpx;
}

.tag {
  padding: 8rpx 14rpx;
  border-radius: 8rpx;
  background: #e8f2ed;
  color: #1f6b5b;
  font-size: 22rpx;
  font-weight: 700;
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
.textarea {
  width: 100%;
  border-radius: 10rpx;
  border: 1px solid #e6dfd2;
  background: #fbfaf7;
  color: #26342f;
  font-size: 25rpx;
  box-sizing: border-box;
}

.input {
  min-height: 78rpx;
  padding: 0 20rpx;
}

.textarea {
  min-height: 210rpx;
  padding: 18rpx 20rpx;
  line-height: 1.6;
}

.action-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14rpx;
}

.ghost-btn {
  background: #f7f4ec;
  color: #1f6b5b;
}

.primary-btn {
  background: #1f6b5b;
  color: #fff;
}

.archive {
  margin-top: 26rpx;
  padding: 30rpx;
}

.archive-empty {
  max-width: 1180px;
  margin: 26rpx auto 0;
  padding: 34rpx;
  border-radius: 16rpx;
  border: 1px dashed #d9cdb9;
  background: rgba(255, 255, 255, 0.62);
  text-align: center;
  box-sizing: border-box;
}

.empty-title {
  display: block;
  color: #1f302b;
  font-size: 28rpx;
  font-weight: 900;
}

.empty-text {
  display: block;
  margin-top: 10rpx;
  color: #68736d;
  font-size: 24rpx;
  line-height: 1.6;
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

.selector-mask {
  position: fixed;
  inset: 0;
  z-index: 20;
  padding: 36rpx;
  background: rgba(17, 29, 25, 0.52);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.selector {
  width: min(1180px, 100%);
  max-height: 94vh;
  padding: 28rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.selector-head {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
  align-items: flex-start;
  margin-bottom: 22rpx;
}

.selector-title {
  display: block;
  color: #1f302b;
  font-size: 34rpx;
  font-weight: 900;
}

.selector-note {
  display: block;
  margin-top: 8rpx;
  color: #68736d;
  font-size: 23rpx;
}

.close-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: #f7f4ec;
  color: #1f302b;
  font-size: 34rpx;
  line-height: 64rpx;
}

.filter-panel {
  padding: 18rpx;
  border-radius: 14rpx;
  background: #f7f4ec;
  margin-bottom: 22rpx;
}

.filter-group {
  display: grid;
  grid-template-columns: 84rpx 1fr;
  gap: 14rpx;
  align-items: center;
}

.filter-group + .filter-group {
  margin-top: 14rpx;
}

.filter-label {
  color: #9a7437;
  font-size: 22rpx;
  font-weight: 900;
}

.filter-options {
  display: grid;
  gap: 10rpx;
}

.material-options {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.form-options {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.filter-btn {
  height: 62rpx;
  border-radius: 999rpx;
  border: 1px solid #e6dfd2;
  background: #fff;
  color: #3c4b45;
  font-size: 22rpx;
  font-weight: 800;
  line-height: 62rpx;
}

.filter-btn.active {
  border-color: #1f6b5b;
  background: #1f6b5b;
  color: #fff;
}

.gallery-scroll {
  max-height: 68vh;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
  padding-bottom: 4rpx;
}

.gallery-card {
  overflow: hidden;
  border-radius: 12rpx;
  border: 2rpx solid transparent;
  background: #f7f4ec;
}

.gallery-card.active {
  border-color: #1f6b5b;
}

.gallery-image {
  width: 100%;
  height: 300rpx;
  display: block;
  background: #e8e1d3;
}

.gallery-copy {
  padding: 14rpx 16rpx 16rpx;
}

.gallery-name {
  display: block;
  color: #20312c;
  font-size: 24rpx;
  font-weight: 900;
}

.gallery-theme {
  display: block;
  margin-top: 4rpx;
  color: #9a7437;
  font-size: 20rpx;
}

@media screen and (max-width: 860px) {
  .showcase,
  .archive-grid {
    grid-template-columns: 1fr;
  }

  .art-stage {
    min-height: 520rpx;
  }

  .work-image {
    height: 520rpx;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filter-group {
    grid-template-columns: 1fr;
  }

  .material-options,
  .form-options {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media screen and (max-width: 420px) {
  .hero {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero-action {
    width: 100%;
  }

  .selector-mask {
    padding: 20rpx;
  }
}
</style>
