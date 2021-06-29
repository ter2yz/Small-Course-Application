
# Courses Picker

It's a small application for the test from Merkle. It's built for users to choose course and add them into the cart. At the same time, the courses can be filterd and sort by users as well.


## Installation 

Install my-project with npm

```bash 
  yarn start
```

## Environment Variables

To run this project, you will need to copy your `.env.example` file, rename to `.env` and then update the relaetd environment variables.

  
## Features

- Courses searching
- Course sorting
- Login function
    - Can be tested by a dummy account: 1@test.com / password

  
## Tech Stack

This is an application achieved via React, TailwindCSS and Firebase.
#### React JS
I think React is one of the easiest way to kick things off. React is offering hooks and state management so that the search / sort function can be finished effiently.
#### Tailwind CSS
Once React is in the plate, which is component-based framework, Tailwind CSS is then selected by me. Tailwind is designed to be component friendly. It is so much easier to separate a site's elements into smaller components and not pollute the codebase with objects or extraneous CSS classes.
#### Firebase
Firebase Authentication provides backend services, easy-to-use SDKs to authenticate users to this app. When it's set up, the login function task can be done nicely when adding courses into cart.