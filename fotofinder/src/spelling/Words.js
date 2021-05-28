const axios = require('axios')

const ROOT_URL = 'https://gist.githubusercontent.com/anonymous/4d4ccc05ee8dfa637dc9e47548e90372/raw/2ced47226cbad8b1353a9afbb8593ade4d077267/wordlist.json'

const regexVowels = /[aeiou]/g
const regexAlpha = /[^A-Za-z]/g

// retrieve UNIX words data

const getData = async () => {
    try {
        const {data} = await axios.get(ROOT_URL);
        console.log("getData: try")
        console.log(data)
        return data;
    } catch (err) {
        console.log(err.message);
    }
}

// compare each word with term

const checkWords = (wordData, searchTerm) => {
    let finalWord = "Not Found" // corrected word

    console.log("checkWords: wordData")
    console.log(wordData)

    for (let i = 0; i < wordData.length; i++) { // first loop: check if searchTerm is in dictionary
        if (wordData[i] === searchTerm) { // searchTerm is equal to word in dictionary
            finalWord = wordData[i] // assign finalWord to current word in dictionary
            break
        }
    }

    console.log("checkWords: finalWord")
    console.log(finalWord)
    console.log(typeof(finalWord))

    if (finalWord !== "Not Found") return finalWord // word is spelled correctly

    for (let i = 0; i < wordData.length; i++) { // second loop: check if word matches searchTerm (non-vowels)
        if (matchConsonants(wordData[i], searchTerm)) { // searchTerm is equal to word in dictionary (non-vowels)
            finalWord = wordData[i] // assign finalWord to current word in dictionary
            break
        }
    }

    console.log("checkWords: finalWord")
    console.log(finalWord)
    console.log(typeof(finalWord))

    return finalWord
}

// mask both terms to compare non-vowel letters

const matchConsonants = (word, searchTerm) => {
    const lowerCaseWord = word.toLowerCase() // transform both words to lowercase
    const lowerCaseSearchTerm = searchTerm.toLowerCase() // ''

    const hashtagWord = lowerCaseWord.replace(regexVowels, '#') // replace all vowels with '#'
    const hashtagSearchTerm = lowerCaseSearchTerm.replace(regexVowels, '#') // ''

    return hashtagWord === hashtagSearchTerm // compare non-vowel letters
}

// spell checker, remove non-alpha, compare with all words

const spellChecker = async (searchTerm) => {
    const correctedSearchTerm = searchTerm.replace(regexAlpha, '')

    const data = await getData()

    console.log("spellChecker: getData()")
    console.log(data)

    const word = checkWords(data, correctedSearchTerm)

    console.log("spellChecker: word")
    console.log(word)

    return word
}

const runSpellChecker = async (searchTerm) => {
    return await spellChecker(searchTerm)
}

runSpellChecker("citias7").then((correctedTerm) => {console.log(correctedTerm)})

module.exports = { runSpellChecker }