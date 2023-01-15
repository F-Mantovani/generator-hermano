'use strict'

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log('Initializing...')
  }

  async start(){
   const answers = await this.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter a name for the new file: '
    }
  ])

    this.destinationRoot(answers.name)
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(answers.name + '.html' )
    )
  }
}