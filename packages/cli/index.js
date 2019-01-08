/* eslint-disable no-console */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-use-before-define */

const program = require('commander')
const models = require('models')
const config = require('config')
const app = require('./package.json')

const userCommands = require('./commands/userCommands')

const mongoUri = config.get('database').connection

program.version(app.version)

program
  .command('create-user <email>')
  .description('Creates an user')
  .option('-p, --password <password>', 'User Password')
  .action(exec(userCommands.createUser))

program.command('*').action(() => {
  program.help()
})

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}

function errorThrown(err) {
  console.log('\u001b[31m')
  console.log('---- Error')
  console.error(err)

  if (err && err.stack) {
    console.log(err.stack)
  }

  console.timeEnd('Time elapsed')
  console.log('\u001b[0m')
  process.exit(1)
}

function succeeded(result) {
  console.log('\u001b[32m')
  console.log('---- Success')
  console.log(result)
  console.timeEnd('Time elapsed')
  console.log('\u001b[0m')
  process.exit(0)
}

function exec(f) {
  console.time('Time elapsed')
  return async (...params) => {
    await models.connect(mongoUri)
    try {
      const result = await f(...params)
      succeeded(result)
    } catch (err) {
      errorThrown(err)
    }
  }
}
