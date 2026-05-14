export type KnowledgeImage = {
  src: string;
  alt: string;
  title: string;
  objectInfo: string;
  source: string;
  sourceUrl: string;
  note?: string;
};

export type KnowledgeExample = {
  name: string;
  note: string;
  image: KnowledgeImage;
};

export type KnowledgeItem = {
  title: string;
  tag: string;
  desc: string;
  points: string[];
  image: KnowledgeImage;
  detail: string;
  history?: string;
  imageReading: string;
  appraisal: string[];
  presentation: string;
  examples: KnowledgeExample[];
};

export type KnowledgeCategory = {
  name: string;
  items: KnowledgeItem[];
};

const cma = 'Cleveland Museum of Art, CC0';
const met = 'The Metropolitan Museum of Art, Public Domain';
const lacma = 'Los Angeles County Museum of Art, Public Domain';
const aic = 'Art Institute of Chicago, Public Domain';
const localAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const img = (
  src: string,
  alt: string,
  title: string,
  objectInfo: string,
  source: string,
  sourceUrl: string,
  note?: string
): KnowledgeImage => ({
  src: src.startsWith('static/') ? localAsset(src) : src,
  alt,
  title,
  objectInfo,
  source,
  sourceUrl,
  note
});

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    name: '材质',
    items: [
      {
        title: '羊脂白玉',
        tag: '温润凝脂',
        desc: '以白度、细腻度、油脂光泽和柔和光感见长。',
        points: ['油脂光泽', '结构细腻', '白而不僵', '适合浅浮雕'],
        image: img(
          'static/knowledge/lacma-lidded-bowl-wan.jpg',
          '清代白玉盖碗',
          'Lidded Bowl (Wan)',
          '清代乾隆时期，白玉盖碗。素净器型，适合观察白玉的白度、细腻度、抛光和器壁比例。',
          lacma,
          'https://collections.lacma.org/node/177691'
        ),
        detail:
          '羊脂白玉可以理解为白玉审美中的高等级方向，重点不只是“白”，更是细、润、糯和光泽柔和。优秀白玉在光线下不会显得干涩刺眼，而有含蓄的油脂光泽，适合表现人物、莲花、平安扣等柔和题材。',
        history:
          '白玉长期与礼仪、佩饰和文房陈设相连，常被用来表达洁净、端正、温雅的审美理想。传统说法中的“温润如玉”，很大程度上就来自这类软玉给人的视觉和触觉联想。',
        imageReading:
          '这件清代白玉盖碗器形端正，盖、身、圈足的比例很克制，最适合说明白玉的“柔光”和“温润”。它没有复杂雕刻，反而把材质本身直接呈现出来：如果玉质干、结构粗或抛光弱，素净器型会立刻暴露问题。',
        appraisal: ['看白度是否自然', '看结构是否细腻均匀', '看抛光是否有油润感', '看雕工是否保留材质的柔和气质'],
        presentation: '汇报时可以强调羊脂白玉不是单纯追求惨白，而是把白度、润度和含蓄光泽放在一起判断。',
        examples: [
          {
            name: '白玉羊首流小水盂',
            note: '弧面连续、边缘圆润，适合补充说明小型白玉文房器的柔和光泽。',
            image: img('static/knowledge/white-jade-waterpot.jpg', '白玉羊首流小水盂', 'Waterpot with Ram\'s Head Spout', '18 世纪白玉文房器，羊首流与圆润器身共同强调温润触感。', cma, 'https://www.clevelandart.org/art/1964.238')
          },
          {
            name: '道人纹白玉杯',
            note: '人物与器型结合，适合说明白玉在文房陈设中的清雅气质。',
            image: img('static/knowledge/white-jade-cup-daoist.jpg', '道人纹白玉杯', 'Cup with Daoist Figures', '清乾隆时期青白玉杯，人物题材与器型结合，可观察白玉雕刻的叙事性。', cma, 'https://www.clevelandart.org/art/1952.510')
          }
        ]
      },
      {
        title: '和田青玉',
        tag: '沉静古雅',
        desc: '色泽偏青绿或灰青，气质稳重，适合山水与仿古题材。',
        points: ['青绿色调', '沉稳内敛', '适合山水', '古雅耐看'],
        image: img(
          'static/knowledge/green-jade-landscape-hermits.jpg',
          '青玉山水隐士图',
          'Landscape with hermits and a crane',
          '18 世纪末至 19 世纪初软玉山水陈设件。青绿色调适合表现山石、松树和文人隐逸意境。',
          met,
          'https://www.metmuseum.org/art/collection/search/44218'
        ),
        detail:
          '和田青玉同属软玉体系，颜色比白玉更沉稳，常见青、灰青、青绿等色调。它不以强透明取胜，而重在厚重、古朴和耐看，适合山水、仿古纹样、器皿和陈设类作品。',
        history:
          '青玉在古代礼器和大型陈设玉器中使用很广，常见于玉璧、玉琮、玉山子和器皿。它的沉静色调容易形成庄重、古雅的文化气质。',
        imageReading:
          '这件山水作品利用青绿色玉材的沉静感来承载山石、松树和人物。与白玉相比，青玉更容易形成“古雅”“厚重”的观看感受，所以很适合连接设计页里的远山云水、松石溪流和孤舟听雨。',
        appraisal: ['看颜色是否沉稳均匀', '看玉质是否细腻油润', '看雕刻层次是否清楚', '看题材是否符合青玉的古雅气质'],
        presentation: '可以把青玉和白玉对比：白玉偏清雅，青玉偏沉稳，两者都强调软玉的温润而不是玻璃般通透。',
        examples: [
          {
            name: '道教仙境玉山子',
            note: '层层山石与小景组织在一块玉料中，适合说明青玉陈设件的空间经营。',
            image: img('static/knowledge/green-jade-mountain.jpg', '青玉道教仙境山子', 'Miniature Mountain with Daoist Paradise', '清乾隆时期青玉带褐斑山子，利用玉料体量组织道教仙境空间。', cma, 'https://www.clevelandart.org/art/1941.594')
          },
          {
            name: '道教仙境玉山',
            note: '山形轮廓完整，适合说明玉料体量与山水构图之间的关系。',
            image: img('static/knowledge/green-jade-boulder.jpg', '道教仙境玉山', 'Boulder with Daoist paradise', '18 世纪软玉山子，适合观察山水陈设玉器中原料形态与构图的关系。', met, 'https://www.metmuseum.org/art/collection/search/42059')
          }
        ]
      },
      {
        title: '冰种翡翠',
        tag: '清透水润',
        desc: '强调透明度、光感和干净底子，色彩可清淡也可鲜明。',
        points: ['透明度', '水头', '底子干净', '光感清爽'],
        image: img(
          'static/knowledge/jadeite-lotus-leaf.jpg',
          '翡翠莲叶洗',
          'Brushwasher in Shape of Lotus Leaf',
          '19 世纪半透明翡翠洗。以莲叶为形，适合观察翡翠的水头、颜色过渡和薄厚变化。',
          cma,
          'https://www.clevelandart.org/art/1990.35'
        ),
        detail:
          '翡翠以硬玉矿物为主，鉴赏时常说“种、水、色、工”。冰种翡翠重点在清透和水润，底子越干净、结构越细，越能显出轻盈的光感。它适合现代极简、水滴形、素面戒面和浅雕花叶等设计。',
        history:
          '翡翠在清代以后逐渐进入中国玉石审美中心，和传统软玉相比，它更强调鲜明颜色、透明度和珠宝感。',
        imageReading:
          '这件莲叶洗的绿色并不靠大面积浓艳取胜，而是靠半透明材质、起伏叶脉和边缘厚薄变化形成水润感。它非常适合作为“冰种翡翠为什么适合水滴、莲叶和轻薄造型”的图像证据。',
        appraisal: ['观察透明度与内部颗粒感', '看底子是否干净', '看颜色是否自然鲜活', '看雕工是否利用通透光感'],
        presentation: '汇报中可以用“种水决定底子，颜色决定视觉吸引力，工艺决定完成度”来组织说明。',
        examples: [
          {
            name: '翡翠鼻烟壶',
            note: '绿色更鲜明，适合补充说明翡翠在小型器物中的颜色、透明度和抛光。',
            image: img('static/knowledge/aic-jadeite-snuff-hawk-bear.jpg', '翡翠松下鹰熊纹鼻烟壶', 'Snuff Bottle with a Hawk and a Bear beneath a Pine Tree', '清代 1820-1900 年，翠绿与苹果绿翡翠鼻烟壶，带雕刻纹饰。', aic, 'https://www.artic.edu/artworks/18007')
          },
          {
            name: '浅翠玉佩',
            note: '适合观察小型佩饰中颜色、透明度和轮廓之间的关系。',
            image: img('static/knowledge/jadeite-pendant.jpg', '浅翠玉佩', 'Pendant', '浅祖母绿色翡翠佩饰，适合观察小件翡翠的色调、轮廓和佩戴属性。', met, 'https://www.metmuseum.org/art/collection/search/43916')
          }
        ]
      },
      {
        title: '南红玛瑙',
        tag: '红润明艳',
        desc: '红色调温暖饱满，适合吉祥、守护和节庆题材。',
        points: ['红色饱满', '胶质感', '少裂少杂', '适合俏色'],
        image: img(
          'static/knowledge/red-agate-libation-cup.jpg',
          '玛瑙杯',
          'Libation Cup',
          '清代玛瑙杯，1644-1911 年。天然色带明显，可作为南红玛瑙类材料的纹理和胶质感参照。',
          cma,
          'https://www.clevelandart.org/art/1920.425',
          '开放馆藏中可用的历史玛瑙作品，不等同于现代南红产地标本。'
        ),
        detail:
          '南红玛瑙属于玉髓类材料，以红色调、胶质感和温暖视觉效果受到喜爱。馆藏中较少直接以“南红”标注，因此这里以历史玛瑙作品作为材质参照，重点观察红色、半透明感、天然纹理和俏色可能性。',
        history:
          '红色玉石在中国文化中常与吉祥、热烈、护佑和礼赠联系在一起。南红在近现代文玩和首饰设计中辨识度较高。',
        imageReading:
          '这件玛瑙杯有明显的天然色带和温暖色调，能帮助说明玛瑙类材料的“胶质感”和纹理变化。用于南红设计时，可以进一步把红色转化为钟馗、哪吒、瑞兽等更有力量感的题材。',
        appraisal: ['看红色是否沉稳饱满', '看裂纹和杂质', '看胶质感与润度', '看颜色分区是否适合题材'],
        presentation: '适合和哪吒、钟馗、瑞兽、节庆纹样等题材联系，突出红色的生命力和守护意味。',
        examples: [
          {
            name: '玛瑙带扣',
            note: '适合说明玛瑙在佩饰中的装饰性和色彩识别度。',
            image: img('static/knowledge/aic-agate-snuff-egrets.jpg', '玛瑙双鹭莲塘纹鼻烟壶', 'Snuff Bottle with Two Egrets Among Lotuses', '清代 1800-1900 年，灰、褐、黑色玛瑙雕刻鼻烟壶，适合观察玛瑙纹理如何参与画面。', aic, 'https://www.artic.edu/artworks/17954')
          },
          {
            name: '镶玛瑙与玉带扣',
            note: '适合说明红色玛瑙与玉石、金属结合时的视觉对比。',
            image: img('static/knowledge/agate-buckle-jade.jpg', '镶玛瑙与玉带扣', 'Buckle', '20 世纪黄铜镶玛瑙与玉带扣，可观察红色玛瑙、玉石和金属的材质对比。', cma, 'https://www.clevelandart.org/art/1947.645')
          }
        ]
      }
    ]
  },
  {
    name: '工艺',
    items: [
      {
        title: '圆雕',
        tag: '立体造型',
        desc: '从正面、侧面和背面都能成立的三维雕刻。',
        points: ['体量完整', '重心稳定', '动势自然', '手感圆润'],
        image: img('static/knowledge/round-carving-amulet.jpg', '牛首玉人护身符', 'Amulet in the Form of a Seated Figure with Bovine Head', '新石器时代红山文化相关软玉护身符，约公元前 4700-2920 年。适合观察早期圆雕的正侧面体量。', cma, 'https://www.clevelandart.org/art/1953.628'),
        detail: '圆雕强调完整立体造型，常用于人物、动物、瑞兽、把件和摆件。它不只看正面，还要看侧面、背面、重心和握持感。好的圆雕线面转折自然，细节服务整体。',
        history: '圆雕受原料形状限制明显，工匠需要顺着玉料体量安排姿态，因此能体现“因材施艺”的能力。',
        imageReading: '这件早期玉人护身符体量紧凑，正面轮廓清晰，侧面厚度也能支撑造型。它适合说明圆雕最基本的判断：作品不能只在一个角度好看，而要在多个角度都成立。',
        appraisal: ['看正侧背是否完整', '看重心是否稳定', '看线面转折是否自然', '看细节是否服务整体'],
        presentation: '可以从“体量、动态、重心、细节”四个角度说明圆雕，而不只停留在正面图像。',
        examples: [
          { name: '白玉牧童与水牛', note: '人物、动物和底部关系完整，适合说明圆雕中的情节性。', image: img('static/knowledge/round-carving-buffalo-boy.jpg', '白玉牧童与水牛', 'Boy with water buffalo', '18 世纪软玉圆雕，人物与动物形成完整叙事场景。', met, 'https://www.metmuseum.org/art/collection/search/41918') },
          { name: '玉雕鸳鸯衔卷', note: '色泽和体量变化更丰富，适合观察圆雕如何利用原料自然色差。', image: img('static/knowledge/lacma-mandarin-duck-scrolls.jpg', '玉雕鸳鸯衔卷', 'Mandarin Duck with Scrolls', '中国玉雕动物题材，天然褐黄色变化可用于说明俏色与圆雕结合。', lacma, 'https://collections-images.lacma.org/remote_images/ma-10843-O3.jpg') }
        ]
      },
      {
        title: '浮雕',
        tag: '层次表达',
        desc: '在有限厚度内表现主体、背景和空间层次。',
        points: ['主次清楚', '层次自然', '边缘干净', '留白得当'],
        image: img('static/knowledge/relief-jade-plaque.jpg', '玉牌浮雕', 'Jade Plaque', '战国时期软玉牌，约公元前 475-221 年。适合观察薄片玉料上的高低层次。', cma, 'https://www.clevelandart.org/art/1991.78.1'),
        detail: '浮雕是在相对平面的玉料上做出高低起伏，适合玉牌、玉佩、插屏等形制。浅浮雕偏含蓄，高浮雕更有立体感，但也更考验厚度和结构安全。',
        history: '玉牌和玉佩常用浮雕表现人物、山水、花鸟和纹样。明清以来，诗文、山水和雕刻结合，使浮雕成为表现文人意境的重要方式。',
        imageReading: '这件玉牌在较薄的体量中处理出纹样起伏，说明浮雕的重点不是堆高，而是通过高低层次让主次清楚。设计玉佩时，浮雕很适合承载山水、花鸟和人物故事。',
        appraisal: ['看主次是否清楚', '看层次过渡是否自然', '看边缘是否干净', '看留白是否合理'],
        presentation: '适合说明“薄料如何表现空间”，也能连接设计页中的玉佩、吊坠和山水题材。',
        examples: [
          { name: '螭虎纹玉佩', note: '局部高起和低伏关系清楚，适合说明佩饰中浮雕与圆雕之间的过渡。', image: img('static/knowledge/lacma-chimera-pendant.webp', '螭虎纹玉佩', 'Chimera Pendant', '中国玉佩饰，动物纹样与圆形孔位结合，适合观察高低层次和佩戴结构。', lacma, 'https://collections.lacma.org/object/69787') },
          { name: '玉牌', note: '画面简洁，适合作为比较不同浮雕层次的材料。', image: img('static/knowledge/relief-met-plaque.jpg', '玉牌', 'Plaque', '软玉牌，画面留白较多，可用于比较浅浮雕和素面处理。', met, 'https://www.metmuseum.org/art/collection/search/75244') }
        ]
      },
      {
        title: '镂雕',
        tag: '通透工艺',
        desc: '通过透空形成轻盈感，同时考验结构强度。',
        points: ['透空干净', '结构稳定', '线条连贯', '薄处防裂'],
        image: img('static/knowledge/openwork-dragons-birds.jpg', '镂空龙鸟玉牌', 'Plaque with Openwork Interlaced Dragons and Birds', '战国时期软玉镂空牌，约公元前 475-221 年。龙鸟纹互相穿插，结构连接点清楚。', cma, 'https://www.clevelandart.org/art/1952.584'),
        detail: '镂雕会将玉料局部透空，让纹样或造型形成通透效果。它看起来精巧，但透空越多，结构越容易变脆，因此需要在轻盈和牢固之间取得平衡。',
        history: '镂雕在古代玉饰和装饰器物中较常见，常与龙凤、花卉、云纹、如意纹等题材结合。',
        imageReading: '这件玉牌的透空处与龙鸟纹样互相咬合，适合说明镂雕的难点：既要让纹样通透，又不能让连接处变得脆弱。观察时可以顺着线条找“连接点”。',
        appraisal: ['看透空处是否干净', '看薄处是否安全', '看线条是否断裂', '看整体是否过碎'],
        presentation: '答辩时可强调镂雕不仅是装饰技巧，也是结构控制能力。',
        examples: [
          { name: '成对镂空玉牌', note: '适合比较成组作品中的对称、节奏和结构稳定。', image: img('static/knowledge/openwork-jade-plaque-pair.jpg', '成对镂空玉牌', 'Pair of Jade Plaques', '战国时期成对软玉牌，适合比较重复纹样、对称关系和透空结构。', cma, 'https://www.clevelandart.org/art/1991.78') },
          { name: '龙形玉佩饰', note: '通透部位和卷曲龙身形成轻盈结构，适合补充说明佩饰中的镂空感。', image: img('static/knowledge/lacma-dragon-pendant-peishi.jpg', '龙形玉佩饰', 'Dragon Pendant (Peishi)', '中国龙形玉佩，龙身卷曲并形成开口空间，适合观察佩饰中的线条连贯性。', lacma, 'https://collections-images.lacma.org/remote_images/ma-40988-O3.jpg') }
        ]
      },
      {
        title: '俏色巧雕',
        tag: '因材施艺',
        desc: '利用天然颜色、皮色和纹理转化为画面内容。',
        points: ['顺应原料', '色形结合', '避裂取势', '主题自然'],
        image: img('static/knowledge/clever-color-cup-stand.jpg', '带黑色纹理白玉杯座', 'Oval Cup Stand with Animal Masks', '清乾隆时期白玉杯座，带天然黑色纹理和阴刻装饰，适合说明色带如何服务器物气质。', cma, 'https://www.clevelandart.org/art/1989.327'),
        detail: '俏色巧雕不是把颜色差异当作缺陷处理，而是把天然色带、皮色、沁色或杂色转化为题材的一部分。好的俏色作品会让人觉得图案像是从材料中自然生长出来的。',
        history: '俏色巧雕与籽料、带皮料、多色玉料关系密切，体现了传统玉雕中“相料、审料、顺料”的设计思维。',
        imageReading: '这件杯座保留并利用了玉料中的黑色纹理。它适合说明“俏色”并不一定是鲜艳对比，也可以是把天然斑纹组织进器物气质中，让材料的个性成为设计的一部分。',
        appraisal: ['看颜色是否用得自然', '看是否巧妙避裂', '看主题是否由材料生发', '看是否过度雕刻'],
        presentation: '这是最能体现“因材施艺”的工艺，适合放在期末作业里作为传统工艺与 AI 设计之间的连接点。',
        examples: [
          { name: '白玉桃蝠', note: '天然色泽与吉祥题材结合，适合说明材质特征如何转化为寓意。', image: img('static/knowledge/clever-color-peaches-bats.jpg', '白玉桃蝠', 'Peaches and Bats', '17 世纪末至 18 世纪青白玉雕件，以桃和蝙蝠表达长寿、福气寓意。', cma, 'https://www.clevelandart.org/art/2006.141') },
          { name: '莲纹盖盒', note: '适合观察天然色差、器型和莲花纹样如何互相协调。', image: img('static/knowledge/clever-color-lotus-box.jpg', '莲纹盖盒', 'Covered box with lotus spray', '18 世纪末至 19 世纪初软玉盖盒，莲花纹样与盒形、玉色共同形成装饰效果。', met, 'https://www.metmuseum.org/art/collection/search/43303') }
        ]
      },
      {
        title: '素面抛光',
        tag: '极简工艺',
        desc: '以比例、弧面、孔位和光泽取胜。',
        points: ['比例准确', '孔位端正', '光泽均匀', '手感舒适'],
        image: img('static/knowledge/lacma-perforated-disk-bi.webp', '玉璧形圆盘', 'Perforated Disk (Bi)', '中国玉璧形圆盘，中孔与外缘比例清楚，适合说明素面抛光、孔位端正和圆形礼器传统。', lacma, 'https://collections.lacma.org/object/69621'),
        detail: '素面或近素面的玉器不依赖复杂雕刻，而是通过器型比例、弧面过渡、表面光泽和触感体现美感。平安扣、手镯、戒面、无事牌都很适合用这个角度观察。',
        history: '素面玉器与“良材不雕”的审美有关。好材料有时不需要复杂纹样，反而通过简洁形制表现纯净、庄重和佩戴属性。',
        imageReading: '这件璧形圆盘外圆、内孔和边缘比例非常清楚，适合拿来解释现代平安扣的形制来源。放大观看时，可以重点看孔位是否端正、外缘是否圆整，以及玉面抛光是否让器物显得干净安定。',
        appraisal: ['看圆度和对称性', '看表面是否平顺', '看抛光是否均匀', '看边缘是否舒适'],
        presentation: '可以用“越简单越看基本功”来说明素面作品的难点，并连接设计页里的平安扣、水滴形和方圆结合。',
        examples: [
          { name: '龙纹小玉璧', note: '龙形纹样与圆形中孔结合，适合说明璧形器也可以加入装饰叙事。', image: img('static/knowledge/lacma-small-bi-dragon.jpg', '龙纹小玉璧', 'Small Bi with Dragon', '中国小型玉璧，龙纹绕孔展开，可观察圆形结构和动物纹样的结合。', lacma, 'https://collections-images.lacma.org/remote_images/ma-40989-O3.jpg') },
          { name: '乾隆御题玉璧', note: '适合说明古玉再加工、刻字和文房赏玩的结合。', image: img('static/knowledge/bi-disc-imperial-poem.jpg', '乾隆御题玉璧', 'Disc (bi) with Imperial Poem', '清乾隆时期白玉带褐斑，旧玉重琢并刻御题诗，体现宫廷赏古趣味。', cma, 'https://www.clevelandart.org/art/1972.254') }
        ]
      }
    ]
  },
  {
    name: '题材寓意',
    items: [
      {
        title: '莲花',
        tag: '清雅洁净',
        desc: '常用来表达清净、向上和出淤泥而不染。',
        points: ['清净', '高洁', '花叶层次', '适合白玉翡翠'],
        image: img('static/knowledge/lotus-dish-cup.jpg', '莲花形玉盘杯', 'Lotus-shaped Dish and Cup', '清乾隆时期玉盘与杯，整体以莲花为造型来源，适合说明题材如何影响器物轮廓。', cma, 'https://www.clevelandart.org/art/1972.255'),
        detail: '莲花题材很适合转化为吊坠、玉佩和浅浮雕。花瓣可以表现层次，莲叶可以结合水滴形轮廓，白玉显清雅，翡翠显清透，南红则可转为更装饰化的花叶构图。',
        history: '莲花在中国艺术中常与清净、高洁、佛教意象和文人审美相连，是传统玉雕中容易被识别的吉祥题材。',
        imageReading: '这件莲花形盘杯直接把器型做成花叶结构，说明题材并不只是表面纹样，也可以影响器物轮廓。设计页中的莲花吊坠可以借鉴这种“形制即题材”的处理。',
        appraisal: ['看花瓣层次是否清楚', '看叶脉线条是否自然', '看材质是否适合清雅气质', '看构图是否避免过满'],
        presentation: '可连接设计页的“花鸟鱼虫-莲花”，说明传统题材如何被 AI 图像重新组织为现代佩饰。',
        examples: [
          { name: '莲花形玉杯', note: '适合观察莲花轮廓如何转化为器型。', image: img('static/knowledge/lotus-cup-met.jpg', '莲花形玉杯', 'Lotus-Shaped Cup', '18 世纪软玉杯，杯口和器身轮廓借鉴莲花形态。', met, 'https://www.metmuseum.org/art/collection/search/42131') },
          { name: '莲花瓣式玉碗', note: '花瓣形分瓣更清楚，适合说明花叶结构和器物口沿之间的关系。', image: img('static/knowledge/aic-jade-lotus-petal-bowl.jpg', '莲花瓣式玉碗', 'Lobed Lotus-Petal Bowl with Foliate Handles', '18 世纪莫卧儿王朝玉碗，莲瓣形器壁和叶形柄展示跨文化玉器造型。', aic, 'https://www.artic.edu/artworks/47958') }
        ]
      },
      {
        title: '鱼纹',
        tag: '富足有余',
        desc: '鱼与“余”谐音，常用于吉祥和丰足表达。',
        points: ['年年有余', '灵动曲线', '水纹搭配', '适合佩饰'],
        image: img('static/knowledge/fish-arc-pendant.jpg', '弧形玉鱼佩', 'Arc-Shaped Jade Fish Pendant', '西周早期软玉鱼形佩，约公元前 1050-900 年。弧形身体和孔位体现早期佩饰功能。', cma, 'https://www.clevelandart.org/art/1952.577'),
        detail: '鱼纹在玉佩和吊坠中很常见，身体曲线、鱼尾和水纹能形成流动感。课程设计中可以把“锦鲤”理解为更鲜明、更现代的鱼纹表达，强调好运、丰足和生命力。',
        history: '鱼题材在古代玉器中出现很早，既有装饰性，也容易和丰收、繁衍、吉庆等寓意相连。',
        imageReading: '这件玉鱼佩造型极简，却通过弧形身体和尾部处理保留了鱼的识别度。它说明小型玉佩不需要堆砌细节，抓住轮廓和动态就能成立。',
        appraisal: ['看鱼身曲线是否流畅', '看尾部和水纹是否呼应', '看孔位是否影响佩戴', '看寓意表达是否自然'],
        presentation: '可连接“花鸟鱼虫-锦鲤”，说明同一传统寓意可以在古玉鱼佩和现代锦鲤设计之间转换。',
        examples: [
          { name: '盘龙鱼纹玉佩', note: '适合说明鱼与龙纹组合时的动势和吉祥寓意。', image: img('static/knowledge/fish-dragon-pendant.jpg', '盘龙鱼纹玉佩', 'Pendant with Coiled Dragon and Fish', '约公元前 1000-900 年玉佩，鱼形与盘龙纹组合，适合观察复合吉祥题材。', cma, 'https://www.clevelandart.org/art/1952.582') },
          { name: '玉鱼缸', note: '适合从器物功能角度理解鱼、水与富足意象。', image: img('static/knowledge/fish-bowl-jade.jpg', '玉鱼缸', 'Fish Bowl', '宋代玉器，960-1279 年，以器物功能连接鱼、水和富足意象。', cma, 'https://www.clevelandart.org/art/1917.54') }
        ]
      },
      {
        title: '龙纹瑞兽',
        tag: '力量护佑',
        desc: '以龙、螭虎、兽面等形象表达权威、守护和祥瑞。',
        points: ['护佑', '祥瑞', '动势强烈', '适合佩饰'],
        image: img('static/knowledge/lacma-dragon-pendant-peishi.jpg', '龙形玉佩饰', 'Dragon Pendant (Peishi)', '中国龙形玉佩，龙身卷曲并形成开口空间，适合观察佩饰中的动势、线条连贯和护佑寓意。', lacma, 'https://collections-images.lacma.org/remote_images/ma-40988-O3.jpg'),
        detail: '龙纹瑞兽是玉器中非常稳定的守护类题材。它不依赖具体人物故事，而是通过龙身卷曲、兽面张力、爪角变化和穿孔结构来表现力量感。相比钟馗，龙纹和瑞兽的开放馆藏玉器图源更充分，也更适合在课程作业中直接观察真实玉器的雕工。',
        history: '龙、螭、虎、兽面等形象很早就进入玉器系统，常见于佩饰、带钩、玉璧、玉牌和礼仪器物。它们既有装饰功能，也承担身份、护佑、祥瑞和权威象征。',
        imageReading: '这件龙形玉佩饰的优势在于轮廓清楚、通透部位明显，能直接说明玉佩如何把“神话力量”转化为可佩戴的曲线结构。设计页中的钟馗、哪吒等守护题材，也可以借鉴这种强动势和护佑气质。',
        appraisal: ['看龙身线条是否连贯', '看穿孔和薄处是否安全', '看兽面或爪角是否有力量感', '看题材是否与材质颜色协调'],
        presentation: '可作为“神话故事”和“守护寓意”的通用说明条目，连接钟馗、哪吒、瑞兽、龙纹等设计方向，同时保持真实玉器图源可靠。',
        examples: [
          { name: '螭虎纹玉佩', note: '局部高起和低伏关系清楚，适合说明瑞兽题材中的力量感和佩饰结构。', image: img('static/knowledge/lacma-chimera-pendant.webp', '螭虎纹玉佩', 'Chimera Pendant', '中国玉佩饰，动物纹样与圆形孔位结合，适合观察高低层次和佩戴结构。', lacma, 'https://collections.lacma.org/object/69787') },
          { name: '镂空龙鸟玉牌', note: '龙鸟纹样互相穿插，适合观察神兽题材如何通过镂雕形成通透感。', image: img('static/knowledge/openwork-dragons-birds.jpg', '镂空龙鸟玉牌', 'Plaque with Openwork Interlaced Dragons and Birds', '战国时期软玉镂空牌，约公元前 475-221 年。龙鸟纹互相穿插，结构连接点清楚。', cma, 'https://www.clevelandart.org/art/1952.584') }
        ]
      },
      {
        title: '观音',
        tag: '慈悲平安',
        desc: '常用于表达护佑、安宁和端庄气质。',
        points: ['慈悲', '平安', '面相端庄', '比例克制'],
        image: img('static/knowledge/met-jadeite-guanyin.jpg', '翡翠观音菩萨像', 'Bodhisattva Guanyin', '19 世纪翡翠观音立像。材质为 Jadeite，可直接用于说明人物题材对净度、比例和雕工的要求。', met, 'https://www.metmuseum.org/art/collection/search/65687'),
        detail: '开放馆藏中的观音玉牌图源有限，这里使用真实馆藏造像作为题材参考。转化为玉器时，应关注面相、姿态、衣纹和整体端庄感。白玉适合表现温和，翡翠适合表现清透，南红则可强调护佑。',
        history: '观音题材在东亚艺术中流传广泛，常被赋予慈悲、护佑和平安的意义。现代玉牌和吊坠中也经常使用这一题材。',
        imageReading: '这尊翡翠观音立像解决了“题材参考不是玉器”的问题。它的面相、衣纹和站姿都很端正，适合观察人物题材如何借材质的清透感表达慈悲和平安。转成玉牌或吊坠时，应保留面相、手势和衣纹节奏，避免把背景装饰做得过满。',
        appraisal: ['看面相是否端庄', '看比例是否协调', '看衣纹是否简洁自然', '看材质是否支持宁静气质'],
        presentation: '可连接“神话故事-观音”，说明人物题材对净度、比例和雕工的要求更高。',
        examples: [
          { name: '翡翠观音侧面', note: '同一件作品的侧面角度，适合说明人物圆雕的厚度、衣纹和重心。', image: img('static/knowledge/met-jadeite-guanyin-side.jpg', '翡翠观音菩萨像侧面', 'Bodhisattva Guanyin, side view', '19 世纪翡翠观音立像侧面图，可观察人物圆雕厚度和衣纹转折。', met, 'https://www.metmuseum.org/art/collection/search/65687') },
          { name: '早期观音造像', note: '适合比较不同材质中观音姿态与衣纹处理。', image: img('static/knowledge/guanyin-sandstone-met.jpg', '观音菩萨造像', 'Bodhisattva, probably Avalokiteshvara (Guanyin)', '约 550-560 年砂岩带彩绘造像，作为观音题材的历史参照。', met, 'https://www.metmuseum.org/art/collection/search/42718', '题材参考图，非玉器。') }
        ]
      },
      {
        title: '山水',
        tag: '文人意境',
        desc: '用远山、云水、松石和舟桥表现空间与心境。',
        points: ['远近层次', '留白', '云水纹', '文人气息'],
        image: img('static/knowledge/landscape-hermits-crane.jpg', '青玉山水隐士图', 'Landscape with hermits and a crane', '18 世纪末至 19 世纪初软玉山水陈设件，以山石、隐士和仙鹤组织文人意境。', met, 'https://www.metmuseum.org/art/collection/search/44218'),
        detail: '山水题材适合在玉牌、玉佩和山子中表现。远山、云水、松石、孤舟可以形成空间层次，也能表达文人化的闲适与超脱。青玉尤其适合沉稳的山水意境。',
        history: '玉雕山水吸收了中国绘画中的构图方式，把有限玉料转化为可游可居的空间。清代陈设玉器中，山水和仙境题材尤其常见。',
        imageReading: '这件作品把山石、人物和仙鹤压缩在一块玉料中，像一幅可触摸的山水画。它适合解释“山水意境”不是简单画山，而是通过远近、留白和人物尺度营造可游空间。',
        appraisal: ['看远近层次是否清楚', '看留白是否有效', '看云水纹是否自然', '看材质颜色是否配合意境'],
        presentation: '可连接“山水意境-远山云水、松石溪流、孤舟听雨”，说明 AI 设计中的场景题材来自传统山水观看方式。',
        examples: [
          { name: '林木山景玉山', note: '适合说明大型玉山子如何通过高低起伏组织空间。', image: img('static/knowledge/landscape-wooded-mountain.jpg', '林木山景玉山', 'Mountain with wooded landscape', '18-19 世纪软玉山子，林木和山石层次适合说明立体山水空间。', met, 'https://www.metmuseum.org/art/collection/search/44210') },
          { name: '道教仙境玉山子', note: '适合连接山水、仙境和陈设功能。', image: img('static/knowledge/landscape-daoist-paradise.jpg', '道教仙境玉山子', 'Miniature Mountain with Daoist Paradise', '清乾隆时期青玉带褐斑山子，适合说明山水、仙境和陈设功能。', cma, 'https://www.clevelandart.org/art/1941.594') }
        ]
      },
      {
        title: '平安扣',
        tag: '圆满安定',
        desc: '以外圆内圆表达平衡、圆满和平安。',
        points: ['外圆内圆', '比例端正', '素面抛光', '佩戴寓意'],
        image: img('static/knowledge/lacma-perforated-disk-bi.webp', '玉璧形圆盘', 'Perforated Disk (Bi)', '中国玉璧形圆盘，中孔与外缘比例清楚，可作为现代平安扣“外圆内圆”的形制来源参照。', lacma, 'https://collections.lacma.org/object/69621'),
        detail: '平安扣的现代形制可与古代璧形玉器联系起来理解：外圆内孔、形制简洁，重点在比例、圆度、厚薄和抛光。它非常适合做素面或轻微纹样设计。',
        history: '玉璧是中国古代重要礼器之一，现代平安扣继承了圆形和中孔的视觉结构，并转化为日常佩戴中的平安寓意。',
        imageReading: '玉璧不是现代平安扣，但二者共享“外圆内孔”的视觉结构。这张图的中孔和外缘都足够清楚，适合直接说明传统礼器形制如何转化成现代佩戴符号。',
        appraisal: ['看外圆和内孔是否端正', '看厚薄比例是否舒适', '看表面抛光是否均匀', '看材质瑕疵是否明显'],
        presentation: '可连接“现代极简-平安扣”，说明传统礼器形制如何转化为现代首饰符号。',
        examples: [
          { name: '龙纹小玉璧', note: '早期圆形结构与龙纹装饰结合，适合说明平安扣之外的璧形变化。', image: img('static/knowledge/lacma-small-bi-dragon.jpg', '龙纹小玉璧', 'Small Bi with Dragon', '中国小型玉璧，龙纹与中孔结合，说明圆形符号也能承载装饰叙事。', lacma, 'https://collections-images.lacma.org/remote_images/ma-40989-O3.jpg') },
          { name: '乾隆御题玉璧', note: '适合说明古玉、刻字和清代赏玩之间的关系。', image: img('static/knowledge/bi-disc-imperial-poem.jpg', '乾隆御题玉璧', 'Disc (bi) with Imperial Poem', '清乾隆时期白玉带褐斑，旧玉重琢并刻御题诗，体现宫廷赏古趣味。', cma, 'https://www.clevelandart.org/art/1972.254') }
        ]
      }
    ]
  }
];

