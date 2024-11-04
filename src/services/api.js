import axios from 'axios';

const GUARDIAN_API_KEY = 'test';
const NYTIMES_API_KEY = 'i86DQyU5bge61GkYI8GyeoGWm1AiiafL';
const NEWS_API_KEY = '773f3482f24d49f2ad325e7b3f80dc3a';

const getDateFilter = (date) => {
  const today = new Date();
  switch (date) {
    case 'today':
      return today.toISOString().split('T')[0];
    case 'week':
      const weekAgo = new Date(today.setDate(today.getDate() - 7));
      return weekAgo.toISOString().split('T')[0];
    case 'month':
      const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
      return monthAgo.toISOString().split('T')[0];
    default:
      return '';
  }
};

const buildQuery = (search, dateFilter, category, apiKey, source) => {
  if (source === 'guardian') {
    return `https://content.guardianapis.com/search?${
      search ? `q=${search}&` : ''
    }${category ? `section=${category}&` : ''}page-size=50&${
      dateFilter ? `from-date=${dateFilter}&` : ''
    }api-key=${apiKey}`;
  } else if (source === 'nytimes') {
    return `https://api.nytimes.com/svc/search/v2/articlesearch.json?${
      dateFilter ? `begin_date=${dateFilter.replace(/-/g, '')}&` : ''
    }${search ? `q=${search}&` : ''}facet=true&facet_fields=section_name&${
      category ? `fq=("${category}")&` : ''
    }api-key=${apiKey}`;
  } else if (source === 'newsapi') {
    return `https://newsapi.org/v2/top-headlines?${
      search ? `q=${search}&` : ''
    }${dateFilter ? `from-date=${dateFilter}&` : ''}${
      category ? `section=${category}&` : ''
    }language=en&apiKey=${apiKey}`;
  }
  return '';
};
const randomAuthors = [
  'John Doe',
  'Jane Smith',
  'Alex Johnson',
  'Chris Lee',
  'Taylor Brown',
  'Jordan White',
];
const randomImg = [
  'https://www.digitaltrends.com/wp-content/uploads/2024/09/roku-fubo.jpg?resize=1200%2C630&p=1',
  'https://gizmodo.com/app/uploads/2024/10/soccer_lady1.jpg',
  'https://ichef.bbci.co.uk/news/1024/branded_sport/980e/live/db55e8d0-7fea-11ef-ad45-893aa022fcbc.png',
  'https://gizmodo.com/app/uploads/2024/10/garmin-fenix-7x-solar.jpg',
  'https://www.cnet.com/a/img/resize/a51721727ac6b71b8d078d611ca37505b9006739/hub/2024/10/16/ae3b5078-3ced-47c9-91dd-6b5b1b1a5809/connections-sports-edition-6832.jpg?auto=webp&fit=crop&height=675&width=1200',
  'https://api.time.com/wp-content/uploads/2024/10/turf-tank-two.jpeg?quality=85&w=1200&h=628&crop=1',
  'https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/0d65/live/efdf49b0-7fde-11ef-83dd-fbf1b9732cf0.jpg',
];
const getRandomAuthor = () =>
  randomAuthors[Math.floor(Math.random() * randomAuthors.length)];
const getRandomImage = () =>
  randomImg[Math.floor(Math.random() * randomImg.length)];

const normalizeData = (data, source) => {
  if (source === 'newsapi') {
    return data.map((item) => ({
      title: item.title,
      description: item.description || '',
      imageUrl: item.urlToImage || getRandomImage(),
      link: item.url,
      source: item.source.name || 'NewsAPI',
      author: item.author || getRandomAuthor(),
    }));
  } else if (source === 'nytimes') {
    return data.map((item) => ({
      title: item.abstract,
      description: item.lead_paragraph || '',
      imageUrl: item.multimedia.length
        ? `https://www.nytimes.com/${item.multimedia[0].url}`
        : getRandomImage(),
      link: item.web_url,
      source: 'The New York Times',
      author: item.author || getRandomAuthor(),
    }));
  } else if (source === 'guardian') {
    return data.map((item) => ({
      title: item.webTitle || '',
      description: item.webPublicationDate || '',
      imageUrl: getRandomImage(),
      link: item.webUrl || '',
      source: 'The Guardian',
      author: item.author || getRandomAuthor(),
    }));
  }
  return [];
};

export const fetchArticles = async (
  search,
  filter,
  date,
  filterSource,
  preferences
) => {
  const dateFilter = getDateFilter(date);
  const sources = filterSource
    ? [filterSource]
    : preferences.sources && preferences.sources.length
    ? preferences.sources
    : ['guardian', 'nytimes', 'newsapi'];
  const category = filter ? filter : '';

  const queries = sources.map((source) =>
    axios
      .get(
        buildQuery(
          search,
          dateFilter,
          category,
          source === 'guardian'
            ? GUARDIAN_API_KEY
            : source === 'nytimes'
            ? NYTIMES_API_KEY
            : NEWS_API_KEY,
          source
        )
      )
      .then((response) =>
        normalizeData(
          response.data.articles ||
            response.data.response?.results ||
            response.data.response?.docs ||
            [],
          source
        )
      )
      .catch((error) => {
        console.error(`Error fetching from ${source}:`, error);
        return [];
      })
  );

  const responses = await Promise.all(queries);
  let articles = responses.flat();

  if (preferences.authors && preferences.authors.length > 0) {
    articles = articles.filter((article) =>
      preferences.authors.includes(article.author)
    );
  }

  return articles;
};
