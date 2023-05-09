
import { User } from "./type"
import { getUsers, changeNumberOfLikes } from "./firebase"

const img1user: HTMLImageElement = document.createElement('img')
const imgUrl1user = new URL('../img/Asset2.png', import.meta.url);
img1user.src = imgUrl1user.href;
const img2user: HTMLImageElement = document.createElement('img')
const imgUrl2user = new URL('../img/Asset3.png', import.meta.url);
img2user.src = imgUrl2user.href;
const img3user: HTMLImageElement = document.createElement('img')
const imgUrl3user = new URL('../img/Asset4.png', import.meta.url);
img3user.src = imgUrl3user.href;

const titleUser: HTMLElement | null = document.querySelector('#title-user')
const divbackG: HTMLElement | null = document.querySelector('#background')
const showUserUserPage: HTMLElement | null = document.querySelector('#show-user')
const showListUserPage: HTMLElement | null = document.querySelector('#show-list')


getUsers().then(showUserPage)

function showUserPage(allUsers: User[]): void {

allUsers.forEach((element, index) => {

        const { username, url, counter } = element

        if (showListUserPage && counter) {
            const card: HTMLElement = document.createElement('div');
            showListUserPage.append(card);

            //visar vems profil vi är inne på

            if (username == localStorage.getItem('differentUser') && titleUser && showUserUserPage) {
                card.style.display = "none"
                const h1UsernameUser: HTMLElement | null = document.createElement('h1')
                h1UsernameUser.innerText = username
                if (url == "url-1") titleUser.append(img1user)
                else if (url == "url-2") titleUser.append(img2user)
                else if (url == "url-3") titleUser.append(img3user)
                titleUser.append(h1UsernameUser)

                //visar statusmeddelanden
                showStatusMesseges(element, counter, showUserUserPage, index)
            
            }
            //listan på användare

            showListOfUsers(card, username)

        }

    })

}
//visa statusmeddelanden
function showStatusMesseges(element: User, counter: number[], showUserUserPage: HTMLElement, index: number) {
    if (Object.keys(element.status).length > 0) {
        for (let i = 0; i < Object.keys(element.status).length; i++) {

            if (i != 0) {
                const pStatusUser: HTMLElement | null = document.createElement('p')
                pStatusUser.innerText = element.status[i] + '. Likes: ' + counter[i]

                //likeknappen på varje meddelande

                const likeBtn = document.createElement('button')
                pStatusUser.append(likeBtn)
                likeBtn.innerHTML = 'Like'
                likeBtn.addEventListener('click', () => {
                    console.log(counter[i])
                    changeNumberOfLikes(index, i, counter[i]).then(function () { location.reload() })
                   
                })

                showUserUserPage.append(pStatusUser)

                showUserUserPage.style.height = "100vh"
            }
        }
    }
}

//visa listan på användare
function showListOfUsers(card: HTMLElement, username: string) {
    card.addEventListener('click', () => {

        localStorage.setItem('differentUser', username)
        window.location.assign("./differentUserpages.html")
    })
    const h1Username: HTMLElement | null = document.createElement('h1')
    h1Username.innerText = username
    if (username != localStorage.getItem('user')) {
        card.append(h1Username)

    }
    else {
        const homePage: HTMLElement | null = document.createElement('div')
        if (divbackG) divbackG.append(homePage)
        h1Username.innerText = "Hem"
        h1Username.style.fontSize = "large"

        homePage.append(h1Username)
        homePage.setAttribute("id", "home")
        homePage.addEventListener('click', () => {


            window.location.assign("./profile.html")
        })
    }
}