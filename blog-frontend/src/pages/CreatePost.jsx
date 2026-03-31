import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Technology');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axios.post('/api/blogs', { title, category, content, image });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create post');
            setLoading(false);
        }
    };

    const categories = ['Technology', 'Development', 'Lifestyle', 'Food & Drink', 'Announcements', 'General'];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2rem' }}>Write a New Story</h1>

            {error && <div style={{ color: '#ef4444', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem' }}>{error}</div>}

            <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
                <div className="form-group">
                    <label className="form-label">Story Title</label>
                    <input
                        type="text"
                        className="form-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give your story a catchy title..."
                        style={{ fontSize: '1.25rem', padding: '1rem' }}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                        className="form-input"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Cover Image URL (Optional)</label>
                    <input
                        type="url"
                        className="form-input"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Story Content</label>
                    <textarea
                        className="form-input form-textarea"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tell your story..."
                        style={{ minHeight: '300px' }}
                        required
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                    <button type="button" onClick={() => navigate('/')} className="btn btn-outline">Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Publishing...' : 'Publish Story'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
