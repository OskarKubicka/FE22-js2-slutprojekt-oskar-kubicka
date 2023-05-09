import { User } from "./type.ts"
//import { formCreate , formLogIn} from "./index.ts"   ///.ts?

const img1profile: HTMLImageElement = document.createElement('img')
const imgUrl1Profile = new URL('../img/Asset2.png', import.meta.url);
img1profile.src = imgUrl1Profile.href;
const img2profile: HTMLImageElement = document.createElement('img')
const imgUrl2Profile = new URL('../img/Asset3.png', import.meta.url);
img2profile.src = imgUrl2Profile.href;
const img3profile: HTMLImageElement = document.createElement('img')
const imgUrl3Profile = new URL('../img/Asset4.png', import.meta.url);
img3profile.src = imgUrl3Profile.href;

async function getUsers(): Promise<User[]> {
    const url: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users.json`
    const response = await fetch(url);
    const data = await response.json();
   
    return data
}


/////////////skapa användare firebase används på index.ts
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


//////////////Profilesidans firebase funktioner

//dessa funktioner använder put metoden och kallas på i profile- de utför Put i databasen för nya statusar och antal likes(counter)
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
///DELETE USER FUNCTIONS
async function deleteUserFirebase(index: number) {
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

async function putFirebase(objZero: object): Promise<void> {
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

//after delete
async function getUsersAfterDelete(): Promise<[User | null]> {
    const url: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users.json`
    const response = await fetch(url);
    const data = await response.json();

    return data
}

function newUserList(listData: [User | null]): void {
    listData.splice(listData.indexOf(null), 1)
    putNewArr(listData)
    async function putNewArr(listData: [User | null]): Promise<void> {
        const urlPutAll: string = `https://slutprojekt-js2-oskar-default-rtdb.europe-west1.firebasedatabase.app/users.json`
        const init: Object = {
            method: 'PUT',
            body: JSON.stringify(listData),
            headers: {
                'Content-type': "application/json;charset=UTF-8"
            }
        };
        const response = await fetch(urlPutAll, init);
        const data = await response.json();

    }
}

//Usepage

async function changeNumberOfLikes(index: number, i: number, count: number) {

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


export { getUsers, putUser, newUserList, getUsersAfterDelete, deleteUserFirebase, putFirebase, putStatus, putCounter, changeNumberOfLikes }