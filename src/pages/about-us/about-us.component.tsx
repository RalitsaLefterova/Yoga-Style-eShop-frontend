import React from 'react'

import aboutUsIntro from '../../assets/images/about-us-intro.jpg'
import aboutUsOurMission from '../../assets/images/about-us-our-mission.jpg'
import aboutUsHappiness from '../../assets/images/about-us-happiness.jpg'

import './about-us.style.scss'

const AboutUsPage = () => (
  <>
    <div className='about-us-container intro'>
      {/* <img src={baner} /> */}
      <div 
        className='img-box'
        style={{backgroundImage: `url(${aboutUsIntro})`}}
      />
      <div className='text-container'>
        <div className='content'>
          <h3>Welcome to Yoga Style,</h3>
          <div className='line' />
          <p>
            your ultimate online destination for high-quality 
            yoga equipment and accessories. We offer a carefully curated collection 
            of yoga essentials, designed to support yogis of all levels in their 
            practice and embrace a healthier, more balanced lifestyle.
          </p>
        </div>
      </div>
    </div>
    <div className='about-us-container our-mission'>
      <div className='text-container'>
        <div className='content'>
          <p>
            At Yoga Style, our mission is to provide yogis with the tools they need 
            to enhance their practice and embrace a healthier, more balanced lifestyle. 
            We prioritize quality, sustainability, and customer satisfaction, collaborating 
            with trusted manufacturers to ensure our products are made from durable 
            and eco-friendly materials. We also strive to create a user-friendly 
            website and provide exceptional customer support, fostering long-lasting 
            relationships with our valued customers.
          </p>
          <div className='line' />
        </div>
      </div>
      <div 
        className='img-box'
        style={{backgroundImage: `url(${aboutUsOurMission})`}}
      />
    </div>
    <div className='about-us-container happiness'>
      <div 
        className='img-box'
        style={{backgroundImage: `url(${aboutUsHappiness})`}}
      />
      <div className='text-container'>
        <div className='content'>
          <div className='line' />
          <p>
            Practicing yoga brings immense happiness and fulfillment into your life. 
            It goes beyond physical exercise, fostering inner peace, self-discovery, 
            resilience, and a sense of community. Yoga Style contributes to this 
            happiness by offering the best quality yoga equipment, clothes, and 
            relaxation goods. Our products are designed to enhance your practice, 
            promote comfort, and create a serene atmosphere. We believe in empowering 
            you on your yoga journey, supporting your connection with yourself 
            and fostering lasting happiness and well-being.
          </p>
        </div>
      </div>
    </div>
  </>
)

export default AboutUsPage