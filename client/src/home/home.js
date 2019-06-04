import React from 'react';
import { Redirect } from 'react-router';
import { Player } from 'video-react';
import './video.css';
import axios from 'axios';
import './home.css'
import * as $ from 'jquery'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteBorderIcon from '@material-ui/icons/Favorite';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { useTheme } from '@material-ui/core/styles';
import {Form} from  'react-bootstrap';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import SignUp from '../signup/signup.js';
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import Slider from "react-slick";

const drawerWidth = 240;


const classes = theme => ({

    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    icon: {
        margin: theme.spacing(1),
        fontSize: 32,
    },
});

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data:[],tweet:[], query: '',
            isFetching:true,
            searchString:[],
            value: '',
            searchvalue:'',
            results: [],
            show: false,
            displaysearchtweets: [],
            setOpen:false,
            isTweetDisplay:true,
            isSearchTweetDisplay:false,
            hashtag:[],
            email:[],
            mobileOpen: false,
            open:false,
            close:false,
            fireRedirect: false,
            isLoaded: false,
            isAuthenticated: true,
            value1:'',
            hash:'#'

            
        };


        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickhashtag = this.handleClickhashtag.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        // this.handleClickhashtagdelete = this.handleClickhashtagdelete.bind(this);

        // const [mobileOpen, setMobileOpen] = React.useState(false);
        // const [open, setOpen] = React.useState(false);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this);
        this.handleClose1 = this.handleClose1.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);

        this.name = localStorage.getItem('name');
        this.username = localStorage.getItem('username');
        this.photo = localStorage.getItem('photo');
        console.log("photo======",this.photo);


    }

    componentDidMount(){



        if(this.state.isAuthenticated == true) {


            fetch('http://132.140.160.62:4000/twitter-trends').
            then((Response)=>Response.json()).
            then((findresponse,err)=>
            {      
                this.state.isFetching = false;
                this.setState(prevState =>({
                    data: [...prevState.data, findresponse],
                    isLoaded: true

                }))
                console.log('trendsdata: ', this.state.data[0].trends);

            })

            fetch('http://132.140.160.62:4000/twitter-tweets').
            then((Response)=>Response.json()).
            then((findresponse,err)=>
            {      

                this.state.isFetching = false;
                this.state.isTweetDisplay = true;
                this.state.isSearchTweetDisplay = false;

                this.setState(prevState =>({
                    tweet: [...prevState.tweet, findresponse],
                    
                    
                }))
                console.log('tweetdata ', this.state.tweet[0]);
            })    

            this.getHash();
        }
    }

    handleChange(event) {
        console.log("event======",event);
        this.setState({value: event.target.value});
        console.log("valueeee====",this.state.value);
    }

    handleChange1(event) {
        console.log("event=========",event);
        this.setState({value1: event.target.value});
        console.log("valueeee====",this.state.value1);
    }

    handleSubmit(event) {
        console.log("name:",this.state.value);
        event.preventDefault() ;
        this.getData();
    }

    handleClick2(event){


        if(this.state.value.length==0){    
            Swal.fire("Search Data Missing!","", "warning");
          
        }else{   
            console.log("name:",this.state.value);
            event.preventDefault() ;
            this.getData();
            this.setState({value: ''});

        }
    }

    handleClickhashtag(event){


        if(this.state.value1.length==0){    
            Swal.fire("Please AddHashtag First!","", "warning");
            this.handleClose1();
        }else{   
            console.log("hashtag:",this.state.value1);
            event.preventDefault();
            this.getHashTag();
            this.handleClose1();
            this.setState({value1: ''});
        }
    }

    handleClickLogout(){
        isLoaded: true;
        console.log("logout=========");
        localStorage.setItem('isAuthenticated', false);
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("username");
        localStorage.removeItem('photo');

        this.setState({fireRedirect: true })

    }


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    getData = () => {
        axios.get("http://132.140.160.62:4000/search-tweets", {params: {key: this.state.value}})
        .then(( data ) => {
            console.log("data=========",data.data.length);
            if(data.data.length == 0){
                Swal.fire('Tweets Not Found....');

            }else{

                console.log("data not found==========");
                console.log("data======",data);
                this.state.isTweetDisplay = false;
                this.state.isSearchTweetDisplay = true;
                this.setState({
                    displaysearchtweets:[data],
                    isLoaded : true

                })
            }
        })
    }

    getHashTag = () =>{
        console.log("msg")
        console.log("localstorage=====",localStorage.getItem('email'));
        axios.post("http://132.140.160.62:4000/user/addtag",{hashtag: this.state.value1 , email:localStorage.getItem('email')})
        .then(( data ) => {
            console.log("data",data);
            this.getHash();
        })
    }

    getHash(){
        let hashTagArray = [];
        this.email = localStorage.getItem('email');
        console.log("email=======",this.email);
        var email = this.email;
        axios.get("http://132.140.160.62:4000/user/gethashtag/"+email)
        .then((res) => {
            console.log("data========",res.data['0'].hashtag);
            for(let i=0;i<res.data['0'].hashtag.length;i++){
                hashTagArray.push(res.data['0'].hashtag[i].hashtag);
            }
            console.log("hashTagArray",hashTagArray);
            this.setState({hashtag : hashTagArray
            })
            
        })
    }

    deletehash(id){
        console.log("hashtagdelete=========",id);
        axios.delete("http://132.140.160.62:4000/user/deletehashtag",{ data: {hashtag: id , email:localStorage.getItem('email')} })
        .then((res) => {
            console.log("data========",res);
            Swal.fire("Successfully deleted!","", "success");

            this.componentDidMount();
        })

    }

    handleClick(event) {
        console.log(event.target.outerText);

        this.setState({searchvalue: event.target.outerText});
        console.log("search=======",event.target.outerText);
        this.state.value = event.target.outerText;
        this.getData(event.target.outerText);

    }

    handleClickOpen() {
        this.setState({setOpen:true,open:true});
    }

    handleClose1() {
        this.setState({open:false});
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }



    render(){

        if(this.state.isAuthenticated == true) {

            const settings = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
            };

            const { isLoaded } = this.state;
            if(this.state.fireRedirect) {

                window.location.href = '/'
            }
            const { classes } = this.props;

            const temp = {... this.state};

            const {isFetching} = this.state;
            let displaydata;
            let displaydate;
            let displayhashtag;
            let displaysearchtweetsview;

            if (!isFetching && this.state.data[0]) displaydata = this.state.data[0].trends.map(trends => 

                <List key={trends.name}>
                {[trends.name].map((text, index) => (
                    <ListItem button key={text}>   
                    <ListItemText primary={text} />
                    </ListItem>
                    ))}

                </List>
                )
                if (!isFetching && this.state.displaysearchtweets.length == 0 ) displaydate = this.state.tweet.map(tweet => 
                    <div>
                    <div className="tweet_class1">
                    <Grid container spacing={12}>
                    <Grid item sm={2}>
                    <div className="profile_image_post">
                    <img src={tweet[0].user.profile_image_url} />
                    </div>
                    </Grid>
                    <Grid item sm={10}>
                    <span className="username_title">{tweet[0].user.name}</span>
                    <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/"+tweet[0].user.screen_name}  aria-current="page">
                    <span className="gray">@{tweet[0].user.screen_name}</span>
                    </a>
                    <p><span>{tweet[0].text}</span></p>
                    <div className="like_comment">
                    <Grid container spacing={12}>
                    <Grid item sm={2}>
                    <FavoriteBorderIcon className={classes.icon} />
                    </Grid>
                    <Grid item sm={2} className="">
                    <CommentIcon className={classes.icon} />
                    </Grid>
                    <Grid item sm={2}>
                    <MailIcon className={classes.icon} />
                    </Grid>
                    </Grid>
                    </div>
                    </Grid>
                    </Grid>
                    </div>
                    <div className="tweet_class1">
                    <Grid container spacing={12}>
                    <Grid item sm={2}>
                    <div className="profile_image_post">
                    <img src={tweet[1].user.profile_image_url} />
                    </div>
                    </Grid>
                    <Grid item sm={10}>
                    <span className="username_title">{tweet[1].user.name}</span>
                    <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/"+tweet[1].user.screen_name}  aria-current="page">
                    <span className="gray">@{tweet[1].user.screen_name}</span>
                    </a>
                    <p><span>{tweet[1].text}</span></p>
                    <div className="like_comment">
                    <Grid container spacing={12}>
                    <Grid item sm={2}>
                    <FavoriteBorderIcon className={classes.icon} />
                    </Grid>
                    <Grid item sm={2} className="">
                    <CommentIcon className={classes.icon} />
                    </Grid>
                    <Grid item sm={2}>
                    <MailIcon className={classes.icon} />
                    </Grid>
                    </Grid>
                    </div>
                    </Grid>
                    </Grid>
                    </div>
                    <div className="tweet_class1">
                    <Grid container spacing={12}>
                    <Grid item sm={2}>
                    <div className="profile_image_post">
                    <img src={tweet[2].user.profile_image_url} />
                    </div>
                    </Grid>
                    <Grid item sm={10}>
                    <span className="username_title">{tweet[2].user.name}</span>
                    <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/"+tweet[2].user.screen_name}  aria-current="page">
                    <span className="gray">@{tweet[2].user.screen_name}</span>
                    </a>
                    <p><span>{tweet[2].text}</span></p>
                    <div className="like_comment">
                    <Grid container spacing={12}>
                    <Grid item sm={2}>
                    <FavoriteBorderIcon className={classes.icon} />
                    </Grid>
                    <Grid item sm={2} className="">
                    <CommentIcon className={classes.icon} />
                    </Grid>
                    <Grid item sm={2}>
                    <MailIcon className={classes.icon} />
                    </Grid>
                    </Grid>
                    </div>
                    </Grid>
                    </Grid>
                    </div>
                    <div className="tweet_class1">
                    <Grid container spacing={12}>
                    <Grid item sm={2}>
                    <div className="profile_image_post">
                    <img src={tweet[3].user.profile_image_url} />
                    </div>
                    </Grid>
                    <Grid item sm={10}>
                    <span className="username_title">{tweet[3].user.name}</span>
                    <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/"+tweet[3].user.screen_name}  aria-current="page">
                    <span className="gray">@{tweet[3].user.screen_name}</span>
                    </a>
                    <p><span>{tweet[3].text}</span></p>
                    <div className="like_comment">
                    <Grid container spacing={12}>
                    <Grid item sm={2}>
                    <FavoriteBorderIcon className={classes.icon} />
                    </Grid>
                    <Grid item sm={2} className="">
                    <CommentIcon className={classes.icon} />
                    </Grid>
                    <Grid item sm={2}>
                    <MailIcon className={classes.icon} />
                    </Grid>
                    </Grid>
                    </div>
                    </Grid>
                    </Grid>
                    </div>
                    <div className="tweet_class1">
                    <Grid container spacing={12}>
                    <Grid item sm={2}>
                    <div className="profile_image_post">
                    <img src={tweet[4].user.profile_image_url} />
                    </div>
                    </Grid>
                    <Grid item sm={10}>
                    <span className="username_title">{tweet[4].user.name}</span>
                    <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/"+tweet[4].user.screen_name}  aria-current="page">
                    <span className="gray">@{tweet[4].user.screen_name}</span>
                    </a>
                    <p><span>{tweet[4].text}</span></p>
                    <div className="like_comment">
                    <Grid container spacing={12}>
                    <Grid item sm={2}>
                    <FavoriteBorderIcon className={classes.icon} />
                    </Grid>
                    <Grid item sm={2} className="">
                    <CommentIcon className={classes.icon} />
                    </Grid>
                    <Grid item sm={2}>
                    <MailIcon className={classes.icon} />
                    </Grid>
                    </Grid>
                    </div>
                    </Grid>
                    </Grid>
                    </div>
                    </div>

                    )

if (this.state.displaysearchtweets[0] && this.state.displaysearchtweets[0].data && this.state.displaysearchtweets[0].data.length)  displaysearchtweetsview = this.state.displaysearchtweets[0].data.map(searchelement => 
    <div className="tweet_class_search">
    <Grid container spacing={12}>
    <Grid item sm={2}>
    <div className="profile_image_post1">
    <img src={searchelement.user.profile_image_url} />
    </div>
    </Grid>
    <Grid item sm={10}>
    <span className="username_title">{searchelement.user.name}</span>
    <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/"+searchelement.user.screen_name}  aria-current="page">
    <span className="gray">@{searchelement.user.screen_name}</span>
    </a>
    <p><span>{searchelement.text}</span></p>
    </Grid>
    </Grid>
    </div>

    )

    if(this.state.hashtag[0] && this.state.hashtag[0].length) displayhashtag = this.state.hashtag.map(hashtagname =>
        <List>
        {[hashtagname].map((text, index) => (
            <ListItem button key={text}>   
            <ListItemText primary={text} onClick={(e)=>this.handleClick(event)}/>
            <Button onClick={this.deletehash.bind(this,text)}  color="primary" autoFocus>
            delete
            </Button>
            </ListItem>
            ))}
        </List>
        )

        if (!isLoaded) {
            return (
                <center>
                <div className="loader"></div>
                </center>
                )
        } else if(isLoaded){


            return (

                <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                <TextField
                id="outlined-with-placeholder"
                label="Search"
                className={classes.textField}
                value={this.state.value}
                onChange={this.handleChange} 
                margin="normal"
                variant="outlined"
                />
                </Typography>
                <Button id="search" onClick={this.handleClick2} color="primary" autoFocus>
                Search
                </Button>
                <Button style={{right:10, position:'absolute'}} onClick={this.handleClickLogout} color="primary" autoFocus>
                Logout
                </Button>
                </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                <Drawer
                container={this.props.container}
                variant="temporary"
                anchor={classes.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={this.props.handleDrawerToggle}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true,
                }}
                >
                <div className="menu-bar .MuiListItem-button">
                <div className={classes.toolbar} />
                <img src={require('./twitter-logo.jpg')} />
                <span className="logo">Twitter</span>
                <List>
                </List>      
                <span className="font-size">Trending Hashtag</span>
                <List>
                <div onClick={(e)=>this.handleClick(event)}>
                {displaydata}
                </div>
                </List>
                <span className="font-size">Your Hashtag</span>
                <List>
                <div onClick={(e)=>this.handleClickhashtagdelete(event)} className="hashtag">
                {displayhashtag}
                </div>  
                </List>
                </div>
                </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                <Drawer
                variant="permanent"
                open
                >
                <div className="menu-bar .MuiListItem-button">
                <div className={classes.toolbar} />
                <img className="img-twitter-logo" src={require('./twitter.png')} />
                <span className="logo">Twitter</span>
                <List>
                </List>      
                <h5  className="font-size">Trending Hashtag</h5>
                <List>
                <div onClick={(e)=>this.handleClick(event)} className="trendshashtag">
                {displaydata}
                </div>
                </List>
                <h5 className="font-size">My Hashtag</h5>
                <List>
                <div  className="hashtag">
                {displayhashtag}
                </div>
                </List>
                </div>
                </Drawer>
                </Hidden>
                </nav>
                <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className="profile_main_class">
                <Grid container space ={12}>
                <Grid item sm={1}>
                <div className="profile_img">
                <img src={this.photo} />
                </div>
                </Grid>
                <Grid item sm={11}>
                <h1>{this.name}</h1>
                <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/"+this.username}  aria-current="page">
                <span className="username-color">@{this.username}</span>
                </a>
                </Grid>
                </Grid>
                </div>
                <div className="main_class_post">
                <div>
                {displaydate}
                </div>
                </div>
                <div className="add_tweet">
                <Fab color="primary" aria-label="Add" onClick={this.handleClickOpen} className={classes.margin}>
                <AddIcon />
                </Fab>
                </div>
                <Dialog
                fullScreen={this.fullScreen}
                open={this.state.open}
                onClose={this.handleClose1}
                aria-labelledby="responsive-dialog-title"
                >
                <DialogTitle id="responsive-dialog-title">{"Add Tweet"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                <TextField
                id="standard-full-width"
                label="Add Hashtag"
                style={{ margin: 8 , width: 500}}
                fullWidth
                margin="normal"
                defaultValue={this.state.hash}
              
                onChange={this.handleChange1}
                />
                </DialogContentText>
                </DialogContent>
                <DialogActions> 
                <Button onClick={this.handleClickhashtag} color="primary" autoFocus>
                Add
                </Button>
                <Button className="btn-left" onClick={this.handleClose1} color="primary">
                close
                </Button>
                </DialogActions>
                </Dialog>
                <div className="search_modals">
                {displaysearchtweetsview}
                </div>
                </main>
                </div>
                );
}
}else{

    Swal.fire('Data Not Found....');
}

}
}
Home.propTypes = {
    container: PropTypes.object, 

};

export default withStyles(classes)(Home);

