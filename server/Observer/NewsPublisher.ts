import Observer from '../Observer/Observer';

export class NewsPublisher implements Observer {
  private newsFeed: { id: string; title: string; shareableLink: string }[] = [];

  update(event: any): void {
    if (!event || !event.getId || !event.getTitle || !event.shareableLink || !event.getStatus) return;
    const id = event.getId();
    const title = event.getTitle();
    const shareableLink = event.shareableLink;
    const status = event.getStatus();

    // add to news feed on creation 
    if (status === 'PUBLISHED' && !this.newsFeed.find(item => item.id === id)) {
      this.newsFeed.push({ id, title, shareableLink });
    }
    // remove from news feed if event is completed or cancelled
    if (status === 'COMPLETED' || status === 'CANCELLED') {
      this.newsFeed = this.newsFeed.filter(item => item.id !== id);
    }
  }

  addNews(newsItem: { id: string; title: string; shareableLink: string }) {
    this.newsFeed.push(newsItem);
  }

  getNews() {
    return [...this.newsFeed];
  }

  getNewsById(id: string) {
    return this.newsFeed.find(item => item.id === id);
  }

  updateNews(id: string, updates: { title?: string; shareableLink?: string }) {
    let updated = false;
    this.newsFeed = this.newsFeed.map(item => {
      if (item.id === id) {
        updated = true;
        return { ...item, ...updates };
      }
      return item;
    });
    return updated;
  }

  deleteNews(id: string) {
    const originalLength = this.newsFeed.length;
    this.newsFeed = this.newsFeed.filter(item => item.id !== id);
    return this.newsFeed.length < originalLength;
  }
}