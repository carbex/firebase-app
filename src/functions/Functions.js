// SORT ARRAY BY OBJECT PROPERTY PASSING THIS FUNCTION AS ARG OF SORT FUNCTION
// Ex: .sort(dynamicSort('propertyName'))
export const dynamicSort = (property) => {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

// CAPITALIZE
export const capitalize = (arg) => {
    if (typeof arg !== 'string') return ''
    return arg.charAt(0).toUpperCase() + arg.slice(1).toLowerCase()
}

// CONVERT DATE
export const convertDate = (arg) => {
    var date = new Date(arg)
    var myDateString = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
    return myDateString
}
