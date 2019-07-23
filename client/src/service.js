import axios from 'axios';
import { config } from './config';

export default {
    /** Location Wise Twitter-trends */
    getTwitterTrends: (trendsobj) => {
        console.log("current location==",trendsobj);
        return fetch(config.baseApiUrl + 'twitter-trends/' + trendsobj.latitudeobj + '/' + trendsobj.longitudeobj).
        then((Response) => Response.json())
        .catch({ status: 500, message: 'Internal Server Error' });
    },

    /** WorldWise Twitter-trends */
    getTwitterTrendsWorldWise: () => {
        return fetch(config.baseApiUrl + 'twitter-trends').
        then((Response) => Response.json())
        .catch({ status: 500, message: 'Internal Server Error' });
    },

    /** Popular Twitter-tweets */
    getTwitterTweets: () => {
        return fetch(config.baseApiUrl + 'twitter-tweets').
        then((Response) => Response.json())
        .catch({ status: 500, message: 'Internal Server Error' });
    },

    /** 
     * @param {string} searchTweetsObj
     * Popular Search-Tweets
     */
     getSearchTweets: (searchTweetsObj) => {
         return axios.get(config.baseApiUrl + 'search-tweets', searchTweetsObj).then(response => {
             return response;
         }).catch({ status: 500, message: 'Internal Server Error' });
     },

    /** 
     * @param {string} hashtagObj
     * Add Hashtag
     */
     getHashtags: (hashtagObj) => {
         return axios.post(config.baseApiUrl + 'user/addtag', hashtagObj).then(response => {
             return response;
         }).catch({ status: 500, message: 'Internal Server Error' });
     },

     /** Display Hashtag */
     displayHashtag: () => {
         return axios.get(config.baseApiUrl + 'user/gethashtag/' + localStorage.getItem('email')).then((response) => {
             return response;
         })
         .catch({ status: 500, message: 'Internal Server Error' });
     },

    /**
     * @param {string} deleteHashtagObj
     * Delete Hashtag
     */
     deleteHashtag: (deleteHashtagObj) => {
         return axios.delete(config.baseApiUrl + 'user/deletehashtag', deleteHashtagObj).then((response) => {
             return response;
         }).catch({ status: 500, message: 'Internal Server Error' });
     },

    /**
     *  @param {string} updateHashtagObj
     *  Update Hashtag
     */
     updateHashtag: (updateHashtagObj) => {
         return axios.put(config.baseApiUrl + 'user/updatehashtag', updateHashtagObj).then((response) => {
             return response;
         }).catch({ status: 500, message: 'Internal Server Error' });
     },

    /**
     *  @param {string} token
     *  Authenticate with token
     */
     authenticate: () => {
         const Token = localStorage.getItem('token');
         const headers = {
             'Content-Type': 'application/json',
             'Authorization': 'JWT fefege...',
             'token': Token
         }
         return axios.get('http://localhost:4000/user/checkToken', { headers: headers }).then((response) => {
             return response;
         }).catch({ status: 500, message: 'Internal Server Error' });
     }
 }