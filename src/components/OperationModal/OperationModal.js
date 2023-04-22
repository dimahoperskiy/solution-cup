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
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';

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

  const handleClickOpen = () => {
    setModalOpen(true);
  };

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
    };
    setOperations([...operations, newOperation]);
    setModalOpen(false);
  };

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
          height: '60%',
          maxWidth: '400px',
          padding: '0',
          backgroundColor: theme.palette.background.default,
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
