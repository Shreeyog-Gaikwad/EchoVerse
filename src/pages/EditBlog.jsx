import React, {useEffect, useState} from 'react'
import service from '../appwrite/service'
import { Container, BlogForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom';

function EditBlog() {

    const [blog, setBlog] = useState([]);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect((()=>{
        if(slug){
            service.getBlog(slug).then((blog)=>setBlog(blog))
        }
        else{
            navigate('/');
        }
    }), [])

  return blog ? (
    <Container>
        <BlogForm blog={blog} />
    </Container>
  ) : null;
}

export default EditBlog
