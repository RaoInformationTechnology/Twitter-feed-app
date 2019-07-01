import axios from 'axios';
import { config } from './config';

export default {
    /** Popular Twitter-trends */
    getTwitterTrends: () => {
        return fetch(config.baseApiUrl + 'twitter-trends').
            then((Response) => Response.json())
            .catch({ status: 500, message: 'Internal Serevr Error' });
    },
    /** Popular Twitter-tweets */
    getTwitterTweets: () => {
        return fetch(config.baseApiUrl + 'twitter-tweets').
            then((Response) => Response.json())
            .catch({ status: 500, message: 'Internal Serevr Error' });
    },
    /** 
     * @param {*} searchTweetsObj
     * Popular Search-Tweets
     */
    getSearchTweets: (searchTweetsObj) => {
        return axios.get(config.baseApiUrl + 'search-tweets', searchTweetsObj).then(response => {
            return response;
        })
            .catch({ status: 500, message: 'Internal Serevr Error' });
    },
    /** 
     * @param {*} hashtagObj
     * Add Hashtag
     */
    getHashtags: (hashtagObj) => {
        return axios.post(config.baseApiUrl + 'user/addtag', hashtagObj).then(response => {
            return response;
        })
            .catch({ status: 500, message: 'Internal Serevr Error' });
    },
    /** Display Hashtag */
    displayHashtag: () => {
        return axios.get(config.baseApiUrl + 'user/gethashtag/' + localStorage.getItem('email')).then((response) => {
            return response;
        })
            .catch({ status: 500, message: 'Internal Serevr Error' });
    },
    /**
     * @param {*} deleteHashtagObj
     * Delete Hashtag
     */
    deleteHashtag: (deleteHashtagObj) => {
        return axios.delete(config.baseApiUrl + 'user/deletehashtag', deleteHashtagObj).then((response) => {
            return response;
        })
            .catch({ status: 500, message: 'Internal Serevr Error' });
    },
    /**
     *  @param {*} updateHashtagObj
     *  Update Hashtag
     */
    updateHashtag: (updateHashtagObj) => {
        return axios.put(config.baseApiUrl + 'user/updatehashtag', updateHashtagObj).then((response) => {
            return response;
        })
            .catch({ status: 500, message: 'Internal Serevr Error' });
    }
}