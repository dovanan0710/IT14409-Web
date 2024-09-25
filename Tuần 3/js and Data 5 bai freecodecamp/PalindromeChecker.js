function palindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    for (let i = 0; i < Math.floor(str.length / 2); i++) {
        if (str.charAt(i) !== str.charAt(str.length - i - 1)) {
            return false;
        }
    }

    return true;
}
palindrome("eye");