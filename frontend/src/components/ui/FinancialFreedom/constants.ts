
import ic_banknotes from '../../../../public/svgs/ic_banknotes.svg';
import ic_circle_stack from '../../../../public/svgs/ic_circle_stack.svg';
import ic_arrows_left_right from '../../../../public/svgs/ic_arrows_right_left.svg';

// For desktop
export const desktopHeaderPhrase = ['Таны санхүүгийн эрх чөлөө'];

export const desktopParagraphPhrase = [
  'Санхүүгээ удирдах нь хүчин чармайлтгүй, зардал багатай байх ёстой гэдэгт бид итгэдэг.',
  "Тиймээс бид таны хүрэх ёстой эрх чөлөөг санал болгож байна.",
];
export const desktopBriefNotePhrase = [
  'Хөрөнгө оруулалт,',
  'Үргэлжлүүл, өргөжүүл',
  'Санхүүгийн аяллаа',
  'Хамт эхлүүлье.',
];


// For mobile
export const mobileHeaderPhrase = ['Таны санхүүгийн эрх чөлөө'];
export const mobileParagraphPhrase = [
  'Санхүүгээ удирдах нь хүчин чармайлтгүй, зардал багатай байх ёстой гэдэгт бид итгэдэг.',
  "Тиймээс бид таны хүрэх ёстой эрх чөлөөг санал болгож байна.",
];

export const mobileBriefNotePhrase = [
  'Smart',
  ' investments,',
  'secure',
  ' payments,',
  'and expert',
  'guidance, all',
  'in one place.',
];

export const edges = [
  {
    point: 'No minimum balance fees',
    details:
      'Say goodbye to minimum balance fees. Your account, your balance—no hidden charges',
    icon: ic_banknotes,
  },
  {
    point: 'No monthly fees',
    details:
      'Bank with us without worrying about monthly fees. Keep more of your money where it belongs—in your account',
    icon: ic_circle_stack,
  },
  {
    point: 'No bank transfer fees',
    details:
      'Seamlessly transfer funds without the extra cost. Send and receive money with zero bank transfer fees.',
    icon: ic_arrows_left_right,
  },
];
