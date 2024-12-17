import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

export const apiGuest = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export const apiMultipart = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
});