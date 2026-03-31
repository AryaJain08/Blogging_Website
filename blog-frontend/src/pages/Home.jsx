import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('/api/blogs');
                setBlogs(res.data);
            } catch (err) {
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading stories...</div>;

    return (
        <div>
            <div className="hero-header">
                <h1>Escape into Stories</h1>
                <p className="hero-subtitle">Discover perspectives on Technology, Lifestyle, and Development from leading authors.</p>
            </div>

            {blogs.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>No stories yet. Be the first to share your thoughts!</p>
                    <div style={{ marginTop: '1rem' }}>
                        <Link to="/create" className="btn btn-primary">Write a Story</Link>
                    </div>
                </div>
            ) : (
                <div className="blog-grid">
                    {blogs.map(blog => (
                        <Link to={`/post/${blog.id}`} key={blog.id} className="card">
                            {blog.image && (
                                <img src={blog.image} alt={blog.title} className="card-img" />
                            )}
                            <h2 className="card-title">{blog.title}</h2>
                            <div className="card-meta">
                                <span className="badge">{blog.category}</span>
                                <span>By <strong style={{ color: 'var(--primary-color)' }}>{blog.author}</strong></span>
                                <span>• {new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="card-excerpt">
                                {blog.content
                                    ? `${blog.content.substring(0, 120)}...`
                                    : `A quick look at "${blog.title}".`}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
