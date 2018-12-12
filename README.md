# dickwyn.xyz v2 ⚡

Hi! Thanks for dropping by the repo for my portfolio site. This second iteration enables quicker updates on my end and drops the reliance for Bootstrap for the CSS grid. This showcases my experiences and projects but also my skills as a web developer. Access it on [www.dickwyn.xyz](https://www.dickwyn.xyz/)

## Project Dependencies

This project is built with:

1. [NodeJS](http://nodejs.org)
2. [Ruby](https://www.ruby-lang.org/en/downloads/)
3. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
4. [GulpJS](https://gulpjs.com/) - `$ npm install gulp-cli -g`
5. [PugJS](https://pugjs.org/api/getting-started.html) - `$ npm install pug`

## Running the Project

**Get Started**

1. Clone or download this repository
2. `$ npm install` on the directory

**Development Mode**

1. `$ gulp pug`
2. `$ gulp`
3. Browsersync can be accessed through `localhost:3000`

**Production Mode**
1. `$ gulp deploy`

## Folder Structure

    .
    ├── .publish       
    ├── _data               # YAML (.yml) files to support liquid templates 
    ├── _includes           # Folder for the broken up components
    ├── _layouts            # Default layout for page types
    ├── _pugfiles           # Uncompiled .pug scripts
    ├── _site               # Tools and utilities
    ├── assets              # All additional assets of the projects
    │   ├── css             # All stylesheets (.css and .scss)
    │   │   └── uncomp      # All unprocessed .scss files
    │   ├── images          # All images used by the project
    │   │   └── pre         # Original image files before compression
    │   └── js              # All additional scripts (.js)
    ├── .gitattributes
    ├── .gitignore          # Folders and files that are ignored by git
    ├── CNAME               # Used for GitHub pages custom domain
    ├── README.md           # Readme file for repository
    ├── _config.yml         # Stores pre-determined values
    ├── gulpfile.js         # Automate compilation of pug, sass and jekyll
    ├── index.html          # main entry point
    ├── package-lock.json
    └── package.json        # Document node dependencies

## Inspiration

1. [Travis Neilson](https://github.com/travisneilson/Design-Code)
2. [shakyShane](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync)
3. [Brittany Chiang](https://github.com/bchiang7/bchiang7.github.io)

## License
The contents of this repository are covered under the [MIT License](https://github.com/dickwyn/dickwyn/blob/master/LICENSE).
