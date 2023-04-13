import { Data } from "./type.ts"


const formCreate: HTMLElement | null = document.getElementById('create-form')
const formLogIn: HTMLElement | null = document.getElementById('logga-in')
const img1div: HTMLElement | null = document.getElementById('img-1-div')
const img2div: HTMLElement | null = document.getElementById('img-2-div')
const img3div: HTMLElement | null = document.getElementById('img-3-div')
const newAccount: HTMLElement | null = document.getElementById('nytt-konto');
if (newAccount) newAccount.addEventListener('click', () => {
    if (formCreate && formLogIn) {
        formCreate.style.display = "flex"
        formCreate.style.flexFlow= "column";
        newAccount.style.display ="none"
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
////fetch
const url: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users.json`

async function getUsers(): Promise<Data[]> {
    const response = await fetch(url);
    const data = await response.json();
    
    return data
}


getUsers().then(createUser)


function createUser(data: Data[]): void {
    //längden på arrayen för att se vilken plats ny användare ska in på

    let lengthUse: number = data.length

    ///jämför om användaren redan finns
    const nameArr: string[] = [];
    if (data.length != 0) {
        data.forEach(element => {

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
                if (target[3].checked) {
                    imgUrl = target[3].value
                }
                if (target[4].checked) {
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

//skapa användare
async function putUser(obj: object, index: number) {
    const urlPut: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users/${index}.json`
    const init: Object = {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': "application/json;charset=UTF-8"
        }
    };
    const response = await fetch(urlPut, init);
    const data = await response.json();

}

//logga in

getUsers().then(logIn)

function logIn(data: Data[]): void {

    ///jämför om användaren redan finns
    const nameArr: string[] = [];
    const passArr: string[] = [];
    if (data.length != 0) {
        data.forEach(element => {
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


