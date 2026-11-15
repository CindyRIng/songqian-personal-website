# 四个视觉方向 / Four Visual Directions

宋谦个人网站首页的四个独立方向。四版都使用真实内容（宋谦 / Song Qian、孚盟软件客户经理 · AI 工作流构建者、5 篇文章、6 个项目、2022→2026 时间线），并且都是 **1440px 桌面全页截图**。所有字体只用系统字体栈（Georgia / Noto Serif、Inter / Helvetica、等宽），配图为纯 CSS + 内联 SVG 生成的抽象图形占位，没有任何外部图片、字体或网络请求。

- 截图：`docs/design-directions/{a,b,c,d}.jpg` — 1440px 宽、全页、JPEG q82，单张 < 400 KB
- 源码：`/tmp/design-directions/{a,b,c,d}.html`
- 预览：`python3 -m http.server 4400 -d /tmp/design-directions`，浏览 `http://127.0.0.1:4400/a.html`（b / c / d 同理）

---

## A. Paper & Ink, refined — 纸与墨 · 精修

**Adjectives:** 克制 · 温润 · 有呼吸感（restrained, warm, airy）

在现有奶油纸 / 墨色 / 鼠尾草绿的语言上放大一号：72px 的衬线 H1、极宽的留白、一条全幅的“复利”艺术图版（刻线圆环 + 暖色光轮）、以及更利落的细分隔线。适合想要“安静的信任感”、以长文和审美品味建立个人品牌的人——不喊口号，让版面和文字自己说话。它释放的信号是：**耐心、手艺、审美自信**，也是四个方向里与现在这个 Paul Stamatiou 式站点血缘最近的一版。

## B. Dark cinema — 暗色影院

**Adjectives:** 神秘 · 高级 · 有技术张力（cinematic, premium, technical）

深常青绿近黑的画布上，暖白衬线大字 + 黄铜色细节，首屏是一块发光的“正在放映 / Now Playing”名牌；下方是全幅暗色光晕图版、可横向滑动的项目胶片轨，以及像片单一样的文章列表。适合身份更偏“建造者 / AI 实施者”、希望第一眼就显出专业与作品密度的人。它释放的信号是：**夜晚还在造东西、作品比头衔更有说服力、克制的神秘感**。

## C. Swiss grid / data — 瑞士网格 · 数据

**Adjectives:** 理性 · 可信 · 工程感（rigorous, credible, engineering-first）

亮白画布、Inter/Helvetica 一类的无衬线、严格 12 栏网格；首页就是一份“可扫读的简历”：姓名 + 角色 + 可约聊状态，接着是数字条（05 长文 / 06 工具 / 43 能力 / 93 测试）、带年份与状态的 Selected Work 表格、编号文章索引、时间线表格。适合给招聘者、合作方、工程文化受众看的人。它释放的信号是：**系统思维、清晰、可被信任的专业度**——类似 Stripe/Vercel 的编辑感，但更个人。

## D. Expressive magazine — 表达型杂志

**Adjectives:** 大胆 · 有性格 · 编辑感（bold, opinionated, editorial）

暖米色纸面，混合衬线大标题与厚重无衬线字，非对称双栏；首屏是一篇“本期主打”长文——104px 巨型标题 + 一幅由色块、半调网点与“复”字构成的杂志拼贴。后面跟着大号引文、编号写作索引、海报式项目卡和时间线。适合本身是写作者、想被记住、愿意让网站有明确观点的人。它释放的信号是：**有话说、有审美主张、值得被引用**。

---

**一句话对比：** A 是现在这个站点的“成熟版”；B 把气质推到夜晚、作品与技术；C 把可信度做成数据与网格；D 把个人表达推到封面级。四版都没有改动 `src/**`，因此可以从中挑一版单独重做成正式主题。

---

## A+ 定稿版（客户已选 A 的落地稿）

**文件：** `docs/design-directions/a-plus.jpg`（1440 × 4426 全页，JPEG q82，333 KB）· 源文件 `/tmp/design-directions/a-plus.html` · 预览 `http://127.0.0.1:4400/a-plus.html`

按 spec §2 / §3 / §5 收敛：顶部杂志 masthead 取代原来的左侧悬浮图标；信息优先 hero（巨型姓名 + 角色 + 真实口吻自我介绍 + 右侧速览栏 + 三个 CTA）；mono 统计条；全幅刻线光轮图版；工作区改成「2 张 CLI 终端截图大卡 + 4 个紧凑工具行」；编号写作索引；时间线；人话联系 CTA 与页脚。文案直接来自 spec §5 的真实句子（“白天卖软件，晚上造工具。”“电话打了 2700 通，成交 3 单”“大部分企业不缺模型，缺的是把模型接进业务流程的人。”），没有使用营销腔。字体用系统字体栈近似 Source Serif 4 / Inter / JetBrains Mono，无外部请求。

### A+ 与 A 的差异

| 维度 | A（方向稿） | A+（定稿稿） |
|---|---|---|
| 导航 | 安静、轻量的顶部条，接近 Paul 式 | 顶部杂志式 masthead：宋谦 / Song Qian ｜ Works · Writing · Timeline · About ｜ 中/EN ｜ 主题切换 ｜「可聊 AI 实施 · 销售工具 · 合作」状态点 |
| Hero | 大名字 + 两段长 bio + 小 now 栏 | 巨型姓名（H1 clamp 52–72px）+ 角色行 + 一段真实语气自我介绍 + 三个 CTA（看作品 / 读文章 / 写信）+ 右侧速览栏（现居 / 现在 / 在做 / 在读 / 网球） |
| 信息密度 | 宽松、抒情 | 首屏加入 mono 统计条：5 篇文章 · 6 个工具 · 43 项能力 · 93 项测试通过 |
| 项目 | 2 张字母牌大卡 + 文字链接 | 2 张 CLI 终端截图大卡（暖墨 / 深常青双色调），每张带真实指标；下方 4 个紧凑工具行（BOSS / 智联 / 探迹 / 捡球机器人） |
| 视觉记忆点 | 暖色光轮图版 | 刻线光轮（SVG 双环 + 96 条刻线 + 暖色圆盘）+ 纸纹 + 四角定位十字 + 中英 manifesto + 坐标 / 日期 mono 细节 |
| 排版 | 31px section 标题、窄测量 | H1 clamp(52–72px)；正文 17–18px / 1.72；测量 624px；section label 12px 无衬线大写；数字全部 mono tabular；编号索引贯穿 |
| 写作 | featured + 简单列表 | 01 大 featured（34px）+ 02–05 每行「标题 + 英文 + 一句话 + 分类 / 日期」+ 箭头 |
| 页脚 | 小社交链接 | 人话 CTA「有事写信。」+ 邮箱 / GitHub / RSS + 可聊状态点；底部再留一条带邮箱的 CTA 条 |
| 主题 | 仅浅色 | 保留双主题：浅色纸墨为截图基准，暗色使用深常青 canvas + 暖白 ink + 提亮 sage；masthead 有切换器 |

### 动效标注（截图是最终状态；以下为实施参数）

| 元素 | 触发 | 动效 |
|---|---|---|
| 页面内容区 | 路由切换 / 首屏加载 | 4–6px 上浮 + opacity 0→1；320–400ms；`cubic-bezier(.22,.61,.36,1)`；不阻塞首屏文本（无 JS 也能读到内容） |
| Masthead 导航 | hover / active | 1px 下划线 scaleX 0→1（从左往右），220ms；中/EN 切换时 active 指示器平移 |
| Hero 编排 | 首屏加载 | kicker → H1 → 角色行 → 简介 → CTA → 速览栏，依次 8px 上浮 + 淡入，间隔 60–80ms |
| 全幅艺术图版 | 滚动进入 / 滚动 | 光轮轻微视差（translateY -3%→3%）、遮罩 20%→100% 揭示；纸纹保持静止避免闪烁；不触发重排 |
| 统计条 | 进入视口 | 数字 count-up 到 5 / 6 / 43 / 93，约 700ms；tabular-nums 防跳宽；reduced-motion 直接显示最终值 |
| 项目大卡 | hover | 封面 scale 1.02–1.03，终端窗口 translateY(-4px)；边框 / 箭头转 sage；180–240ms |
| 项目紧凑行 | hover | 箭头 translateX(4px)，标题转 sage-deep，背景出现淡 sage 底；120ms |
| 写作行 / featured | hover | 箭头滑入 4px + 下划线绘制，160ms；标题保持 ink→sage-deep |
| 按钮 / 文本链接 | hover | 实心按钮 ink→sage-deep（180–240ms）；文本按钮下划线 scaleX 0→1；所有链接统一同一条 easing |
| 状态点 | 常驻（可选） | 3s 呼吸光环（opacity / scale 1→1.15），只在 `prefers-reduced-motion: no-preference` 下播放 |
| reduced-motion | 系统设置 | 关闭所有 transform / 视差 / count-up / 呼吸；仅保留 ≤120ms 的 opacity 变化；不产生 CLS |

**实施备注：** 双主题 token 保留（浅色 `#F7F2ED / #33302B / #52692F`，暗色深常青 + 暖白 + 提亮 sage）；终端窗口先用 CSS 占位，拿到真实截图后做单色 / 双色调处理替换，保持同样的窗口比例防 CLS；所有 CTA 与链接预留至少 44px 触达高度。
