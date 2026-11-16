/**
 * ABOUT — content for the letter-like About page.
 *
 * Written in the first person, from real records:
 * - `timeline.ts` (dates, employers, thesis, club)
 * - `.work/kb/v4/principles/` (CP1–CP6, v1.0 dated 2025-10-09)
 * - thesis/project logs (AgentOS cancelled 2026-05-28 after 25h20)
 * - the vault itself: 392 daily diaries, 561 notes, 43 project docs
 *
 * Voice rules from `.work/briefs/v4-content-spec.md`: concrete nouns and dates,
 * short sentences, spoken language allowed, no slogans, no parallel "把 A 写成
 * B" chains, no motivational ending. Privacy: no money, no customer/colleague
 * names, no family details.
 */
import type { L } from './profile';

export interface AboutThread {
  label: L;
  body: L;
}

export interface AboutDailyItem {
  time: string;
  text: L;
}

export interface AboutPrinciple {
  code: string;
  title: L;
  line: L;
}

export interface AboutFailure {
  title: L;
  period: string;
  line: L;
}

export interface AboutStat {
  value: string;
  label: L;
}

export const about = {
  /** Shown at the top of the page — the page is updated by hand. */
  updated: '2026-11-16',

  intro: {
    zh: '我 2026 年 6 月从河北工程技术学院毕业，学的是物联网工程。现在在石家庄的孚盟软件做客户经理，卖外贸 SaaS。白天打电话、跑客户、处理售后；晚上写点小工具，把白天重复的部分省下来。这个页面写得比较长，想到哪儿写到哪儿，没有按时间排。',
    en: "I graduated from Hebei University of Engineering Technology in June 2026, majoring in IoT engineering. Now I work as an account manager at Fumamx in Shijiazhuang, selling foreign-trade SaaS — calls, customer visits and support by day; small tools by night, to remove the repetitive part of the day.",
  } as L,

  signature: {
    zh: '宋谦，石家庄，2026 年 11 月。写得慢，改得也慢。',
    en: 'Song Qian, Shijiazhuang, November 2026. I write slowly and edit even more slowly.',
  } as L,

  threads: {
    label: { zh: '三条线', en: 'Three threads' } as L,
    items: [
      {
        label: { zh: '销售', en: 'Sales' } as L,
        body: {
          zh: '第一份正式工作就是销售。到 11 月打了 2700 通电话，成交 3 单。广交会站过展位，也跟同事去工厂看过货。客户不懂的软件问题、流程问题、海外客户问题，最后都落到我这里。这份工作让我第一次知道业务是怎么长出来的，也让我知道自己不太喜欢一直打电话。',
          en: "My first real job is sales. By November: 2,700 calls, three deals. I have stood at a Canton Fair booth and visited factories. Whatever a customer cannot solve — software, process, overseas clients — ends up with me. It taught me where business actually comes from, and that I do not want to make calls forever.",
        } as L,
      },
      {
        label: { zh: '代码', en: 'Code' } as L,
        body: {
          zh: '大学学物联网，硬件软件都碰过。真正开始写工具，是因为每天登录、复制、粘贴、填表太烦，于是把孚盟网页端封装成 CLI/REST/MCP，把外呼、录音、转写、跟进串起来，又写了 BOSS、智联、探迹的本地客户端。6 个工具，都是自己每天在用。写得不算漂亮，但能用。',
          en: 'I studied IoT — a bit of hardware, a bit of software. I started writing tools because signing in, copying, pasting and filling forms every day was unbearable. So I wrapped the Fumamx web app into CLI/REST/MCP, strung calling, recording, transcription and follow-up together, and wrote local clients for BOSS, Zhaopin and Tanji. Six tools, all of them used by me every day. Not pretty code, but it works.',
        } as L,
      },
      {
        label: { zh: '写作', en: 'Writing' } as L,
        body: {
          zh: '写日记和复盘很多年，也写网球、复利、知识管理。写作对我来说不是输出，是想清楚的办法。站里的文章大多是先写给自己看的，写完放几天再改，改到看得懂为止。',
          en: 'I have kept a diary and written reviews for years, and I write about tennis, compounding and knowledge management. Writing is not output for me — it is how I think. Most essays here were written for myself first, then left for a few days and edited until they made sense.',
        } as L,
      },
    ] as AboutThread[],
  },

  daily: {
    label: { zh: '日常', en: 'A normal week' } as L,
    intro: {
      zh: '在石家庄，工作日大概是这样过的。',
      en: 'In Shijiazhuang, a weekday usually goes like this.',
    } as L,
    items: [
      {
        time: '07:45',
        text: { zh: '起床。洗漱，出门前灌一杯水。', en: 'Wake up, wash, drink a glass of water before leaving.' } as L,
      },
      {
        time: '08:20',
        text: { zh: '出门，通勤半小时左右到公司。', en: 'Leave; about half an hour to the office.' } as L,
      },
      {
        time: '09:00',
        text: {
          zh: '上班。打电话、回消息、处理客户问题；没客户的时候写工具或看资料。',
          en: 'Work: calls, messages, customer issues. When there are no customers I write tools or read.',
        } as L,
      },
      {
        time: '18:00',
        text: {
          zh: '下班。周二、周四去球场；其余时间回家写东西或看书。',
          en: 'Off work. Tennis on Tuesdays and Thursdays; other evenings are for writing or reading.',
        } as L,
      },
      {
        time: '23:30',
        text: { zh: '该睡了，但经常拖到 00:30。正在改。', en: 'Should sleep. Usually not until 00:30. Working on it.' } as L,
      },
      {
        time: '周末',
        text: {
          zh: '一天写东西、整理笔记，另一天打球或做饭。做饭水平停在“能吃”。',
          en: 'One day for writing and notes, the other for tennis or cooking. Cooking standard: edible.',
        } as L,
      },
    ] as AboutDailyItem[],
  },

  principles: {
    label: { zh: '原则', en: 'Principles' } as L,
    intro: {
      zh: '2025 年 10 月写了六条自己的原则，不指望做得到，先用来提醒自己。',
      en: 'I wrote six principles in October 2025. I do not always follow them; they are there to remind me.',
    } as L,
    items: [
      {
        code: 'CP1',
        title: { zh: '精力优先', en: 'Energy first' } as L,
        line: {
          zh: '先睡够、先吃饭、先动一动，再谈专注和思考。精力不够的时候硬撑，做的决定基本都要返工。',
          en: 'Sleep, eat, move first; focus comes after. Decisions made while exhausted usually get redone.',
        } as L,
      },
      {
        code: 'CP2',
        title: { zh: '单通道专注', en: 'Single channel' } as L,
        line: {
          zh: '一次只开一个前台任务。想查东西、想回消息，先记在纸上，回来再做。',
          en: 'One foreground task at a time. If I want to look something up or reply, I write it down and come back.',
        } as L,
      },
      {
        code: 'CP3',
        title: { zh: '日记与复盘', en: 'Diary and review' } as L,
        line: {
          zh: '每天写几行，记下做了什么、跟谁、为什么。每周、每月再回头看一次。',
          en: 'A few lines a day: what I did, with whom, why. Then a weekly and a monthly look back.',
        } as L,
      },
      {
        code: 'CP4',
        title: { zh: '输入节食', en: 'Input diet' } as L,
        line: {
          zh: '每天主动看信息不超过两次，每次不超过 45 分钟。多数推送其实和我没关系。',
          en: 'At most two deliberate information sessions a day, under 45 minutes each. Most push notifications have nothing to do with me.',
        } as L,
      },
      {
        code: 'CP5',
        title: { zh: '承诺边界', en: 'Commitment boundary' } as L,
        line: {
          zh: '新任务先算要花多少时间、能不能退。一周最多接三个新承诺，满了就不接。',
          en: 'Before saying yes: how much time, and can I back out? At most three new commitments a week; when full, the answer is no.',
        } as L,
      },
      {
        code: 'CP6',
        title: { zh: '风险闸门', en: 'Risk gate' } as L,
        line: {
          zh: '花钱、改长期方向、公开发言这类事，先放 24 小时再决定。',
          en: 'Spending money, changing a long-term direction, speaking in public: wait 24 hours before deciding.',
        } as L,
      },
    ] as AboutPrinciple[],
  },

  failures: {
    label: { zh: '失败清单', en: 'Things that did not work' } as L,
    intro: {
      zh: '写几件没做成的事，比写成绩有用。',
      en: 'A few things that failed. More useful than the wins.',
    } as L,
    items: [
      {
        title: { zh: '三人销售小组', en: 'Three-person sales team' } as L,
        period: '2026.06',
        line: {
          zh: '和两个朋友凑了个销售小组，卖什么、谁负责什么，都没定，就急着去找客户。一个夏天不到就散了。教训：合伙之前先把分工和退出方式写清楚。',
          en: 'Two friends and I started a sales team. We had not decided what we were selling or who owned what, but we went looking for customers anyway. It fell apart within a summer. Lesson: write down the division of work and the exit before starting.',
        } as L,
      },
      {
        title: { zh: 'AgentOS', en: 'AgentOS' } as L,
        period: '2026.05',
        line: {
          zh: '在华云想把内部 Agent 做成一套能推广的系统。做了两周多，25 个小时，最后发现连“给谁用、解决什么”都没说清。5 月 28 日取消，只留下命名规范和配置规范。教训：先有真实用法，再谈平台。',
          en: 'At Huayun I tried to turn the internal agents into a system that could be rolled out across the company. Two-plus weeks and 25 hours in, I realised I still could not say who would use it or what it solved. Cancelled on 28 May. Only the naming and configuration specs survived. Lesson: real usage first, platform later.',
        } as L,
      },
      {
        title: { zh: '公司注册', en: 'Company registration' } as L,
        period: '2026.05',
        line: {
          zh: '2026 年 4 月跟人合伙申请公司，信息整理完、流程走到一半，5 月 27 日交给对方继续做。我只留下了一份注册流程笔记。教训：合伙之前先把谁去跑手续说清楚。',
          en: 'In April 2026 a partner and I started registering a company. We finished the information gathering, got halfway through the paperwork, then handed it over to him on 27 May. All I kept was a set of notes on the process. Lesson: agree on who actually files the papers before starting.',
        } as L,
      },
      {
        title: { zh: '网球场地转让', en: 'The tennis club deal' } as L,
        period: '2025.08',
        line: {
          zh: '2025 年 8 月谈过接手一处网球场地。账算到一半就知道接不住，最后没接。教训：喜欢打网球和会经营场地是两回事。',
          en: 'In August 2025 I negotiated taking over a tennis club. Halfway through the numbers I knew I could not carry it, and walked away. Lesson: loving the sport and running a venue are two different jobs.',
        } as L,
      },
    ] as AboutFailure[],
  },

  ledger: {
    label: { zh: '时间账', en: 'The ledger' } as L,
    intro: {
      zh: '时间都花在这些地方了，数字来自自己的记录。',
      en: 'Where the time went. Numbers from my own records.',
    } as L,
    items: [
      { value: '392', label: { zh: '天日记', en: 'days of diary' } as L },
      { value: '561', label: { zh: '条笔记', en: 'notes' } as L },
      { value: '43', label: { zh: '个项目', en: 'projects' } as L },
      { value: '4', label: { zh: '年网球', en: 'years of tennis' } as L },
    ] as AboutStat[],
  },

  /**
   * English pages are condensed: this paragraph stands in for the long
   * Chinese-first diary-style sections.
   */
  english:
    'I am Song Qian. I graduated from Hebei University of Engineering Technology in June 2026 and now work as an account manager at Fumamx in Shijiazhuang, selling foreign-trade SaaS. By day I make calls, visit customers and handle support; by night I write small tools that remove the repetitive part of that work. I keep a diary (392 days so far), take plain-text notes (561 of them), read software architecture and calculus, and play tennis — four years now, still trying to reach 3.5. I wrote six personal principles in October 2025 and I do not always follow them. Three things failed recently: an internal AgentOS, a three-person sales team, and a tennis club takeover. I keep the lessons and move on.',
};
