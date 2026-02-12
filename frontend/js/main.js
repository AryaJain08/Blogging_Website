// Fallback blogs if API is down
const fallbackBlogs = [
  { _id: "1", title: "How AI is Transforming Content Creation", desc: "Discover how artificial intelligence is revolutionizing the way we write and create content in 2026.", category: "Technology", authorName: "Sarah Chen", date: "Jan 15, 2026", readTime: 8, image: "https://picsum.photos/seed/ai-technology/800/600", content: "<h2>The Rise of AI</h2><p>Artificial intelligence has fundamentally changed how writers approach their craft.</p>" },
  { _id: "2", title: "Minimalism in Web Design: Less is More", desc: "Learn why clean, minimal UI design creates better user experiences and improves conversion rates.", category: "Design", authorName: "Marcus Johnson", date: "Jan 12, 2026", readTime: 6, image: "https://picsum.photos/seed/web-design/800/600", content: "<h2>Understanding Minimalist Design</h2><p>Minimalism in web design removes unnecessary elements.</p>" },
  { _id: "3", title: "Remote Work Culture: The New Normal", desc: "Exploring how remote work has reshaped workplace dynamics and employee well-being.", category: "Lifestyle", authorName: "Emma Rodriguez", date: "Jan 10, 2026", readTime: 7, image: "https://picsum.photos/seed/remote-work/800/600", content: "<h2>The Evolution of Work</h2><p>The pandemic accelerated a shift in remote work.</p>" },
  { _id: "4", title: "The Psychology Behind Habit Formation", desc: "Science-backed strategies to build lasting habits and break destructive patterns.", category: "Self-Improvement", authorName: "Dr. James Wilson", date: "Jan 8, 2026", readTime: 10, image: "https://picsum.photos/seed/habits-motivation/800/600", content: "<h2>Understanding Habit Loops</h2><p>Our brains are hardwired to form habits.</p>" },
  { _id: "5", title: "Sustainable Living: Making a Difference", desc: "Practical tips for reducing your carbon footprint and living more sustainably.", category: "Environment", authorName: "Green Warriors Team", date: "Jan 5, 2026", readTime: 9, image: "https://picsum.photos/seed/sustainable-nature/800/600", content: "<h2>Why Sustainable Living Matters</h2><p>Climate change is happening now.</p>" },
  { _id: "6", title: "Mastering Photography Composition", desc: "Essential composition techniques that transform ordinary photos into stunning images.", category: "Photography", authorName: "Alex Photography", date: "Jan 3, 2026", readTime: 8, image: "https://picsum.photos/seed/photography-camera/800/600", content: "<h2>The Rule of Thirds</h2><p>Fundamental composition rule divides your frame.</p>" },
  { _id: "7", title: "The Future of Education Technology", desc: "How EdTech is revolutionizing learning and making quality education accessible to everyone.", category: "Education", authorName: "Prof. Linda Martinez", date: "Dec 30, 2025", readTime: 11, image: "https://picsum.photos/seed/education-learning/800/600", content: "<h2>Digital Transformation</h2><p>Education technology breaks down barriers.</p>" },
  { _id: "8", title: "Financial Literacy for Beginners", desc: "Essential money management skills everyone should know to build wealth and security.", category: "Finance", authorName: "David Finance Guru", date: "Dec 28, 2025", readTime: 9, image: "https://picsum.photos/seed/finance-money/800/600", content: "<h2>Building Financial Foundation</h2><p>Financial literacy is a valuable skill.</p>" }
];

// Global blogs variable
let blogs = [];

// Load blogs from API or use fallback
async function loadBlogs() {
  try {
    const response = await fetch('http://localhost:5000/api/blogs', { timeout: 3000 });
    if (!response.ok) throw new Error('API not available');
    const data = await response.json();
    blogs = data.blogs || fallbackBlogs;
  } catch (err) {
    console.log('Using fallback blogs:', err.message);
    blogs = [...fallbackBlogs];
  }
  
  // Add locally saved blogs
  const userBlogs = JSON.parse(localStorage.getItem('userBlogs') || '[]');
  blogs = [...blogs, ...userBlogs];
  
  // Ensure we always have blogs
  if (!blogs || blogs.length === 0) {
    blogs = [...fallbackBlogs];
  }
}

// Get random blogs
function getRandomBlogs(count = 3) {
  let shuffled = [...blogs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Render blogs to grid
function renderBlogs(blogsToShow, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  
  grid.innerHTML = '';
  blogsToShow.forEach(blog => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${blog.image}" alt="${blog.title}">
        <div class="card-badge">${blog.category}</div>
      </div>
      <div class="card-body">
        <h3>${blog.title}</h3>
        <p>${blog.desc}</p>
        <div class="card-meta">
          <span>${blog.authorName}</span>
          <span>${blog.readTime} min read</span>
        </div>
        <a href="blog.html?id=${blog._id}" class="read-more">Read More →</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Filter blogs
function filterBlogs(category) {
  if (category === 'All') return blogs;
  return blogs.filter(b => b.category === category);
}

// Setup page
document.addEventListener('DOMContentLoaded', async function() {
  await loadBlogs();

  // Homepage blogs
  if (document.getElementById('blogGrid')) {
    renderBlogs(getRandomBlogs(3), 'blogGrid');
  }

  // Explore page
  if (document.getElementById('exploreGrid')) {
    renderBlogs(blogs, 'exploreGrid');
    setupFilterButtons();
  }
});

// Filter buttons for explore page
function setupFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const category = e.target.textContent.trim();
      const filtered = filterBlogs(category);
      renderBlogs(filtered, 'exploreGrid');
    });
  });
}