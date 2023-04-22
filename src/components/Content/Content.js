import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { styled, Typography } from '@mui/material';
import formatNumber from '../../utils/formatNumber';
import { IconButton } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';

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

const OperationContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'center',
  width: '80%',
  margin: '10px 0',
  justifyContent: 'space-between',
  borderBottom: '1px solid ' + theme.palette.headerColor.main,
  paddingBottom: '20px',
}));

// const ButtonStyled = styled(IconButton)(({ theme }) => ({
//   backgroundColor: theme.palette.headerColor.main,
//   // borderRadius: '8px',
//   '&:hover': {
//     backgroundColor: '#fffa00 !important',
//   },
// }));
const getOperationIcon = (operation) => {
  let icon;
  switch (operation) {
    case 'Еда':
      icon = <FastfoodOutlinedIcon />;
      break;
    case 'Развлечения':
      icon = <LocalMoviesOutlinedIcon />;
      break;
    case 'Покупки':
      icon = <CheckroomOutlinedIcon />;
      break;
    case 'Подписки':
      icon = <LibraryBooksOutlinedIcon />;
      break;
    case 'Квартира':
      icon = <HouseOutlinedIcon />;
      break;
    case 'Машина':
      icon = <DirectionsCarFilledOutlinedIcon />;
      break;
    default:
      icon = <AddCardOutlinedIcon />;
  }
  return icon;
};

const StyledIcon = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.headerColor.main,
  display: 'flex',
  padding: '12px',
  marginRight: '15px',
  borderRadius: '50%',
}));

const OperationCard = ({ operation }) => {
  return (
    <OperationContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <StyledIcon>{getOperationIcon(operation.category)}</StyledIcon>
        <Typography>
          {operation.category ? operation.category : 'Доход'}
        </Typography>
      </div>
      <div>
        {operation.comment && (
          <Typography sx={{ textAlign: 'end' }}>{operation.comment}</Typography>
        )}
        {operation.type === 'income' && (
          <Typography
            sx={{ color: '#10ff00', textAlign: 'end' }}
          >{`+ ${formatNumber(operation.amount)}₽`}</Typography>
        )}
        {operation.type === 'expense' && (
          <Typography
            sx={{ color: '#ff1313', textAlign: 'end' }}
          >{`- ${formatNumber(operation.amount)}₽`}</Typography>
        )}
      </div>
    </OperationContainer>
  );
};

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

  React.useEffect(() => {
    const newAvailable = operations.reduce((acc, val) => {
      if (val.type === 'income') {
        return Number(acc) + Number(val.amount);
      } else {
        return Number(acc) - Number(val.amount);
      }
    }, 0);
    setAvailableMoney(newAvailable);
  }, [operations]);

  const operationsMapped = operations.map((el) => (
    <OperationCard operation={el} />
  ));

  return (
    <Card sx={{ boxShadow: 'none' }}>
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
        <Typography variant="h3" sx={{ mt: '25px' }}>
          История операций
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
          }}
        >
          {operationsMapped}
        </div>
      </CardContent>
    </Card>
  );
};

export default Content;
