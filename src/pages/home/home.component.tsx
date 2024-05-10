import Feature from 'components/feature/feature.component'
import Article from 'components/article/article.component'

import logo from '../../assets/logo.png';
import baner from '../../assets/images/yoga-style-home-baner-1.jpg'
import stailessSteelBottle from '../../assets/images/stainless-steel-bottle.png'
import waterSplash from '../../assets/images/water-splash-on-transparent.png';
import waterSplashWithDroplets from '../../assets/images/water-splash-with-droplets.png';
import { FeaturesData } from 'data/featuresData'
import { articlesData } from 'data/articlesData'

import './home.style.scss'

const HomePage = () => (
  <div className='homepage'>

    <section className='main-baner-container'>
      <img src={baner} />
        <img className='logo-with-text' src={logo} alt="Yoga Style logo" />
        <span className='centered-text'>Do Yoga With Style!</span>
    </section>

    <section className='features-container'>
      {FeaturesData.map((feature, index) => (
        <Feature key={index} featureProps={feature} />
      ))}
    </section>

    <section className='bottles-add-container'>

      <div className='add-img-box'>
        {/* <div 
          className='splash-img'
          style={{backgroundImage: `url(${waterSplash})`}}
        >
        </div> */}
        <img src={stailessSteelBottle} />
      </div>

      <div className='add-text-container center'>
        <p className='font-size-3em uppercase-text'>
          keep your
        </p>
        <p className='font-size-5em uppercase-text'>
          cool
        </p>
        <p className='font-size-1-5em'>
          with our new insulated 
          <br /> 
          stainless steel bottles
        </p>
        <a className='uppercase-text margin-top-40px font-size-1-5em'>shop now &gt;</a>
      </div>
    </section>

    <section className='articles-container'>
      {articlesData.map((article, index) => (
        <Article key={index} articleProps={article}  />
      ))}
    </section>

  </div>
)

export default HomePage