import React, { useState } from 'react';
import './News.css'; // Import the separated CSS file

// --- TYPE DEFINITIONS ---
interface NewsArticle {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
}

// --- MOCK DATA ---
const newsData: NewsArticle[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    imageUrl: '', // Placeholder
    title: 'Local Chapter. Global Impact.',
    content: `This is the full content for the news article titled "Local Chapter. Global Impact." Article number ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
}));

// --- REUSABLE ICON COMPONENT ---
const PlaceholderIcon = () => (
    <svg className="placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 18M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// --- NEWS CARD COMPONENT ---
const NewsCard: React.FC<{ article: NewsArticle; onSelect: (article: NewsArticle) => void; }> = ({ article, onSelect }) => (
    <div className="news-card" onClick={() => onSelect(article)}>
        <div className="news-card-image-placeholder"><PlaceholderIcon /></div>
        <div className="news-card-title">{article.title}</div>
    </div>
);

// --- NEWS LIST PAGE COMPONENT ---
const NewsListPage: React.FC<{ onSelectArticle: (article: NewsArticle) => void; }> = ({ onSelectArticle }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;
    const totalPages = Math.ceil(newsData.length / articlesPerPage);
    const paginatedArticles = newsData.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="news-page-container">
            <header className="news-header">
                <div className="news-header-content">
                    <h1 className="news-header-title">Latest News</h1>
                </div>
            </header>
            <div className="news-grid">
                {paginatedArticles.map(article => <NewsCard key={article.id} article={article} onSelect={onSelectArticle} />)}
            </div>
            <div className="pagination">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                {[...Array(totalPages).keys()].map(num => (
                    <button key={num + 1} onClick={() => goToPage(num + 1)} className={currentPage === num + 1 ? 'active' : ''}>
                        {num + 1}
                    </button>
                ))}
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
            </div>
        </div>
    );
};

// --- NEWS DESCRIPTION PAGE COMPONENT ---
const NewsDescriptionPage: React.FC<{ article: NewsArticle; onBack: () => void; }> = ({ article, onBack }) => (
    <div className="news-detail-container">
        <button onClick={onBack} className="back-button">&larr; Back to News</button>
        <div className="news-detail-body">
            <h1 className="news-detail-title">{article.title}</h1>
            <div className="news-detail-image-placeholder"><PlaceholderIcon /></div>
            <p className="news-detail-content">{article.content}</p>
        </div>
    </div>
);

// --- MAIN APP COMPONENT ---
const News: React.FC = () => {
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

    const handleSelectArticle = (article: NewsArticle) => setSelectedArticle(article);
    const handleBackToNewsList = () => setSelectedArticle(null);

    return (
        <div>
            {selectedArticle ? (
                <NewsDescriptionPage article={selectedArticle} onBack={handleBackToNewsList} />
            ) : (
                <NewsListPage onSelectArticle={handleSelectArticle} />
            )}
        </div>
    );
};

export default News;