import Box from '@mui/material/Box'

export const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
        <Box sx={{ maxWidth: '1200px', width: '100vw' }}>{children}</Box>
    </Box>
)
