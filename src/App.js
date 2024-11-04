import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { fetchArticles } from './services/api';
const Header = lazy(() => import('./components/Header'));
const ArticleList = lazy(() => import('./components/ArticleList'));
const Footer = lazy(() => import('./components/Footer'));
const Preferences = lazy(() => import('./components/Preferences'));
const FilterDialog = lazy(() => import('./components/FilterDialog'));
const DetailedNews = lazy(() => import('./components/DetailedNews'));

const App = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [date, setDate] = useState('');
  const [source, setSource] = useState('');
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
    authors: '',
  });
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setPage(1);
    getArticles(search, filter, date, source, preferences);
  }, [search, filter, date, source, preferences]);

  const getArticles = async (
    searchs,
    filters,
    dates,
    sources,
    preference,
    pageNum
  ) => {
    setLoading(true);
    try {
      const fetchedArticles = await fetchArticles(
        searchs,
        filters,
        dates,
        sources,
        preference,
        pageNum
      );
      setArticles([...fetchedArticles]);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterDialogOpen = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterDialogClose = () => {
    setFilterDialogOpen(false);
  };

  const clearFilter = () => {
    setFilter('');
    setDate('');
    setSource('');
    setSearch('');
    setPage(1);
  };

  const handleFilterChange = (newSearch, newFilter, newDate, newSource) => {
    setSearch(newSearch);
    setFilter(newFilter);
    setDate(newDate);
    setSource(newSource);
  };
  const hasActiveFilter = search || filter || date || source;
  const hasActivePreferences =
    preferences.sources.length > 0 ||
    preferences.categories.length > 0 ||
    preferences.authors.length > 0;

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Suspense fallback={<CircularProgress />}>
        {location.pathname !== '/news/detailed-news/:id' && (
          <Header
            search={search}
            setSearch={(val) => handleFilterChange(val, filter, date, source)}
            filter={filter}
            setFilter={(val) => handleFilterChange(search, val, date, source)}
            date={date}
            setDate={(val) => handleFilterChange(search, filter, val, source)}
            source={source}
            setSource={(val) => handleFilterChange(search, filter, date, val)}
            openFilterDialog={handleFilterDialogOpen}
            openPreferences={() => setPreferencesOpen(true)}
            hasActiveFilter={hasActiveFilter}
            hasActivePreferences={hasActivePreferences}
          />
        )}
        <Box sx={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          <Routes>
            <Route path='/' element={<Navigate to='/news' />} />
            <Route
              path='/news'
              element={
                <ArticleList
                  articles={articles}
                  page={page}
                  setPage={setPage}
                  loading={loading}
                />
              }
            />
            <Route
              path='/news/detailed-news/:id'
              element={<DetailedNews articles={articles} />}
            />
          </Routes>
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <Footer />
        </Box>
        <Preferences
          open={preferencesOpen}
          onClose={() => setPreferencesOpen(false)}
          preferences={preferences}
          setPreferences={setPreferences}
          clearFilter={clearFilter}
        />
        <FilterDialog
          open={filterDialogOpen}
          onClose={handleFilterDialogClose}
          date={date}
          setDate={setDate}
          filter={filter}
          setFilter={setFilter}
          source={source}
          setSource={setSource}
          preferences={preferences}
        />
      </Suspense>
    </Box>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
