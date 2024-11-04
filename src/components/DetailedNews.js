import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from '@mui/material';

const DetailedNews = ({ articles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const article = articles.find(
    (article) => article.link === decodeURIComponent(id)
  );

  useEffect(() => {
    setLoading(true);
  }, [id]);

  if (!article) {
    return <Typography variant='h6'>Article not found</Typography>;
  }

  return (
    <Box sx={{ padding: '24px' }}>
      <Button variant='contained' onClick={() => navigate('/news')}>
        Back
      </Button>
      <Card sx={{ marginTop: '16px' }}>
        {loading && (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', padding: '24px' }}
          >
            <CircularProgress />
          </Box>
        )}
        <CardMedia
          component='img'
          height='auto'
          image={article.imageUrl || ''}
          alt={article.title}
          onLoad={() => setLoading(false)}
          sx={{ display: loading ? 'none' : 'block' }}
        />
        <CardContent>
          <Typography variant='h4' sx={{ marginBottom: '16px' }}>
            {article.title}
          </Typography>

          <Typography
            variant='subtitle2'
            color='textSecondary'
            sx={{ marginBottom: '16px' }}
          >
            Source: {article.source}
          </Typography>
          <Typography
            variant='subtitle3'
            color='textSecondary'
            sx={{ marginBottom: '16px' }}
          >
            Author: {article.author}
          </Typography>
          <Typography variant='body1'>{article.description}</Typography>
          <Button
            variant='contained'
            color='primary'
            href={article.link}
            target='_blank'
            sx={{ marginTop: '16px' }}
          >
            Read Full Article
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DetailedNews;
