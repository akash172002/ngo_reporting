import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} variant="h6">
          NGO Reporting
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Submit
        </Button>
        <Button color="inherit" component={Link} to="/upload">
          Upload csv
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
