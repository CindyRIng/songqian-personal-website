/**
 * READING — the desk page (`/reading`).
 *
 * Source: `.work/kb/v4/reading/` (13 "读完" project records with real
 * durations), the vault book notes (`Index/` knowledge-card indexes) and
 * `/now` for the honest current state of the unfinished books.
 *
 * Rules (see `.work/briefs/v4-content-spec.md`):
 * - status is honest: not everything labelled "读完" in the vault is finished;
 *   `reading` / `paused` are allowed.
 * - hours and progress come from the project logs, not from estimating.
 * - `note` is one or two first-person sentences, specific, no slogans.
 *
 * This page is Chinese-only (`translated={false}`), so the strings are zh.
 */
export type BookStatus = 'read' | 'reading' | 'paused';

export interface Book {
  title: string;
  author: string;
  status: BookStatus;
  /** Year it was read / started, e.g. "2026". */
  year?: string;
  /** Logged reading time from the vault project record, e.g. "23 小时 15 分". */
  hours?: string;
  /** Where I am, for unfinished books, e.g. "156 / 661 页". */
  progress?: string;
  /** One or two first-person sentences. */
  note: string;
}

/** Last time this list was actually updated — shown at the bottom of the page. */
export const booksUpdated = '2026-11-16';

export const books: Book[] = [
  /* ---- 在读 ------------------------------------------------------------ */
  {
    title: '《系统工程原则与实践》',
    author: 'Alexander Kossiakoff 等',
    status: 'reading',
    year: '2025',
    hours: '20 小时',
    progress: '156 / 661 页',
    note: '2025 年 2 月开的书，中间停过大半年，做毕设时又重新捡起来。现在停在 156 页，需求分析和接口那两章算真的读进去了。',
  },
  {
    title: '《微积分》第一卷',
    author: 'Tom M. Apostol',
    status: 'reading',
    year: '2026',
    hours: '23 小时 15 分',
    progress: '读到实变部分',
    note: '23 小时记下来，还是没读完。实变那几章得自己在纸上推一遍，推不动就停两天再看。',
  },
  {
    title: '《鸟哥的 Linux 私房菜》',
    author: '鸟哥',
    status: 'reading',
    year: '2026',
    note: '当工具书翻，不从头读。上周查 systemd 的单元文件才又打开了一次。',
  },

  /* ---- 读完 ------------------------------------------------------------ */
  {
    title: '《Python 编程：从入门到实践》',
    author: 'Eric Matthes',
    status: 'read',
    year: '2026',
    hours: '12 小时 10 分',
    note: '为了做 RPA 边学边写，3 月 3 日到 29 日。后半本的项目练习比语法部分有用。',
  },
  {
    title: '《图解 HTTP》',
    author: '上野宣',
    status: 'read',
    year: '2026',
    hours: '2 小时 45 分',
    note: '两天翻完。以前调接口总靠猜，看完至少知道状态码该去查哪一段。',
  },
  {
    title: '《图解大模型》',
    author: 'Jay Alammar、Maarten Grootendorst',
    status: 'read',
    year: '2026',
    hours: '2 小时 25 分',
    note: '图多，好读。token 和向量那几节后来真用上了，其余当概览。',
  },
  {
    title: 'Domain-Driven Design Distilled',
    author: 'Vaughn Vernon',
    status: 'read',
    year: '2026',
    hours: '13 小时',
    note: '4 月读完。概念算串了一遍，真到落地还是做不出来。',
  },
  {
    title: 'Patterns of Enterprise Application Architecture',
    author: 'Martin Fowler',
    status: 'read',
    year: '2026',
    hours: '2 小时 15 分',
    note: '当目录用，没打算一遍读完。先知道有哪几类模式，遇到问题再回来查。',
  },
  {
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    status: 'read',
    year: '2026',
    hours: '2 小时 20 分',
    note: '2 小时 20 分。分层那几章做了笔记，毕设的分层是照着改的。',
  },
  {
    title: 'Implementing Domain-Driven Design / Introducing EventStorming',
    author: 'Vaughn Vernon、Alberto Brandolini',
    status: 'read',
    year: '2026',
    hours: '16 小时 20 分',
    note: '两本一起读。事件风暴最好玩，可惜当时没有真项目可以落。',
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    status: 'read',
    year: '2026',
    hours: '2 小时',
    note: '翻完只花了两小时。有些建议太绝对，命名和函数长度那两章确实有用。',
  },
  {
    title: 'Mastering STM32',
    author: 'Carmine Noviello',
    status: 'read',
    year: '2026',
    note: '为了捡球机器人的底盘和电机控制读的。寄存器部分比 HAL 库讲得清楚。',
  },
  {
    title: '《经济学原理》',
    author: 'N. Gregory Mankiw',
    status: 'read',
    year: '2025',
    note: '2025 年拿它补经济学词汇，边读边做卡片。现在偶尔还翻。',
  },
  {
    title: '《高效能人士的七个习惯》',
    author: 'Stephen R. Covey',
    status: 'read',
    year: '2026',
    note: '7 月坐火车回石家庄时读的。习惯一到三后来写进了自己的原则。',
  },

  /* ---- 搁置 ------------------------------------------------------------ */
  {
    title: '《动手学深度学习》',
    author: '阿斯顿·张、李沐等',
    status: 'paused',
    year: '2026',
    note: '6 月在实习，只读了前几章，跑过几个 notebook 就停了。想找时间再捡起来。',
  },
  {
    title: '《区块链：技术驱动金融》',
    author: 'Arvind Narayanan 等',
    status: 'paused',
    year: '2025',
    note: '2025 年读的，做了一些卡片。讲义和交易那几章没读完，就搁下了。',
  },
];

export const currentlyReading: Book[] = books.filter((book) => book.status === 'reading');

export const booksRead: Book[] = books.filter((book) => book.status === 'read');

export const booksPaused: Book[] = books.filter((book) => book.status === 'paused');
