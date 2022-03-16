import { Body, Header } from './components'

import React from 'react'
import { PaletteMode } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './scss/style.scss'
import { Main } from './components/Main'

export const ThemeModeContext = React.createContext({ toggle: () => {} })

export const App: React.FC = () => {
    const [mode, setMode] = React.useState<PaletteMode>('dark')

    const themeMode = React.useMemo(
        () => ({
            toggle: () => {
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
        <ThemeModeContext.Provider value={themeMode}>
            <ThemeProvider theme={theme}>
                <Body>
                    <Header />
                    <Main />
                </Body>
            </ThemeProvider>
        </ThemeModeContext.Provider>
    )
}

