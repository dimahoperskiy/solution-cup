import logo from './logo.png';
import { styled, Typography } from '@mui/material';

const HeaderStyled = styled('header')(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.headerColor.main,
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingTop: '5px',
}));
const Header = () => {
  return (
    <HeaderStyled>
      <img src={logo} width="153px" height="34px" alt="logo" />
      <Typography variant="h1" sx={{ margin: '0px 0' }}>
        Учет расходов
      </Typography>
    </HeaderStyled>
  );
};

export default Header;
