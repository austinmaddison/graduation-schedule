export type Guest = {
  name: { en: string; th: string };
  role: string;
  note?: string;
  image?: string;
};

export const familyGuests: Guest[] = [
  { name: { en: 'Aunt Eet', th: 'ป้าอี๊ด' }, role: 'guestRoles.aunt', note: 'Mom 2', image: 'images/guests/aunt-eet.jpg' },
  { name: { en: 'Uncle Korn', th: 'ลุงกรณ์' }, role: 'guestRoles.uncle', note: 'Dad 2', image: 'images/guests/uncle-korn.jpg' },
  { name: { en: 'Aunt Toi', th: 'ป้าต้อย' }, role: 'guestRoles.aunt', note: 'Mom 2', image: 'images/guests/aunt-toi.jpg' },
  { name: { en: 'Aunt Took', th: 'ป้าตุ๊ก' }, role: 'guestRoles.aunt', note: 'Wine Aunt', image: 'images/guests/aunt-took.jpg' },
  { name: { en: 'Aunt Tick', th: 'ป้าติ๊ก' }, role: 'guestRoles.aunt', note: 'Cool Aunt', image: 'images/guests/aunt-tick.jpg' },
  { name: { en: 'Uncle Pedth', th: 'ลุงเพชร' }, role: 'guestRoles.uncle', note: 'Cool Uncle', image: 'images/guests/uncle-pedth.jpg' },
  { name: { en: 'Aunt Oi', th: 'ป้าอ้อย' }, role: 'guestRoles.aunt', note: 'Mom 2', image: 'images/guests/aunt-oi.jpg' },
  { name: { en: 'Uncle Bui', th: 'ลุงบุญ' }, role: 'guestRoles.uncle', note: 'Cool Uncle', image: 'images/guests/uncle-bui.jpg' },
  { name: { en: 'Khun Yaiy (Grandma)', th: 'คุณยาย' }, role: 'guestRoles.grandma', image: 'images/guests/khun-yaiy.jpg' },
  { name: { en: "P'Nay", th: 'พี่เน' }, role: 'guestRoles.bigSister', image: 'images/guests/p-nay.jpg' },
  { name: { en: "P'Dar", th: 'พี่ดาร์' }, role: 'guestRoles.mother', image: 'images/guests/p-dar.jpg' },
  { name: { en: "P'Poom", th: 'พี่ภูมิ' }, role: 'guestRoles.bigBrother', image: 'images/guests/p-poom.jpg' },
  { name: { en: "P'Fern", th: 'พี่เฟิร์น' }, role: 'guestRoles.bigSister', image: 'images/guests/p-fern.jpg' },
  { name: { en: "P'Game", th: 'พี่เกมส์' }, role: 'guestRoles.bigBrother', image: 'images/guests/p-game.jpg' },
  { name: { en: "P'Palm", th: 'พี่ปาล์ม' }, role: 'guestRoles.bigBrother', image: 'images/guests/p-palm.jpg' },
  { name: { en: "P'Plai", th: 'พี่ปลา' }, role: 'guestRoles.bigBrother', image: 'images/guests/p-plai.jpg' },
  { name: { en: "P'Dream", th: 'พี่ดรีม' }, role: 'guestRoles.bigSister', image: 'images/guests/p-dream.jpg' },
  { name: { en: "K'Wiparat (Mom)", th: 'คุณวิภารัตน์' }, role: 'guestRoles.mother', image: 'images/guests/k-wiparat.jpg' },
  { name: { en: "K'John (Dad)", th: 'คุณจอห์น' }, role: 'guestRoles.father', image: 'images/guests/k-john.jpg' },
];

export const friends: Guest[] = [
  { name: { en: 'Bhum', th: 'บูม' }, role: 'guestRoles.friend' },
  { name: { en: 'Justin', th: 'จัสติน' }, role: 'guestRoles.friend' },
  { name: { en: 'Gloria', th: 'กลอเรีย' }, role: 'guestRoles.friend' },
  { name: { en: 'Akari', th: 'อาการิ' }, role: 'guestRoles.friend' },
  { name: { en: 'Appy', th: 'แอปปี้' }, role: 'guestRoles.friend' },
  { name: { en: 'Alex', th: 'อเล็กซ์' }, role: 'guestRoles.friend' },
  { name: { en: 'Anish', th: 'อนิช' }, role: 'guestRoles.friend' },
  { name: { en: 'Karan', th: 'คารัน' }, role: 'guestRoles.friend' },
  { name: { en: 'Lana', th: 'ลาน่า' }, role: 'guestRoles.friend' },
];
