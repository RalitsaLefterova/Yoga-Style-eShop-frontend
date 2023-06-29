import { Article } from 'shared/types/article'

import './article.style.scss'

type ArticleProps = {
  article: Article
}

const Article = ({ article }: ArticleProps) => {
  const { title, image, content } = article
  return (
    <div className='article-box'>
        <h2>{title}</h2>
        <div className='article-image-box'>
          <img src={image} />
        </div>
        <div className='article-text-box'>
          {content}
        </div>
      </div>
  )
}

export default Article