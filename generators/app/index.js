'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const validatePackageName = require("validate-npm-package-name");

module.exports = class extends Generator {

  initializing() {
    this.log(`Welcome to the Ragnarok Plugin generator`);
  }

  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Name for the plugin',
      },
      {
        type: 'input',
        name: 'desc',
        message: 'Description for the plugin',
      },
      {
        type: 'input',
        name: 'license',
        message: 'License for the plugin',
        default: "MIT"
      },
      {
        type: 'input',
        name: "author",
        message: 'Author of the plugin',
        default: this.user.git.name(),
      }
    ];

    const props = await this.prompt(prompts);
    const validity = validatePackageName(props.name);

    if (!validity.validForNewPackages) {
      this.log("");
      const err = validity.errors && validity.errors[0] || "Invalid plugin name";
      this.log(`${chalk.red("Error")}: ${err}`);
      process.exit(1);
    }

    this.props = props;
  }

  writing() {
    let name = this.props.name;
    const ctx = {
      name: name,
      desc: this.props.desc,
      license: this.props.license,
      author: this.props.author,
      safeName: name.replace(/[-\s]/, "_"),
    }
    
    this.fs.copyTpl(
      this.templatePath('main.ts'),
      this.destinationPath('main.ts'),
      ctx
    );

    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      ctx
    );
  }

  install() {
    this.npmInstall();
  }
}
