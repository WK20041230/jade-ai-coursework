<template>
  <view class="page">
    <view class="header">
      <text class="title">灵感琢玉</text>
      <text class="subtitle">选择固定参数后，系统会匹配预先由 AI 生成的素材库，并同步生成设计说明、鉴赏角度和作品档案文本。</text>
    </view>

    <view class="panel">
      <view class="select-field">
        <text class="label">玉石种类</text>
        <view class="select-box" @tap="toggleDropdown('material')">
          <view>
            <text class="select-value">{{ selectedMaterial.name }}</text>
            <text class="select-desc">{{ selectedMaterial.feature }}</text>
          </view>
          <text class="select-arrow">{{ openDropdown === 'material' ? '收起' : '选择' }}</text>
        </view>
        <view v-if="openDropdown === 'material'" class="dropdown">
          <view
            v-for="(item, index) in materials"
            :key="item.name"
            class="dropdown-option"
            :class="{ active: materialIndex === index }"
            @tap="chooseMaterial(index)"
          >
            <text class="option-title">{{ item.name }}</text>
            <text class="option-desc">{{ item.feature }}</text>
          </view>
        </view>
      </view>

      <view class="select-field">
        <text class="label">作品样式</text>
        <view class="select-box" @tap="toggleDropdown('form')">
          <view>
            <text class="select-value">{{ selectedForm.name }}</text>
            <text class="select-desc">{{ selectedForm.note }}</text>
          </view>
          <text class="select-arrow">{{ openDropdown === 'form' ? '收起' : '选择' }}</text>
        </view>
        <view v-if="openDropdown === 'form'" class="dropdown">
          <view
            v-for="(item, index) in forms"
            :key="item.name"
            class="dropdown-option"
            :class="{ active: formIndex === index }"
            @tap="chooseForm(index)"
          >
            <text class="option-title">{{ item.name }}</text>
            <text class="option-desc">{{ item.note }}</text>
          </view>
        </view>
      </view>

      <view class="select-field">
        <text class="label">创作主题</text>
        <view class="select-box" @tap="toggleDropdown('theme')">
          <view>
            <text class="select-value">{{ selectedTheme.name }}</text>
            <text class="select-desc">{{ selectedTheme.note }}</text>
          </view>
          <text class="select-arrow">{{ openDropdown === 'theme' ? '收起' : '选择' }}</text>
        </view>
        <view v-if="openDropdown === 'theme'" class="dropdown">
          <view
            v-for="(item, index) in themes"
            :key="item.name"
            class="dropdown-option"
            :class="{ active: themeIndex === index }"
            @tap="chooseTheme(index)"
          >
            <text class="option-title">{{ item.name }}</text>
            <text class="option-desc">{{ item.note }}</text>
          </view>
        </view>
      </view>

      <view class="select-field">
        <text class="label">小题材</text>
        <view class="select-box" @tap="toggleDropdown('subject')">
          <view>
            <text class="select-value">{{ selectedSubject.name }}</text>
            <text class="select-desc">{{ selectedSubject.symbol }}</text>
          </view>
          <text class="select-arrow">{{ openDropdown === 'subject' ? '收起' : '选择' }}</text>
        </view>
        <view v-if="openDropdown === 'subject'" class="dropdown">
          <view
            v-for="(item, index) in subjects"
            :key="item.name"
            class="dropdown-option"
            :class="{ active: subjectIndex === index }"
            @tap="chooseSubject(index)"
          >
            <text class="option-title">{{ item.name }}</text>
            <text class="option-desc">{{ item.symbol }}</text>
          </view>
        </view>
      </view>

      <button class="generate-btn" :loading="isGenerating" @tap="generateScheme">
        {{ isGenerating ? '正在生成方案...' : '生成玉器设计方案' }}
      </button>

      <view class="workflow-note">
        <text class="workflow-title">创作逻辑</text>
        <text class="workflow-text">本页不是现场调用生成式 AI，而是采用“有限选项 + 预生成素材库”的方式：先用 AI 批量生成稳定图片，再由程序按材质、器型、主题和小题材进行匹配，适合作为课程作业展示和离线提交。</text>
      </view>
    </view>

    <view v-if="hasGenerated" class="result-area">
      <view class="art-frame">
        <image class="art-image" :src="generatedScheme.image" mode="aspectFit" />
      </view>

      <view class="visual-meta">
        <text class="meta-title">{{ generatedScheme.title }}</text>
        <text class="meta-subtitle">{{ generatedScheme.material }} · {{ generatedScheme.form }} · {{ generatedScheme.theme }} · {{ generatedScheme.subject }}</text>
      </view>

      <view class="detail-grid">
        <view class="detail-card">
          <text class="detail-label">材质判断</text>
          <text class="detail-text">{{ generatedScheme.appraisal }}</text>
        </view>
        <view class="detail-card">
          <text class="detail-label">题材寓意</text>
          <text class="detail-text">{{ generatedScheme.symbol }}</text>
        </view>
        <view class="detail-card">
          <text class="detail-label">工艺重点</text>
          <text class="detail-text">{{ generatedScheme.craft }}</text>
        </view>
      </view>

      <view class="concept-box">
        <text class="concept-title">设计报告</text>
        <text class="concept-text">{{ generatedScheme.report }}</text>
      </view>

      <view class="concept-box">
        <text class="concept-title">AI 素材库说明</text>
        <text class="concept-text">{{ generatedScheme.assetLogic }}</text>
      </view>

      <view class="detail-grid expansion-grid">
        <view class="detail-card">
          <text class="detail-label">生成提示词</text>
          <text class="detail-text">{{ generatedScheme.prompt }}</text>
        </view>
        <view class="detail-card">
          <text class="detail-label">展示价值</text>
          <text class="detail-text">{{ generatedScheme.displayValue }}</text>
        </view>
        <view class="detail-card">
          <text class="detail-label">创新说明</text>
          <text class="detail-text">{{ generatedScheme.innovation }}</text>
        </view>
      </view>

      <view class="asset-note">
        <text class="asset-title">图片素材位</text>
        <text class="asset-text">{{ generatedScheme.assetNote }}</text>
        <text class="asset-key">建议文件名：{{ generatedScheme.assetName }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

type DropdownName = 'material' | 'form' | 'theme' | 'subject';

type Material = {
  name: string;
  feature: string;
  appraisal: string;
};

type FormOption = {
  name: string;
  note: string;
  craft: string;
};

type Subject = {
  name: string;
  symbol: string;
  image: string;
};

type Theme = {
  name: string;
  note: string;
  subjects: Subject[];
};

const localAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const materials: Material[] = [
  { name: '羊脂白玉', feature: '温润凝脂', appraisal: '羊脂白玉以温润、细腻、含蓄为主要审美特征，适合表现柔和圆润的浮雕和传统人物题材。' },
  { name: '和田青玉', feature: '沉静古雅', appraisal: '和田青玉色泽沉稳，气质古朴，适合结合阴刻线、边框纹样和文人化的山水构图。' },
  { name: '冰种翡翠', feature: '清透水润', appraisal: '冰种翡翠强调透明感和水头，适合轻薄、留白、通透的现代设计与细线雕刻。' },
  { name: '南红玛瑙', feature: '红润明艳', appraisal: '南红玛瑙色彩饱满热烈，适合高浮雕、喜庆寓意和红白俏色的装饰性表达。' }
];

const forms: FormOption[] = [
  { name: '吊坠', note: '小型佩戴', craft: '吊坠需要控制厚度、重心和孔位，使图案在小尺度中保持清晰。' },
  { name: '玉佩', note: '正面叙事', craft: '玉佩适合做完整画面与边框层次，重点在主题构图和浮雕深浅。' },
  { name: '手镯', note: '环形连续', craft: '手镯需要将纹样转化为连续环绕的节奏，兼顾佩戴舒适和图案识别。' }
];

const themes: Theme[] = [
  { name: '花鸟鱼虫', note: '自然寓意', subjects: [
    { name: '莲花', symbol: '象征清雅、纯净和君子品格，适合表现花瓣层次与柔和曲线。', image: 'static/presets/lotus-ice.svg' },
    { name: '锦鲤', symbol: '寓意顺遂、富足和好运，适合用流动水纹强化动势。', image: 'static/presets/dragon-red.svg' },
    { name: '竹叶', symbol: '象征节气、坚韧和文人气质，适合用疏密线条表现清劲。', image: 'static/presets/landscape-green.svg' }
  ] },
  { name: '神话故事', note: '传统人物', subjects: [
    { name: '钟馗', symbol: '寓意镇邪纳福，人物姿态需要有力量感和辨识度。', image: 'static/presets/zhongkui-white.svg' },
    { name: '观音', symbol: '寓意慈悲、平安和守护，适合柔和衣纹与端庄构图。', image: 'static/presets/zhongkui-white.svg' },
    { name: '哪吒', symbol: '象征勇气、活力和突破，适合表现动态飘带与少年英气。', image: 'static/presets/dragon-red.svg' }
  ] },
  { name: '山水意境', note: '诗意空间', subjects: [
    { name: '远山云水', symbol: '强调层叠远景、云气和水面留白，适合呈现东方空间感。', image: 'static/presets/landscape-green.svg' },
    { name: '松石溪流', symbol: '表现松、石、溪三种元素的节奏，寓意坚贞与清流。', image: 'static/presets/landscape-green.svg' },
    { name: '孤舟听雨', symbol: '营造静谧、含蓄的诗意场景，适合用少量元素传达情绪。', image: 'static/presets/landscape-green.svg' }
  ] },
  { name: '现代极简', note: '当代表达', subjects: [
    { name: '平安扣', symbol: '以圆形和中孔表达平安圆满，适合强调比例、材质和留白。', image: 'static/presets/buckle-ink.svg' },
    { name: '水滴形', symbol: '以流线形表达清润、轻盈和生命感，适合现代首饰语言。', image: 'static/presets/lotus-ice.svg' },
    { name: '方圆结合', symbol: '用方与圆的对比表达秩序与包容，适合现代几何化设计。', image: 'static/presets/buckle-ink.svg' }
  ] }
];

const materialSlugs: Record<string, string> = {
  '羊脂白玉': 'mutton-white',
  '和田青玉': 'green-jade',
  '冰种翡翠': 'ice-jade',
  '南红玛瑙': 'red-agate'
};

const formSlugs: Record<string, string> = {
  '吊坠': 'diaozhui',
  '玉佩': 'yupei',
  '手镯': 'shouzhuo'
};

const themeSlugs: Record<string, string> = {
  '花鸟鱼虫': 'huahui',
  '神话故事': 'myth',
  '山水意境': 'landscape',
  '现代极简': 'modern'
};

const subjectSlugs: Record<string, string> = {
  '莲花': 'lotus',
  '锦鲤': 'koi',
  '竹叶': 'bamboo',
  '钟馗': 'zhongkui',
  '观音': 'guanyin',
  '哪吒': 'nezha',
  '远山云水': 'mountain-cloud',
  '松石溪流': 'pine-stream',
  '孤舟听雨': 'lonely-boat',
  '平安扣': 'peace-buckle',
  '水滴形': 'waterdrop',
  '方圆结合': 'square-circle'
};

const materialIndex = ref(0);
const formIndex = ref(1);
const themeIndex = ref(1);
const subjectIndex = ref(0);
const openDropdown = ref<DropdownName | ''>('');
const hasGenerated = ref(false);
const isGenerating = ref(false);

const selectedMaterial = computed(() => materials[materialIndex.value]);
const selectedForm = computed(() => forms[formIndex.value]);
const selectedTheme = computed(() => themes[themeIndex.value]);
const subjects = computed(() => selectedTheme.value.subjects);
const selectedSubject = computed(() => subjects.value[subjectIndex.value]);

const generatedScheme = reactive({
  title: '',
  material: '',
  form: '',
  theme: '',
  subject: '',
  image: '',
  appraisal: '',
  symbol: '',
  craft: '',
  report: '',
  assetLogic: '',
  assetNote: '',
  prompt: '',
  displayValue: '',
  innovation: '',
  assetName: ''
});

const toggleDropdown = (name: DropdownName) => {
  openDropdown.value = openDropdown.value === name ? '' : name;
};

const chooseMaterial = (index: number) => {
  materialIndex.value = index;
  openDropdown.value = '';
  hasGenerated.value = false;
};

const chooseForm = (index: number) => {
  formIndex.value = index;
  openDropdown.value = '';
  hasGenerated.value = false;
};

const chooseTheme = (index: number) => {
  themeIndex.value = index;
  subjectIndex.value = 0;
  openDropdown.value = '';
  hasGenerated.value = false;
};

const chooseSubject = (index: number) => {
  subjectIndex.value = index;
  openDropdown.value = '';
  hasGenerated.value = false;
};

const getCombinationAssetPath = () => {
  const material = materialSlugs[selectedMaterial.value.name];
  const form = formSlugs[selectedForm.value.name];
  const theme = themeSlugs[selectedTheme.value.name];
  const subject = subjectSlugs[selectedSubject.value.name];
  if (!material || !form || !theme || !subject) {
    return '';
  }
  return localAsset('static/generated/material-core/' + material + '-' + form + '-' + theme + '-' + subject + '.jpg');
};

const getGeneratedImage = () => {
  const generatedCombinationImage = getCombinationAssetPath();
  return generatedCombinationImage || localAsset(selectedSubject.value.image);
};

const generateScheme = () => {
  openDropdown.value = '';
  isGenerating.value = true;
  setTimeout(() => {
    const title = `${selectedMaterial.value.name}${selectedSubject.value.name}${selectedForm.value.name}`;
    generatedScheme.title = title;
    generatedScheme.material = selectedMaterial.value.name;
    generatedScheme.form = selectedForm.value.name;
    generatedScheme.theme = selectedTheme.value.name;
    generatedScheme.subject = selectedSubject.value.name;
    generatedScheme.image = getGeneratedImage();
    generatedScheme.appraisal = selectedMaterial.value.appraisal;
    generatedScheme.symbol = selectedSubject.value.symbol;
    generatedScheme.craft = selectedForm.value.craft;
    generatedScheme.assetName = `${materialSlugs[selectedMaterial.value.name]}-${formSlugs[selectedForm.value.name]}-${themeSlugs[selectedTheme.value.name]}-${subjectSlugs[selectedSubject.value.name]}.jpg`;
    generatedScheme.report = `本方案选择${selectedMaterial.value.name}作为材料，设计为${selectedForm.value.name}，创作主题为${selectedTheme.value.name}，小题材聚焦“${selectedSubject.value.name}”。材质上，${selectedMaterial.value.appraisal}题材上，${selectedSubject.value.symbol}工艺上，${selectedForm.value.craft}整体方案适合从材质特征、题材寓意、工艺难点、佩戴或陈设场景四个角度整理成作品档案。`;
    generatedScheme.assetLogic = `本页采用“预生成 AI 图像素材库 + 前端参数匹配”的方式完成展示。四类材质、三种样式、四个主题与十二个小题材形成 144 张本地图片，不依赖实时生图 API，因此适合离线打包和邮件提交。`;
    generatedScheme.assetNote = `当前图片来自 material-core 素材库，文件名按“材质-样式-主题-小题材”命名。不同材质的提示词已分别强调白玉的温润、青玉的古雅、翡翠的通透和南红的俏色。`;
    generatedScheme.prompt = `以${selectedMaterial.value.name}为材质，设计一件${selectedForm.value.name}，主题为${selectedTheme.value.name}中的${selectedSubject.value.name}。画面应强调${selectedMaterial.value.feature}、${selectedForm.value.note}和${selectedSubject.value.symbol}，同时让材质语言影响造型、雕工、厚薄、光泽与构图，而不只是改变颜色。`;
    generatedScheme.displayValue = `适合在成果说明中展示“传统题材数字化转译”的过程：从玉材认知到题材选择，再到 AI 图像素材和文字报告的组合呈现。`;
    generatedScheme.innovation = `作品把传统玉器题材拆解为可选择的设计参数，并用本地 AI 图像素材模拟生成结果，既保留玉器文化语义，也解决免费实时生图 API 不稳定的问题。`;
    hasGenerated.value = true;
    isGenerating.value = false;
    uni.showToast({ title: '方案已生成', icon: 'success' });
  }, 450);
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 32rpx;
  background: #f6f4ef;
  box-sizing: border-box;
}

.header,
.panel,
.result-area {
  max-width: 960rpx;
  margin-left: auto;
  margin-right: auto;
}

.header {
  margin-bottom: 28rpx;
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
.result-area {
  background: #fff;
  border-radius: 18rpx;
  padding: 30rpx;
  box-shadow: 0 12rpx 32rpx rgba(44, 53, 48, 0.08);
}

.select-field {
  margin-bottom: 26rpx;
}

.label {
  display: block;
  margin-bottom: 12rpx;
  font-size: 26rpx;
  color: #283833;
  font-weight: 700;
}

.select-box {
  min-height: 90rpx;
  padding: 20rpx 24rpx;
  border-radius: 14rpx;
  border: 1px solid #e6dfd2;
  background: #fbfaf7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  box-sizing: border-box;
}

.select-value {
  display: block;
  color: #1f2f2a;
  font-size: 30rpx;
  font-weight: 700;
}

.select-desc {
  display: block;
  margin-top: 6rpx;
  color: #758079;
  font-size: 23rpx;
  line-height: 1.4;
}

.select-arrow {
  flex: 0 0 auto;
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  background: #eef5f1;
  color: #1f6b5b;
  font-size: 22rpx;
  font-weight: 700;
}

.dropdown {
  margin-top: 12rpx;
  border-radius: 14rpx;
  border: 1px solid #e6dfd2;
  background: #fff;
  overflow: hidden;
}

.dropdown-option {
  padding: 20rpx 24rpx;
  border-bottom: 1px solid #f1ece2;
}

.dropdown-option:last-child {
  border-bottom: 0;
}

.dropdown-option.active {
  background: #eef5f1;
}

.option-title {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  color: #22312d;
}

.option-desc {
  display: block;
  margin-top: 6rpx;
  font-size: 23rpx;
  line-height: 1.45;
  color: #6b756f;
}

.generate-btn {
  height: 92rpx;
  border-radius: 46rpx;
  color: #fff;
  background: linear-gradient(135deg, #1f6b5b, #b38a45);
  font-size: 30rpx;
  font-weight: 700;
}

.workflow-note {
  margin-top: 24rpx;
  padding: 22rpx 24rpx;
  border-radius: 14rpx;
  background: #fbfaf7;
  border: 1px solid #eadfca;
}

.workflow-title {
  display: block;
  font-size: 26rpx;
  font-weight: 700;
  color: #8a6b35;
}

.workflow-text {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  line-height: 1.65;
  color: #5f6964;
  text-align: justify;
}

.result-area {
  margin-top: 28rpx;
}

.art-frame {
  width: 100%;
  max-width: 720rpx;
  height: 520rpx;
  margin: 0 auto;
  border-radius: 18rpx;
  background: #f4f0e7;
  border: 1px solid #e7dece;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.art-image {
  width: 100%;
  height: 100%;
}

.visual-meta {
  margin-top: 22rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.meta-title {
  font-size: 34rpx;
  font-weight: 700;
  color: #22312d;
}

.meta-subtitle {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #758079;
}

.detail-grid {
  margin-top: 26rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}

.expansion-grid {
  grid-template-columns: 1fr;
}

.detail-card {
  padding: 22rpx;
  border-radius: 14rpx;
  background: #f7f4ec;
}

.detail-label {
  display: block;
  font-size: 24rpx;
  color: #9a7437;
  font-weight: 700;
}

.detail-text {
  display: block;
  margin-top: 10rpx;
  color: #5f6964;
  font-size: 24rpx;
  line-height: 1.6;
}

.concept-box,
.asset-note {
  padding-top: 26rpx;
}

.concept-title,
.asset-title {
  display: block;
  font-size: 30rpx;
  color: #24332f;
  font-weight: 700;
}

.concept-text,
.asset-text,
.asset-key {
  display: block;
  margin-top: 12rpx;
  font-size: 26rpx;
  color: #5f6964;
  line-height: 1.75;
  text-align: justify;
}

.asset-text,
.asset-key {
  padding: 16rpx 18rpx;
  border-radius: 10rpx;
  background: #fbfaf7;
  color: #8a6b35;
  font-size: 22rpx;
}

.asset-key {
  background: #eef5f1;
  color: #2f6a5d;
}

@media screen and (max-width: 900px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .art-frame {
    max-width: 100%;
    height: 500rpx;
  }
}
</style>

