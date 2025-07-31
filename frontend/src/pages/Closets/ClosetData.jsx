import { mainImgs } from './ClosetImg';

export const lectureStatusData = [
  {
     id: 1,
    group: 'All',
    price1: '₩31,000', price2: '₩51,000', price3: '₩123,000', price4: '₩123,000', price5: '123,000',
    isActive: true,
    img1: mainImgs['allImg1'],
    img2: mainImgs['allImg2'],
    img3: mainImgs['allImg3'],
    img4: mainImgs['allImg4'],
    img5: mainImgs['allImg5'],

    img1001: mainImgs['allImg1001'],
    img1002: mainImgs['allImg1002'],
    img1003: mainImgs['allImg1003'],
    img1004: mainImgs['allImg1004'],

    img2001: mainImgs['allImg2001'],
    img2002: mainImgs['allImg2002'],
    img2003: mainImgs['allImg2003'],

    title1:'250530 아이브', title2:'211023 우빈 style on weverse post',title3:'240321 카리나 인스타 상의', title4:'240321 윈터 인스타 비니', title5:'240321 지젤 콘서트 상의',
    text1:'[AVANDRESS] Sopy Collar Short-Sleeve', text2:'[Gentle Monster] Otas 02', text3:'[Lucir zu] Cotton crochet one-piece', text4:'[길리아카이브] LETTERING LOGO BEANIE', text5:'[29CM] LETTERING SHIRRING T-SHIRT',

    text1001:'[POLO]\nAppliqued\nEmbroidered', text1002:'[MLB]\n바시티 컬시브 스티치\n언스트럭쳐 볼캡', text1003:'[Lucir zu]\nCotton crochet\none-piece (black)', text1004:'[MLB]\nGila Archive\nLogo Beanie',

    text2001:'MLB',text2002:'POLO', text2003:'MAISON',

    review1: [mainImgs['allReviewImg5_1'], mainImgs['allReviewImg5_2'], mainImgs['allReviewImg5_3']],
    review2: [mainImgs['allReviewImg6_1'], mainImgs['allReviewImg6_2'], mainImgs['allReviewImg6_3'] , mainImgs['allReviewImg6_4']],
    review3: [mainImgs['allReviewImg1_1'], mainImgs['allReviewImg1_2'], mainImgs['allReviewImg1_3']],
    review4: [mainImgs['allReviewImg2_1'], mainImgs['allReviewImg2_2'], mainImgs['allReviewImg2_3']],
    review5: [mainImgs['allReviewImg3_1'], mainImgs['allReviewImg3_2'], mainImgs['allReviewImg3_3']],
    
    reviewText1: ['색감이 화면이랑 똑같아서 너무 예뻐요! 데일리룩으로 자주 입을 것 같아요.','재질이 부드럽고 생각보다 두께감이 있어서 한겨울에도 따뜻하게 입을 수 있어요.','핏이 진짜 예술이에요. 허리 라인이 잘 잡혀서 날씬해 보여요.'], reviewText2: ['세탁해도 보풀 안 일어나고 탄탄해서 좋아요.','가격 대비 퀄리티가 좋아서 재구매 의사 있어요.','배송도 빠르고 포장도 깔끔했어요. 기분 좋게 받았습니다.'], reviewText3: ['무난하게 입기 좋아요. 유행 안 탈 디자인이라 오래 입을 듯.','색이 사진보다 조금 어두운데 나름 매력 있어요.','배송이 좀 느렸지만 옷은 괜찮았어요.'],reviewText4: ['트렌디한 디자인이라 기분 전환돼요.','얇지만 비침이 거의 없어서 좋아요.','몸매 라인을 예쁘게 살려줘서 좋아요.'], reviewText5: ['주머니 깊이가 실용적이에요.','봄, 가을용으로 딱이에요.','세탁해도 변형이 거의 없어요.'],
    
    itemLink1:'https://www.musinsa.com/products/3155032',
    itemLink2:'https://www.gentlemonster.com/kr/ko/item/SDFZSB9SO5A6/atomic-02?srsltid=AfmBOorT9my_wb5uSU3ggca2mLb9Wm1hWlxIHDk4gtRLMH1S2C5C1CEa',
    itemLink3:'https://lucirzu.kr/product/cotton-crochet-one-piece-black/562/',
    itemLink4:'https://www.29cm.co.kr/products/2911599',
    itemLink5:'https://www.29cm.co.kr/products/2638347?source=item_detail&source_type=bought_together_item',


    itemLink1001:'https://www.net-a-porter.com/en-at/shop/product/polo-ralph-lauren/clothing/casual-jackets/appliqued-embroidered-paneled-cotton-canvas-jacket/1647597359204487',
    itemLink1002:'https://www.mlb-korea.com/product-detail/3ACPV165N-50BGL?category=MBMB03B01', 
    itemLink1003:'https://m.ssfshop.com/Lucir-zu/GQFC23061214347/good', 
    itemLink1004:'https://kream.co.kr/products/376943',

    itemLink2001:'https://www.mlb-korea.com/?gad_source=1&gad_campaignid=22164063769&gbraid=0AAAAADIerGv3tNYEp40VQGd-FOvOzSRtP&gclid=CjwKCAjwvuLDBhAOEiwAPtF0VuK3QYIvGRSW4ySb7JRMYdWBH4dpQTRdSMDHFivD_XdB0_PpyAG60xoC_KAQAvD_BwE',
    itemLink2002:'https://www.ralphlauren.co.kr/?utm_source=google&utm_medium=paidsearch&utm_campaign=KR|KO|SEA|BKW|Ralph_Lauren|Exact&utm_term=polo&utm_content=Ralph_Lauren|BKW|Exact&gad_source=1&gad_campaignid=18042657569&gbraid=0AAAAACLYVQUnH-Qsv644VPkLaIhJUZ8kf&gclid=CjwKCAjwvuLDBhAOEiwAPtF0VpnQ8DgVjo2Sp8kGQ6f1qqDDbwzktrPDoHkxmwUes74ojkGUK_ChohoCP7IQAvD_BwE',
    itemLink2003:'https://maisonkitsune.com/kr/?srsltid=AfmBOorbDIT_6p13ZoEFuarEzPFvBaExtHTM7ZqK6aBX0OnXQWkemYjv',
  },
  {
    id: 2,
    group: 'ASEPA',
    isActive: false,
    price1: '₩31,000', price2: '₩720,000', price3: '₩36,000', price4: '₩31,000', price5: '₩51,000', price6: '₩67,000',

    img1: mainImgs['aespaImg1'], img2: mainImgs['aespaImg2'], img3: mainImgs['aespaImg3'], img4: mainImgs['aespaImg4'], img5: mainImgs['aespaImg5'], img6: mainImgs['aespaImg6'],
    img1001: mainImgs['allImg1001'], img1002: mainImgs['aespaImg1002'], img1003: mainImgs['aespaImg1003'], img1004: mainImgs['aespaImg1004'],
    img2001: mainImgs['aespaImg2001'],img2002: mainImgs['aespaImg2002'],img2003: mainImgs['aespaImg2003'],

    title1:'250705 노는 토요일', title2:'250701 살롱드립', title3:'250628 카리나', title4:'240321 카리나 인스타 상의', title5:'240321 윈터 인스타 비니', title6:'240321 지젤 콘서트 상의',
    text1:'[Mused] Garden Strawberry Dress',text2:'[GANNI] Smocked Tiered Dress',
    text3:'[MLB] 뉴핏 스트럭쳐 볼캡 NY',text4:'[Luciru zu] Cotton crochet one-piece',text5:'[길리아카이브] LETTERING LOGO BEANIE', text6:'[29CM] LETTERING SHIRRING T-SHIRT',
    text1001:'[POLO]\nAppliqued\nEmbroidered', text1002:'[MLB]\n바시티 컬시브 스티치\n언스트럭쳐 볼캡', text1003:'[Lucir zu]\nCotton crochet\none-piece (black)', text1004:'[MLB]\nGila Archive\nLogo Beanie',
    text2001:'CHOPARD', text2002:'CROCS', text2003:'MLB',

    review1: [mainImgs['aespaReviewImg1_1'], mainImgs['aespaReviewImg1_2'], mainImgs['aespaReviewImg1_3']],
    review2: [mainImgs['aespaReviewImg2_1'], mainImgs['aespaReviewImg2_2'], mainImgs['aespaReviewImg2_3']],
    review3: [mainImgs['aespaReviewImg3_1'], mainImgs['aespaReviewImg3_2'], mainImgs['aespaReviewImg3_3']],
    review4: [mainImgs['allReviewImg1_1'], mainImgs['allReviewImg1_2'], mainImgs['allReviewImg1_3']],
    review5: [mainImgs['allReviewImg2_1'], mainImgs['allReviewImg2_2'], mainImgs['allReviewImg2_3']],
    review6: [mainImgs['allReviewImg3_1'], mainImgs['allReviewImg3_2'], mainImgs['allReviewImg3_3']],

    itemLink1:'https://mused-official.com/product/mused-garden-strawberry-dress-white/2068/category/47/display/1/',
    itemLink2:'https://www.ganni.com/en-kr/light-green-smocked-tiered-dress-W0421.html',
    itemLink3:'https://www.mlb-korea.com/product-detail/3ACP0802N-50BKS?godNo=GM0023102766692&utm_source=google&utm_medium=shopping&utm_campaign=3ACP0802N-50BKS&utm_content=210301_MPBZ_0N0000N_02&utm_term=CP&gad_source=1&gad_campaignid=22153833309&gbraid=0AAAAADIerGuhkE0eFWsCjwAddsPEd18WG&gclid=CjwKCAjwvuLDBhAOEiwAPtF0VtjA-Olvv9lSCaTD36KmAVjHWQWK-07AMNU5ATYPP1Gmkv4lyeFaWBoCrM0QAvD_BwE',
    itemLink4:'https://lucirzu.kr/product/cotton-crochet-one-piece-black/562/',
    itemLink5:'https://www.29cm.co.kr/products/2911599',
    itemLink6:'https://www.29cm.co.kr/products/2638347?source=item_detail&source_type=bought_together_item',
    itemLink1001:'https://www.net-a-porter.com/en-at/shop/product/polo-ralph-lauren/clothing/casual-jackets/appliqued-embroidered-paneled-cotton-canvas-jacket/1647597359204487',itemLink1002:'https://www.mlb-korea.com/product-detail/3ACPV165N-50BGL?category=MBMB03B01', itemLink1003:'https://m.ssfshop.com/Lucir-zu/GQFC23061214347/good', itemLink1004:'https://kream.co.kr/products/376943',
    itemLink2001:'https://www.chopard.com/ko-kr',
    itemLink2002:'https://www.crocs.co.kr/',
    itemLink2003:'https://www.mlb-korea.com/',


    reviewText1: ['색감이 화면이랑 똑같아서 너무 예뻐요! 데일리룩으로 자주 입을 것 같아요.','재질이 부드럽고 생각보다 두께감이 있어서 한겨울에도 따뜻하게 입을 수 있어요.','핏이 진짜 예술이에요. 허리 라인이 잘 잡혀서 날씬해 보여요.'], reviewText2: ['세탁해도 보풀 안 일어나고 탄탄해서 좋아요.','가격 대비 퀄리티가 좋아서 재구매 의사 있어요.','배송도 빠르고 포장도 깔끔했어요. 기분 좋게 받았습니다.'], reviewText3: ['무난하게 입기 좋아요. 유행 안 탈 디자인이라 오래 입을 듯.','색이 사진보다 조금 어두운데 나름 매력 있어요.','배송이 좀 느렸지만 옷은 괜찮았어요.'],reviewText4: ['트렌디한 디자인이라 기분 전환돼요.','얇지만 비침이 거의 없어서 좋아요.','몸매 라인을 예쁘게 살려줘서 좋아요.'], reviewText5: ['주머니 깊이가 실용적이에요.','봄, 가을용으로 딱이에요.','세탁해도 변형이 거의 없어요.'], reviewText6: ['고급스러운 느낌이 물씬 나서 만족스러워요.','마감이 살짝 아쉽긴 한데 입으면 티는 잘 안 나요.','트렌디한 디자인이라 기분 전환돼요.','가격 대비 퀄리티가 좋아서 재구매 의사 있어요.'],
  },
  {
    id: 3,
    group: 'TXT',
    isActive: false,
    price1: '₩42,000', price2: '₩349,000', price3: '₩57,000', price4: '₩118,000', price5: '₩51,000', price6: '₩89,000',
    img1: mainImgs['TXTImg1'], img2: mainImgs['TXTImg2'], img3: mainImgs['TXTImg3'], img4: mainImgs['TXTImg4'], img5: mainImgs['TXTImg5'], img6: mainImgs['TXTImg6'],
	  img1001: mainImgs['TXTImg1001'], img1002: mainImgs['TXTImg1002'], img1003: mainImgs['TXTImg1003'], img1004: mainImgs['TXTImg1004'], img1005: mainImgs['TXTImg1005'], img1006: mainImgs['TXTImg1006'],
	  img2001: mainImgs['TXTImg2001'], img2002: mainImgs['TXTImg2002'], img2003: mainImgs['TXTImg2003'],

    title1:'20230128 아이돌 인간극장 범규', title2:'20230201 TXT OFFICIAL Youtube 휴닝카이', title3:'20220521 TXT OFFICIAL Youtube', title4:'20220214 TTT 얘들아 나 먼저 갈겡!', title5:'20210927 휴닝카이 TXT Youtube', title6:'20210921 범규 TXT Youtube',
    text1:'[LIT] ALPHABET FRAGMENT T-SHIRT WHITE',text2:'[CRITIC] CRTC DEPT Varsity Jacket', text3:'[MPQ]TOUR(L)IST CAP', text4:'[ROMANTIC CROWN]FLEECE TRUCKER',text5:'[NIKE] 에어포스 스티치 파인 그린',text6:'[ROMANTIC CROWN] 트위드 팬츠_네이비',
    text1001:'[LIT]\nALPHABET \nT-SHIRT WHITE',text1002:'[CRITIC]\n CRTC DEPT\n Varsity Jacket',
    text1003:'[MPQ]\nTOUR(L)IST CAP', text1004:'[ROMANTIC CROWN]\nFLEECE TRUCKER',text1005:'[NIKE]\n 에어포스 스티치\n 파인 그린',text1006:'[로맨틱크라운]\n 트위트 팬츠 네이비',
    text2001:'DIOR',text2002:'SKOOL', text2003:'FOREUL',
    
    itemLink1:'https://www.musinsa.com/products/1910213',
    itemLink2:'https://onthelook.co.kr/product/275627?srsltid=AfmBOooiBTG1WcmuMgG92bmreclfn9Wb34z64FAk0F3etf5BBgV_T17t',
    itemLink3:'https://mpq.kr/product/tourlist-cap/1672/',
    itemLink4:'https://global.musinsa.com/jp/goods/2156612',
    itemLink5:'https://kream.co.kr/products/30635?srsltid=AfmBOorcS7s-VNYc7rfOHCziyNB1FVjpfIivPZbWymFjVljhj8mDBhXc',
    itemLink6:'https://www.musinsa.com/products/1777704',
    itemLink1001:'https://www.musinsa.com/products/1910213', 
    itemLink1002:'https://www.musinsa.com/products/2838220', 
    itemLink1003:'https://mpq.kr/product/tourlist-cap/1672/', 
    itemLink1004:'https://global.musinsa.com/jp/goods/2156611', 
    itemLink1005:'https://kream.co.kr/products/30635?srsltid=AfmBOop_2qJ8B9f_0Q0Txha2aWnkVc5hDoyqQVS3hMJ2S6ufrupPjT3M', 
    itemLink1006:'https://www.musinsa.com/products/1777704',
    itemLink2001:'https://www.dior.com/ko_kr?gad_source=1&gad_campaignid=6811860122&gbraid=0AAAAACoA3AttgWNvaABTfCQtzBSPKubbL&gclid=CjwKCAjwvuLDBhAOEiwAPtF0VlD7xonsv_5XFgnIPK4hxGIAxh9x9-9YOhnLOmpYpow5Q9iNRruK7BoCyDcQAvD_BwE',
    itemLink2002:'https://www.skoolooks.com/',
    itemLink2003:'https://foreul.co.kr/?srsltid=AfmBOoqPTuZgJHdVtETjxJiOz-UpDczU3BB_r3TbysIlusV0UPNNJnK3',


	  review1: [mainImgs['TXTReviewImg1_1'], mainImgs['TXTReviewImg1_2'], mainImgs['TXTReviewImg1_3']],
	  review2: [mainImgs['TXTReviewImg2_1'], mainImgs['TXTReviewImg2_2'], mainImgs['TXTReviewImg2_3']],
	  review3: [mainImgs['TXTReviewImg3_1'], mainImgs['TXTReviewImg3_2'], mainImgs['TXTReviewImg3_3']],
	  review4: [mainImgs['TXTReviewImg4_1'], mainImgs['TXTReviewImg4_2'], mainImgs['TXTReviewImg4_3']],
	  review5: [mainImgs['TXTReviewImg5_1'], mainImgs['TXTReviewImg5_2'], mainImgs['TXTReviewImg5_3']],
	  review6: [mainImgs['TXTReviewImg6_1'], mainImgs['TXTReviewImg6_2'], mainImgs['TXTReviewImg6_3']],

    reviewText1: ['색감이 화면이랑 똑같아서 너무 예뻐요! 데일리룩으로 자주 입을 것 같아요.','재질이 부드럽고 생각보다 두께감이 있어서 한겨울에도 따뜻하게 입을 수 있어요.','핏이 진짜 예술이에요. 허리 라인이 잘 잡혀서 날씬해 보여요.'], reviewText2: ['세탁해도 보풀 안 일어나고 탄탄해서 좋아요.','가격 대비 퀄리티가 좋아서 재구매 의사 있어요.','배송도 빠르고 포장도 깔끔했어요. 기분 좋게 받았습니다.'], reviewText3: ['무난하게 입기 좋아요. 유행 안 탈 디자인이라 오래 입을 듯.','색이 사진보다 조금 어두운데 나름 매력 있어요.','배송이 좀 느렸지만 옷은 괜찮았어요.'],reviewText4: ['트렌디한 디자인이라 기분 전환돼요.','얇지만 비침이 거의 없어서 좋아요.','몸매 라인을 예쁘게 살려줘서 좋아요.'], reviewText5: ['주머니 깊이가 실용적이에요.','봄, 가을용으로 딱이에요.','세탁해도 변형이 거의 없어요.'], reviewText6: ['고급스러운 느낌이 물씬 나서 만족스러워요.','마감이 살짝 아쉽긴 한데 입으면 티는 잘 안 나요.','트렌디한 디자인이라 기분 전환돼요.','가격 대비 퀄리티가 좋아서 재구매 의사 있어요.'],
  },
  {
    id: 4,
    group: 'RIIZE',
    isActive: false,
    price1: '₩660,000', price2: '₩203,000', price3: '₩310,000', price4: '₩189,000', price5: '₩65,000', price6: '₩298,000',
		img1: mainImgs['RIIZEImg1'],
		img2: mainImgs['RIIZEImg2'],
		img3: mainImgs['RIIZEImg3'],
		img4: mainImgs['RIIZEImg4'],
		img5: mainImgs['RIIZEImg5'],
		img6: mainImgs['RIIZEImg6'],
		img1001: mainImgs['RIIZEImg1001'],
		img1002: mainImgs['RIIZEImg1002'],
		img1003: mainImgs['RIIZEImg1003'],
		img1004: mainImgs['RIIZEImg1004'],
		img1005: mainImgs['RIIZEImg1005'],
		img1006: mainImgs['RIIZEImg1006'],
		img2001: mainImgs['RIIZEImg2001'],
		img2002: mainImgs['RIIZEImg2002'],
		img2003: mainImgs['RIIZEImg2003'],
    title1:'20231029 뮤직뱅크 우빈', title2:'210704 인기가요 성찬', title3:'211023 우빈 style on weverse post', title4:'성찬 style at Music Bank', title5:'쇼타로 RISE & REALIZE EP.6', title6:'141023 은석 RIIZE instagram ',
    text1:'[DIESEL] D-UM-RIB Track Denim Hoodie',text2:'[VANS X GALLERY DEPT] Og Old Skool Lx',
    text3:'[GENTLE MONSTER] Otas 02', text4:'[W WORKSHOP] Skateboard Hoodie Zip-Up ',text5:'[OUR LEGACYxSTÜSSY] Work Shop Cap',text6:'[INSTANTFUNK] Ms Hidden Single Jacket',
    text1001:'[SUNLOVE]\nSparkle Cap Blue', text1002:'[SUNLOVE]\nW Polartec® Delt\nFlexAir Polo Purple', text1003:'[SUNLOVE]\nField Cargo\nShorts Green', text1004:'[SUNLOVE]\nASCII Daybreak\nTee White', text1005:'[SUNLOVE]\nPERTEX® Total Shell\nJacket Light Sage', text1006:'[SUNLOVE]\nSquare Cargo\nShorts Ivory',
    text2001:'LVMH',text2002:'MUSINSA', text2003:'SUNLOVE', 


    itemLink1:'https://www.farfetch.com/kr/shopping/men/diesel/hoodies-2/items.aspx?utm_source=google&utm_medium=cpc&utm_keywordid=244252635&pid=google_search&af_channel=Search&c=1379305802&af_c_id=1379305802&af_siteid=&af_keywords=dsa-1063459472085&af_adset_id=58939240950&af_ad_id=658965403618&af_sub1=244252635&is_retargeting=true&gad_source=1&gad_campaignid=1379305802&gbraid=0AAAAADsmKHSTloPNOMfydQvLc9sJhamxl&gclid=CjwKCAjwvuLDBhAOEiwAPtF0Vn4OOPmXNgUYh7AXDadvuW5W40JePB-f_4jzVHyNwfpJ7H3Ces5ZVBoCfnkQAvD_BwE',
    itemLink2:'https://kream.co.kr/products/97500?srsltid=AfmBOoo9GG1qSrqmhYxo31z_CjOHvLES2A1wL9lLDm4NgqgNbSI6qzMw',
    itemLink3:'https://www.gentlemonster.com/kr/ko/item/DZDQ8SBPVR1X/otas-02?srsltid=AfmBOoqN4dwFMLtKxzMxlPLrs7dmqxC7ySQ8OTGbj5TF9Z7Olq80y-EN',
    itemLink4:'https://www.29cm.co.kr/products/2310587',
    itemLink5:'https://kream.co.kr/products/129771?fetchRelated=true',
    itemLink6:'https://instantfunk.kr/skin-skin18/product/ms-%ED%9E%88%EB%93%A0-%EC%8B%B1%EA%B8%80-%EC%9E%90%EC%BC%93/2716/?srsltid=AfmBOor6D4icnnop4F4t9m8Q4UUm1iJedCp_RFHiy_kQunMJeJaZXC22',

    itemLink1001:'https://sunlovetour.com/product/detail.html?product_no=1225&cate_no=45&display_group=1', 
    itemLink1002:'https://sunlovetour.com/product/detail.html?product_no=1268&cate_no=29&display_group=1', 
    itemLink1003:'https://sunlovetour.com/product/detail.html?product_no=1182&cate_no=30&display_group=1', 
    itemLink1004:'https://sunlovetour.com/product/detail.html?product_no=1168&cate_no=29&display_group=1', 
    itemLink1005:'https://sunlovetour.com/product/detail.html?product_no=1124&cate_no=31&display_group=1', 
    itemLink1006:'https://sunlovetour.com/product/detail.html?product_no=536&cate_no=30&display_group=1',

    itemLink2001: 'https://kr.louisvuitton.com/kor-kr/homepage?gad_source=1&gad_campaignid=19962970274&gbraid=0AAAAAC8a5SJBb13hNOQPzMXStxEwF8JBK&gclid=CjwKCAjwvuLDBhAOEiwAPtF0Vj0o7XpTZ43BoPSgDeJmjlEQ21k7HqWAPWHTP3HNAAIEAOMQTcoCzhoChMgQAvD_BwE',
    itemLink2002: 'https://www.musinsa.com/main/musinsa/recommend?gf=A', 
    itemLink2003: 'https://sunlovetour.com/?srsltid=AfmBOopmBsOOineq7NxoPwb_7dFMGuJLuqCIMGdjP8hGTo8ycfjb01OA',

    review1: [
			mainImgs['RIIZEReviewImg1_1'],
			mainImgs['RIIZEReviewImg1_2'],
			mainImgs['RIIZEReviewImg1_3'],
		],
		review2: [
			mainImgs['RIIZEReviewImg2_1'],
			mainImgs['RIIZEReviewImg2_2'],
			mainImgs['RIIZEReviewImg2_3'],
		],
		review3: [
			mainImgs['allReviewImg6_1'],
			mainImgs['allReviewImg6_2'],
			mainImgs['allReviewImg6_3'],
			mainImgs['allReviewImg6_4'],
		],
		review4: [
			mainImgs['RIIZEReviewImg4_1'],
			mainImgs['RIIZEReviewImg4_2'],
			mainImgs['RIIZEReviewImg4_3'],
		],
		review5: [
			mainImgs['RIIZEReviewImg5_1'],
			mainImgs['RIIZEReviewImg5_2'],
			mainImgs['RIIZEReviewImg5_3'],
		],
		review6: [
			mainImgs['RIIZEReviewImg6_1'],
			mainImgs['RIIZEReviewImg6_2'],
			mainImgs['RIIZEReviewImg6_3'],
		],
    reviewText1: ['색감이 화면이랑 똑같아서 너무 예뻐요! 데일리룩으로 자주 입을 것 같아요.','재질이 부드럽고 생각보다 두께감이 있어서 한겨울에도 따뜻하게 입을 수 있어요.','핏이 진짜 예술이에요. 허리 라인이 잘 잡혀서 날씬해 보여요.'], reviewText2: ['세탁해도 보풀 안 일어나고 탄탄해서 좋아요.','가격 대비 퀄리티가 좋아서 재구매 의사 있어요.','배송도 빠르고 포장도 깔끔했어요. 기분 좋게 받았습니다.'], reviewText3: ['무난하게 입기 좋아요. 유행 안 탈 디자인이라 오래 입을 듯.','색이 사진보다 조금 어두운데 나름 매력 있어요.','역시 언제나 만족스러워요. 다음번에도 잘 부탁드립니다!!!','배송이 좀 느렸지만 옷은 괜찮았어요.'],reviewText4: ['트렌디한 디자인이라 기분 전환돼요.','얇지만 비침이 거의 없어서 좋아요.','몸매 라인을 예쁘게 살려줘서 좋아요.'], reviewText5: ['기본템으로 강추합니다! 질이 좋아요.','선물용으로 샀는데 받는 분이 너무 좋아했어요.','세탁해도 변형이 거의 없어요.'], reviewText6: ['고급스러운 느낌이 물씬 나서 만족스러워요.','마감이 살짝 아쉽긴 한데 입으면 티는 잘 안 나요.','트렌디한 디자인이라 기분 전환돼요.','가격 대비 퀄리티가 좋아서 재구매 의사 있어요.'],
  },
  {
    id: 5,
    group: '아이유',
    isActive: false,
    price1: '₩31,000', price2: '₩51,000', price3: '₩67,000', price4: '₩31,000', price5: '₩51,000', price6: '₩67,000',
    
    img1: mainImgs['IUImg1'], img2: mainImgs['IUImg2'], img3: mainImgs['IUImg3'], img4: mainImgs['IUImg4'], img5: mainImgs['IUImg5'], img6: mainImgs['IUImg6'],

		img1001: mainImgs['IUImg1001'], img1002: mainImgs['IUImg1002'], img1003: mainImgs['IUImg1003'], img1004: mainImgs['IUImg1004'], img1005: mainImgs['IUImg1005'], img1006: mainImgs['IUImg1006'],

		img2001: mainImgs['IUImg2001'], img2002: mainImgs['IUImg2002'], img2003: mainImgs['IUImg2003'],
    
    title1:'아이유 MARITHÉ 광고', title2:'240524 홍콩 뉴발란스 행사 아이유', title3:'240708 아이유 공항 패션', title4:'20240907 아이유 이슬라이브 페스티벌', title5:'아이유 뉴발란스 화보', title6:'아이유의 팔레트',

    text1:'[MARITHÉ] W CLASSIC LOGO',text2:'[TILL I DIE] Non washed denim skirt_Blue',
    text3:'[RAIVE] Shield Artwork Sweatshirt in Blue', text4:'[NAVIVERSE] Flower Lace Blouse & Skirt',text5:'[윙블링]925실버 디아망 하트 귀걸이',text6:'[noirnine] Bébé Crop Hot-Fix T-Shirts', 
    text1001:'[MARITHÉ]\n W SLIM FIT SQUARE', text1002:'[MARITHÉ]\nW CLASSIC ROUND\nNECK JACKET', text1003:'[MARITHÉ]\nW LONG BERMUDA\nDENIM PANTS', text1004:'[MARITHÉ] \nMOUVEMENT\nFLIP FLOP light blue',text1005:'[MARITHÉ]\nW STRIPE\nKNIT SET-UP',text1006:'[MARITHÉ]\nW CLASSIC LOGO\nTEE purple',
    text2001:'NB',text2002:'BYN', text2003:'J·ESTINA',

    itemLink1:'https://marithe-official.com/product/detail.html?product_no=9142&cate_no=809&display_group=1',
    itemLink2:'https://global.musinsa.com/my/goods/3947512',
    itemLink3:'https://www.wconcept.co.kr/Product/301835515?srsltid=AfmBOooGPLPFI7qB_YgDthpMwECJQkBL4Kfl5ammTO4h1uOUgvEMJ5yg',
    itemLink4:'https://www.29cm.co.kr/products/2709700',
    itemLink5:'https://wingbling.co.kr/product/%EC%95%84%EC%9D%B4%EC%9C%A0%EC%B0%A9%EC%9A%A9-925%EC%8B%A4%EB%B2%84-%EB%94%94%EC%95%84%EB%A7%9D-%ED%95%98%ED%8A%B8-%EA%B7%80%EA%B1%B8%EC%9D%B4/5650/?srsltid=AfmBOopXTz3qnxvI_3UgTN0Mh1bTF36mIkwTpBINHK6tMP6ueby2P2o4',
    itemLink6:'https://www.wconcept.co.kr/Product/301891483?srsltid=AfmBOopr-5qzoy8qSpNynDzniwOGfd0TtF__cctY3Z6rSVce9GS4oUY2',

    itemLink1001:'https://marithe-official.com/product/detail.html?product_no=9144&cate_no=1064&display_group=1',itemLink1002:'https://marithe-official.com/product/detail.html?product_no=9081&cate_no=837&display_group=1',itemLink1003:'https://marithe-official.com/product/detail.html?product_no=9224&cate_no=950&display_group=1',itemLink1004:'https://marithe-official.com/product/detail.html?product_no=9915&cate_no=849&display_group=1',itemLink1005:'https://marithe-official.com/product/detail.html?product_no=9069&cate_no=840&display_group=1',itemLink1006:'https://marithe-official.com/product/detail.html?product_no=8884&cate_no=841&display_group=1',

    itemLink2001:'https://www.nbkorea.com/index.action',
    itemLink2002:'https://www.byn.kr/blackyak',
    itemLink2003:'https://www.jestina.co.kr/',

		review1: [mainImgs['IUReviewImg1_1'], mainImgs['IUReviewImg1_2'], mainImgs['IUReviewImg1_3']],
		review2: [mainImgs['IUReviewImg2_1'], mainImgs['IUReviewImg2_2'], mainImgs['IUReviewImg2_3']],
		review3: [mainImgs['IUReviewImg3_1'], mainImgs['IUReviewImg3_2'], mainImgs['IUReviewImg3_3']],
		review4: [mainImgs['IUReviewImg4_1'], mainImgs['IUReviewImg4_2'], mainImgs['IUReviewImg4_3']],
		review5: [mainImgs['IUReviewImg5_1'], mainImgs['IUReviewImg5_2'], mainImgs['IUReviewImg5_3']],
		review6: [mainImgs['IUReviewImg6_1'], mainImgs['IUReviewImg6_2'], mainImgs['IUReviewImg6_3']],

    reviewText1: ['트렌디한 디자인이라 기분 전환돼요.','얇지만 비침이 거의 없어서 좋아요.','몸매 라인을 예쁘게 살려줘서 좋아요.'], reviewText2: ['세탁해도 보풀 안 일어나고 탄탄해서 좋아요.','촬영용으로 샀는데 화면빨도 좋아요.','배송도 빠르고 포장도 깔끔했어요. 기분 좋게 받았습니다.'], reviewText3: ['무난하게 입기 좋아요. 유행 안 탈 디자인이라 오래 입을 듯.','색이 사진보다 조금 어두운데 나름 매력 있어요.','배송이 좀 느렸지만 옷은 괜찮았어요.'],reviewText4: ['트렌디한 디자인이라 기분 전환돼요.','친구들이 예쁘다고 어디서 샀냐고 물어봤어요.','몸매 라인을 예쁘게 살려줘서 좋아요.'], reviewText5: ['주머니 깊이가 실용적이에요.','봄, 가을용으로 딱이에요.','세탁해도 변형이 거의 없어요.'], reviewText6: ['고급스러운 느낌이 물씬 나서 만족스러워요.','마감이 살짝 아쉽긴 한데 입으면 티는 잘 안 나요.','생각보다 더 포근해서 만족!','적당히 루즈핏이라 체형 커버도 돼요.'],
  },
  {
    id: 6,
    group: 'IVE',
    isActive: false,
    price1: '₩31,000', price2: '₩720,000', price3: '₩36,000', price4: '₩31,000', price5: '₩51,000', price6: '₩67,000',
    img1: mainImgs['IVEImg1'],img2: mainImgs['IVEImg2'],img3: mainImgs['IVEImg3'],img4: mainImgs['IVEImg4'],img5: mainImgs['IVEImg5'], img6: mainImgs['IVEImg6'],
    img1001: mainImgs['IVEImg1001'],img1002: mainImgs['IVEImg1002'],img1003: mainImgs['IVEImg1003'],img1004: mainImgs['IVEImg1004'],
    img2001: mainImgs['IVEImg2001'],img2002: mainImgs['IVEImg2002'],img2003: mainImgs['IVEImg2003'],

    title1:'240212 아이브 Youtube IVE', title2:'250530 아이브', title3:'250203 아이브기자간담회', title4:'240726 레이 공식 인스타그램', title5:'리즈 공항 패션', title6:'안유진 아이브 공식 트위터',

    text1:'[att] Rough ribbon maryjane',text2:'[AVANDRESS] Sopy Collar Short-Sleeve',
    text3:'[낫유어로즈] Hazel dress',  text4:'[OPENING PROJECT] Mesh Pocket Runner',text5:'[2000 Archives] ADDICT CAP',text6:'[KIRSH] 페어아일 니트 가디건',

    text1001:'[lacoste]\n미니케이블\n반팔 가디건', text1002:'[lacoste]\n라피아 버킷햇', text1003:'[lacoste]\n렝글렌\n크로스백', text1004:'[lacoste]\n베이직 옥스포드\n 스트레치 셔츠', text1005:'[lacoste]\n릴랙스핏\n포플린 셔츠', text1006:'[lacoste]\nSUMMER PACK\n 엑스 라지 코튼 토드백',

    text2001: 'VOGUE', text2002: 'DAZED', text2003: 'MIUMIU',

    itemLink1001: 'https://www.net-a-porter.com/en-at/shop/product/polo-ralph-lauren/clothing/casual-jackets/appliqued-embroidered-paneled-cotton-canvas-jacket/1647597359204487',
    itemLink1002: 'https://www.mlb-korea.com/product-detail/3ACPV165N-50BGL?category=MBMB03B01',
    itemLink1003: 'https://m.ssfshop.com/Lucir-zu/GQFC23061214347/good',
    itemLink1004: 'https://kream.co.kr/products/376943',
    itemLink2001: 'https://www.vogue.co.kr/',
    itemLink2002: 'http://www.dazedkorea.com/',
    itemLink2003: 'https://www.miumiu.com/kr/ko.html',

    review1: [mainImgs['IVEReviewImg1_1'], mainImgs['IVEReviewImg1_2'], mainImgs['IVEReviewImg1_3']],
    review2: [mainImgs['IVEReviewImg2_1'], mainImgs['IVEReviewImg2_2'], mainImgs['IVEReviewImg2_3']],
    review3: [mainImgs['IVEReviewImg3_1'], mainImgs['IVEReviewImg3_2'], mainImgs['IVEReviewImg3_3']],
    review4: [mainImgs['IVEReviewImg4_1'], mainImgs['IVEReviewImg4_2'], mainImgs['IVEReviewImg4_3']],
    review5: [mainImgs['IVEReviewImg5_1'], mainImgs['IVEReviewImg5_2'], mainImgs['IVEReviewImg5_3']],
    review6: [mainImgs['IVEReviewImg6_1'], mainImgs['IVEReviewImg6_2'], mainImgs['IVEReviewImg6_3']],

    itemLink1:'https://att-official.com/product/rough-ribbon-maryjane/2356/category/62/display/1/?srsltid=AfmBOooI3NHrKn9awMmMyBwzUA9K6zW88N19Td7izqcsY4-FUvQtVO6W',
    itemLink2:'https://www.celine.com/ko-kr/celine-%EC%97%AC%EC%84%B1/%EC%95%A1%EC%84%B8%EC%84%9C%EB%A6%AC/%EB%AA%A8%EC%9E%90-%EB%B0%8F-%EA%B8%80%EB%9F%AC%EB%B8%8C/%ED%8A%B8%EB%A6%AC%EC%98%B9%ED%94%84-%EB%B2%84%ED%82%B7-%ED%96%87---%EB%9D%BC%ED%94%BC%EC%95%84-2AUP7517Q.03MI.M.html?utm_source=google&utm_medium=cpc&utm_content=brand&utm_campaign=CELINE_FLG_KOR_BRAND_UNI_OTH_OGOING_EC_SHOP_GSHO_CRD_KORE_EUR_NAPP_BESTSELLER&gad_source=1&gad_campaignid=22562151049&gbraid=0AAAAACy3BrXQFtaiGdcr81uU4mPYyUn0P&gclid=CjwKCAjwvuLDBhAOEiwAPtF0VgCBxdms5CxiU3th6l5tafGzU-Pd8xpvqMvSN0bnQyHPq7CizmbI1BoCc80QAvD_BwE',
    itemLink3:'https://www.wconcept.co.kr/Product/306066727?srsltid=AfmBOoo-W0VR6Zt3-eZb9MPr9R10kPor6ZM_Vs355fk7vW3CL_0YB72l',
    itemLink4:'https://www.musinsa.com/products/4017593',
    itemLink5:'https://www.musinsa.com/products/5120357?gad_source=1&gad_campaignid=22483694585&gbraid=0AAAAADl2rsLow-8L7kBuEleKHof1lNPxi&gclid=CjwKCAjwvuLDBhAOEiwAPtF0VsZfOT0pKMlxluvMhZ0OOVeZolZGEeFOzIzl1fVNpCV3znMAqD9BpRoCOf4QAvD_BwE',
    itemLink6:'https://kirsh.co.kr/product/%ED%8E%98%EC%96%B4%EC%95%84%EC%9D%BC-%EB%8B%88%ED%8A%B8-%EA%B0%80%EB%94%94%EA%B1%B4-%EC%82%B4%EB%AA%AC/6442/',

    reviewText1: ['색감이 화면이랑 똑같아서 너무 예뻐요! 데일리룩으로 자주 입을 것 같아요.', '재질이 부드럽고 생각보다 두께감이 있어서 한겨울에도 따뜻하게 입을 수 있어요.', '핏이 진짜 예술이에요. 허리 라인이 잘 잡혀서 날씬해 보여요.'],
    reviewText2: ['세탁해도 보풀 안 일어나고 탄탄해서 좋아요.', '가격 대비 퀄리티가 좋아서 재구매 의사 있어요.', '배송도 빠르고 포장도 깔끔했어요. 기분 좋게 받았습니다.'],
    reviewText3: ['무난하게 입기 좋아요. 유행 안 탈 디자인이라 오래 입을 듯.', '색이 사진보다 조금 어두운데 나름 매력 있어요.', '배송이 좀 느렸지만 옷은 괜찮았어요.'],
    reviewText4: ['트렌디한 디자인이라 기분 전환돼요.', '얇지만 비침이 거의 없어서 좋아요.', '몸매 라인을 예쁘게 살려줘서 좋아요.'],
    reviewText5: ['주머니 깊이가 실용적이에요.', '봄, 가을용으로 딱이에요.', '세탁해도 변형이 거의 없어요.'],
    reviewText6: ['고급스러운 느낌이 물씬 나서 만족스러워요.', '마감이 살짝 아쉽긴 한데 입으면 티는 잘 안 나요.', '트렌디한 디자인이라 기분 전환돼요.', '가격 대비 퀄리티가 좋아서 재구매 의사 있어요.'],
  },
]