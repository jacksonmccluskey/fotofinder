# FotoFinder [Final Project](fotofinderapp.web.app)
A simple, responsive website built with React to display images from a search term using the Flickr API.

![](FotoFinder.png)

## Installation and Setup Instructions

#### Details:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

`git clone https://github.com/jacksonmccluskey/FotoFinder.git`

Installation:

`npm install`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000` 

## Requirements and User Stories

#### Requirements:

- [x] Create a simple responsive website to display images from a search term using an image search API of your choice
- [x] Should include one text entry field
- [x] Should include a button to request results
- [x] Should include a results area to display the images in a gallery style of your choice
- [x] When tapping on an image, it should display in a responsive overlay
- [x] Implement your own spelling checker that automatically corrects some user input mistakes
  - [x] You can also use a Unix words dictionary file to assist in determining the validity of words
  - [x] Run your spell checker on the input word before submitting the image search requests
  - [x] Remove non-letter characters. 'nyl;on' should auto-correct to ‘nylon'
  - [x] Mistyped vowels. 'ceku' should auto-correct to ‘cake'
- [x] Make sure to take into account some error handling, and keep your code clean and organized
- [x] Create a README that documents the assumptions and decisions that you have made in designing the architecture of your site
- [x] Please host the site on Heroku or another platform of your choice [Link](fotofinderapp.web.app)

## Tech Stack

#### Tools & Resources Used:

- React / React Hooks (For Frontend Components)
- React Router (For Navigation)
- Context API (For Data Globalization)
- Flickr API (For Image Search)
- axios (For Fetching Data)
- Unix words (For Spell Checking)

## Spell Checker Logic

#### Retrieving the Unix Dictionary

`import json`

`with open('/usr/share/dict/words') as infile:`

    `words = infile.read().splitlines()`
    
    `with open('words.json', 'w') as outfile:`
    
        `json.dump(words, outfile)`
        
#### Removing Non-Letter Characters

`term.replace(/[^A-Za-z]g, '')`

#### Replacing Mispelled Vowels

`let lowerCaseWord = word.toLowerCase()`

`let lowerCaseSearchTerm = searchTerm.toLowerCase()` 

`let hashtagWord = lowerCaseWord.replace(regexVowels, '#')` 

`let hashtagSearchTerm = lowerCaseSearchTerm.replace(regexVowels, '#')` 

`return hashtagWord === hashtagSearchTerm`
