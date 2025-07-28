import React      from 'react'
import Footer     from '../../components/Footer'
import {Link}     from 'react-router-dom'
import {images} from '../../assets/Home/images'
import './Home.css'



const Home = () => {
    // 아티스트 배열
    const Artists = [
    {id: 'riize', name: 'RIIZE', hasBadge: true},
    {id: 'iu',    name: '아이유'},
    {id: 'txt',   name: 'TXT'},
    {id: 'aespa', name: 'AESPA'},
    {id: 'ive',   name: '아이브'},
    {id : '',     name: '', isComingSoon: true},
    ]

    // 데코 배열
    const decos = [
      'note','camera','heart','heart2','stars',
      'pink4','pink7','pink7','pink7','pink8','pink9','pink10',
      'pink11','pinkstar','purple6','purple7','purple8'
    ];


return (
    <section className="home">
    <div className="home-superContainer">
      <div className="home-container">
        <div className="inner">
          <h2 className="title">ARTIST</h2>
          <ul className="artistList">
            {Artists.map((a, i) => {
              const src = a.isComingSoon ? images.comingsoon : images[a.id];
              return (
                <li key={i} className="artist-card">
                  {a.id ? (
                    <Link to={`/artist/${a.id}`}>
                      <div className="imgBox">
                        <img src={src} alt={a.name} />
                        <div className="nameBox">
                          <span className="artist-name">{a.name}</span>
                        </div>
                        {a.hasBadge && <span className="new-badge">NEW</span>}
                      </div>
                    </Link>
                  ) : (
                    <div className="imgBox disabled">
                      <img src={src} alt="Coming Soon" />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
            {/* 데코레이션 */}
      <div className="imgDeco">
        {decos.map((key, idx) => (
          <div 
          key={`${key}-${idx}`} 
          className={`imgBox_${key} imgBox_${key}-${idx}`}>
          <img src={images[key]} alt={key} />
          </div>
        ))}
      </div>
    </div>






      <div className="footer-container">
        <Footer />
      </div>
    </section>
  );
};

export default Home;