module.exports = () => {
    return {
        handleFatalError: function(err) {
            // console.error(`${chalk.red('[fatal error]')} ${err.message}`)
            console.error(err.stack)
            process.exit(1)
        },
        handleError: function(err, state) {
            console.log(err)
            return state()
        }
    }
}