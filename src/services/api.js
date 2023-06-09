import axios from 'axios';

export class ImagesApiService {
  constructor() {
    this.searchQuery = '';
  }

  async getImages(page) {
    try {
      const response = await axios.get('https://pixabay.com/api', {
        params: {
          key: '33981383-7f4227d9f376dfc0e6fd14470',
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: page,
          per_page: 12,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
