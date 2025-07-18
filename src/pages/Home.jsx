import React, { useState, useEffect } from 'react'
import { Container, BlogCard } from '../components'
import service from '../appwrite/service'

function Home() {
    const [blogs, setBlogs] = useState([]);

    useEffect((() => {
        service.getAllBlogs([]).then((blogs) => setBlogs(blogs))
    }), [])

    if (blogs.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read blogs
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {blogs.map((blog) => (
                        <div key={blog.$id} className='p-2 w-1/4'>
                            <BlogCard {...blog} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
