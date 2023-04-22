import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Input,
  InputLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
  styled,
  IconButton,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';

const ButtonStyled = styled(IconButton)(({ theme }) => ({
  // backgroundColor: theme.palette.headerColor.main,
  backgroundColor: theme.palette.background.default,
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#fffa00 !important',
  },
}));

const ButtonWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      // prefix="₽"
    />
  );
});

const OperationModal = ({
  modalOpen,
  setModalOpen,
  operationType,
  operations,
  setOperations,
}) => {
  const theme = useTheme();
  const [amountValue, setAmountValue] = React.useState(0);
  const [dateValue, setDateValue] = React.useState(new Date());
  const [commentValue, setCommentValue] = React.useState('');
  const [categoryName, setCategoryName] = React.useState('');

  const CategoryButton = ({ label, children }) => (
    <ButtonWrapper
      sx={{
        width: '33%',
        mb: '10px',
      }}
    >
      <ButtonStyled
        sx={{
          backgroundColor:
            categoryName === label ? theme.palette.headerColor.main : '#fff',
        }}
        onClick={() => setCategoryName(label)}
      >
        {children}
      </ButtonStyled>
      <Typography sx={{ mt: '5px', fontSize: '14px' }}>{label}</Typography>
    </ButtonWrapper>
  );

  const handleAmountChange = (e) => {
    setAmountValue(e.target.value);
  };
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  const handleCommentChange = (e) => {
    setCommentValue(e.target.value);
  };
  const handleDateClickOpen = (val) => {
    console.log('val', val);
  };

  const handleSave = () => {
    const newOperation = {
      type: operationType,
      amount: amountValue,
      date: dateValue,
      comment: commentValue,
      category: categoryName,
    };
    setOperations([...operations, newOperation]);
    setModalOpen(false);
  };

  console.log('categoryName', categoryName);

  const handleClose = () => {
    setModalOpen(false);
  };

  let operationTitle;
  if (operationType === 'income') {
    operationTitle = 'Доход';
  } else {
    operationTitle = 'Расход';
  }

  useEffect(() => {}, []);

  return (
    <Dialog
      PaperProps={{
        sx: {
          position: 'absolute',
          right: '-20px',
          height: '65%',
          maxWidth: '400px',
          padding: '0',
          backgroundColor: '#fff',
        },
      }}
      maxWidth="xs"
      fullWidth
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <>
        <DialogTitle
          id="alert-dialog-title"
          sx={{ backgroundColor: theme.palette.headerColor.main }}
        >
          {operationTitle}
        </DialogTitle>
        <DialogContent>
          <FormControl
            fullWidth
            sx={{
              // borderBottom: '1px solid' + theme.palette.hoverColor.main,
              mt: '15px',
              pb: '20px',
            }}
          >
            <InputLabel htmlFor="standard-adornment-amount">Сумма</InputLabel>
            <Input
              color="primary"
              id="standard-adornment-amount"
              value={amountValue}
              onChange={handleAmountChange}
              inputComponent={NumericFormatCustom}
              endAdornment={<InputAdornment position="start">₽</InputAdornment>}
            />
          </FormControl>
          <FormControl sx={{ mt: '10px' }}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ruLocale}
            >
              <DesktopDatePicker
                label="Дата"
                value={dateValue}
                onChange={handleDateChange}
                onAccept={handleDateClickOpen}
                disableFuture
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth sx={{ mt: '10px' }}>
            <TextField
              value={commentValue}
              onChange={handleCommentChange}
              id="standard-basic"
              label="Комментарий"
              variant="standard"
            />
          </FormControl>
          {operationType === 'expense' && (
            <div>
              <Typography sx={{ mt: '20px', fontSize: '16px' }}>
                Категория:
              </Typography>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  flexWrap: 'wrap',
                  marginTop: '10px',
                }}
              >
                <CategoryButton onClick={() => {}} label="Еда">
                  <FastfoodOutlinedIcon />
                </CategoryButton>
                <CategoryButton onClick={() => {}} label="Развлечения">
                  <LocalMoviesOutlinedIcon />
                </CategoryButton>
                <CategoryButton onClick={() => {}} label="Покупки">
                  <CheckroomOutlinedIcon />
                </CategoryButton>
                <CategoryButton onClick={() => {}} label="Подписки">
                  <LibraryBooksOutlinedIcon />
                </CategoryButton>
                <CategoryButton onClick={() => {}} label="Квартира">
                  <HouseOutlinedIcon />
                </CategoryButton>
                <CategoryButton onClick={() => {}} label="Машина">
                  <DirectionsCarFilledOutlinedIcon />
                </CategoryButton>
              </div>
            </div>
          )}
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

export default OperationModal;
