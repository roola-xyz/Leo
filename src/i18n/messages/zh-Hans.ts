import type { LeoMessages } from "./en";

const zhHans: LeoMessages = {
  "menu.account": "账号",
  "menu.appearance": "外观",
  "menu.language": "语言",
  "menu.manageAccount": "管理您的 Roola 账号",
  "menu.signOut": "退出登录",
  "menu.back": "返回",
  "menu.close": "关闭",
  "menu.managedBy": "由 {organisation} 管理",
  "menu.privacy": "隐私政策",
  "menu.terms": "服务条款",

  "theme.system": "跟随系统",
  "theme.light": "浅色",
  "theme.dark": "深色",

  "apps.label": "Roola 应用",
  "apps.loading": "加载中…",
  "apps.favourites": "我的收藏",
  "apps.edit": "编辑收藏",
  "apps.done": "完成",
  "apps.add": "将 {app} 添加到收藏",
  "apps.remove": "将 {app} 从收藏中移除",
  "apps.reorder": "拖动图块以重新排序，或使用方向键。",

  "report.done": "谢谢",
  "report.note": "还有什么要补充的？（可选）",
  "report.submit": "举报",
  "report.failed": "无法发送，请重试。",
  "report.close": "关闭",
  "report.ok": "完成",
  "report.loading": "加载中…",
  "report.cancel": "取消",

  "verification.title": "身份验证请求",
  "verification.body": "Roola 支持团队的 <b>{agent}</b> 请您确认是本人操作。",
  "verification.reason": "给出的原因",
  "verification.challenge": "客服应向您读出这个数字",
  "verification.mismatch": "如果与您听到的不一致，请点击“拒绝”。",
  "verification.expires": "{seconds} 秒后过期",
  "verification.deny": "拒绝",
  "verification.approve": "是我本人",

  "waiting.joined": "您已在候补名单中",
  "waiting.joinedBody":
    "{name} 开放当天，我们会给 <strong>{email}</strong> 发一封邮件。除此之外不会再发，之前也不会。",
  "waiting.closed": "{name} 尚未开放",
  "waiting.tagline": "留下您的邮箱，开放时我们会第一时间告诉您。",
  "waiting.email": "电子邮件地址",
  "waiting.name": "您的姓名（可选）",
  "waiting.join": "加入候补名单",
  "waiting.open": "候补名单开放中",
  "waiting.promise": "开放时只发一封邮件。您可以随时要求我们删除您的地址。",
  "waiting.promiseAccount": "接下来你将创建 Roola 账户，{name} 已预先添加——开放当天即可直接登录。",
  "waiting.failed": "未能提交，请一分钟后重试。",
};

export default zhHans;
