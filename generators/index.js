'use strict';

const Generator = require('yeoman-generator');
const fs = require('fs-extra')

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
	}

	initializing() {
		this.log('Initializing the process');
		this.props = {};
		this.pkgs = {
			defaultPkgs: ['dotenv'],
			expressPkgs: ['express', 'bcrypt', 'cors', 'jsonwebtoken', 'mongoose', 'morgan'],
			expressDevPkgs: ['cross-env', 'jest', 'supertest', 'nodemon'],
		};
	}

	async prompting() {
		const props = await this.prompt([
			{
				type: 'input',
				name: 'name',
				message: "What's the name of your application?",
			},
			{
				type: 'input',
				name: 'description',
				message: 'Please enter a description for your project:',
			},
			{
				type: 'input',
				name: 'fullname',
				message: 'Please enter your name:',
			},
			{
				type: 'input',
				name: 'email',
				message: 'Please enter your email address:',
			},
		]);
    this.props.name = props.name;
    this.props.description = props.description;
    this.props.fullname = props.fullname;
    this.props.email = props.email;
	}

	async configuring() {
		this.log('Starting copying files')

		try {
			await fs.copy(`${ this.sourceRoot() }`, `${ this.destinationRoot(`${this.props.name}`) }`)
			this.log('Finished copying the template files.')
		} catch (error) {
			this.log(`An error has occurred copying the template files: ${error}`)
		}
	}

	async writing() {
		const pkgs = [...this.pkgs.defaultPkgs, ...this.pkgs.expressPkgs]
	
		const devPkgs = [...this.pkgs.expressDevPkgs]

		const packageJson = {
			name: this.props.name,
			version: '0.1.0',
			description: this.props.description,
			contributors: [`${this.props.fullname} <${this.props.email}>`],
			scripts: {
				dev: "nodemon server.mjs",
				start: "node server.mjs"
			},
			dependencies: await this.addDependencies(pkgs),
			devDependencies: await this.addDevDependencies(devPkgs),
		}

		this.fs.writeJSON(this.destinationPath('package.json'), packageJson)
		this.log('Finished writing the package.json')
	}

	async install(){
		this.log('Installing NPM packages, this can take a while')
		await this.spawnCommand('npm install')
		await this.spawnCommand('git init')
		
	}
	
	end() {
		this.log('All Done! Happy Coding')
	}

};
