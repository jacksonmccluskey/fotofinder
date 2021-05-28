const axios = require('axios')

const url = 'https://gist.githubusercontent.com/anonymous/4d4ccc05ee8dfa637dc9e47548e90372/raw/2ced47226cbad8b1353a9afbb8593ade4d077267/wordlist.json'

const regexVowels = /[aeiou]/g
const regexAlpha = /[^A-Za-z]/g

function fetchWords(searchTerm) {
    let correctedSearchTerm = searchTerm.replace(regexAlpha, '')

    axios
    .get(url)
    .then(({ data }) =>
        checkWords(data, correctedSearchTerm)
    )
    .catch((err) => console.error("Fetch Words Error", err))
}

function checkWords(wordData, searchTerm) {
    let finalWord = "Not Found"

    for (let i = 0; i < wordData.length; i++) {
        if (wordData[i] === searchTerm) {
            console.log(wordData[i])
            finalWord = wordData[i]
            break
        }
    }

    if (finalWord !== "Not Found") return finalWord

    for (let i = 0; i < wordData.length; i++) {
        if (checkSpelling(wordData[i], searchTerm)) {
            console.log(wordData[i])
            finalWord = wordData[i]
            break
        }
    }

    console.log(typeof(finalWord))

    return finalWord
}

function checkSpelling(word, searchTerm) {
    let lowerCaseWord = word.toLowerCase()
    let lowerCaseSearchTerm = searchTerm.toLowerCase()

    let hashtagWord = lowerCaseWord.replace(regexVowels, '#')
    let hashtagSearchTerm = lowerCaseSearchTerm.replace(regexVowels, '#')

    let isSame = hashtagWord === hashtagSearchTerm

    return isSame
}

fetchWords("test")

module.exports = { fetchWords }