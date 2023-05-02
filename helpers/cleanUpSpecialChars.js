//Get rid of special characters
function cleanUpSpecialChars(str) {
  return str
    .replace(/[ÀÁÂÃÄÅÆ]/g, "A")
    .replace(/[àáâãäåæ]/g, "a")
    .replace(/[Ç]/g, "C")
    .replace(/[ç]/g, "c")
    .replace(/[ÈÉÊË]/g, "E")
    .replace(/[èéêë]/g, "e")
    .replace(/[ÌÍÎÏ]/g, "I")
    .replace(/[ìíîï]/g, "i")
    .replace(/[Ñ]/g, "N")
    .replace(/[ñ]/g, "n")
    .replace(/[ÒÓÔÕÖØ]/g, "O")
    .replace(/[òóôõöø]/g, "o")
    .replace(/[Š]/g, "S")
    .replace(/[š]/g, "s")
    .replace(/[ß]/g, "ss")
    .replace(/[ÚÛÜÙ]/g, "U")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ÝŸ]/g, "Y")
    .replace(/[ýÿ]/g, "y")
    .replace(/[Ž]/g, "Z")
    .replace(/[ž]/g, "Z")
    .replace(/[^\x00-\x7F]+/g, '') //non ascii
  //.replace(/[^a-z0-9]/gi,''); // final clean up
}

module.exports = cleanUpSpecialChars