import React from 'react';
import { getYouTubeThumbnail } from '../../../../utils/getYouTubeThumbnail';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import './ContentSection.css';

export default function ContentSection({ artist }) {
  const {
    contentMain = {},
    contentList = [],
    contentList_name = [],
    contentList_date = [],
    contentProf = [],
  } = artist;

  const { url: mainUrl, contentMain_name, contentMain_date } = contentMain;
  const openExternal = (url) => window.open(url, '_blank');

  const mainThumb = getYouTubeThumbnail(mainUrl);
  const profIcon = Array.isArray(contentProf) ? contentProf[0] : contentProf;

  const half = Math.ceil(contentList.length / 2);
  const rows = [
    contentList.slice(0, half),
    contentList.slice(half),
  ];

  return (
    <section className="content-section">
      <button className="content-main" onClick={() => openExternal(mainUrl)}>
        <div className="imgBox">
          <img src={mainThumb} alt="대표 동영상 썸네일" />
        </div>
        <div className="icon_name_date">
          <div className="content_icon">
            <img src={`${import.meta.env.BASE_URL}${profIcon}`} alt="소속사 아이콘" />
          </div>
          <div className="content_name_date">
            <span className="content_name">{contentMain_name}</span>
            <span className="content_date">{contentMain_date}</span>
          </div>
        </div>
      </button>

      <div className="content-subContents">
        <span>{artist.contentTitle}</span>
        <div className="content-list">
          {rows.map((row, rowIdx) => (
            <React.Fragment key={rowIdx}>
              {rowIdx === 1 && (
                <span className="content-MV">MV</span>
              )}
              <Swiper
                modules={[Mousewheel]}
                spaceBetween={16}
                slidesPerView="auto"
                mousewheel={{ forceToAxis: true }}
                className="content-swiper"
              >
                {row.map((item, idx) => {
                  const { id, url } = item;
                  const globalIndex = rowIdx * half + idx;
                  return (
                    <SwiperSlide key={id} className="content-item" onClick={() => openExternal(url)}>
                      <button>
                        <div className="imgBox">
                          <img src={getYouTubeThumbnail(url)} alt={`영상 ${id} 썸네일`}/>
                        </div>
                        <div className="content-list-namedate">
                          <span className="content-name">
                            {contentList_name[globalIndex]}
                          </span>
                          <span className="content-date">
                            {contentList_date[globalIndex]}
                          </span>
                        </div>
                      </button>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </React.Fragment>
          ))}
        </div>
      </div>

    </section>
  );
}
