# dickwyn.xyz v2 ⚡

Hi! Thanks for dropping by the repo for my portfolio site. This second iteration enables quicker updates on my end and drops the reliance for Bootstrap for the CSS grid. This showcases my experiences and projects but also my skills as a web developer. Access it on [www.dickwyn.xyz](https://www.dickwyn.xyz/)

## Project Dependencies

This project is built with:

1. [NodeJS](http://nodejs.org)
2. [Ruby](https://www.ruby-lang.org/en/downloads/)

## Running the Project

**Pre-requisites**

```
$ gem install jekyll
$ yarn add gulp-cli -g
$ git clone https://github.com/dickwyn/v2.git
```

**Development Mode**

```
$ cd v2/
$ yarn
$ yarn start
```

**Production Mode**

```
$ yarn deploy
```

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
    ├── gulpfile.babel.js   # Automate compilation of pug, sass and jekyll
    ├── _config.yml         # Stores pre-determined values
    ├── .gitattributes
    ├── .gitignore          # Folders and files that are ignored by git
    ├── .prettierignore     # Folders and files that are ignored by prettier
    ├── .prettierrc         # Config for prettier
    ├── CNAME               # Used for GitHub pages custom domain
    ├── index.html          # main entry point
    ├── LICENSE
    ├── package.json        # Document node dependencies
    ├── README.md           # Readme file for repository
    └── yarn.lock           # Yarn lock file

## Inspiration

1. [Travis Neilson](https://github.com/travisneilson/Design-Code)
2. [shakyShane](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync)
3. [Brittany Chiang](https://github.com/bchiang7/bchiang7.github.io)

## License

The contents of this repository are covered under the [MIT License](https://github.com/dickwyn/dickwyn/blob/master/LICENSE).
