import React from 'react';
import { Player } from 'video-react';
import './video.css';
import './home.css'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
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
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import API from '../service';
import history from '../history';

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
            data: [], tweet: 5, query: '',
            isFetching: true,
            searchString: [],
            value: '',
            searchvalue: '',
            results: [],
            show: false,
            displaysearchtweets: [],
            setOpen: false,
            isTweetDisplay: true,
            isSearchTweetDisplay: false,
            hashtag: [],
            email: [],
            mobileOpen: false,
            open: false,
            close: false,
            fireRedirect: false,
            isLoaded: false,
            isAuthenticated: true,
            value1: '',
            setOpenModel: false,
            openModel: false,
            hash: '#',
            edithashthag: '',
            newhashtag: '',
            visible: 4,
            limit: 3
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickhashtag = this.handleClickhashtag.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this);
        this.handleCloseModel = this.handleCloseModel.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.handleClickupdatehashtag = this.handleClickupdatehashtag.bind(this);
        this.handleCloseModelhashtag = this.handleCloseModelhashtag.bind(this);
        this.handleChangehashEvent = this.handleChangehashEvent.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.name = localStorage.getItem('name');
        this.username = localStorage.getItem('username');
        this.photo = localStorage.getItem('photo');
    }

    /** First Call During App Run */
    componentDidMount() {
        if (this.state.isAuthenticated == true) {
            API.getTwitterTrends().
                then((findresponse, err) => {
                    try {
                        this.state.isFetching = false;
                        this.setState(prevState => ({
                            data: [...prevState.data, findresponse],
                            isLoaded: true
                        }))
                    } catch (err) {
                        console.log("err====", err);
                    }
                });

            API.getTwitterTweets().
                then((findresponse, err) => {
                    try {
                        this.state.isFetching = false;
                        this.state.isTweetDisplay = true;
                        this.state.isSearchTweetDisplay = false;
                        for (var i = 0; i < this.state.tweet; i++) {
                            this.setState(prevState => ({
                                tweet: [...prevState.tweet, findresponse]
                            }))
                        }
                    } catch (err) {
                        console.log("err=======", err);
                    }
                })
            this.getHash();
        }
    }

    /** Load More Button Display To More Tweets */
    loadMore() {
        this.setState((prev) => {
            return { visible: prev.visible + 2 };
        });
    }

    /** Onchange During Search Tweets Text-Field Value  */
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    /** Search Button Onclick & Gets Tweets or Hashtags */
    handleClickSearch(event) {
        if (!this.state.value.length) {
            Swal.fire("Search Data Missing!", "", "warning");
        } else {
            event.preventDefault();
            this.setState({ isLoaded: false });
            this.getData();
            this.setState({ value: '' });
        }
    }

    /** Add Hashtag In Our App  */
    handleClickhashtag(event) {
        if (!this.state.value1.length) {
            Swal.fire("Please AddHashtag First!", "", "warning");
            this.handleCloseModel();
        } else {
            event.preventDefault();
            this.setState({ isLoaded: false });
            this.getHashTag();
            this.handleCloseModel();
            this.setState({ value1: '' });
        }
    }

    /** User Logout  */
    handleClickLogout() {
        localStorage.setItem('isAuthenticated', false);
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("username");
        localStorage.removeItem('photo');
        history.push('/');
        this.setState({ isLoaded: true, fireRedirect: true })
    }

    /** ModelClose During Sucess Response & Close Button Click */
    handleClose() {
        this.setState({ show: false });
    }

    /** Onchange Hashtag Text-Field Value */
    handleChangeEvent(event) {
        this.setState({ value1: event.target.value });
    }

    /** ModelShow  */
    handleShow() {
        this.setState({ show: true });
    }

    /** Popular Search-Tweets */
    getData = () => {
        const searchTweetsObj = {
            params: { key: this.state.value }
        }
        API.getSearchTweets(searchTweetsObj)
            .then((data) => {
                try {
                    if (!data.data.length) {
                        Swal.fire('Tweets Not Found....');
                        this.componentDidMount();
                    } else {
                        this.setState({
                            isLoaded: true,
                            displaysearchtweets: [data]
                        })
                        this.state.isTweetDisplay = false;
                        this.state.isSearchTweetDisplay = true;
                    }
                } catch (err) {
                    console.log("err======", err);
                }
            })
    }

    /** User Add Hashtag In Our App */
    getHashTag = () => {
        const hashtagObj = {
            hashtag: this.state.value1,
            email: localStorage.getItem('email')
        }
        API.getHashtags(hashtagObj)
            .then((data) => {
                try {
                    Swal.fire("Successfully Added!", "", "success");
                    this.setState({
                        isLoaded: true,
                    })
                    this.getHash();
                }
                catch (err) {
                    console.log("err======", err);
                }
            })
    }

    /** Display Hashtag In Our App */
    getHash() {
        API.displayHashtag()
            .then((res) => {
                try {
                    this.setState({
                        hashtag: res.data.data[0].hashtag
                    })
                } catch (err) {
                    console.log("err========", err);
                }
            })
    }

    /**
     * @param {*} id
     * Delete Hashtag In Our App
     */
    deletehash(id) {
        const deleteHashtagObj = {
            data: { hashtag: id, email: localStorage.getItem('email') }
        }
        API.deleteHashtag(deleteHashtagObj)
            .then((res) => {
                try {
                    Swal.fire("Successfully deleted!", "", "success");
                    this.componentDidMount();
                } catch (err) {
                    console.log("errr========", err);
                }
            })
    }

    /** Onclick Search Tweets Display */
    handleClick(event) {
        this.setState({ searchvalue: event.target.outerText, isLoaded: false });
        this.state.value = event.target.outerText;
        this.getData(event.target.outerText);
    }

    /** ModelOpen Onclick  */
    handleClickOpen() {
        this.setState({ setOpen: true, open: true });
    }

    /** 
     * @param {*} id
     * ModelOpen During Hashtag Add 
     */
    handleClickOpenHash(id) {
        this.setState({ setOpenModel: true, openModel: true, edithashthag: id });
    }

    /** Onchange Hashvalue Change In Text-Field  */
    handleChangehashEvent(event) {
        this.setState({ newhashtag: event.target.value });
    }

    /** Updatehashtag In App */
    handleClickupdatehashtag(event) {
        event.preventDefault();
        this.setState({ isLoaded: false });
        this.updatehash(this.state.newhashtag);
        this.handleCloseModelhashtag();
    }

    /** Close Model Hashtag */
    handleCloseModelhashtag() {
        this.setState({ openModel: false });
    }

    /**
     * @param {*} id
     * Update Hashtag In Our App 
     */
    updatehash(id) {
        const updateHashtagObj = {
            hashtag: id,
            email: localStorage.getItem('email')
        }
        API.updateHashtag(updateHashtagObj)
            .then((res) => {
                try {
                    Swal.fire("Successfully updated!", "", "success");
                    this.setState({
                        isLoaded: true
                    })
                    this.componentDidMount();
                } catch (err) {
                    console.log("err=======", err);
                }
            })
    }

    /** Close Model */
    handleCloseModel() {
        this.setState({ open: false });
    }

    /** Open Drawer In SideBar */
    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

    render() {
        /** User Authenticated */
        if (this.state.isAuthenticated == true) {
            const { isLoaded } = this.state;
            const { classes } = this.props;
            const temp = { ... this.state };
            const { isFetching } = this.state;
            let displaydata;
            let displaydate;
            let displayhashtag;
            let displaysearchtweetsview;

            /** Popular Twitter-Trends Display In Our App */
            if (!isFetching && this.state.data[0]) displaydata = this.state.data[0].trends.map(trends =>
                <List key={trends.name}>
                    {[trends.name].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            )

            /** Popular Twitter-Tweets Display In Our App */
            if (!isFetching && !this.state.displaysearchtweets.length && this.state.tweet[0]) displaydate = this.state.tweet[0].slice(0, this.state.visible).map(tweet =>
                <div key={tweet}>
                    <div key={tweet}>
                        <div className="tweet_class1">
                            <Grid container spacing={1}>
                                <Grid item sm={2}>
                                    <div className="profile_image_post">
                                        <img src={tweet.user.profile_image_url} />
                                    </div>
                                </Grid>
                                <Grid item sm={10}>
                                    <span className="username_title">{tweet.user.name}</span>
                                    <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/" + tweet.user.screen_name} aria-current="page">
                                        <span className="gray">@{tweet.user.screen_name}</span>
                                    </a>
                                    <p><span>{tweet.text}</span></p>
                                    <div className="hashtag_flex">{tweet && tweet.entities ? (tweet.entities.hashtags.map(hashtag =>
                                        <p key={hashtag} className="hash_color" onClick={(e) => this.handleClick(event)}>#{hashtag.text}</p>)) : ('')}</div>
                                    <div className="video">
                                        {tweet.extended_entities ? (<Player className="video_height" src={tweet.extended_entities.media[0].video_info.variants[0].url}></Player>) : ('')}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            )

            /** Popular Twitter-Search Tweets */
            if (this.state.displaysearchtweets[0] && this.state.displaysearchtweets[0].data && this.state.displaysearchtweets[0].data.length) displaysearchtweetsview = this.state.displaysearchtweets[0].data.slice(0, this.state.limit).map(searchelement =>
                <div className="tweet_class_search">
                    <Grid container spacing={12}>
                        <Grid item sm={2}>
                            <div className="profile_image_post1">
                                <img src={searchelement.user.profile_image_url} />
                            </div>
                        </Grid>
                        <Grid item sm={10}>
                            <span className="username_title">{searchelement.user.name}</span>
                            <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/" + searchelement.user.screen_name} aria-current="page">
                                <span className="gray">@{searchelement.user.screen_name}</span>
                            </a>
                            <p><span>{searchelement.text}</span></p>
                            <div className="hashtag_flex">{searchelement && searchelement.entities ? (searchelement.entities.hashtags.map(hashtag =>
                                <p className="hash_color" onClick={(e) => this.handleClick(event)}>#{hashtag.text}</p>)) : ('')}</div>
                            <div>
                                {searchelement.extended_entities ? (<div>
                                    {searchelement.extended_entities ? (<img className="search-tweet-imag" src={searchelement.extended_entities.media[0].media_url} />) : ('')}
                                </div>) : (<div className="video">
                                    {searchelement.extended_entities ? (<Player className="video_height" src={searchelement.extended_entities.media[0].video_info.variants[1].url}></Player>) : ('')}
                                </div>)}

                            </div>
                        </Grid>
                    </Grid>
                </div>
            )

            /** User Add Hashtag In Our App & Display Hashtag */
            if (this.state.hashtag && this.state.hashtag.length) displayhashtag = this.state.hashtag.map(hashtagname =>
                <List key={hashtagname}>
                    {[hashtagname.hashtag].map((text, index) => (
                        <ListItem button key={text}>
                            <Tooltip disableFocusListener title="Search"><ListItemText primary={text} onClick={(e) => this.handleClick(event)} /></Tooltip>
                            <Tooltip disableFocusListener title="Delete"><i className="fas fa-trash" onClick={this.deletehash.bind(this, text)} ></i></Tooltip>
                            <Tooltip disableFocusListener title="Edit"><i className="fas fa-pencil-alt" onClick={this.handleClickOpenHash.bind(this, text)}></i></Tooltip>
                            <div>

                                {/** Edit hashtag model */}
                                <Dialog
                                    fullScreen={this.fullScreen}
                                    open={this.state.openModel}
                                    onClose={this.handleCloseModel}
                                    aria-labelledby="responsive-dialog-title"
                                >
                                    <DialogTitle id="responsive-dialog-title">{"Edit Hashtag"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            <TextField
                                                id="standard-full-width"
                                                label="Edit Hashtag"
                                                style={{ margin: 8, width: 500 }}
                                                fullWidth
                                                margin="normal"
                                                defaultValue={this.state.edithashthag}
                                                onChange={this.handleChangehashEvent}
                                            />
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Tooltip disableFocusListener title="Edit">
                                            <Button onClick={this.handleClickupdatehashtag} color="primary">
                                                Edit
                                </Button>
                                        </Tooltip>
                                        <Tooltip disableFocusListener title="Close">
                                            <Button className="btn-left" onClick={this.handleCloseModelhashtag} color="primary">
                                                close
                                </Button>
                                        </Tooltip>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </ListItem>
                    ))}
                </List>
            )

            /** During Pending Response Loader Start || Sucess Response Loader Off & Display */
            if (!isLoaded) {
                return (
                    <center>
                        <div className="loader"></div>
                    </center>
                )
            } else if (isLoaded) {
                return (
                    <div className={classes.root}>
                        <CssBaseline />

                        {/** App-Bar Code */}
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
                                <Tooltip disableFocusListener title="Search">
                                    <Button onClick={this.handleClickSearch} color="primary" disabled={!this.state.value}>
                                        Search
                                    </Button>
                                </Tooltip>
                                <Tooltip disableFocusListener title="Logout">
                                    <Button style={{ right: 10, position: 'absolute' }} onClick={this.handleClickLogout} color="primary">
                                        Logout
                                    </Button>
                                </Tooltip>
                            </Toolbar>
                        </AppBar>

                        {/** Drawer Code */}
                        <nav className={classes.drawer}>
                            <Hidden smUp implementation="css">
                                <Drawer
                                    container={this.container}
                                    variant="temporary"
                                    anchor={classes.direction === 'rtl' ? 'right' : 'left'}
                                    open={this.state.mobileOpen}
                                    onClose={this.handleDrawerToggle}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    ModalProps={{
                                        keepMounted: true,
                                    }}
                                >
                                    <div className="menu-bar .MuiListItem-button">
                                        <div className={classes.toolbar} />
                                        <img className="img-twitter-logo" src={require('./feed.png')} />
                                        <span className="logo">Twitter</span>
                                        <List>
                                        </List>
                                        <h5 className="font-size">Trending Hashtag</h5>
                                        <List>
                                            <div onClick={(e) => this.handleClick(event)} className="trendshashtag">
                                                {displaydata}
                                            </div>
                                        </List>
                                        <h5 className="font-size">My Hashtag</h5>
                                        <List>
                                            <div className="hashtag">
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
                                        <img className="img-twitter-logo" src={require('./feed.png')} />
                                        <span className="logo">Twitter</span>
                                        <List>
                                        </List>
                                        <h5 className="font-size">Trending Hashtag</h5>
                                        <List>
                                            <div onClick={(e) => this.handleClick(event)} className="trendshashtag">
                                                {displaydata}
                                            </div>
                                        </List>
                                        <h5 className="font-size">My Hashtag</h5>
                                        <List>
                                            <div className="hashtag">
                                                {displayhashtag}
                                            </div>
                                        </List>
                                    </div>
                                </Drawer>
                            </Hidden>
                        </nav>
                        <main className={classes.content}>
                            <div className={classes.toolbar} />

                            {/** User Profile */}
                            <div className="profile_main_class">
                                <Grid container space={12}>
                                    <Grid item sm={1}>
                                        <div className="profile_img">
                                            <img src={this.photo} />
                                        </div>
                                    </Grid>
                                    <Grid item sm={11}>
                                        <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/" + this.name} aria-current="page">
                                            <h1>{this.name}</h1>
                                        </a>
                                        <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/" + this.username} aria-current="page">
                                            <span className="username-color">@{this.username}</span>
                                        </a>
                                    </Grid>
                                </Grid>
                            </div>

                            {/** Popular Twitter-Tweets */}
                            <div className="main_class_post">
                                <div className="tweet_bg_color">
                                    {displaydate}
                                </div>
                                {this.state.tweet[0] ? <div>{this.state.visible < this.state.tweet[0].length &&
                                    <button onClick={this.loadMore} type="button" className="load-more">Load more</button>
                                }  </div> : <div>No data</div>}
                            </div>

                            {/** Add Hashtag Button */}
                            <div className="add_tweet">
                                <Tooltip disableFocusListener title="Add-Hashtag">
                                    <Fab color="primary" aria-label="Add" onClick={this.handleClickOpen} className={classes.margin}>
                                        <AddIcon />
                                    </Fab>
                                </Tooltip>
                            </div>

                            {/** Add Hashtag Model Open */}
                            <Dialog
                                fullScreen={this.fullScreen}
                                open={this.state.open}
                                onClose={this.handleCloseModel}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">{"Add Hashtag"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <TextField
                                            id="standard-full-width"
                                            label="Add Hashtag"
                                            style={{ margin: 8, width: 500 }}
                                            fullWidth
                                            margin="normal"
                                            defaultValue={this.state.hash}
                                            onChange={this.handleChangeEvent}
                                        />
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Tooltip disableFocusListener title="Add">
                                        <Button onClick={this.handleClickhashtag} color="primary" disabled={!this.state.value1}>
                                            Add
                                    </Button>
                                    </Tooltip>
                                    <Tooltip disableFocusListener title="Close">
                                        <Button className="btn-left" onClick={this.handleCloseModel} color="primary">
                                            close
                                    </Button>
                                    </Tooltip>
                                </DialogActions>
                            </Dialog>

                            {/** Search Tweets */}
                            <div>
                                <div className="search_modals">
                                    {displaysearchtweetsview}
                                </div>
                            </div>
                        </main>
                    </div>
                );
            }
        } else {
            Swal.fire('Data Not Found....');
        }
    }
}
Home.propTypes = {
    container: PropTypes.object,
};

export default withStyles(classes)(Home);

