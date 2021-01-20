import React, { useState } from "react"
import clsx from "clsx"
import { makeStyles, styled, useTheme } from "@material-ui/core/styles"
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import Workspace from "react-material-workspace-layout/Workspace"
import Button from "@material-ui/core/Button"
import iconDictionary from "./icon-dictionary"
import { Image } from 'react-fullscreen-image'
import useStyles from './side-panel'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import Canvas from "../Canvas"

const FullScreenContainer = styled("div")({
    width: "100%",
    height: "100%",
    "& .fullscreen": {
      width: "100%",
      height: "100%",
    },
})
  


export const MainLayout = ({
    image,
    taskDescription="",
    alwaysShowNextButton = true,
    alwaysShowPrevButton = true,
    name,
}) => {
    const fullScreenHandle = useFullScreenHandle()
    const [imageIndex, setImageIndex] = useState(0)
    const fullScreenToggle = () => {
        return fullScreenHandle.active ? fullScreenHandle.exit() : fullScreenHandle.enter()
    }
    const handleKeyPress = (event) => {
        switch (event.code) {
            case "KeyF":
                fullScreenToggle();
                break;
            case "ArrowLeft":
                imageIndex > 0 ? setImageIndex(imageIndex-1): null;
                break;
            case "ArrowRight":
                imageIndex < image.length-1 ? setImageIndex(imageIndex+1): null;
                break;
        }
        // console.log(event.code, event.keyCode)
    }
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    // const imgRef = React.createRef()
    // const getPrevImage = () => {
    //     imageIndex > 0 ? setImageIndex(imageIndex-1) : null
    //     imgRef.current.src = image[imageIndex]["src"]
    // }
    // const getNextImage = () => {
    //     imageIndex < image.length ? setImageIndex(imageIndex+1) : null
    //     imgRef.current.src = image[imageIndex]["src"]
    // }

    return (
        <FullScreenContainer onKeyDown={handleKeyPress} tabIndex="0">            
            <FullScreen
                handle={ fullScreenHandle }
                onChange={(open) => {
                    if (!open) {
                        fullScreenHandle.exit()
                    }
                }}
            >
                <div 
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                    >
                        <div className={classes.toolbar}>
                        <IconButton onClick={open == true ? handleDrawerClose : handleDrawerOpen}>
                            {
                                open == true ?
                                theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon /> :
                                <MenuIcon />
                            }
                        </IconButton>
                        </div>
                        <Divider />
                        <List>
                                <ListItem button key="fullscreen" onClick = {fullScreenToggle}>
                                <ListItemIcon>{fullScreenHandle.active? <FullscreenExitIcon />:<FullscreenIcon />}</ListItemIcon>
                                <ListItemText primary={fullScreenHandle.active? "Exit Fullscreen": "Fullscreen"} />
                                </ListItem>
                                <ListItem button key="next" onClick = {() => imageIndex > 0 ? setImageIndex(imageIndex-1): null}>
                                <ListItemIcon><NavigateNextIcon /></ListItemIcon>
                                <ListItemText primary="Next" />
                                </ListItem>
                                <ListItem button key="prev" onClick = {() => imageIndex < image.length-1 ? setImageIndex(imageIndex+1): null}>
                                <ListItemIcon><NavigateBeforeIcon /></ListItemIcon>
                                <ListItemText primary="Prev" />
                                </ListItem>
                        </List>
                    </Drawer>
                    <div className={classes.root}>
                    <Canvas />
                    </div>
                </div>
        </FullScreen>
        </FullScreenContainer>
    )
}

export default MainLayout