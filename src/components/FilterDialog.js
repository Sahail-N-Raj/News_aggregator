import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';

const FilterDialog = ({
  open,
  onClose,
  date,
  setDate,
  filter,
  setFilter,
  source,
  setSource,
  preferences,
}) => {
  const [localDate, setLocalDate] = useState(date);
  const [localFilter, setLocalFilter] = useState(filter);
  const [localSource, setLocalSource] = useState(source);
  const navigate = useNavigate();

  useEffect(() => {
    if (!date && !source && !filter) {
      setLocalDate('');
      setLocalSource('');
      setLocalFilter('');
    }
  }, [date, filter, source]);

  const defaultSourceOptions = [
    { value: 'newsapi', label: 'NewsAPI' },
    { value: 'guardian', label: 'Guardian' },
    { value: 'nytimes', label: 'New York Times' },
  ];
  const defaultCategoryOptions = [
    { value: 'business', label: 'Business' },
    { value: 'technology', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
  ];
  const dateOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
  ];

  const categoryOptions =
    preferences.categories.length > 0
      ? defaultCategoryOptions.filter((option) =>
          preferences.categories.includes(option.value)
        )
      : defaultCategoryOptions;

  const sourceOptions =
    preferences.sources.length > 0
      ? defaultSourceOptions.filter((option) =>
          preferences.sources.includes(option.value)
        )
      : defaultSourceOptions;

  const handleSave = () => {
    setDate(localDate);
    setFilter(localFilter);
    setSource(localSource);
    onClose();
    navigate('/news');
  };

  const handleClearAll = () => {
    setLocalDate('');
    setLocalFilter('');
    setLocalSource('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter Options</DialogTitle>
      <DialogContent>
        <Dropdown
          label='Date'
          value={localDate}
          onChange={(e) => setLocalDate(e.target.value)}
          options={dateOptions}
        />
        <Dropdown
          label='Category'
          value={localFilter}
          onChange={(e) => setLocalFilter(e.target.value)}
          options={categoryOptions}
        />
        <Dropdown
          label='Source'
          value={localSource}
          onChange={(e) => setLocalSource(e.target.value)}
          options={sourceOptions}
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
  );
};

export default FilterDialog;
