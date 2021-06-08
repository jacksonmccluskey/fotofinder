import runSpellChecker from "./spelling/Words"

const incorrect = ["nyl;on"]
const correct = ["nylon"]

describe('My Test Suite', () => {
    it('My Test Case', () => {
      expect(runSpellChecker(incorrect[0])).toEqual(correct[0]);
    });
});