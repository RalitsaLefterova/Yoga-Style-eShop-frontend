import { ArticleType } from 'shared/types/article'

import './article.style.scss'

type ArticleProps = {
  articleProps: ArticleType
}

const Article = ({ articleProps }: ArticleProps) => {
  const { title, image, content } = articleProps
  return (
    <article className='article-box'>
        <h2>{title}</h2>
        <div className='article-image-box'>
          <img src={image} />
        </div>
        <div className='article-text-box'>
          {content}
        </div>
      </article>
  )
}

export default Article