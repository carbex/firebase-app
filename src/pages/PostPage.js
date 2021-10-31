import React from 'react'
import Layout from '../components/layout/Layout'
import Post from '../components/post/Post'

const PostPage = (props) => {
    return (
        <Layout>
            <Post {...props}/>
        </Layout>
    )
}

export default PostPage
