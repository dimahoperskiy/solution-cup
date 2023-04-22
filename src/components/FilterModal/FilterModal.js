import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  Autocomplete,
  TextField,
} from '@mui/material';

const options = [
  'Еда',
  'Развлечения',
  'Покупки',
  'Подписки',
  'Квартира',
  'Машина',
];
const FilterModal = ({
  filterOpen,
  setFilterOpen,
  filteredOperations,
  setFilteredOperations,
  filteredCategory,
  setFilteredCategory,
  operations,
}) => {
  const theme = useTheme();
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  console.log('filteredCategory', filteredCategory);

  const handleSave = () => {
    if (filteredCategory) {
      console.log('here');
      const newFiltered = operations.filter(
        (el) => el.category === filteredCategory
      );
      console.log('newFiltered', newFiltered);
      setFilteredOperations(newFiltered);
    } else {
      console.log('here2');
      setFilteredOperations(null);
    }
    setFilteredCategory(value);
    setFilterOpen(false);
  };

  const handleClose = () => {
    setFilterOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <Dialog
      PaperProps={{
        sx: {
          position: 'absolute',
          right: '0',
          left: '0',
          top: '0',
          bottom: '0',
          margin: 'auto',
          height: '65%',
          maxWidth: '400px',
          padding: '0',
          backgroundColor: theme.palette.background.paper,
        },
      }}
      maxWidth="xs"
      fullWidth
      open={filterOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <>
        <DialogTitle
          id="alert-dialog-title"
          sx={{ backgroundColor: theme.palette.headerColor.main }}
        >
          Фильтр
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            value={filteredCategory}
            // defaultValue={filteredCategory}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setFilteredCategory(newInputValue);
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: 300, mt: '15px' }}
            renderInput={(params) => (
              <TextField {...params} label="Категория" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="success">
            Сохранить
          </Button>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </>
    </Dialog>
  );
};

export default FilterModal;
