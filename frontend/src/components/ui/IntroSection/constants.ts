import ic_document_duplicate from '../../../../public/svgs/ic_document_duplicate.svg';
import ic_identification from '../../../../public/svgs/ic_identification.svg';
import ic_lock_closed from '../../../../public/svgs/ic_lock_closed.svg';

// For desktop
export const desktopHeaderPhrase = ["PineCard-ийг танилцуулж байна"];

export const desktopParagraphPhrase = [
  "PineCard хамгийн сүүлийн үеийн шинэ картуудыг танилцуулж байна.",
  'Бид таньд хамгийн сүүлийн үеийн онцлог, аюулгүй байдал, урьд өмнө хэзээ ч байгаагүй тав тухтай байдалыг санал болгож байна.'
];

// For mobile
export const mobileHeaderPhrase = ["Introducing RAFT's", 'Next-Gen Cards'];
export const mobileParagraphPhrase = [
  " Discover RAFT's latest innovation – our new cards.",
  ' Elevate your banking experience with cutting-edge',
  'features, security, and unprecedented',
  'convenience.',
];

export const edges = [
  {
    point: 'Холбоосгүй төлбөр',
    details:
      'Манай шинэ картууд нь контактгүй технологиор тоноглогдсон бөгөөд танд энгийн товшилтоор хурдан, найдвартай төлбөр хийх боломжийг олгоно.',
    icon: ic_document_duplicate,
  },
  {
    point: 'Хувийн тохиргоо',
    details:
      'Өөрийн өвөрмөц хэв маягийг харуулахын тулд картаа тохируулаарай. Өөрийнхөө зан чанарт тохирсон загваруудаас сонголтоо хийгээрэй.',
    icon: ic_identification,
  },
  {
    point: 'Сайжруулсан аюулгүй байдал',
    details:
      'Таны сэтгэлийн амар амгалан бол бидний нэн тэргүүний зорилт юм. Манай картууд нь таны гүйлгээ болон өгөгдлийг хамгаалах дэвшилтэт хамгаалалтын арга хэмжээг агуулдаг.',
    icon: ic_lock_closed,
  },
];
