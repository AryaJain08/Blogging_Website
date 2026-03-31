import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`/api/blogs/${id}`);
                setBlog(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load post');
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return <div className="post-container" style={{ textAlign: 'center', marginTop: '3rem' }}>Loading story...</div>;
    if (error) return <div className="post-container" style={{ color: '#ef4444', textAlign: 'center', marginTop: '3rem' }}>{error}</div>;
    if (!blog) return <div className="post-container" style={{ textAlign: 'center', marginTop: '3rem' }}>Story not found</div>;

    return (
        <article className="post-container">
            <Link to="/" className="post-back" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                &larr; Back to all stories
            </Link>

            {blog.image && (
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="post-image"
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '1rem', marginBottom: '2rem' }}
                />
            )}

            <div className="post-category">
                <span className="badge">{blog.category}</span>
            </div>

            <h1 className="post-title">{blog.title}</h1>

            <div className="post-meta">
                <div className="author-avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {blog.author.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div style={{ fontWeight: '600' }}>{blog.author}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </div>

            <div className="post-content">
                {blog.content}
            </div>
        </article>
    );
}

export default PostDetail;
