JUBILEE TAMIL CHURCH - OUR STORY UPDATE

WHAT CHANGED
- Removed the old "Jesus At The Center / People At The Heart" About block.
- Added a new premium "Our Story" section.
- Church history now states:
  * Founded on 15 August 1997
  * Began with a few faithful members/families
  * Has grown to 100+ church families
  * Warm invitation for visitors to worship with Jubilee Tamil Church
- Uses the supplied church exterior photo as the main image.
- Uses the supplied sanctuary photo as the supporting image.
- Includes 1997 / 100+ / One Growing Family highlight cards.
- Includes a direct Visit Jubilee Tamil Church map button.
- Kept the latest weekly gathering changes and gallery component/assets.
- Synced Sunday service time in the hero/service area to 9:45 AM - 11:30 AM.

INSTALL
1. Replace your existing:
   src/pages/Home.jsx
   src/App.css

2. Replace/add:
   src/components/JubileeAlbums.jsx

3. Copy the complete folder:
   src/assets/jubilee-albums/
   into your existing src/assets/ folder.

4. Copy these two new images into src/assets/:
   church-history-exterior.jpg
   church-history-sanctuary.jpg

5. Save all files and run:
   npm.cmd run dev

IMPORTANT
Do not delete your existing logo.png, church.jpg, worship.jpg, community.jpg or event.png.
The update expects those existing project assets to remain in src/assets/.


CONTACT FORM UPDATE
- Added Prayer Request / Enquiry switching.
- Both options submit to: jubileetamilchurchsanpada@gmail.com
- Designed to work on a static GitHub Pages website using FormSubmit.co.

FIRST-TIME ACTIVATION
1. Put the website online.
2. Submit either form once.
3. Open jubileetamilchurchsanpada@gmail.com.
4. FormSubmit.co will send a confirmation email.
5. Click the confirmation link.
6. After confirmation, future submissions should arrive in that inbox.

Email subjects:
- Jubilee Tamil Church Website - Prayer Request
- Jubilee Tamil Church Website - Enquiry


FINAL SPACING + SERVICE UPDATE

Changed:
- Service section now has ONLY:
  1. Sunday Service — 9:45 AM to 11:30 AM
  2. Wednesday Bible Study — 8:00 PM to 9:00 PM

- Weekly Gatherings section also shows only those same two gatherings.
- Fixed spacing between Sunday Service and its time in Contact.
- Fixed spacing between Email and the email address.
- Fixed Google Maps label so title/subtitle appear on separate lines.
- Fixed leadership card grid so the fourth card does not clip off screen.
- Improved tablet/mobile spacing.

Install:
Replace:
  src/pages/Home.jsx
  src/App.css

Then:
  npm.cmd run dev
