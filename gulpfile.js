const { Indexer, Packager } = require("@vesta/devmaid");

// creating index file
const indexer = new Indexer(`${__dirname}/src`);
indexer.generate();

// creating packages
const pkgr = new Packager({
    root: __dirname,
    src: "src",
    targets: ["es6"],
    files: [".npmignore", "LICENSE", "README.md"],
    transform: {
        package: function(package, target, isProduction) {
            if (isProduction) {
                delete package.private;
            }
            return false;
        }
    }
});

module.exports = pkgr.createTasks();