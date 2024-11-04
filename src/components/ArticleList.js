import React from 'react';
import ArticleCard from './ArticleCard';
import {
  Grid,
  Box,
  Typography,
  Pagination,
  CircularProgress,
} from '@mui/material';
import NoDataImage from '../assets/noData.jpg';

const ArticleList = ({ articles, page, setPage, loading }) => {
  const articlesPerPage = 4;

  const filteredArticles = articles.filter(
    (article) => article.title !== '[Removed]'
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedArticles = filteredArticles.slice(
    (page - 1) * articlesPerPage,
    page * articlesPerPage
  );

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredArticles.length > 0 ? (
            paginatedArticles.map((article, index) => (
              <Grid item xs={12} sm={12} md={12} key={index}>
                <ArticleCard article={article} />
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '24px',
              }}
            >
              <img
                src={NoDataImage}
                alt='No data'
                style={{ maxWidth: '100%', width: '50%', height: 'auto' }}
              />
              <Typography
                variant='h6'
                color='textSecondary'
                sx={{ marginTop: '16px' }}
              >
                No data available for the applied filter
              </Typography>
            </Box>
          )}
        </Grid>
      )}
      {!loading && filteredArticles.length > articlesPerPage && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '24px',
          }}
        >
          <Pagination
            count={Math.ceil(filteredArticles.length / articlesPerPage)}
            page={page}
            onChange={handleChangePage}
            color='primary'
          />
        </Box>
      )}
    </Box>
  );
};

export default ArticleList;
