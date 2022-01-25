const getArgs = (args) => {
    const res = {};
    const [executor, file, ...rest] = args;
    rest.forEach((val, index, array) => {
        if (val.charAt(0) === '-') {
            if (index === array.length - 1) {
                res[val.substring(1)] = true;
            } else if (array[index + 1].charAt(0) !== '-') {
                res[val.substring(1)] = array[index + 1];
            } else {
                res[val.substring(1)] = true;
            }
        }
    });
    return res;
};

export {getArgs}
