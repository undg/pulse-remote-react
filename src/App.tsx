import { AudioDevices } from './components'

import React from 'react'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import './scss/style.scss'

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

function MyApp() {
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext)
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                minHeight: '100vh',
                padding: 1,
            }}
        >
            <Box maxWidth={1200}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Typography variant="h5">Pulse remote</Typography>
                    </Box>
                    <Box>
                        {theme.palette.mode} mode
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>
                </Box>
                <AudioDevices />
            </Box>
        </Box>
    )
}

export default function App() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark')
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
            },
        }),
        []
    )

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    )

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <MyApp />
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
