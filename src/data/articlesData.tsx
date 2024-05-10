import articleImgMeditationCoshions from '../assets/images/meditation-cushions.jpg'
import articleImgEnchanceYourYogaPractice from '../assets/images/enchance-your-yoga-practice.jpg'
import articleImgYogaAsALifestyle from '../assets/images/yoga-as-a-lifestyle.jpg'

import { ArticleType } from 'shared/types/article'

export const articlesData: ArticleType[] = [
  {
    title: 'Meditation Cushions',
    image: articleImgMeditationCoshions,
    content: 
      `For hundreds of years, there was no specific yoga equipment, 
      so parctising youga required just your body, spirit and mind.
      Today these are still the basics, but most of the modern yoga 
      practitioners feel more comfortable havingaround them a few 
      additional items to make their yoga experience more pleasing.
      Meditation cushions, yoga blosters, yoga blankets and other 
      props can significantly improve your comfort level and posture 
      during meditation. So, once you learn the yoga basics, 
      you may want to by yourselfsome items for your next class.`
  },
  {
    title: 'Enchance Your Yoga Practice',
    image: articleImgEnchanceYourYogaPractice,
    content: (
      <>
        Yoga and aromatherapy are holistic and ancient practices,
        both offering mental and spiritual benefits for the practitioner.
        The use of aromatherapy blends while practicing yoga can enhance 
        the practitioner's experience and benefits from both therapeutic areas.
        <br />
        Not only are the senses enthralled be the beautiful aromas during your 
        practice, but the focus and effects of your practice are intensified 
        by the use of carefully chosen essential oil blends.
      </>
    )
  },
  {
    title: 'Yoga as a Lifestyle',
    image: articleImgYogaAsALifestyle,
    content: 
      `Yoga has always been something more, than just a workout routine.
      The power of yoga lies in its simplicity, flexibility and diversity.
      Yoga is not a religion, yet can be practiced in harmony with any religion.
      It's always been more of a philosophy, a lifestyle for a mind/body balance.
      The main things that yoga will help you to achieve are relaxation after work, 
      much more peaceful state of mind, refreshed body, reenergized mind and body flexibility.`
  }
]