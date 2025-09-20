import React, { useEffect, useState } from 'react';
import './News.css';

// --- 1. TYPE DEFINITIONS ---
interface NewsArticle {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
}

// --- 2. MOCK DATA & API SIMULATION ---
const newsData: NewsArticle[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    imageUrl: '',
    title: 'Local Chapter. Global Impact.',
    content: `This is the full content for the news article titled "Local Chapter. Global Impact." Article number ${i + 1}. Lorem ipsum dolor sit amet...`,
}));

// This function simulates the native fetch() API for demonstration purposes.
const mockFetch = (url: string): Promise<{ ok: boolean; json: () => Promise<any> }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (url === '/api/news') {
                resolve({
                    ok: true,
                    json: () => Promise.resolve(newsData),
                });
            } else if (url.startsWith('/api/news/')) {
                const id = parseInt(url.split('/')[3], 10);
                const article = newsData.find(a => a.id === id);
                resolve({
                    ok: true,
                    json: () => Promise.resolve(article),
                });
            }
        }, 500); // 500ms network delay
    });
};


// --- 3. REUSABLE COMPONENTS ---

const PlaceholderIcon: React.FC = () => (
    <svg className="placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 18M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const NewsCard: React.FC<{ article: NewsArticle; onSelect: (article: NewsArticle) => void; }> = ({ article, onSelect }) => (
    <div className="news-card" onClick={() => onSelect(article)}>
        <div className="news-card-image-placeholder"><PlaceholderIcon /></div>
        <div className="news-card-title">{article.title}</div>
    </div>
);

const NewsListPage: React.FC<{ onSelectArticle: (article: NewsArticle) => void; }> = ({ onSelectArticle }) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;

    useEffect(() => {
        // Fetch the list of all news articles
        const fetchNews = async () => {
            const response = await mockFetch('/api/news'); // Using the mock fetch
            if (response.ok) {
                const data = await response.json();
                setArticles(data);
            }
        };

        fetchNews();
    }, []);

    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const paginatedArticles = articles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="news-page-container">
            <header className="news-header reveal reveal-slow">
                <div className="news-header-content">
                    <h1 className="news-header-title">Latest News</h1>
                </div>
            </header>
            <div className="news-grid">
                {articles.length === 0 ? (
                    <p className="reveal reveal-slow" style={{textAlign:'center', width: '100%'}}>Loading news...</p>
                ) : (
                    paginatedArticles.map((article, idx) => (
                        <div key={article.id} className="reveal reveal-slow" style={{ '--reveal-delay': `${idx * 60}ms` } as React.CSSProperties}>
                            <NewsCard article={article} onSelect={onSelectArticle} />
                        </div>
                    ))
                )}
            </div>
            {articles.length > 0 && (
                 <div className="pagination reveal reveal-slow">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                    {[...Array(totalPages).keys()].map(num => (
                        <button key={num + 1} onClick={() => goToPage(num + 1)} className={currentPage === num + 1 ? 'active' : ''}>
                            {num + 1}
                        </button>
                    ))}
                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
                </div>
            )}
        </div>
    );
};

const NewsDescriptionPage: React.FC<{ article: NewsArticle; onBack: () => void; }> = ({ article, onBack }) => {
    const [currentArticle, setCurrentArticle] = useState<NewsArticle | null>(null);

    useEffect(() => {
        // Fetch the details for a single news article
        const fetchArticleDetails = async () => {
            const response = await mockFetch(`/api/news/${article.id}`); // Using mock fetch with ID
            if (response.ok) {
                const data = await response.json();
                setCurrentArticle(data);
            }
        };

        fetchArticleDetails();
    }, [article.id]);

    return (
        <div className="news-detail-container">
            <button onClick={onBack} className="back-button">← Back to News</button>
            {currentArticle ? (
                <div className="news-detail-body">
                    <h1 className="news-detail-title">{currentArticle.title}</h1>
                    <div className="news-detail-image-placeholder"><PlaceholderIcon /></div>
                    <p className="news-detail-content">{currentArticle.content}</p>
                </div>
            ) : (
                <p style={{color:'black', textAlign:'center'}}>Loading article details...</p>
            )}
        </div>
    );
};

// --- 4. MAIN COMPONENT TO EXPORT ---
const News: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'list' | 'details'>('list');
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

    const handleSelectArticle = (article: NewsArticle) => {
        setSelectedArticle(article);
        setCurrentPage('details');
    };

    const handleBackToList = () => {
        setSelectedArticle(null);
        setCurrentPage('list');
    };

    return (
        <div>
            {currentPage === 'list' ? (
                <NewsListPage onSelectArticle={handleSelectArticle} />
            ) : selectedArticle ? (
                <NewsDescriptionPage article={selectedArticle} onBack={handleBackToList} />
            ) : null}
        </div>
    );
};

export default News;