module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    }
}