// let your_top_mixes = document.querySelector('.your_top_mixes ')
// let made_for_you = document.querySelector('.made_for_you ')
// let recently_played = document.querySelector('.recently_played ')
// let jump_back_in = document.querySelector('.jump_back_in ')
// let uniquely_yours = document.querySelector('.uniquely_yours ')
// let just_the_hits = document.querySelector('.just_the_hits ')

// import {  made_for_you_arr, your_top_mixes_arr } from "./modules/functions"

let made_for_you_arr = [

    {
        "name": "Folk & Acoustic Mix",
        "title": "Canyon City, Crooked Still, Gregory Alan...",
    },

    {
        "name": "Daily Mix 1",
        "title": "Ayra Starr, Lil Kesh, Ed Sheeran and more",
    },

    {
        "name": "Daily Mix 5",
        "title": "FRENSHIP, Brooke Sierra, Julia Wolf an...",
    },
    {
        "name": "Pop Mix",
        "title": "Hey Violet, VÉRITÉ, Timeflies and more",
    },

    {
        "name": "Pheelz Mix",
        "title": "WizKid, Asake, Tiwa Savage and more",
    },
]
let your_top_mixes_arr = [
    {
        "name": "Chill Mix",
        "title": "Julia Wolf, Khalid, ayokay and more",
    },
    {
        "name": "Pop Mix",
        "title": "Hey Violet, VÉRITÉ, Timeflies and more",
    },
    {
        "name": "Pheelz Mix",
        "title": "WizKid, Asake, Tiwa Savage and more",
    },
    {
        "name": "Indie Mix",
        "title": "Joywave, The xx, The Neighbourhood and...",
    },
    {
        "name": "Daily Mix 1",
        "title": "Ayra Starr, Lil Kesh, Ed Sheeran and more",
    },



]
function reloadRecomendations (arr , place){
    let cont = document.querySelector(`.${place}`)
    cont.innerHTML = ''

    for(let item of arr){
        let box = document.createElement('div')
        let img = document.createElement('img')
        let h3 = document.createElement('h3')
        let title = document.createElement('p')

        box.classList.add('recomend_item')

        img.src = `./screens/${item.name}.svg`
        h3.innerHTML = item.name
        title.innerHTML = item.title

        cont.append(box)
        box.append(img , h3 ,title)

    }
    
}
reloadRecomendations(your_top_mixes_arr , 'your_top_mixes')
reloadRecomendations(made_for_you_arr , 'made_for_you')
reloadRecomendations(your_top_mixes_arr , 'recently_played')
reloadRecomendations(made_for_you_arr , 'jump_back_in')
reloadRecomendations(your_top_mixes_arr , 'uniquely_yours')
reloadRecomendations(made_for_you_arr , 'just_the_hits')