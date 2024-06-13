export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
  }
  
  export interface Article {
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
  }
  