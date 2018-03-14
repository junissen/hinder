# hinder

Project Team: Prank Azaria 
Project Title: Hinder

Description: Everyone has a group of friends they love to mess with. Hinder is a shared social network to shoot pranks at your friends, get pranked by them and rate the best goofs. When you log in you are required to sit through all your pranks before you can send any. The longer you take between logins, the more annoying it’ll be to do so. :-)

Technical Details:
This is a node.js application with a mysql backend (hosted on Heroku with JAWS) using the Sequelize ORM.

We have a multi-page site with a sign up, login, main page, send prank, and profile pages.

The database stores the users, login info, their group memberships and a record of the pranks.

Our GET routes populate user profiles and the main pranks page. The POST routes allow new users and groups as well as handle the creation of new pranks.

The main page shows pending and previous pranks and allows members to vote on their favorites.

We are using a graphing plugin (like Chart.js or Raphael) to visualize the information in the database to show popular pranks and highest ranked Prankers.

=== Future Planning:
We hope to use handlebars to template the pages.
We will experiment with an authentication method for users.
We hope to populate a few prank categories from know fun web sources like Giphy and the Least Favorite Songs database.
Lastly we would like to add a notification engine that can send text alerts to users with a “current waiting pranks” count daily.
