### Input Planning

This document is just pseudocode for planning out the text input function.

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
