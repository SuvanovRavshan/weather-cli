#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import {printError, printHelp, printSuccess, printWeather} from "./services/log.service.js";
import {saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if(!token.length)
    {
        printError('No token passed');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess(`Token ${token} saved`);
    } catch (error) {
        printError(error.message);
    }
}

const saveCity = async (city) => {
    if(!city.length)
    {
        printError('City not set');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess(`City ${city} saved`);
    } catch (error) {
        printError(error.message);
    }
}

const getForecast = async () => {
    try {
        // Вывести погоду
        const weather = await getWeather();
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if(e?.response?.status === 404) {
            printError('Invalid city');
        } else if(e?.response?.status === 401) {
            printError('Invalid token');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv);
    if(args.h) {
        // Вывод help
        return printHelp();
    }
    if(args.s) {
        // Сохранить город
        return await saveCity(args.s);
    }
    if(args.t) {
        // Сохранить token
        return await saveToken(args.t);
    }
    return await getForecast();
};

await initCLI();
