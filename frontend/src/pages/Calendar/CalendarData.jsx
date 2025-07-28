import { FiList } from "react-icons/fi";/* <FiList  style={{ color: '#FFFFFF' }}/> */
import { LuPartyPopper } from "react-icons/lu";/* <LuPartyPopper style={{ color: '#7ADBD9' }}/> */
import { TbMicrophone } from "react-icons/tb";/* <TbMicrophone style={{ color: '#FFB500' }}/> */
import { LuMusic4 } from "react-icons/lu";/* <LuMusic4 style={{ color: '#FF7B87' }}/> */
import { PiCalendarHeart } from "react-icons/pi";/* <PiCalendarHeart style={{ color: '#815ED9' }}/> */
import { IoIosMore } from "react-icons/io";/* <IoIosMore style={{ color: '#6BCC5F' }}/> */

const allSchedules = {
  TXT: {
    '2025-08-01': [
      { name: '<K-POP 페스티벌 개막식>', category: '행사', time: '08월 01일(금) 오후 6:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }} /> },
      { name: '정규 4집 티저 이미지 공개', category: '발매', time: '08월 01일(금) 오후 9:00', icon: <LuMusic4 style={{ color: '#FF7B87' }} /> }
    ],
    '2025-08-02': [
      { name: '<주말 연예 뉴스>', category: '방송', time: '08월 02일(토) 오후 2:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/> }
    ],
    '2025-08-03': [
      { name: '선공개곡 MV 공개', category: '발매', time: '08월 03일(일) 오전 0:00', icon: <LuMusic4 style={{ color: '#FF7B87' }} /> }
    ],
    '2025-08-05': [
      { name: '<뮤직뱅크>', category: '방송', time: '08월 05일(화) 오후 4:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/> }
    ],
    '2025-08-06': [
      { name: '한강 썸머 페스티벌', category: '행사', time: '08월 06일(수) 오후 2:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }} /> }
    ],
    '2025-08-07': [
      { name: '멤버 A 생일 축하 라이브', category: '축하', time: '08월 07일(목) 오후 9:00', icon: <LuPartyPopper style={{ color: '#7ADBD9' }} /> }
    ],
    '2025-08-09': [
      { name: '‘Love Language’ MV 3억뷰 돌파 🎉', category: '축하', time: '08월 09일(토) 오후 3:00', icon: <LuPartyPopper style={{ color: '#7ADBD9' }} /> },
      { name: '<엠카운트다운>', category: '방송', time: '08월 09일(금) 오후 6:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/> },
    ],
    '2025-08-10': [
      { name: '음악중심 팬미팅', category: '행사', time: '08월 10일(일) 오후 5:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }} /> }
    ],
    '2025-08-11': [
      { name: '디지털 싱글 ‘두 잇 라이크 댓’ 발매', category: '발매', time: '08월 11일(월) 오후 5:00', icon: <LuMusic4 style={{ color: '#FF7B87' }} /> }
    ],
    '2025-08-13': [
      { name: '<공식채널 유튜브 라이브>', category: '방송', time: '08월 13일(수) 오후 5:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/> }
    ],
    '2025-08-14': [
      { name: '휴닝카이 생일 축하', category: '축하', time: '08월 14일(목)', icon: <LuPartyPopper style={{ color: '#7ADBD9' }} /> }
    ],
    '2025-08-15': [
      { name: '팬사인회 in 서울', category: '행사', time: '08월 15일(금) 오후 4:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }} /> },
      { name: '<팬레터 이벤트 접수 마감>', category: '기타', time: '08월 15일(금)', icon: <IoIosMore style={{ color: '#6BCC5F' }} /> }
    ],
    '2025-08-17': [
      { name: '<엠카운트다운> 사전녹화', category: '방송', time: '08월 17일(일) 오전 11:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/> }
    ],
    '2025-08-18': [
      { name: '1집 앨범 Still Dreaming 재발매', category: '발매', time: '08월 18일(월) 오후 3:00', icon: <LuMusic4 style={{ color: '#FF7B87' }} /> }
    ],
    '2025-08-21': [
      { name: '<라디오 – 아이돌 라운지>', category: '방송', time: '08월 21일(목) 오후 8:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/> },
      { name: '<유튜브 – 바쁜 아이돌>', category: '방송', time: '08월 21일(목) 오후 12:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/> },
      { name: '여름 굿즈 출시', category: '발매', time: '08월 21일(목) 오후 12:30', icon: <LuMusic4 style={{ color: '#FF7B87' }} /> },
    ],
    '2025-08-24': [
      { name: '항성 인천 응원상영회', category: '행사', time: '08월 24일(일) 오후 1:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }} /> }
    ],
    '2025-08-26': [
      { name: '<유퀴즈 온 더 블럭>', category: '방송', time: '08월 26일(화) 오후 6:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/> },
      { name: '공식채널 유튜브 라이브', category: '방송', time: '08월 26일(화) 오후 11:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/> },
      { name: '비하인드 컷 (팬사인회)', category: '기타', time: '08월 26일(화) 오후 6:00', icon: <IoIosMore style={{ color: '#6BCC5F' }} /> },
    ],
    '2025-08-29': [
      { name: '<8월 이달의 브랜드 대상 투표>', category: '기타', time: '08월 29일(금)', icon: <IoIosMore style={{ color: '#6BCC5F' }} /> }
    ],
    '2025-08-30': [
      { name: '필리핀 팬미팅 리허설 영상 공개', category: '기타', time: '08월 30일(화) 오후 3:00', icon: <IoIosMore style={{ color: '#6BCC5F' }} /> }
    ],
    '2025-08-31': [
      { name: '필리핀 팬미팅 투어', category: '행사', time: '08월 31일(일) 오후 12:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }} /> }
    ]
  },
  AESPA: {
    '2025-08-01': [
      {name:'<살롱드립2>',category: '방송', time: '08월 01일(금) 오후 6:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
      {name:'<비하인드 영상 공개 - 일본 투어>',category: '기타', time: '08월 01일(금) 오후 3:00', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
    ],
    '2025-08-02': [
      {name:'<Dirty Workshop>',category: '방송', time: '08월 02일(토) 오후 6:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
    ],
    '2025-08-03': [
      {name:'<인기가요> 사전녹화',category: '방송', time: '08월 03일(일) 오전 11:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
    ],
    '2025-08-04': [
      
    ],
    '2025-08-05': [
      {name:'<뮤직뱅크>',category: '방송', time: '08월 05일(화) 오후 4:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
      {name:'SMTOWN 도쿄 콘서트',category: '행사', time: '08월 05일(화) 오후 1:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }}/>},
      {name:'<팬레터 이벤트 접수 마감>',category: '기타', time: '08월 05일(화)', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
      
    ],
    '2025-08-06': [
      {name:'<주간아이돌>',category: '방송', time: '08월 06일(수) 오후 2:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
      {name:'한강 썸머 페스티벌',category: '행사', time: '08월 06일(수) 오후 2:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }}/>},
    ],
    '2025-08-07': [
      {name:'<플로버 채널 라이브 Q&A>',category: '기타', time: '08월 07일(목) 오후 3:00', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
    ],
    '2025-08-08': [

    ],
    '2025-08-09': [
      {name:'<아는형님>',category: '방송', time: '08월 09일(토) 오후 5:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
      {name: '‘Spicy’ MV 3억뷰 돌파 🎉', category: '축하', time: '08월 09일(토) 오후 3:00', icon: <LuPartyPopper style={{ color: '#7ADBD9' }}/> },
      {name:'<리얼리티 콘텐츠 티저 공개>',category: '기타', time: '08월 09일(토) 오후 7:00', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
    ],
    '2025-08-10': [
      {name:'<놀라운 토요일>',category: '방송', time: '08월 10일(일) 오후 6:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
      {name: '음악중심 팬미팅', category: '행사', time: '08월 10일(일) 오후 5:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }}/>},
      {name:'<에스파 캐릭터 인형 출시>',category: '기타', time: '08월 10일(일) 오전 11:00', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
    ],
    '2025-08-11': [
      {name:'<컬투쇼>',category: '방송', time: '08월 11일(월) 오후 3:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
      {name:'디지털 싱글 ‘GLOW’',category: '발매', time: '08월 11일(월) 오후 5:00', icon: <LuMusic4 style={{ color: '#FF7B87' }}/> },
    ],
    '2025-08-12': [
      
    ],
    '2025-08-13': [
      {name:'<유퀴즈 온 더 블럭>',category: '방송', time: '08월 13일(수) 오후 5:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
    ],
    '2025-08-14': [

    ],
    '2025-08-15': [
      {name:'<쇼! 챔피언>',category: '방송', time: '08월 15일(금) 오후 3:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
      {name: '팬사인회 @서울', category: '행사', time: '08월 15일(금) 오후 4:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }}/>},
      {name:'<aespazine Vol.4 공개>',category: '기타', time: '08월 15일(금) 오후 6:00', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
    ],
    '2025-08-16': [
      
    ],
    '2025-08-17': [
      {name:'<엠카운트다운> 사전녹화',category: '방송', time: '08월 17일(일) 오전 11:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
    ],
    '2025-08-18': [
      {name:'라이브 앨범 ‘SYNK: LIVE’',category: '발매', time: '08월 18일(월) 오후 3:00', icon: <LuMusic4 style={{ color: '#FF7B87' }}/> },
    ],
    '2025-08-19': [

    ],
    '2025-08-20': [

    ],
    '2025-08-21': [
      {name: '윈터 생일 축하 💙', category: '축하', time: '08월 21일(목)', icon: <LuPartyPopper style={{ color: '#7ADBD9' }}/> },
      {name:'<팬미팅 리허설 브이로그 공개>',category: '기타', time: '08월 21일(목) 오후 3:00', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
    ],
    '2025-08-22': [

    ],
    '2025-08-23': [

    ],
    '2025-08-24': [
      {name: '‘SYNK ROAD’ 상영회', category: '행사', time: '08월 24일(일) 오후 1:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }}/>},
      {name:'<콘서트 비하인드 포토 공개>',category: '기타', time: '08월 24일(일) 오후 3:00', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
      {name:'<에스파 x 네이버 NOW 인터뷰 클립 공개>',category: '기타', time: '08월 24일(일) 오후 5:00', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
    ],
    '2025-08-25': [

    ],
    '2025-08-26': [
      {name:'<문명특급>',category: '방송', time: '08월 26일(화) 오후 6:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
      {name: '유튜브 구독자 1000만 달성 🎊', category: '축하', time: '08월 26일(화) 오후 3:00', icon: <LuPartyPopper style={{ color: '#7ADBD9' }}/> },
      {name:'<2025 올해의 브랜드 대상 투표>',category: '기타', time: '08월 26일(화)', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
    ],
    '2025-08-27': [
      {name:'<더 시즌즈>',category: '방송', time: '08월 27일(수) 오후 5:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
    ],
    '2025-08-28': [
      {name:'<팬 참여 설문조사>',category: '기타', time: '08월 28일(목) ~ 08월 31일(일)', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
    ],
    '2025-08-29': [
      {name: '오프라인 스밍 이벤트', category: '행사', time: '08월 29일(금) 오전 11:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }}/>},
      {name:'<팬 참여 설문조사>',category: '기타', time: '08월 28일(목) ~ 08월 31일(일)', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
    ],
    '2025-08-30': [
      {name:'<인기가요>',category: '방송', time: '08월 30일(토) 오후 3:00', icon: <TbMicrophone style={{ color: '#FFB500' }}/>},
      {name:'<팬 참여 설문조사>',category: '기타', time: '08월 28일(목) ~ 08월 31일(일)', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
    ],
    '2025-08-31': [
      {name: '일본 팬미팅 투어', category: '행사', time: '08월 31일(일) 오후 12:00', icon: <PiCalendarHeart style={{ color: '#815ED9' }}/>},
      {name:'<팬 참여 설문조사>',category: '기타', time: '08월 28일(목) ~ 08월 31일(일)', icon: <IoIosMore style={{ color: '#6BCC5F' }}/>},
    ],
  },
};

export default allSchedules;
