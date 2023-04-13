import { Data } from "./type.ts"


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

const urlProfile: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users.json`
async function getUsersForProfile(): Promise<Data[]> {
    const response = await fetch(urlProfile);
    const data = await response.json();
    return data
}

getUsersForProfile().then(showUsers)

function showUsers(data: Data[]): void {
    

    data.forEach((element, index) => {
       
        const { username, url, status, counter } = element
      
        if (listOfUsers) {
            const card: HTMLElement = document.createElement('div');
            listOfUsers.append(card);
            //profilanvändarens del
            if (username == localStorage.getItem('user') && myProfile) {

                card.style.display = "none"
                const h1UsernameUser: HTMLElement | null = document.createElement('h1')
                h1UsernameUser.innerText = "Välkommen " + username

                if (title) {
                    title.append(h1UsernameUser)
                    if (url == "url-1") title.append(img1profile)
                    if (url == "url-2") title.append(img2profile)
                    if (url == "url-3") title.append(img3profile)

                }
                
                if (Object.keys(element.status).length > 0 && counter) {
                    for (let i = 0; i < Object.keys(element.status).length; i++) {
                    
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
                ///delete user
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', () => {
                        
                        async function deleteStatus(index: number) {
                            const urlDelete: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users/${index}.json`
                            const init: Object = {
                                method: 'DELETE',
                                headers: {
                                    'Content-type': "application/json;charset=UTF-8"
                                }
                            };
                            const response = await fetch(urlDelete, init);
                            const data = await response.json();
                        }
                        if (data.length == 1) {
                            let objZero: object = {
                                users: ""
                            }
                            deleteStatus(index)
                            setTimeout(() => {


                                putFirebase()
                                async function putFirebase(): Promise<void> {
                                    const urlPutZero: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/.json`
                                    const init: Object = {
                                        method: 'PUT',
                                        body: JSON.stringify(objZero),
                                        headers: {
                                            'Content-type': "application/json;charset=UTF-8"
                                        }
                                    };
                                    const response = await fetch(urlPutZero, init);
                                    const data = await response.json();

                                }


                            }, 1000)
                            setTimeout(() => {
                                location.reload();
                                window.location.assign("../index.html")
                            }, 2000)

                        }
                        else {
                            if (index == data.length - 1) {
                                deleteStatus(index)
                                
                                setTimeout(() => {
                                    location.reload();
                                    window.location.assign("../index.html")
                                }, 500)
                            }
                            else {
                                deleteStatus(index)
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
            //listan på användare
            card.addEventListener('click', () => {
                
                localStorage.setItem('differentUser', username)
                window.location.assign("./userpage.html")
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

//puta in status
async function putStatus(objStatus: object, index: number): Promise<void> {
    const urlPutStatus: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users/${index}/status.json`
    const init: Object = {
        method: 'PUT',
        body: JSON.stringify(objStatus),
        headers: {
            'Content-type': "application/json;charset=UTF-8"
        }
    };
    const response = await fetch(urlPutStatus, init);
    const data = await response.json();

}
async function putCounter(objToPutForCount: object, index: number): Promise<void> {
    const urlPutStatus: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users/${index}/counter.json`
    const init: Object = {
        method: 'PUT',
        body: JSON.stringify(objToPutForCount),
        headers: {
            'Content-type': "application/json;charset=UTF-8"
        }
    };
    const response = await fetch(urlPutStatus, init);
    const data = await response.json();

}
//after delete
async function getUsersAfterDelete(): Promise<[Data | null]> {
    const url: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users.json`
    const response = await fetch(url);
    const data = await response.json();
    
    return data
}
function newUserList(data: [Data | null]): void {
 

    data.splice(data.indexOf(null), 1)


    putNewArr(data)
    async function putNewArr(dataPut: [Data | null]): Promise<void> {
        const urlPutAll: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users.json`
        const init: Object = {
            method: 'PUT',
            body: JSON.stringify(dataPut),
            headers: {
                'Content-type': "application/json;charset=UTF-8"
            }
        };
        const response = await fetch(urlPutAll, init);
        const data = await response.json();

    }
}
if (logOutBtn) {
    logOutBtn.addEventListener('click', () => {
        localStorage.setItem('user', '')

        window.location.assign("../index.html")
    })
}
