const userData= [
    {user:"user1", password:"user1"},
    {user:"user2", password:"user2"},
    {user:"user3", password:"user4"},
]

const validateUser = (user, password, userData, passwordData) => (user == userData && password == passwordData)?window.location="./apptemp.html":console.log('No correcto');
const App = async () => {
    const formElement = document.querySelector('form');
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputUser = document.querySelector('#user');
            const inputPassword = document.querySelector('#password');
                userData.forEach(element => {
                    validateUser(inputUser.value, inputPassword.value, element.user, element.password)
                })
        })
}
App();