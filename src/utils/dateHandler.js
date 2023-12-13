const setDate = (date, hour, minute) => {
    let d = new Date(date)
    return new Date(new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute, 0).getTime() + 120 * 60 * 1000);
}

const getDate = (date) => {
    let d = new Date(date)
    return new Date(Date.now() + 120 * 60 * 1000);
}

module.exports = {
    setDate: setDate,
    getDate: getDate
}