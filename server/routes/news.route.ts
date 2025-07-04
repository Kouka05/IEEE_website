import { Router, Request, Response } from 'express';
import { newsPublisherInstance } from '../Observer/newsPublisherInstance';

const router = Router();

// create news item
router.post('/', (req: Request, res: Response) => {
  const { id, title, shareableLink } = req.body;
  if (!id || !title || !shareableLink) {
    res.status(400).json({ success: false, error: 'id, title, and shareableLink are required' });
    return;
  }
  newsPublisherInstance.addNews({ id, title, shareableLink });
  res.status(201).json({ success: true });
});

// get all news
router.get('/', (req, res) => {
  res.json({ newsFeed: newsPublisherInstance.getNews() });
});

// get news by id
router.get('/:id', (req, res) => {
  const newsItem = newsPublisherInstance.getNewsById(req.params.id);
  if (!newsItem) {
    res.status(404).json({ success: false, error: 'News item not found' });
    return;
  }
  res.json({ newsItem });
});

// update news by id
router.put('/:id', (req, res) => {
  const { title, shareableLink } = req.body;
  const updated = newsPublisherInstance.updateNews(req.params.id, { title, shareableLink });
  if (!updated) {
    res.status(404).json({ success: false, error: 'News item not found' });
    return;
  }
  res.json({ success: true });
});

// delete news by id
router.delete('/:id', (req, res) => {
  const deleted = newsPublisherInstance.deleteNews(req.params.id);
  if (!deleted) {
    res.status(404).json({ success: false, error: 'News item not found' });
    return;
  }
  res.json({ success: true });
});

export default router; 