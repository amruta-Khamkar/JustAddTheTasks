import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AccountCircle } from '@mui/icons-material';
import MoreIcon from '@mui/icons-material/MoreVert';;



class Navi extends Component {
  constructor(props) {
    super(props);
    this.state = ({ isLogOut: 0,clickChange:0 ,home:0})
  }

  logOut = () => {
    if (window.confirm("Are You Sure you want to log out ?")) {
      localStorage.removeItem("credArr")
      this.setState({ isLogOut: 1 })
    }
  }
  change=()=>{
      this.setState({clickChange:1})
  }
  home=()=>{
      this.setState({home:1})
  }
  render() {
    if (this.state.isLogOut == 1) {
      return <Redirect to="/" />
    }
    else if (this.state.clickChange==1){
      return <Redirect to="/changePass"/>
    }
    else if (this.state.home==1){
      return <Redirect to="/home"/>
    }
    return (
      <>
        <Router>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar sx={{ backgroundColor: "black" }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 1 }}
                >
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
                  <Link to="/home" style={{color:"white",textDecoration:"none"}}onClick={this.home}>Home</Link>
                </Typography>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
                  <Link  to="/changePass"  style={{color:"white",textDecoration:"none"}} onClick={this.change} > Change Password </Link>
                </Typography> 
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>

                  <Link  style={{color:"white",textDecoration:"none"}}>

                    {this.state.isLogOut == 0 && 
                      ` Welcome  : ${JSON.parse(localStorage.getItem("credArr")).fName}`
                    }

                  </Link>

                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
                  <Link to="/"  style={{color:"white",textDecoration:"none"}} onClick={this.logOut}>Log Out</Link>

                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={17} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"

                    aria-haspopup="true"

                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="show more"

                    aria-haspopup="true"

                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
        </Router>


      </>
    );
  }
}

export default Navi;