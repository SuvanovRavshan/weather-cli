import chalk from 'chalk';
import dedent from "dedent-js";

const printError = (error) => {
    console.log(`${chalk.bgRed(' ERROR ')} ${error}`);
}

const printSuccess = (message) => {
    console.log(`${chalk.bgGreen(' Success ')} ${message}`);
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(` HELP `)}
        Without params - show weather
        -s [CITY] set city
        -h help
        -t [API_KEY] set api token`
    );
}

const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgYellow(` WEATHER `)} Weather in ${res.name} city
        ${icon} ${res.weather[0].description}
        Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
        Humidity: ${res.main.humidity}%
        Wind speed: ${res.wind.speed}
        `
    );
}

export { printError, printSuccess, printHelp, printWeather };
