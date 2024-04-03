# chainsaw-fire: FEMA website class project

## Goals:
[ ] Figure out all required inputs and how to handle them
[ ] HTML w/css front page\
[X] Javascript for the logic for dealing with data\
[x] Choose a database, SQLite potentially?\
[ ] Make list of functions that are needed\
[ ] Find busdrivers eyes\
[ ] Ensure all requirements are met\
[ ] Make a requirements list\
[ ] Figure out the base/minimalized program\
[x] Sign up page

## Non-Goals:
[ ] Add more features than are required\
[ ] Don't overcomplicate the process\
[ ] style.css\
[ ] Mobile-friendly\
[ ] Dark mode\
[ ] Security\
[ ] Input Validation\
[ ] Users having multiple types

**Note: Every commented function will be signed by contributors.**

## Quick Start Guide

1. Install **Node.js** on your machine: https://nodejs.org/dist/v20.11.1/node-v20.11.1.pkg
2. Install **XAMPP**: https://www.apachefriends.org/
3. Install the **Live Server** extension: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
4. Install: https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets
5. Install: https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next
6. Install: https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons

## Developing the Application

5. Start the **Apache** and **mySQL** servers in **XAMMP** 
6. Go to http://localhost/phpmyadmin/ .
8. **Drop** the locally installed fema databse.
7. Create a new database '*fema*'.
8. The breadcrum trail at the top of phpMyAdmin should now look something like: ***"Server: localhost / Databse: fema"***
9. In VS Code, right-click **fema.sql** and select **Reveal in Finder**
10. Drag **fema.sql** into the current phpMyAdmin window.
11. Upload **fema.sql** here. 
12. In **VScode**, open a new terminal, and cd into the **server** directory.
13. run ***npx nodemon app.js***
14. Nagivate to the HTML file for the page you want to work on.
15. Right-click the file and *Open with Live Server*. 
16. Use your browser's debugger.

**AN IMPORTANT NOTE ON DATABASE COLLABORATION:**: Whenever you make changes to the database, make sure they are reflected in fema.sql.


## The art of Good Git Commit Messages:

https://cbea.ms/git-commit/#seven-rules

## Tutorials Hayden has used that are helpful: 
videos: https://youtube.com/playlist?list=PLnqhWGNR9f9--oV4PHu1-Z8Yx8HlELQgd&si=2tvHg_H2gn3ZIunx

multer: https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/

HTTP request methods:
https://medium.com/swlh/restful-api-design-get-post-put-patch-delete-a-walkthrough-with-javascripts-fetch-api-e37a8416e2a0

## Time Log

 Hayden:

 - Learning Web Development General: 14 hr
 - Setting up development environment: 2 hr
 - Refactoring all front-end: 1.5 hr
 - Adding sign-up/sign in form 5.0 hr
 - Creating Sign-in back-end: 0.5 hr
 - Debugging Sign-in back-end: 5 hr
 - General Database debugging: 1 hr
 - Create feature for Create Disaster Page: Image Upload: 1 hr
 - Debug feature for Create Disaster Page: Image Upload: 2 hr
 - Create Disaster Page Debugging: 6 hr
