import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';

const Preferences = ({
  open,
  onClose,
  preferences,
  setPreferences,
  clearFilter,
}) => {
  const [localPreferences, setLocalPreferences] = useState({
    ...preferences,
    authors: preferences.authors || [],
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalPreferences({
      ...preferences,
      authors: preferences.authors || [],
    });
  }, [preferences]);

  const handleSave = () => {
    console.log(localPreferences, 'localPreferences');
    setPreferences(localPreferences);
    clearFilter();
    onClose();
    setSnackbarOpen(true);
    setTimeout(() => {
      setSnackbarOpen(false);
      navigate('/news');
    }, 3000);
  };

  const handleClearAll = () => {
    setLocalPreferences({
      sources: [],
      categories: [],
      authors: [],
    });
  };

  const sourceOptions = [
    { value: 'newsapi', label: 'NewsAPI' },
    { value: 'guardian', label: 'Guardian' },
    { value: 'nytimes', label: 'New York Times' },
  ];

  const categoryOptions = [
    { value: 'business', label: 'Business' },
    { value: 'technology', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
  ];

  const authorOptions = [
    { value: 'John Doe', label: 'John Doe' },
    { value: 'Jane Smith', label: 'Jane Smith' },
    { value: 'Alex Johnson', label: 'Alex Johnson' },
    { value: 'Chris Lee', label: 'Chris Lee' },
    { value: 'Taylor Brown', label: 'Taylor Brown' },
    { value: 'Jordan White', label: 'Jordan White' },
  ];

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Preferences</DialogTitle>
        <DialogContent>
          <Dropdown
            label='Preferred Sources'
            value={localPreferences.sources}
            onChange={(e) =>
              setLocalPreferences({
                ...localPreferences,
                sources: e.target.value,
              })
            }
            options={sourceOptions}
            multiple
          />
          <Dropdown
            label='Preferred Categories'
            value={localPreferences.categories}
            onChange={(e) =>
              setLocalPreferences({
                ...localPreferences,
                categories: e.target.value,
              })
            }
            options={categoryOptions}
            multiple
          />
          <Dropdown
            label='Preferred Authors'
            value={localPreferences.authors}
            onChange={(e) =>
              setLocalPreferences({
                ...localPreferences,
                authors: e.target.value,
              })
            }
            options={authorOptions}
            multiple
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearAll} color='error'>
            Clear All
          </Button>
          <Button onClick={onClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        message='Filters applied will be cleared'
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

export default Preferences;
