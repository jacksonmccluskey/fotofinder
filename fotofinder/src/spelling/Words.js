const axios = require('axios')

// UNIX words

const url = 'https://gist.githubusercontent.com/anonymous/4d4ccc05ee8dfa637dc9e47548e90372/raw/2ced47226cbad8b1353a9afbb8593ade4d077267/wordlist.json'

// regex declarations

const regexVowels = /[aeiou]/g // used to identify vowels
const regexAlpha = /[^A-Za-z]/g // used to identify non-alpha characters

// retrieve UNIX words data

const getData = async () => {
    try {
        const { data } = await axios.get(url) // retrieve UNIX words from gist
        return data
    } catch (err) {
        console.log(err.message)
    }
}

// compare each word with term

const checkWords = (wordData, searchTerm) => {
    let finalWord = "Earth" // corrected word

    for (let i = 0; i < wordData.length; i++) { // first loop: check if searchTerm is in dictionary
        if (wordData[i] === searchTerm) { // searchTerm is equal to word in dictionary
            finalWord = wordData[i] // assign finalWord to current word in dictionary
            break
        }
    }

    if (finalWord !== "Earth") return finalWord // word is spelled correctly

    let possibleWords = []
    let possibleDistances = []

    for (let i = 0; i < wordData.length; i++) { // second loop: check if word matches searchTerm (non-vowels)
        if (matchConsonants(wordData[i], searchTerm)) { // searchTerm is equal to word in dictionary (non-vowels)
            const distance = levenshteinDistance(wordData[i], searchTerm)
            possibleWords.push(wordData[i])
            possibleDistances.push(distance)
            finalWord = wordData[i]
        }
    }

    finalWord = getClosestWord(possibleWords, possibleDistances)

    return finalWord
}

// mask both terms by replacing all vowels to compare non-vowel letters

const matchConsonants = (word, searchTerm) => {
    const lowerCaseWord = word.toLowerCase() // transform both words to lowercase
    const lowerCaseSearchTerm = searchTerm.toLowerCase() // ''

    const hashtagWord = lowerCaseWord.replace(regexVowels, '#') // replace all vowels with '#'
    const hashtagSearchTerm = lowerCaseSearchTerm.replace(regexVowels, '#') // ''

    return hashtagWord === hashtagSearchTerm // compare non-vowel letters
}

// levenshtein distance formula to find closest match

const levenshteinDistance = (a, b) => {
    if(a.length === 0) return b.length
    if(b.length === 0) return a.length

    let matrix = []

    // increment along the first column of each row
    let i = 0
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i]
    }

    // increment each column in the first row
    let j = 0
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) === a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                               Math.min(matrix[i][j-1] + 1, // insertion
                               matrix[i-1][j] + 1)) // deletion
                }
            }
        }

    return matrix[b.length][a.length];
}

const getClosestWord = (words, distances) => {
    const smallestIndex = indexOfSmallest(distances)

    if (smallestIndex === -1) return "Earth"

    return words[smallestIndex]
}

const indexOfSmallest = (distances) => {
    let smallestIndex = -1

    if (distances.length === 0) return smallestIndex

    const smallestDistance = Math.min(...distances)
    
    if (distances) smallestIndex = distances.indexOf(smallestDistance)

    return smallestIndex
}

// spell checker, remove non-alpha, compare with all words

const spellChecker = async (searchTerm) => {
    const correctedSearchTerm = searchTerm.replace(regexAlpha, '') // remove non-alpha

    const data = await getData() // retrieve word data

    return checkWords(data, correctedSearchTerm) // return corrected term
}

// run the spellChecker function on searchTerm

const runSpellChecker = async (searchTerm) => {
    return await spellChecker(searchTerm)
}

export default runSpellChecker