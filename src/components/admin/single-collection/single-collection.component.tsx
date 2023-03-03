import './single-collection.style.scss'

type Collection = {
  _id: string,
  title: string,
  cover: string,
  active: boolean
} 

type ParentCalback = (_id: string) => void

const SingleCollection = ({ collection, parentCallback }: { collection: Collection, parentCallback: ParentCalback }) => {
  console.log({collection})
  const { _id, title, cover } = collection

  const handlePreviewCollection = () => {
    parentCallback(_id)
  }
  
  return (
    <div className='collection-row' onClick={handlePreviewCollection}>
      <div className='collection-title'>
        {title}
      </div>
      <div className='collection-cover'>
        <img src={`${process.env.BACKEND_URL}/uploads/collections/${cover}`} />
      </div>
    </div>
  )
}

export default SingleCollection