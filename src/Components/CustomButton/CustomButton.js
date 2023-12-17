import { Button } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';

export default function CustomButton({ children , sx , ...props}) {

    const theme = useTheme();

    const filledButtonStyle = {
        color : 'white' ,
        fontSize : '16px',
        bgcolor : theme.palette.primary.main ,
        px : '20px',
        py : '8px' ,
        borderRadius : '10px',
        boxShadow : 'none',
        textTransform : 'unset' , 
        '&:hover' : {
            boxShadow : 'none',
            color : 'white' ,
            bgcolor : theme.palette.secondary.main
        },
        ...sx
    }

    const outlinedButtonStyle = {
        ...filledButtonStyle ,
        ...sx ,
        px : '10px',
        py : '8px' ,
        color : theme.palette.primary.main ,
        bgcolor : 'transparent' ,
        border : 1 ,
        borderColor : theme.palette.light.dark ,
        textTransform : 'uppercase',
        '&:hover': {
            boxShadow : 'none',
            color : 'white' ,
            bgcolor : theme.palette.primary.main
        }
    }

    const buttonStyle = props.variant === 'outlined' ? outlinedButtonStyle : filledButtonStyle
    
  return (
    <Button  sx={ buttonStyle }  {...props} >
        { children }
    </Button>
  )
}
