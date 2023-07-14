import Feature from 'components/feature/feature.component'
import Article from 'components/article/article.component'

import baner from '../../assets/images/yoga-style-home-baner-1.jpg'
import stailessSteelBottle from '../../assets/images/stainless-steel-bottle.png'
import { FeaturesData } from 'data/featuresData'
import { articlesData } from 'data/articlesData'

import './home.style.scss'

const HomePage = () => (
  <div className='homepage'>

    <div className='main-baner-container'>
      <img src={baner} />
      <span className='centered-text'>Do yoga with style!</span>
    </div>

    <div className='features-container'>
      {FeaturesData.map((feature, index) => (
        <Feature key={index} feature={feature} />
      ))}
    </div>

    <div className='bottles-add-container'>

      <div 
        className='add-img-box' 
        style={{backgroundImage: `url(${stailessSteelBottle})`}}
      >
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
    </div>

    <div className='articles-container'>
      {articlesData.map((article, index) => (
        <Article key={index} article={article}  />
      ))}
    </div>

  </div>
)

export default HomePage