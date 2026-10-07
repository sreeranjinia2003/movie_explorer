import React, { useState } from 'react'
import {  AppBar,  Toolbar,  Typography,  Box, TextField,  Button} from '@mui/material'

function SearchBar({ onSearch }) {

  const [search, setSearch] = useState("")

  const handleSearch = () => {

    if (!search.trim()) {
      return
    }

    onSearch(search)
  }

 

  return (
    <AppBar position="static">

      <Toolbar sx={{ flexWrap: "wrap", gap: 2 }}>

        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold"}} >
          <i class="fa-solid fa-clapperboard" style={{color:'purple'}}></i> Movie Explorer
        </Typography>

        <Box sx={{ display: "flex",gap: 1, width: { xs: "100%", sm: "auto" } }} >

          <TextField
            size="small"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            
            sx={{ backgroundColor: "white",  borderRadius: 1,minWidth: {xs: "100%",sm: 250}}} />

          <Button  variant="contained"color="secondary" onClick={handleSearch}> Search</Button>

        </Box>

      </Toolbar>

    </AppBar>
  )
}

export default SearchBar