module.exports = {
    formatedResponse: (response) => {
        const value = Object.keys(response)[0]
        const answer = JSON.parse(value)
        return answer
    }
}