function rot13(str) {
    let endStr = '';
    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (char >= 'A' && char <= 'Z') {
            let endChar = String.fromCharCode(((char.charCodeAt(0) - 65 + 13) % 26) + 65);
            endStr += endChar;
        }
        else {
            endStr += char;
        }
    }
    return endStr;
}

rot13("SERR PBQR PNZC");