
import { Data } from "./type.ts"


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

const urlUserPage: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users.json`

async function getUserPage(): Promise<Data[]> {
    const response = await fetch(urlUserPage);
    const data = await response.json();
  
    return data
}
getUserPage().then(showUserPage)



function showUserPage(data: Data[]): void {
   

    data.forEach((element, index) => {
    
        const { username, url, counter } = element
    
        if (showListUserPage && counter) {
            const card: HTMLElement = document.createElement('div');
            showListUserPage.append(card);
            //profilanvändarens del
            if (username == localStorage.getItem('differentUser') && titleUser && showUserUserPage) {
                card.style.display = "none"
                const h1UsernameUser: HTMLElement | null = document.createElement('h1')
                h1UsernameUser.innerText = username
                if (url == "url-1") titleUser.append(img1user)
                if (url == "url-2") titleUser.append(img2user)
                if (url == "url-3") titleUser.append(img3user)
                titleUser.append(h1UsernameUser)
                if (Object.keys(element.status).length > 0) {
                    for (let i = 0; i < Object.keys(element.status).length; i++) {
                       
                        if (i != 0) {
                            const pStatusUser: HTMLElement | null = document.createElement('p')
                            pStatusUser.innerText = element.status[i] + '. Likes: ' + counter[i]

                            //

                            const likeBtn = document.createElement('button')
                            pStatusUser.append(likeBtn)
                            likeBtn.innerHTML = 'Like'
                            likeBtn.addEventListener('click', () => {
                                
                                changeLike(index, i, counter[i]).then(relooaad)
                                function relooaad() {
                                    location.reload()
                                }
                            })

                            async function changeLike(index, i, count) {

                                const url = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users/${index}/counter.json`;
                                const init = {
                                    method: 'PATCH',
                                    body: JSON.stringify({ [i]: count + 1 }),
                                    headers: {
                                        'Content-type': 'application/json; charset=UTF-8'
                                    }
                                }


                                await fetch(url, init);
                            }


                            showUserUserPage.append(pStatusUser)

                            showUserUserPage.style.height = "100vh"
                        }
                    }
                }

            }
            //listan på användare
            card.addEventListener('click', () => {
                
                localStorage.setItem('differentUser', username)
                window.location.assign("./userpage.html")
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

    })

}