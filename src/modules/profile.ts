import { User } from "./type.ts"
import { getUsers, putStatus, putCounter, newUserList, getUsersAfterDelete, deleteUserFirebase, putFirebase} from "./firebase.ts"

//för användaren
const img1profile: HTMLImageElement = document.createElement('img')
const imgUrl1Profile = new URL('../img/Asset2.png', import.meta.url);
img1profile.src = imgUrl1Profile.href;
const img2profile: HTMLImageElement = document.createElement('img')
const imgUrl2Profile = new URL('../img/Asset3.png', import.meta.url);
img2profile.src = imgUrl2Profile.href;
const img3profile: HTMLImageElement = document.createElement('img')
const imgUrl3Profile = new URL('../img/Asset4.png', import.meta.url);
img3profile.src = imgUrl3Profile.href;


const listOfUsers: HTMLElement | null = document.querySelector('#list-of-users');
const myProfile: HTMLElement | null = document.querySelector('#my-profile');
const statusForm: HTMLElement | null = document.querySelector('#status-form');
const deleteBtn: HTMLButtonElement | null = document.querySelector('#delete')
const logOutBtn: HTMLButtonElement | null = document.querySelector('#log-out')
const title: HTMLButtonElement | null = document.querySelector('#title')
const comments: HTMLButtonElement | null = document.querySelector('#comments')

getUsers().then(showUsers)

function showUsers(allUsers: User[]): void {


    allUsers.forEach((element, index) => {
        
        const { username, url, counter } = element

        if (listOfUsers) {
            const card: HTMLElement = document.createElement('div');
            listOfUsers.append(card);
            //profilanvändarens del - ska ej vara med i listan till höger och displayas därför ej där
            showProfilePageUser(username, url, counter, element, index, card, allUsers)

            //listan på användare
            card.addEventListener('click', () => {

                localStorage.setItem('differentUser', username)
                window.location.assign("./differentUserpages.html")
            })
            const h1Username: HTMLElement | null = document.createElement('h1')
            h1Username.innerText = username
            card.append(h1Username)


            card.style.backgroundColor = "hsla(30, 80%, 50%, 1)"
            card.style.borderRadius = "10px"
            card.style.textAlign = "center"
            card.style.padding = "8px 11px"
            card.style.fontFamily = "Rationale, sans-serif;"
            card.style.margin = "10px"
            card.style.fontSize = "x-small"
            card.style.border = "#b2501d solid 15px"
            card.onmouseover = function () {
                card.style.cursor = "pointer"
            }
        }
    })


}

//deleteUser()
function showProfilePageUser(username: string, url: string, counter: number[] | undefined, element: User, index: number, card: HTMLElement, allUsers: User[]) {
    if (username == localStorage.getItem('user') && myProfile) {

        card.style.display = "none"
        const h1UsernameUser: HTMLElement | null = document.createElement('h1')
        h1UsernameUser.innerText = "Välkommen " + username

        if (title) {
            title.append(h1UsernameUser)
            if (url == "url-1") title.append(img1profile)
            else if (url == "url-2") title.append(img2profile)
            else if (url == "url-3") title.append(img3profile)

        }

        if (Object.keys(element.status).length > 0 && counter) {
            for (let i = 0; i < Object.keys(element.status).length; i++) {
                // i= 0 visas inte på sidan då det är tom plats i arrayen
                if (i != 0) {
                    const pStatusUser: HTMLElement | null = document.createElement('p')
                    pStatusUser.innerText = element.status[i] + ' Likes: ' + counter[i]

                    pStatusUser.style.padding = "20px"
                    if (comments) {
                        comments.append(pStatusUser)
                    }
                }
            }
        }
        //put new status
        newStatus(counter, element, index)

        ///delete user
        deleteUser(allUsers, index)

    }
}

function newStatus(counter: number[] | undefined, element: User, index: number) {
    if (statusForm) {
        statusForm.addEventListener('submit', (event) => {

            event.preventDefault()

            const target: HTMLElement = event.target as HTMLElement;
            if (target[0].value != "") {
                const newStatus: string = target[0].value

                let objToPut: object = {

                }

                let objToPutForCount: object = {

                }
                if (counter) {
                    if (Object.keys(element.status).length > 0) {

                        let placeToPutNewStatus: number = Object.keys(element.status).length

                        objToPut[placeToPutNewStatus] = newStatus
                        objToPutForCount[placeToPutNewStatus] = 0
                        for (let i = 0; i < Object.keys(element.status).length; i++) {


                            objToPut[i] = element.status[i]
                            objToPutForCount[i] = counter[i]
                        }
                    }
                    else objToPut[0] = newStatus; objToPutForCount[0] = counter[0]
                }
                putStatus(objToPut, index)
                setTimeout(() => {
                    putCounter(objToPutForCount, index)
                }, 600)
                setTimeout(() => {
                    target[0].value = '';
                    location.reload();
                }, 1000)
            }
        })

    }
}

function deleteUser(allUsers: User[], index: number) {
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {

            //om det bara finns en användare
            if (allUsers.length == 1) {
                let objZero: object = {
                    users: ""
                }
                deleteUserFirebase(index)
                setTimeout(() => {
                    putFirebase(objZero)
                }, 1000)
                setTimeout(() => {
                    location.reload();
                    window.location.assign("../index.html")
                }, 2000)

            }
            //om det finns flera användare
            else {
                if (index == allUsers.length - 1) {
                    deleteUserFirebase(index)

                    setTimeout(() => {
                        location.reload();
                        window.location.assign("../index.html")
                    }, 500)
                }
                //om användaren inte ligger sist i firebase:
                else {
                    deleteUserFirebase(index)
                    setTimeout(() => {
                        getUsersAfterDelete().then(newUserList)
                        setTimeout(() => {
                            location.reload();
                            window.location.assign("../index.html")
                        }, 500)
                    }, 500)
                }
            }
        })
    }
}
if (logOutBtn) {
    logOutBtn.addEventListener('click', () => {
        localStorage.setItem('user', '')

        window.location.assign("../index.html")
    })
}
