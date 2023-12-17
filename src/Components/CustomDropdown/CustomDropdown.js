import React from 'react'
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { HiMiniChevronDown } from 'react-icons/hi2'
/*
takes array of objects :

list : [
    {
        label : string ,
        value : string
    }
]
*/
export default function CustomDropdown({ title = "Dashboard" , list = [{ label : 'placeholder' , value : 'placeholder' }] }) {

    const createHandleMenuClick = (menuItem) => {
        return () => {
          console.log(`Clicked on ${menuItem}`);
        };
      };
    
      return (
        <Dropdown>
          <TriggerButton sx={{display:'flex' , alignItems:'center' , fontSize : '16px'}} >{title} <HiMiniChevronDown fontWeight={'bold'} fontSize={'20px'}/> </TriggerButton>
          <Menu slots={{ listbox: StyledListbox }}>
            {
                list?.map( (el , ind) => {
                    return (
                        <StyledMenuItem key={el.label} onClick={createHandleMenuClick(el.label)}>
                            {el.label}
                        </StyledMenuItem>
                    )
                } )
            }
          </Menu>
        </Dropdown>
      );
}


const blue = {
    50: '#F0F7FF',
    100: '#DAECFF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };
  
  const StyledListbox = styled('ul')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 2px 16px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    z-index: 1;
    `,
  );
  
  const StyledMenuItem = styled(MenuItem)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${menuItemClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    `,
  );
  
  const TriggerButton = styled(MenuButton)(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 8px 18px;
    line-height: 1.5;
    background: black;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    color: white;
    cursor: pointer;
  
    `,
  );