import React , {useState, useEffect} from 'react'
import { Container, BlogCard } from '../components'
import service from '../appwrite/service'

function AllBlogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect((()=>{
        service.getAllBlogs([]).then((blogs)=>setBlogs(blogs))
    }),[])

  return (
    <div className='py-8'>
      <Container>
        <div className='flex flex-wrap'>
            {blogs.map((blog) => (
                <div key={blog.$id} className='p-2 w-1/4'>
                    <BlogCard blog={blog} />
                </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export default AllBlogs
