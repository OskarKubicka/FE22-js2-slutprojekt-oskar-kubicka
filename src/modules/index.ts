import { User } from "./type.ts"
import { getUsers, putUser } from "./firebase.ts"


const formCreate: HTMLElement | null = document.getElementById('create-form')
const formLogIn: HTMLElement | null = document.getElementById('logga-in')
const img1div: HTMLElement | null = document.getElementById('img-1-div')
const img2div: HTMLElement | null = document.getElementById('img-2-div')
const img3div: HTMLElement | null = document.getElementById('img-3-div')
const newAccount: HTMLElement | null = document.getElementById('nytt-konto');
if (newAccount) newAccount.addEventListener('click', () => {
    if (formCreate && formLogIn) {
        formCreate.style.display = "flex"
        formCreate.style.flexFlow = "column";
        newAccount.style.display = "none"
        formLogIn.style.display = "none"
    }
})

if (formCreate && img1div && img2div && img3div) {
    const img1: HTMLImageElement = document.createElement('img')
    img1div.append(img1)
    const imgUrl1 = new URL('../img/Asset2.png', import.meta.url);
    img1.src = imgUrl1.href;
    img1.setAttribute("class", "img")
    const img2: HTMLImageElement = document.createElement('img')
    img2div.append(img2)
    const imgUrl2 = new URL('../img/Asset3.png', import.meta.url);
    img2.src = imgUrl2.href;
    img2.setAttribute("class", "img")
    const img3: HTMLImageElement = document.createElement('img')
    img3div.append(img3)
    const imgUrl3 = new URL('../img/Asset4.png', import.meta.url);
    img3.src = imgUrl3.href;
    img3.setAttribute("class", "img")
}


getUsers().then(createUser)

getUsers().then(logIn)

function createUser(totalUsers: User[]): void {

    //längden på arrayen för att se vilken plats ny användare ska in på

    let lengthUse: number = totalUsers.length

    ///jämför om användaren redan finns
    const nameArr: string[] = [];

    if (totalUsers.length != 0) {
        totalUsers.forEach(element => {

            nameArr.push(element.username)
        })
    }

    if (formCreate) {
        formCreate.addEventListener('submit', event => {
            event.preventDefault();

            const target: HTMLElement = event.target as HTMLElement;
            if (target) {


                const userName: string = target[0].value
                const password: string = target[1].value
                let imgUrl: string = ''
                if (target[2].checked) {
                    imgUrl = target[2].value
                }
                else if (target[3].checked) {
                    imgUrl = target[3].value
                }
                else if (target[4].checked) {
                    imgUrl = target[4].value
                }


                let newUser: Object = {
                    username: userName,
                    password: password,
                    status: [0],
                    url: imgUrl,
                    counter: [0]
                }


                if (userName) {

                    if (nameArr.includes(userName) == false) {
                        putUser(newUser, lengthUse)

                        setTimeout(() => {

                            location.reload();
                        }, 300)
                    }
                    else {
                        alert('Det finns redan en användare med det namnet')
                    }

                }

            }
        }
        )
    }
}

function logIn(allUsers: User[]): void {

    ///lägger alla användares namn och lösen i varsin array
    const nameArr: string[] = [];
    const passArr: string[] = [];
    if (allUsers.length != 0) {
        allUsers.forEach(element => {
            nameArr.push(element.username)
            passArr.push(element.password)
        })
    }


    if (formLogIn) {
        formLogIn.addEventListener('submit', event => {
            event.preventDefault();

            const target: HTMLElement = event.target as HTMLElement;
            if (target) {

                
                let userName = target[0].value
                let passWord = target[1].value

                if (userName) {
                    //om namnarrayen innehåller nuvarande inloggsnamn:
                    if (nameArr.includes(userName) == true) {

                        if (passWord == passArr[nameArr.indexOf(userName)]) {

                            localStorage.setItem('user', userName)

                            window.location.assign("./html/profile.html")
                        }
                        else alert('fel lösenord')
                    }
                    else {
                        alert('användaren finns inte')
                    }
                }
            }
        })
    }
}


//export {formCreate, formLogIn}

