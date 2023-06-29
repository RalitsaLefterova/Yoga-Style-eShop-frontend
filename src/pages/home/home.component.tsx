import Feature from 'components/feature/feature.component'
import Article from 'components/article/article.component'

import baner from '../../assets/images/yoga-style-home-baner-1.jpg'
import stailessSteelBottle from '../../assets/images/stainless-steel-bottle.png'
import { FeaturesData } from 'data/featuresData'
import { articlesData } from 'data/articlesData'

import './home.style.scss'

const HomePage = () => (
  <div className='homepage'>

    <div className='main-banner-container'>
      <img src={baner} />
      <span className='centered-text'>Do yoga with style!</span>
    </div>

    <div className='features-container'>
      {FeaturesData.map((feature, index) => (
        <Feature key={index} feature={feature} />
      ))}
    </div>

    <div className='bottles-add-container'>
      <div className='add-img-box'>
        <img src={stailessSteelBottle} />
      </div>

      <div className='rectangular-right'></div>
      <div className='arrow-right'></div>

      <div className='add-text-container center'>
        <div className='add-text-bos-centered'>
          <p className='add-text-big uppercase-text'>
            keep your
          </p>
          <p className='add-text-bigger uppercase-text'>
            cool
          </p>
          <p className='add-text-normal'>
            with our new insulated 
            <br /> 
            stainless steel bottles
          </p>
          <p className='shop-now-link-box'>
            <a className='uppercase-text'>shop now &gt;</a>
          </p>
        </div>
      </div>
    </div>

    <div className='articles-container'>
      {articlesData.map((article, index) => (
        <Article key={index} article={article}  />
      ))}
    </div>

  </div>
)

export default HomePage