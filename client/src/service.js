import axios from 'axios';
import { config } from './config';

export default {

    getTwitterTrends: () => {
        return fetch(config.baseApiUrl + 'twitter-trends').
            then((Response) => Response.json())
            .catch(err => {
                console.log("err===", err);
            });
    },
    getTwitterTweets: () => {
        return fetch(config.baseApiUrl + 'twitter-tweets').
            then((Response) => Response.json())
            .catch(err => {
                console.log("err===", err);
            })
    },
    getSearchTweets: (searchTweetsObj) => {
        return axios.get(config.baseApiUrl + 'search-tweets', searchTweetsObj).then(response => {
            return response;
        })
            .catch(err => {
                console.log("err======", err);
            })
    },
    getHashtags: (hashtagObj) => {
        return axios.post(config.baseApiUrl + 'user/addtag', hashtagObj).then(response => {
            return response;
        })
            .catch(err => {
                console.log("err====", err);
            })
    },
    displayHashtag: () => {
        return axios.get(config.baseApiUrl + 'user/gethashtag/' + localStorage.getItem('email')).then((response) => {
            return response;
        })
            .catch(err => {
                console.log("err=======", err);
            })
    },
    deleteHashtag: (deleteHashtagObj) => {
        return axios.delete(config.baseApiUrl + 'user/deletehashtag', deleteHashtagObj).then((response) => {
            return response;
        })
            .catch(err => {
                console.log("err=======", err);
            })
    },
    updateHashtag: (updateHashtagObj) => {
        return axios.put(config.baseApiUrl + 'user/updatehashtag', updateHashtagObj).then((response) => {
            return response;
        })
            .catch(err => {
                console.log("err=======", err);
            })
    }
}