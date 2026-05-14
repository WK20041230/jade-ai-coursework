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
const archiveVersion = ref(0);

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

const materialDetail = computed(() => {
  const details: Record<string, string> = {
    'mutton-white': '羊脂白玉的重点在“白而不僵、润而不腻”，因此分析时应关注高光是否柔和、边缘过渡是否细腻，以及白色材质是否支撑作品的安静气质。',
    'green-jade': '和田青玉不以强透明取胜，而以沉稳色调和古雅气息见长。分析时可以把重点放在山石感、厚重感、留白关系和仿古气质上。',
    'ice-jade': '冰种翡翠强调清透、水头和光感，图像中的透明边缘、浅色底子和局部起光都会影响作品是否显得轻盈干净。',
    'red-agate': '南红玛瑙的识别点在温暖红色、胶质感和天然色带。分析时要看红色是否饱满但不过度塑料化，雕刻题材是否借助红色增强吉祥或守护意味。'
  };
  return details[selectedMaterial.value.slug];
});

const formDetail = computed(() => {
  const details: Record<string, string> = {
    diaozhui: '吊坠尺度较小，作品需要在有限面积内完成题材识别，因此孔位、轮廓和主体图案必须足够清楚，避免细节过碎。',
    yupei: '玉佩更适合正面叙事，边框、主纹样和留白之间的关系会决定画面是否端正，也决定它能否作为完整作品被独立观看。',
    shouzhuo: '手镯属于环形佩戴器，图案需要沿着弧面延展。它的难点不只是单面好看，还要让纹样在转动观看时保持连续和节奏。'
  };
  return details[selectedForm.value.slug];
});

const themeDetail = computed(() => {
  const details: Record<string, string> = {
    huahui: '花鸟鱼虫类题材适合表现生命感和吉祥寓意，画面通常依靠曲线、花叶、水纹或动物动态形成柔和节奏。',
    myth: '神话故事类题材更强调人物识别和精神气势，需要通过姿态、衣纹、器物和面部特征来建立叙事感。',
    landscape: '山水意境类题材重在空间层次与留白，远近关系、云水走向和山石节奏会直接影响作品是否具有文人气息。',
    modern: '现代极简类题材减少叙事细节，更考验比例、边缘、孔位和几何秩序，适合体现传统玉器向当代首饰语言的转译。'
  };
  return details[selectedTheme.value.slug];
});

const subjectDetail = computed(() => {
  const details: Record<string, string> = {
    lotus: '莲花的重点不是单朵花本身，而是花瓣、莲叶和水意之间的层次。它适合表达清雅、洁净，也适合与白玉、翡翠等清润材质结合。',
    koi: '锦鲤题材依靠鱼身曲线和水纹动势成立，适合表达顺遂、富足和流动的生命力。',
    bamboo: '竹叶题材需要线条疏密有度，竹节与叶片的方向能带出清劲、克制和文人气质。',
    zhongkui: '钟馗题材需要力量感和辨识度，面部、须发和衣纹都要服务于镇邪纳福的守护意味。',
    guanyin: '观音题材更看重端庄、慈悲和安定感，面相、手势和衣纹不能过于躁动。',
    nezha: '哪吒题材适合动态表现，飘带、武器和少年姿态可以强化勇气、突破与活力。',
    'mountain-cloud': '远山云水依靠远近层叠和云气留白成立，适合表现开阔、含蓄的东方空间。',
    'pine-stream': '松石溪流强调松、石、溪三者的节奏关系，适合表达坚贞、清流和山居意境。',
    'lonely-boat': '孤舟听雨题材更重情绪，少量元素就能形成静谧感，留白和雨线比繁复细节更重要。',
    'peace-buckle': '平安扣以外圆内孔为核心，比例端正、孔位居中和边缘圆润是判断重点。',
    waterdrop: '水滴形强调流线、轻盈和向下收束的轮廓，适合突出材质的清润感。',
    'square-circle': '方圆结合依靠几何秩序形成现代感，重点是方与圆的比例、对称和视觉稳定。'
  };
  return details[selectedSubject.value.slug];
});

const reportAngles = [
  {
    name: '材质观察',
    design: '本次档案更偏向从材质观察进入作品：',
    tradition: '从传统玉器观看方式看，材质从来不是背景，而是决定题材如何成立的前提。',
    innovation: 'AI 生成在这一角度下的价值，是快速比较不同材质对同一题材气质的改变。'
  },
  {
    name: '造型叙事',
    design: '本次档案更偏向从造型叙事进入作品：',
    tradition: '传统玉器中的器型与纹样往往互相制约，题材必须服从佩戴、陈设或把玩的形制。',
    innovation: 'AI 生成在这一角度下的价值，是把题材、形制和构图快速组合成可视化草案。'
  },
  {
    name: '网页呈现',
    design: '本次档案更偏向从网页呈现进入作品：',
    tradition: '当传统玉器进入数字页面时，观众首先接触的是图像、标题和说明之间的关系。',
    innovation: 'AI 生成在这一角度下的价值，是让作品不仅能被观看，还能被归档、筛选和重新组织。'
  }
];

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
  if (showToast) {
    archiveVersion.value += 1;
  }
  const note = form.note.trim();
  const angle = reportAngles[archiveVersion.value % reportAngles.length];
  archive.value = {
    design: `${angle.design}${archiveName.value}以${selectedMaterial.value.name}为主要材质，采用${selectedForm.value.name}形制，题材选择“${selectedSubject.value.name}”。${materialDetail.value}${formDetail.value}${subjectDetail.value}因此这件作品的分析重点不是单纯判断“像不像玉”，而是看材质语言、题材寓意和形制功能是否互相支持。${note ? `补充设想是：${note}` : ''}`,
    tradition: `${angle.tradition}${selectedTheme.value.name}为作品提供了文化语义，${selectedSubject.value.name}提供了图像核心。${themeDetail.value}${subjectDetail.value}如果把它放回传统玉器系统中理解，它既可以对应佩饰、陈设或把玩器的审美传统，也能说明玉器题材并不是孤立符号，而是由材质、器型、工艺和寓意共同构成。`,
    innovation: `${angle.innovation}这个作品档案把 AI 图像、参数组合和文字说明放在同一页面中，形成“选择作品 - 生成档案 - 阅读依据”的流程。与单张 AI 图片相比，它更强调可解释性：用户能看到作品为什么采用${selectedMaterial.value.name}，为什么适合${selectedForm.value.name}，以及${selectedSubject.value.name}如何连接到${selectedTheme.value.name}。页面使用本地预生成图像，不依赖实时接口，因此适合离线提交和长期展示；同时，不同作品会生成不同分析文本，避免所有档案只套用同一段说明。`
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
  position: relative;
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
  padding-right: 76rpx;
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
  position: absolute;
  top: 28rpx;
  right: 28rpx;
  width: 64rpx;
  height: 64rpx;
  margin: 0;
  padding: 0;
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
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}

.material-options {
  justify-content: flex-start;
}

.form-options {
  justify-content: flex-start;
}

.filter-btn {
  height: 62rpx;
  min-width: 132rpx;
  margin: 0;
  padding: 0 22rpx;
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
  max-height: 70vh;
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
  height: 330rpx;
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

  .filter-options {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filter-btn {
    min-width: 0;
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
