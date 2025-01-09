import axios from 'axios';
import * as appContant from '../App.constant';

export const fetchReferralsBy = async (code, setUserInfo) => {
    try {
        const response = await axios.get(`${appContant.backendUrl}nirs/referral/${code}`);

        if (response.status !== 200 && response.status !== 201) {
            throw new Error('Failed to fetch additional user info.');
        }

        // const referrals = response?.data || [];

        // TODO: remove this after testing
        const referrals = [];

        setUserInfo((prevUserInfo) => {
            return {
                ...prevUserInfo,
                referrals,
            };
        });
    } catch (error) {
        console.error('Error fetching user info by address:', error);
        throw error;
    }
};


export const fetchUserBy = async (walletAddress, setClaimedAmount, setLastClaimedAt, setUserInfo) => {
    try {
        const response = await axios.get(`${appContant.backendUrl}nirs/${walletAddress}`);

        if (response.status !== 200 && response.status !== 201) {
            return console.error('Failed to fetch additional user info.');
        }

        const { data } = response;

        const { amount, lastClaimTime: lastClaimedAt } = data.data;

        setClaimedAmount(amount);
        setLastClaimedAt(lastClaimedAt);

        setUserInfo((prevUserInfo) => {
            return {
                ...prevUserInfo,
                amount,
            };
        });
    } catch (error) {
        console.error('Error fetching user info by address:', error);
    }
};