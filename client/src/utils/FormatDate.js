export const FormatDate = (date) => {
    let formattedDate = new Date(date);
    let day = formattedDate.getDate();
    if (day < 10) day = '0' + day;
    let month = formattedDate.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let year = formattedDate.getFullYear();
    let hours = formattedDate.getHours();
    if (hours < 10) hours = '0' + hours;
    let min = formattedDate.getMinutes();
    if (min < 10) min = '0' + min;
    return day + '.' + month + '.' + year + ', ' + hours + ':' + min;
}