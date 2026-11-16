/**
 * NOTES — short dated entries pulled from my diary and notes.
 *
 * These are the rawest thing on the site: one to four sentences, a date, and
 * usually no conclusion. They are Chinese only (that is how I write in my own
 * notebook), edited for privacy but not for polish.
 *
 * Public-safe by construction: no customer or colleague names, no money
 * figures, no private plans. Keep it that way when adding entries.
 */
export interface Note {
  /** YYYY-MM-DD */
  date: string;
  text: string;
  tags?: string[];
  source?: '日记' | '笔记' | '随笔';
}

/** Newest entry date — shown as 最后更新 on /notes. */
export const notesUpdated = '2026-11-16';

/** Newest first. */
export const notes: Note[] = [
  {
    date: '2026-11-16',
    text: '上午 42 通电话，接通 9 个，加了 2 个微信，约到 1 个上门。电话是筛子，不是锤子。',
    tags: ['销售', '电话'],
    source: '随笔',
  },
  {
    date: '2026-11-06',
    text: '先专注眼下目标。专注，专注，再专注。',
    tags: ['注意力'],
    source: '日记',
  },
  {
    date: '2026-11-05',
    text: '别用“尽力”安慰自己。要完成，要拿到结果。',
    tags: ['执行'],
    source: '日记',
  },
  {
    date: '2026-11-02',
    text: '销售和交易很像：都是把不确定的结果做成确定的业绩。',
    tags: ['销售'],
    source: '日记',
  },
  {
    date: '2026-10-27',
    text: '绝望处另有新生。只要做的事有沉淀，结果会慢慢出来。',
    tags: ['长期主义'],
    source: '日记',
  },
  {
    date: '2026-10-26',
    text: '以为遇到的是新困难，回头看过去那些坎都不算什么。成长大概就是这样。',
    tags: ['成长'],
    source: '日记',
  },
  {
    date: '2026-10-25',
    text: '第一版 Toy Model 的数据格式不统一，迁移到 SQLite 很痛苦。走一步看十步，不是把路全规划好，是把眼前的事做规范。短期效率更低，长期回报更大。',
    tags: ['工程', '重构'],
    source: '随笔',
  },
  {
    date: '2026-10-23',
    text: '勤劳不是致富的必要条件，持有资产才是。花力气之前先想清楚它在积累什么。',
    tags: ['工作'],
    source: '日记',
  },
  {
    date: '2026-10-22',
    text: '不要为了证明什么而生活。为了自己、家人和朋友，成为那个需要成为的人。',
    tags: ['心态'],
    source: '日记',
  },
  {
    date: '2026-10-21',
    text: '晚上收拾工具链，翻了几页旧日记。那些早起、赶路的记录安安静静躺在那里，比任何宏大计划都更能说明我是怎么走到今天的。',
    tags: ['日记'],
    source: '日记',
  },
  {
    date: '2026-10-20',
    text: '在不确定里抓确定：靠习惯、统计的视角和一点长期信仰。',
    tags: ['长期主义'],
    source: '日记',
  },
  {
    date: '2026-10-19',
    text: '别被生活琐事磨平少年心气。保持好奇，保持尝试。',
    tags: ['心态'],
    source: '日记',
  },
  {
    date: '2026-10-18',
    text: '销售要让客户相信：用了你的东西之后，他的生活和工作会变成什么样。',
    tags: ['销售'],
    source: '日记',
  },
  {
    date: '2026-10-17',
    text: '有些选择不是最优解，是生活把你推到那里，你刚好准备了。',
    tags: ['生活'],
    source: '日记',
  },
  {
    date: '2026-10-07',
    text: '不要陷在纠结里。选择比努力重要；做出选择之后，努力比什么都重要。',
    tags: ['选择'],
    source: '日记',
  },
  {
    date: '2026-09-29',
    text: '平庸可能不是因为不会选择，而是因为不会放弃。沉没成本不参与重大决策。',
    tags: ['选择'],
    source: '日记',
  },
  {
    date: '2026-09-28',
    text: '今天很焦虑。发现这份工作正在磨掉我对生活的积极态度，也在磨掉主动性。得先把方向想清楚。',
    tags: ['工作', '焦虑'],
    source: '日记',
  },
  {
    date: '2026-09-01',
    text: '重要的不是积累，而是选一个方向持续积累，并找到遗忘率最低的方法。',
    tags: ['学习'],
    source: '日记',
  },
  {
    date: '2026-08-31',
    text: '一个好方法应该能被落地、能被证伪。说不清、证伪不了的道理，指导不了生活。',
    tags: ['方法'],
    source: '日记',
  },
  {
    date: '2026-08-24',
    text: '刷推和短视频没有意义。碎片信息不提供答案，要建立自己的信息流，多看一手资料。',
    tags: ['注意力', '信息'],
    source: '日记',
  },
  {
    date: '2026-08-21',
    text: '努力做好眼下每一件小事，同时留着长远的眼光。',
    tags: ['长期主义'],
    source: '日记',
  },
  {
    date: '2026-08-20',
    text: '最好的人生是找到一件事做一辈子。别人好生活带来的落差，未必是我想要的终点。',
    tags: ['生活'],
    source: '日记',
  },
  {
    date: '2026-08-19',
    text: '以前总把事想得太简单，觉得做产品、卖产品、赚钱都容易。进社会才发现不是。看别人游刃有余，学不来，还是得找适合自己的方法。',
    tags: ['工作', '心态'],
    source: '日记',
  },
  {
    date: '2026-07-05',
    text: '把手上 7 件事写在纸上，按“长期有益 + 自己选的”筛，剩下 3 件半。晚上做了张时间预算表，先按它跑一周。',
    tags: ['注意力', '方法'],
    source: '笔记',
  },
  {
    date: '2026-07-03',
    text: '在唐山到石家庄的火车上读《高效能人士的七个习惯》，把“重要”重新定义了一遍：长期有益，并且是我自己选的。',
    tags: ['阅读', '方法'],
    source: '笔记',
  },
  {
    date: '2026-01-11',
    text: '给网球训练定了三个调整层级：身体状态、动作结构、线路战术。先从录像开始。',
    tags: ['网球', '训练'],
    source: '笔记',
  },
  {
    date: '2025-05-29',
    text: '认真想了想为什么写日记：我记不住一周前发生了什么，而我想从自己的经验里拿点东西。',
    tags: ['日记'],
    source: '笔记',
  },
];

/** Newest-first slice for the home page / strips. */
export function latestNotes(n = 3): Note[] {
  return [...notes].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);
}
