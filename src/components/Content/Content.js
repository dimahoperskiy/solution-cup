import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { styled, Typography } from '@mui/material';
import formatNumber from '../../utils/formatNumber';
import { IconButton } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const AvailablePaper = styled(Paper)({
  padding: '60px 35px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '450px',
  alignSelf: 'center',
});

const ButtonsRow = styled('div')({
  display: 'flex',
  alignSelf: 'center',
  marginTop: '25px',
});

const ButtonWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ButtonStyled = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.headerColor.main,
  borderRadius: '8px',
}));

const Content = ({ operations, setModalOpen, setOperationType }) => {
  const [availableMoney, setAvailableMoney] = React.useState(0);

  const handleIncomeClick = () => {
    setOperationType('income');
    setModalOpen(true);
  };

  const handleExpenseClick = () => {
    setOperationType('expense');
    setModalOpen(true);
  };

  console.log('operations', operations);

  React.useEffect(() => {
    const newAvailable = operations.reduce((acc, val) => {
      if (val.type === 'income') {
        return Number(acc) + Number(val.amount);
      } else {
        return Number(acc) - Number(val.amount);
      }
    }, availableMoney);
    console.log('newAvailable', newAvailable);
    setAvailableMoney(newAvailable);
  }, [operations]);

  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: '50px',
          pb: '50px',
        }}
      >
        <AvailablePaper eleveation={3}>
          <Typography variant="h3" sx={{ margin: '0px 0' }}>
            Доступно:
          </Typography>
          <Typography sx={{ mt: '15px', fontSize: '20px', fontWeight: 600 }}>
            {formatNumber(availableMoney)} ₽
          </Typography>
        </AvailablePaper>
        <ButtonsRow>
          <ButtonWrapper sx={{ marginRight: '30px' }}>
            <ButtonStyled onClick={handleIncomeClick}>
              <ArrowDropUpIcon />
            </ButtonStyled>
            <Typography sx={{ mt: '5px', fontSize: '14px' }}>Доход</Typography>
          </ButtonWrapper>
          <ButtonWrapper>
            <ButtonStyled onClick={handleExpenseClick}>
              <ArrowDropDownIcon />
            </ButtonStyled>
            <Typography sx={{ mt: '5px', fontSize: '14px' }}>Расход</Typography>
          </ButtonWrapper>
        </ButtonsRow>
      </CardContent>
    </Card>
  );
};

export default Content;
