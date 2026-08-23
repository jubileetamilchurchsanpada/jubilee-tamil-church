Jubilee Tamil Church gallery fix

WHY THE PHOTOS WERE BLANK
The previous version used Google Drive thumbnail URLs directly in the browser.
Those URLs can fail or block image hotlinking, which caused the blank full-screen viewer.

WHAT THIS FIX DOES
1. The 25th MDCM Children Sunday album now uses 3 REAL photos downloaded from your Google Drive and stored locally in the React project.
2. The MDCM cover photo has also been changed to a real event photo.
3. Every other album now always has 3 LOCAL temporary images, so you never get a blank full-screen viewer.
4. Temporary albums display "More Photos Coming Soon".
5. The full-screen viewer and thumbnail strip have been adjusted so photos stay visible and clear.

INSTALL
Replace:
  src/components/JubileeAlbums.jsx
  src/App.css

Copy this whole folder:
  src/assets/jubilee-albums/

into your existing:
  src/assets/

Then run:
  npm.cmd run dev

Later we can repeat the same process for Men's Fellowship, Women's Fellowship,
Anniversary, Christmas Carols, Palm Sunday, and the other folders by downloading
2-3 real photos from each Drive folder into src/assets/jubilee-albums/.
