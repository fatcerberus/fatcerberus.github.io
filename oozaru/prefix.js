const prefixes = ['', 'webkit', 'moz', 'ms'];
export default preFIX;
function preFIX(name, object = window) {
    const vendoredName = prefixes
        .map(prefix => `${prefix}${name}`)
        .find(name => name in object);
    return object[vendoredName];
}
//# sourceMappingURL=prefix.js.map