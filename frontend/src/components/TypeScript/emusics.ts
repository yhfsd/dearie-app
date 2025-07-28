import { Emotion } from './emotions';

export interface Song {
  title: string;
  src: string;
  img: string;
  groupName: string;
}


// 좋음 
// 1. Better Things - aespa
// 2. Get a guitar - RIIZE
// 3. Blue Blood - ive

// 중립
// 1. Memories - RIIZE
// 2. Ghosting - Ghosting
// 3. Lucid Dream - aespa

// 부정
// 1. Love Poem -IU
// 2. Cherish - IVE
// 3. Lonely Boy - TXT

// 감정(label) 별로 3곡씩 매핑
export const SONGS_BY_EMOTION: Record<Emotion, Song[]> = {
  // 긍정 그룹
  신나는: [
    {
      title: 'Better Things',
      src: '/music/AESPA_Better-Things.mp3',
      img: '/music/aespa-Better-Things.png',
      groupName: 'AESPA',
    },
    {
      title: 'Get a guitar',
      src: '/music/RIIZE_Get-A-Guitar.mp3',
      img: '/music/riize-get-a-guitar.png',
      groupName: 'RIIZE',
    },
    {
      title: 'Blue Blood',
      src: '/music/IVE_Blue-Blood.mp3',
      img: '/music/ive-blue-blood.png',
      groupName: 'IVE'
    },
    {
      title: '팔레트(Feat.G-DRAGON)',
      src: '/music/IU-palette.mp3',
      img: '/music/IU-palette.png',
      groupName: 'IU'
    },
    {
      title: '9와4분의3 승강장에서 너를 기다려',
      src: '/music/TXT-943.mp3',
      img: '/music/TXT-943.png',
      groupName: 'TXT'
    },
  ],
  즐거운: [
    {
      title: 'Better Things',
      src: '/music/AESPA_Better-Things.mp3',
      img: '/music/aespa-Better-Things.png',
      groupName: 'AESPA',
    },
    {
      title: 'Get a guitar',
      src: '/music/RIIZE_Get-A-Guitar.mp3',
      img: '/music/riize-get-a-guitar.png',
      groupName: 'RIIZE',
    },
    {
      title: 'Blue Blood',
      src: '/music/IVE_Blue-Blood.mp3',
      img: '/music/ive-blue-blood.png',
      groupName: 'IVE'
    },
    {
      title: '팔레트(Feat.G-DRAGON)',
      src: '/music/IU-palette.mp3',
      img: '/music/IU-palette.png',
      groupName: 'IU'
    },
    {
      title: '9와4분의3 승강장에서 너를 기다려',
      src: '/music/TXT-943.mp3',
      img: '/music/TXT-943.png',
      groupName: 'TXT'
    },
  ],
  사랑하는: [
    {
      title: 'Better Things',
      src: '/music/AESPA_Better-Things.mp3',
      img: '/music/aespa-Better-Things.png',
      groupName: 'AESPA',
    },
    {
      title: 'Get a guitar',
      src: '/music/RIIZE_Get-A-Guitar.mp3',
      img: '/music/riize-get-a-guitar.png',
      groupName: 'RIIZE',
    },
    {
      title: 'Blue Blood',
      src: '/music/IVE_Blue-Blood.mp3',
      img: '/music/ive-blue-blood.png',
      groupName: 'IVE'
    },
    {
      title: '팔레트(Feat.G-DRAGON)',
      src: '/music/IU-palette.mp3',
      img: '/music/IU-palette.png',
      groupName: 'IU'
    },
    {
      title: '9와4분의3 승강장에서 너를 기다려',
      src: '/music/TXT-943.mp3',
      img: '/music/TXT-943.png',
      groupName: 'TXT'
    },
  ],
  만족스러운: [
    {
      title: 'Better Things',
      src: '/music/AESPA_Better-Things.mp3',
      img: '/music/aespa-Better-Things.png',
      groupName: 'AESPA',
    },
    {
      title: 'Get a guitar',
      src: '/music/RIIZE_Get-A-Guitar.mp3',
      img: '/music/riize-get-a-guitar.png',
      groupName: 'RIIZE',
    },
    {
      title: 'Blue Blood',
      src: '/music/IVE_Blue-Blood.mp3',
      img: '/music/ive-blue-blood.png',
      groupName: 'IVE'
    },
    {
      title: '팔레트(Feat.G-DRAGON)',
      src: '/music/IU-palette.mp3',
      img: '/music/IU-palette.png',
      groupName: 'IU'
    },
    {
      title: '9와4분의3 승강장에서 너를 기다려',
      src: '/music/TXT-943.mp3',
      img: '/music/TXT-943.png',
      groupName: 'TXT'
    },
  ],
  설레는: [
     {
      title: 'Better Things',
      src: '/music/AESPA_Better-Things.mp3',
      img: '/music/aespa-Better-Things.png',
      groupName: 'AESPA',
    },
    {
      title: 'Get a guitar',
      src: '/music/RIIZE_Get-A-Guitar.mp3',
      img: '/music/riize-get-a-guitar.png',
      groupName: 'RIIZE',
    },
    {
      title: 'Blue Blood',
      src: '/music/IVE_Blue-Blood.mp3',
      img: '/music/ive-blue-blood.png',
      groupName: 'IVE'
    },
    {
      title: '팔레트(Feat.G-DRAGON)',
      src: '/music/IU-palette.mp3',
      img: '/music/IU-palette.png',
      groupName: 'IU'
    },
    {
      title: '9와4분의3 승강장에서 너를 기다려',
      src: '/music/TXT-943.mp3',
      img: '/music/TXT-943.png',
      groupName: 'TXT'
    },
  ],




  // 중립 그룹
  무기력한: [
    {
      title: 'Memories',
      src: '/music/RIIZE_Memories.mp3',
      img: '/music/riize-memories.png',
      groupName: 'RIIZE',
    },
    {
      title: 'Ghosting',
      src: '/music/TXT_GHOSTING.mp3',
      img: '/music/txt-ghosting.png',
      groupName: 'TXT',
    },
    {
      title: 'Lucid-Dream',
      src: '/music/AESPA_Lucid-Dreams.mp3',
      img: 'music/aespa-lucid-dream.png',
      groupName: 'AESPA'
    },
    {
      title: 'Shine With Me',
      src: '/music/IVE-Shine-with-me.mp3',
      img: 'music/ive-Shine-with-me.png',
      groupName: 'IVE'
    },
    {
      title: '스물셋',
      src: '/music/IU-23.mp3',
      img: 'music/iu-23.png',
      groupName: 'IU'
    },
  ],
  심심한: [
    {
      title: 'Memories',
      src: '/music/RIIZE_Memories.mp3',
      img: '/music/riize-memories.png',
      groupName: 'RIIZE',
    },
    {
      title: 'Ghosting',
      src: '/music/TXT_GHOSTING.mp3',
      img: '/music/txt-ghosting.png',
      groupName: 'TXT',
    },
    {
      title: 'Lucid-Dream',
      src: '/music/AESPA_Lucid-Dreams.mp3',
      img: 'music/aespa-lucid-dream.png',
      groupName: 'AESPA'
    },
    {
      title: 'Shine With Me',
      src: '/music/IVE-Shine-with-me.mp3',
      img: 'music/ive-Shine-with-me.png',
      groupName: 'IVE'
    },
    {
      title: '스물셋',
      src: '/music/IU-23.mp3',
      img: 'music/iu-23.png',
      groupName: 'IU'
    },
  ],
  그저그런: [
    {
      title: 'Memories',
      src: '/music/RIIZE_Memories.mp3',
      img: '/music/riize-memories.png',
      groupName: 'RIIZE',
    },
    {
      title: 'Ghosting',
      src: '/music/TXT_GHOSTING.mp3',
      img: '/music/txt-ghosting.png',
      groupName: 'TXT',
    },
    {
      title: 'Lucid-Dream',
      src: '/music/AESPA_Lucid-Dreams.mp3',
      img: 'music/aespa-lucid-dream.png',
      groupName: 'AESPA'
    },
    {
      title: 'Shine With Me',
      src: '/music/IVE-Shine-with-me.mp3',
      img: 'music/ive-Shine-with-me.png',
      groupName: 'IVE'
    },
    {
      title: '스물셋',
      src: '/music/IU-23.mp3',
      img: 'music/iu-23.png',
      groupName: 'IU'
    },
  ],
  궁금한: [
    {
      title: 'Memories',
      src: '/music/RIIZE_Memories.mp3',
      img: '/music/riize-memories.png',
      groupName: 'RIIZE',
    },
    {
      title: 'Ghosting',
      src: '/music/TXT_GHOSTING.mp3',
      img: '/music/txt-ghosting.png',
      groupName: 'TXT',
    },
    {
      title: 'Lucid-Dream',
      src: '/music/AESPA_Lucid-Dreams.mp3',
      img: 'music/aespa-lucid-dream.png',
      groupName: 'AESPA'
    },
    {
      title: 'Shine With Me',
      src: '/music/IVE-Shine-with-me.mp3',
      img: 'music/ive-Shine-with-me.png',
      groupName: 'IVE'
    },
    {
      title: '스물셋',
      src: '/music/IU-23.mp3',
      img: 'music/iu-23.png',
      groupName: 'IU'
    },
  ],
  혼란스러운: [
    {
      title: 'Memories',
      src: '/music/RIIZE_Memories.mp3',
      img: '/music/riize-memories.png',
      groupName: 'RIIZE',
    },
    {
      title: 'Ghosting',
      src: '/music/TXT_GHOSTING.mp3',
      img: '/music/txt-ghosting.png',
      groupName: 'TXT',
    },
    {
      title: 'Lucid-Dream',
      src: '/music/AESPA_Lucid-Dreams.mp3',
      img: 'music/aespa-lucid-dream.png',
      groupName: 'AESPA'
    },
    {
      title: 'Shine With Me',
      src: '/music/IVE-Shine-with-me.mp3',
      img: 'music/ive-Shine-with-me.png',
      groupName: 'IVE'
    },
    {
      title: '스물셋',
      src: '/music/IU-23.mp3',
      img: 'music/iu-23.png',
      groupName: 'IU'
    },
  ],






  // 부정 그룹
  실망한: [
    {
      title: 'Love-Poem',
      src: '/music/IU_ Love-poem.mp3',
      img: '/music/iu-love-poem.png',
      groupName: 'IU',
    },
    { 
      title: 'Cherish',
      src: '/music/ive-Cherish.mp3',
      img: '/music/ive-cherish.png',
      groupName: 'IVE',
    },
    { 
      title: 'Lonely Boy',
      src: '/music/TXT_Lonely-Boy.mp3',
      img: '/music/txt-lonely-boy.png',
      groupName: 'TXT',
    },
    { 
      title: 'Drama',
      src: '/music/AESPA-Drama.mp3',
      img: '/music/aespa-Drama.png',
      groupName: 'AESPA',
    },
    { 
      title: 'Siren',
      src: '/music/RIIZE-Siren.mp3',
      img: '/music/riize-Siren.png',
      groupName: 'RIIZE',
    },
  ],
  피곤한: [
    {
      title: 'Love-Poem',
      src: '/music/IU_ Love-poem.mp3',
      img: '/music/iu-love-poem.png',
      groupName: 'IU',
    },
    { 
      title: 'Cherish',
      src: '/music/ive-Cherish.mp3',
      img: '/music/ive-cherish.png',
      groupName: 'IVE',
    },
    { 
      title: 'Lonely Boy',
      src: '/music/TXT_Lonely-Boy.mp3',
      img: '/music/txt-lonely-boy.png',
      groupName: 'TXT',
    },
    { 
      title: 'Drama',
      src: '/music/AESPA-Drama.mp3',
      img: '/music/aespa-Drama.png',
      groupName: 'AESPA',
    },
    { 
      title: 'Siren',
      src: '/music/RIIZE-Siren.mp3',
      img: '/music/riize-Siren.png',
      groupName: 'RIIZE',
    },
  ],
  지친: [
    {
      title: 'Love-Poem',
      src: '/music/IU_ Love-poem.mp3',
      img: '/music/iu-love-poem.png',
      groupName: 'IU',
    },
    { 
      title: 'Cherish',
      src: '/music/ive-Cherish.mp3',
      img: '/music/ive-cherish.png',
      groupName: 'IVE',
    },
    { 
      title: 'Lonely Boy',
      src: '/music/TXT_Lonely-Boy.mp3',
      img: '/music/txt-lonely-boy.png',
      groupName: 'TXT',
    },
    { 
      title: 'Drama',
      src: '/music/AESPA-Drama.mp3',
      img: '/music/aespa-Drama.png',
      groupName: 'AESPA',
    },
    { 
      title: 'Siren',
      src: '/music/RIIZE-Siren.mp3',
      img: '/music/riize-Siren.png',
      groupName: 'RIIZE',
    },
  ],
  짜증나는: [
    {
      title: 'Love-Poem',
      src: '/music/IU_ Love-poem.mp3',
      img: '/music/iu-love-poem.png',
      groupName: 'IU',
    },
    { 
      title: 'Cherish',
      src: '/music/ive-Cherish.mp3',
      img: '/music/ive-cherish.png',
      groupName: 'IVE',
    },
    { 
      title: 'Lonely Boy',
      src: '/music/TXT_Lonely-Boy.mp3',
      img: '/music/txt-lonely-boy.png',
      groupName: 'TXT',
    },
    { 
      title: 'Drama',
      src: '/music/AESPA-Drama.mp3',
      img: '/music/aespa-Drama.png',
      groupName: 'AESPA',
    },
    { 
      title: 'Siren',
      src: '/music/RIIZE-Siren.mp3',
      img: '/music/riize-Siren.png',
      groupName: 'RIIZE',
    },
  ],
  억울한: [
    {
      title: 'Love-Poem',
      src: '/music/IU_ Love-poem.mp3',
      img: '/music/iu-love-poem.png',
      groupName: 'IU',
    },
    { 
      title: 'Cherish',
      src: '/music/ive-Cherish.mp3',
      img: '/music/ive-cherish.png',
      groupName: 'IVE',
    },
    { 
      title: 'Lonely Boy',
      src: '/music/TXT_Lonely-Boy.mp3',
      img: '/music/txt-lonely-boy.png',
      groupName: 'TXT',
    },
    { 
      title: 'Drama',
      src: '/music/AESPA-Drama.mp3',
      img: '/music/aespa-Drama.png',
      groupName: 'AESPA',
    },
    { 
      title: 'Siren',
      src: '/music/RIIZE-Siren.mp3',
      img: '/music/riize-Siren.png',
      groupName: 'RIIZE',
    },
  ],
};
