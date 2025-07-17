import { Link } from 'react-router-dom'
import service from "../appwrite/service"

function BlogCard({$id, title, subTitle, thumbnail}) {
  return (
    <Link to={`/blog/${$id}`}>
      <div  className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={service.previewThumbnail(thumbnail)} alt={title} className='rounded-xl'/>
            <h2 className='text-xl font-bold'>{title}</h2>
            <h4 className='text-lg font-bold text-gray-700'>{subTitle}</h4>
        </div>
      </div>
     
    </Link>
  )
}

export default BlogCard
