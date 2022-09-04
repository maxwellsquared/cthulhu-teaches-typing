### Input Planning

1. Load array of words (as string) to right of the text cursor.
   a. Load empty string to left.
2. Character input. On first character input, start timer.
3. If the character typed === the next character:
   a. (IF NOT SPACE) successfulCharacters ++
   b. call moveChar() // => Remove first character in right string, add to left string
   d. Strings container x-position -= 1 character-width
   e. User feedback (ding!)
4. If the character typed !== the next character:
   a. User feedback (BZZZZ! WRONGO! screenshake)
   b. Mistakes ++
5. WPM = (succesfulCharacters / 5) / minutes rounded down to int
6. Accuracy = 1 - (mistakes/successfulCharacters) expressed as %

### Results Modal

### Demo Mode

1. Use button to enable for now, set up Konami Code checker for demo mode later
2. Declare accuracy const as 0-1 (0 is 0% accuracy (all mistakes), 1 is 100% accuracy (no mistakes))
3. Declare WPM const
4. Set totalEntries const = (WPM times 5 chars divided by (counter divided by 60))
5. Set function to create array of TRUE and FALSE values
   a. If (random value between 0 and 1 > accuracy) add TRUE
   b. otherwise, add FALSE
   c. Length should be totalEntries + 50 (for safety margin)
6. Add isCorrect array to state at page load
7. Add isCorrectIndex to state at page load (starts at 0)
8. Add randomChar function to accept a character and return a DIFFERENT random character
9. Set typeChar function to enter either correct chars or mistakes
   a. Take in isCorrect array value at isCorrectIndex
   b. if TRUE enter correct character
   c. if FALSE enter result of randomChar(correct character)
   d. isCorrectIndex ++
   e. add 10% chance of setting a 150ms timeout
   f. add 5% chance of setting a 400ms timeout (timeouts simulate human typist)
10. Set interval to call typeChar()
    a. set interval time to totalEntries divided by (count times 1000 milliseconds)
