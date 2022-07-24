const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const EziiLog = (text, color) => {
	return !color ? chalk.greenBright('[ RYZUU ] ') + chalk.magentaBright(text) : chalk.greenBright('[ RYZUU ] ') + chalk.keyword(color)(text)
}

module.exports = {
	color,
	bgcolor,
    EziiLog
}
