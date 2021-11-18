import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const AntTabs = styled(Tabs) (
    {
        padding: 0,
        height: '60px',
        borderBottom: '1px solid #e8e8e8',
        '& .MuiTabs-indicator': {
          backgroundColor: '#28466D',
    },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => (
  {
    textTransform: 'none',
    height: '50px',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(1),
    color: '#616161',
    fontFamily: [
      'Roboto',
    ].join(','),
    '&:hover': {
      color: '#28466D',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#28466D',
      fontWeight: theme.typography.fontWeightBold,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
    '&.Mui-root': {
      display: 'inline-block',
      maxHeight: "20px"
    }
  }
));

export { AntTabs, AntTab };