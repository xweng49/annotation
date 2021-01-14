import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex',
      padding: theme.spacing(0, 0.5),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
}));

// export const MiniDrawer = () => {
//     const classes = useStyles();
//     const theme = useTheme();
//     const [open, setOpen] = React.useState(false);

//     const handleDrawerOpen = () => {
//         setOpen(true);
//     };

//     const handleDrawerClose = () => {
//         setOpen(false);
//     };

//     return (
//         <div className={classes.root}>
//             <CssBaseline>
//                 <Drawer
//                     variant = "permanent"
//                     className={clsx(classes.drawer, {
//                         [classes.drawerOpen]: open,
//                         [classes.drawerClose]: !open,
//                     })}
//                     classes={{
//                         paper: clsx({
//                             [classes.drawerOpen]: open,
//                             [classes.drawerClose]: !open,
//                         }),
//                     }}
//                 >
//                     <div className={classes.toolbar}>
//                         <IconButton onClick={open == true ? handleDrawerClose : handleDrawerOpen}>
//                             {
//                                 open == true ?
//                                 theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon /> :
//                                 <MenuIcon />
//                             }
//                         </IconButton>
//                     </div>
//                     <Divider />
//                     <List>
//                         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                             <ListItem button key={text}>
//                             <ListItemIcon>{index % 2 === 0 ? <FullscreenIcon /> : <FullscreenExitIcon />}</ListItemIcon>
//                             <ListItemText primary={text} />
//                             </ListItem>
//                         ))}  
//                     </List>
//                 </Drawer>
//             </CssBaseline>
//         </div>
//     )
// }

// export default MiniDrawer;
export default useStyles