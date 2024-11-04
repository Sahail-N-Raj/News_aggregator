import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    navigate(`/news/detailed-news/${encodeURIComponent(article.link)}`);
  };

  return (
    <Card sx={{ width: '100%' }} onClick={handleClick}>
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 340,
            width: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <CardMedia
        component='img'
        sx={{ height: 350, width: '100%', display: loading ? 'none' : 'block' }}
        image={article.imageUrl}
        title={article.title}
        onLoad={() => setLoading(false)}
      />
      <CardContent>
        <Typography variant='h5'>{article.title}</Typography>
        <Typography variant='body2' color='textSecondary'>
          {article.description}
        </Typography>
        <Typography
          variant='subtitle3'
          color='textSecondary'
          sx={{ marginTop: '16px' }}
        >
          Article written by: {article.author}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
