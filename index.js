
let index = Number(localStorage.getItem('index'))
let index_two = 0
let music_back = document.querySelector('.music_back')
let music_next = document.querySelector('.music_next')
let localStorageMusic = JSON.parse(localStorage.getItem('music'))
let music_now = localStorageMusic
let audio = document.querySelector('.audio');
let url = 'http://localhost:7777/Playlist'
let data = 0
let search = document.querySelector('.search')
let search_mobile = document.querySelector('.search_mobile')
let filtered = []
let Jsonarr = []
let playlests_arr = []
let react = () => {
    axios.get(url)
        .then(res => {
            Jsonarr = res.data

            let liked = res.data.filter(item => item.Explicit === true)
            createMusics(liked, 'all_liked_musics')
            createMusics(Jsonarr, 'all_musics')

            createMobileMusic(Jsonarr, 'mobile_playlist_create_musics')

            music_back.onclick = () => {
                playBackMUsic(res.data)
                reloadLocaleStirage(res.data[index])

            }
            music_next.onclick = () => {
                playNextMUsic(res.data)
                reloadLocaleStirage(res.data[index])

            }




        })
}

setTimeout(() => {
    react()
}, 400);


let afternoon_arr = [
    {
        "name": "Chill Mix",
        "title": "Julia Wolf, Khalid, ayokay and more",
        "img": './screens/ChillMix.svg'

    },
    {
        "name": "Pop Mix",
        "title": "Hey Violet, VÉRITÉ, Timeflies and more",
        "img": './screens/PopMix.svg'

    },
    {
        "name": "Pheelz Mix",
        "title": "WizKid, Asake, Tiwa Savage and more",
        "img": './screens/PheelzMix.svg'

    },
    {
        "name": "Indie Mix",
        "title": "Joywave, The xx, The Neighbourhood and...",
        "img": './screens/IndieMix.svg'

    },
    {
        "name": "Daily Mix 1",
        "title": "Ayra Starr, Lil Kesh, Ed Sheeran and more",
        "img": './screens/DailyMix1.svg'

    },
    {
        "name": "Daily Mix 5",
        "title": "FRENSHIP, Brooke Sierra, Julia Wolf an...",
        "img": './screens/DailyMix5.svg'

    },


]
let made_for_you_arr = [

    {
        "name": "Folk & Acoustic Mix",
        "title": "Canyon City, Crooked Still, Gregory Alan",
        "color": '#C93487',
        "img": './screens/Folk&AcousticMix.svg'

    },

    {
        "name": "Daily Mix 1",
        "title": "Ayra Starr, Lil Kesh, Ed Sheeran",
        "color": '#9FDBD0',
        "img": './screens/DailyMix1.svg'

    },

    {
        "name": "Daily Mix 5",
        "title": "FRENSHIP, Brooke Sierra, Julia Wolf",
        "color": '#ECC475',
        "img": './screens/DailyMix5.svg'

    },
    {
        "name": "Pop Mix",
        "title": "Hey Violet, VÉRITÉ, Timeflies",
        "color": '#9F3892',
        "img": './screens/PopMix.svg'
    },

    {
        "name": "Pheelz Mix",
        "title": "WizKid, Asake, Tiwa Savage",
        "color": '#6BE193',
        "img": './screens/PheelzMix.svg'

    },
    {
        "name": "Chill Mix",
        "title": "Julia Wolf, Khalid, ayokay",
        "color": '#F8E558',
        "img": './screens/ChillMix.svg'

    },
    {
        "name": "Pop Mix",
        "title": "Hey Violet, VÉRITÉ, Timeflies",
        "color": '#9F3892',
        "img": './screens/PopMix.svg'

    },
    {
        "name": "Pheelz Mix",
        "title": "WizKid, Asake, Tiwa Savage",
        "color": '#6BE193',
        "img": './screens/PheelzMix.svg'

    },
    {
        "name": "Indie Mix",
        "title": "Joywave, The xx, The Neighbourhood",
        "color": '#D33827',
        "img": './screens/IndieMix.svg'

    },
    {
        "name": "Daily Mix 1",
        "title": "Ayra Starr, Lil Kesh, Ed Sheeran",
        "color": '#9FDBD0',
        "img": './screens/DailyMix1.svg'

    },
]
localStorage.setItem('playlist', JSON.stringify(made_for_you_arr[0]))

reloadAfternoon(afternoon_arr, 'afternoon_main')
reloadAfternoon(afternoon_arr, 'afternoon_main_modile')
let Search_table = document.querySelector('.Search_table')
let Mobile_create_Search_Elem = document.querySelector('.Mobile_create_Search_Elem')

search.onkeyup = () => {
    search_mobile.value = search.value

    const filtered = Jsonarr.filter(item => item.TrackName.toLowerCase().trim().includes(search.value.toLowerCase().trim()))
    createMusics(filtered, 'Search_table')
    createMobileMusic(filtered, 'Mobile_create_Search_Elem')

    if(search.value === ''){
        Search_table.innerHTML = ' '
        Mobile_create_Search_Elem.innerHTML = ' '

    }
}
search_mobile.onkeyup = () => {
    search.value = search_mobile.value
    const filtered = Jsonarr.filter(item => item.TrackName.toLowerCase().trim().includes(search_mobile.value.toLowerCase().trim()))
    createMusics(filtered, 'Search_table')
    createMobileMusic(filtered, 'Mobile_create_Search_Elem')

    if(search_mobile.value === ''){
        Search_table.innerHTML = ' '
        Mobile_create_Search_Elem.innerHTML = ' '
    }
}
//МУЗЫКАЛЬНЫЙ ПЛЕЙЕР

let playIconContainer = document.querySelector('#play-icon');
let audioPlayerContainer = document.getElementById('audio-player-container');
let seekSlider = document.getElementById('seek-slider');
let volumeSlider = document.getElementById('volume-slider');
let muteIconContainer = document.getElementById('mute-icon');
let music_namee = document.querySelector('#music_namee')
let artist_name = document.querySelector('#artist_name')
let control_like = document.querySelector('.control_like')
let logo_img = document.querySelector('.logo_img')

let playState = 'play';
let muteState = 'unmute';

if (playState === 'play') {
    playIconContainer.style.backgroundImage = 'url(./icons/control_pause.svg)'

} else if (playState === 'pause') {
    playIconContainer.style.backgroundImage = 'url(./icons/control_start.svg)'

}

playIconContainer.addEventListener('click', () => {
    if (playState === 'play') {
        audio.play();
        requestAnimationFrame(whilePlaying);
        playIconContainer.style.backgroundImage = 'url(./icons/control_pause.svg)'
        playState = 'pause';

    } else if (playState === 'pause') {
        audio.pause();
        cancelAnimationFrame(raf);
        playIconContainer.style.backgroundImage = 'url(./icons/control_start.svg)'
        playState = 'play';

    }
});



muteIconContainer.addEventListener('click', () => {
    if (muteState === 'unmute') {
        audio.muted = true;
        muteState = 'mute';
        muteIconContainer.style.backgroundImage = 'url(./icons/mute_music.svg)'

    } else {
        audio.muted = false;
        muteState = 'unmute';
        muteIconContainer.style.backgroundImage = 'url(./icons/unmute_music.svg)'

    }
});

let showRangeProgress = (rangeInput) => {
    if (rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}

seekSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});
volumeSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});




let durationContainer = document.getElementById('duration');
let currentTimeContainer = document.getElementById('current-time');
let outputContainer = document.getElementById('volume-output');
let raf = null;
let numm = 0
let max_num = 0



let calculateTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.floor(secs % 60);
    let returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

let displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration);
}
let setSliderMax = () => {
    seekSlider.max = Math.floor(audio.duration);
}
let displayBufferedAmount = () => {
    let bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
    audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
    max_num = bufferedAmount
}

let whilePlaying = () => {
    seekSlider.value = Math.floor(audio.currentTime);
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
    raf = requestAnimationFrame(whilePlaying);
    numm = seekSlider.value
    setTimeout(() => {
        if (+numm === max_num) {
            let ind = Number(localStorage.getItem('index'))
            reloadLocaleStirage(s[ind + 1])
            localStorage.setItem('index', JSON.stringify(ind + 1))
            localStorage.setItem('music', JSON.stringify(s[ind + 1]))
        }
    }, 2000);
}

if (audio.readyState > 0) {
    displayDuration();
    setSliderMax();
    displayBufferedAmount();
} else {
    audio.addEventListener('loadedmetadata', () => {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    });
}

audio.addEventListener('progress', displayBufferedAmount);

seekSlider.addEventListener('input', () => {
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    if (!audio.paused) {
        cancelAnimationFrame(raf);
    }

});

seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
    if (!audio.paused) {
        requestAnimationFrame(whilePlaying);
    }
});

volumeSlider.addEventListener('input', (e) => {
    let value = e.target.value;

    outputContainer.textContent = value;
    audio.volume = value / 100;

});




//МУЗЫКАЛЬНЫЙ ПЛЕЙЕР




function reloadLocaleStirage(music) {
    localStorage.setItem('music', JSON.stringify(music))
    localStorage.setItem('index', JSON.stringify(music.id - 1))
    music_namee.innerHTML = music.TrackName
    artist_name.innerHTML = music.ArtistName
    logo_img.src = music.AlbumImageURL
    audio.src = music.TrackPreviewURL
    requestAnimationFrame(whilePlaying);
    playIconContainer.style.backgroundImage = 'url(./icons/control_start.svg)'
    playState = 'pause';
    if (music.Explicit === true) {
        control_like.src = './icons/active_like.png'
        console.log('a');
    } else if (music.Explicit === false) {
        control_like.src = './icons/like.png'
    }
}




let playlist_delete = document.querySelectorAll('#playlist_delete')
let swapTohome = document.querySelector('#home')
let swapTohomeMobile = document.querySelector('#home_mobile')
let swapTosearch = document.querySelector('#search')
let swapTosearchMobile = document.querySelector('#search_mobile')
let swapToYourLibrary = document.querySelector('#your_library')
let swapToYourLibraryMobile = document.querySelector('#your_library_mobile')
let swapToLiked = document.querySelector('#liked_playlis')
let home_page = document.querySelector('.home_page')
let mobile_home = document.querySelector('.mobile_home')
let page_playlist = document.querySelector('.page_playlist')
let library = document.querySelector('.library')
let mobile_library = document.querySelector('.mobile_library')
let search_page = document.querySelector('.search_page')
let mobile_search_page = document.querySelector('.mobile_search_page')
let mobile_playlist_page = document.querySelector('.mobile_playlist_page')
let mobile_playlist_page_img = document.querySelector('.mobile_playlist_page_img')
let mobile_playlist_img = document.querySelector('.mobile_playlist_img')
let mobile_playlist_name = document.querySelector('.mobile_playlist_name')
let mobile_playlist_title = document.querySelector('.mobile_playlist_title')
let mobile_playlist_info = document.querySelector('.mobile_playlist_info')
let liked_playlist = document.querySelector('.liked_playlist')
let cteate_playlist = document.querySelector('.cteate_playlist')
let bg = document.querySelector('.bg')
let playlist_menu = document.querySelector('.playlist_menu')
let close_menu = document.querySelector('.close_menu')
// let page = localStorage.getItem('page')
cteate_playlist.onclick = () => {
    playlist_menu.style.display = 'block'
    bg.style.display = 'block'
}

function removeALLActive() {

    let swap_page = document.querySelectorAll('.swap_page')


    playlist_delete.forEach(item =>{
        item.style.display = 'none'
    })
    swap_page.forEach(item => {
        item.classList.remove('swap_page_active')
    })


}
function removeALLPages() {

    let page = document.querySelectorAll('#page')



    page.forEach(item => {
        item.style.display = 'none'
    })


}
swapToLiked.onclick = () => {
    removeALLActive()
    removeALLPages()
    liked_playlist.style.display = 'block'

    let options_delete = document.querySelectorAll('.options_delete')
    options_delete.forEach(item => {
        item.style.display = 'none'
    })
    let mobile_delete_music = document.querySelectorAll('.mobile_delete_music')
    mobile_delete_music.forEach(item => {
        item.style.display = 'none'

    })
}


swapTohome.onclick = () => {
    removeALLPages()
    removeALLActive()
    home_page.style.display = 'block'
    swapTohome.classList.add('swap_page_active')
    swapTohomeMobile.classList.add('swap_page_active')
    mobile_home.style.display = 'block'

    let options_delete = document.querySelectorAll('.options_delete')
    options_delete.forEach(item => {
        item.style.display = 'none'
    })
    let mobile_delete_music = document.querySelectorAll('.mobile_delete_music')
    mobile_delete_music.forEach(item => {
        item.style.display = 'none'

    })

}
swapTohomeMobile.onclick = () => {
    removeALLPages()
    removeALLActive()
    home_page.style.display = 'block'
    swapTohome.classList.add('swap_page_active')
    swapTohomeMobile.classList.add('swap_page_active')
    mobile_home.style.display = 'block'

    let options_delete = document.querySelectorAll('.options_delete')
    options_delete.forEach(item => {
        item.style.display = 'none'
    })
    let mobile_delete_music = document.querySelectorAll('.mobile_delete_music')
    mobile_delete_music.forEach(item => {
        item.style.display = 'none'

    })

}


swapTosearch.onclick = () => {
    removeALLPages()
    removeALLActive()
    search_page.style.display = 'block'
    swapTosearch.classList.add('swap_page_active')
    swapTosearchMobile.classList.add('swap_page_active')
    mobile_search_page.style.display = 'block'

    let options_delete = document.querySelectorAll('.options_delete')
    options_delete.forEach(item => {
        item.style.display = 'none'
    })
    let mobile_delete_music = document.querySelectorAll('.mobile_delete_music')
    mobile_delete_music.forEach(item => {
        item.style.display = 'none'

    })

}
swapTosearchMobile.onclick = () => {
    removeALLPages()
    removeALLActive()
    search_page.style.display = 'block'
    swapTosearch.classList.add('swap_page_active')
    swapTosearchMobile.classList.add('swap_page_active')
    mobile_search_page.style.display = 'block'

    let options_delete = document.querySelectorAll('.options_delete')
    options_delete.forEach(item => {
        item.style.display = 'none'
    })
    let mobile_delete_music = document.querySelectorAll('.mobile_delete_music')
    mobile_delete_music.forEach(item => {
        item.style.display = 'none'

    })

}


swapToYourLibrary.onclick = () => {
    removeALLPages()
    removeALLActive()

    library.style.display = 'block'
    mobile_library.style.display = 'block'
    swapToYourLibrary.classList.add('swap_page_active')
    your_library_mobile.classList.add('swap_page_active')

}
swapToYourLibraryMobile.onclick = () => {
    removeALLPages()
    removeALLActive()

    library.style.display = 'block'
    mobile_library.style.display = 'block'
    swapToYourLibrary.classList.add('swap_page_active')
    your_library_mobile.classList.add('swap_page_active')

}

let name_playlist = document.querySelector('#name_playlist')
let acters_info = document.querySelector('.acters_info')
let playlist_img = document.querySelector('.playlist_img')

function reloadRecomendations(arr, place, from, to) {
    let cont = document.querySelector(`.${place}`)
    cont.innerHTML = ''

    for (let item of arr.slice(from, to)) {
        let box = document.createElement('div')
        let play_playlist = document.createElement('div')
        let img = document.createElement('img')
        let h3 = document.createElement('h3')
        let title = document.createElement('p')
        play_playlist.classList.add('playlist_play')
        box.classList.add('recomend_item')
        play_playlist.classList.add('play_playlist')

        img.src = item.img
        h3.innerHTML = item.name
        title.innerHTML = item.title + ' and more'

        cont.append(box)
        box.append(img, play_playlist, h3, title)


        img.onclick = () => {

            removeALLPages()
            page_playlist.style.display = 'block'
            mobile_playlist_page.style.display = 'block'

            playlist_img.src = item.img

            name_playlist.innerHTML = item.name
            acters_info.innerHTML = item.title
            page_playlist.style.background = `linear-gradient(180deg, 
                ${item.color} 5.09%, #121212 25.4%)`


            mobile_playlist_page_img.style.backgroundImage = `url(${item.img})`
            mobile_playlist_img.src = item.img

            mobile_playlist_name.innerHTML = item.name
            acters_info.innerHTML = item.title
            mobile_playlist_info.style.background = `linear-gradient(180deg, 
                    ${item.color} 5.09%, #121212 100%)`
            createMusics(Jsonarr, 'all_musics')
            createMobileMusic(Jsonarr, 'mobile_playlist_create_musics')
            localStorage.setItem('playlist', JSON.stringify(item))

        }

    }


}
// let playlistt = [JSON.parse(localStorage.getItem('playlist'))]


// for (let item of playlistt) {
//     playlist_img.src = `./screens/${item.name}.svg`

//     name_playlist.innerHTML = item.name
//     acters_info.innerHTML = item.title
//     window.scrollY = 0
//     page_playlist.style.background = `linear-gradient(180deg, 
//             ${item.color} 5.09%, #121212 25.4%)`
// }


reloadRecomendations(made_for_you_arr, 'your_top_mixes', 0, 5)
reloadRecomendations(made_for_you_arr, 'your_top', 0, 5)
reloadRecomendations(made_for_you_arr, 'made_for_you', 5, Infinity)
reloadRecomendations(made_for_you_arr, 'recently_played', 0, 5)
reloadRecomendations(made_for_you_arr, 'jump_back_in', 5, Infinity)
reloadRecomendations(made_for_you_arr, 'uniquely_yours', 0, 5)
reloadRecomendations(made_for_you_arr, 'just_the_hits', 5, Infinity)


let playlist_play = document.querySelectorAll('.playlist_play')
let music_for_playlist = JSON.parse(localStorage.getItem('music_item'))
function createMusics(arr, place) {
    let get = document.querySelector(`.${place}`)

    // console.log(arr[0]);

    playlist_play.forEach(item => {
        item.onclick = () => {
            localStorage.setItem('index', 0)
            localStorage.setItem('music', JSON.stringify(arr[0]))
            music_namee.innerHTML = arr[0].TrackName
            artist_name.innerHTML = arr[0].ArtistName
            logo_img.src = arr[0].AlbumImageURL
            audio.src = arr[0].TrackPreviewURL
            audio.play();
            requestAnimationFrame(whilePlaying);
            playIconContainer.style.backgroundImage = 'url(./icons/control_pause.svg)'
            playState = 'pause';
            if (arr[0].Explicit === true) {
                control_like.src = './icons/active_like.png'

            } else if (arr[0].Explicit === false) {
                control_like.src = './icons/like.png'
            }
        }
    })


    get.innerHTML = `
    <tr >
    <th>#</th>
    <th>TITLE</th>
    <th>ALBUM</th>
    <th>DATE ADDED</th>
    <th><img src="./icons/clock_time.svg" width="22px" alt=""></th>
    <th></th>
  </tr>
    `

    for (let item of arr) {
        let tr = document.createElement('tr')
        let num = document.createElement('td')
        let music_info = document.createElement('div')
        let music_name = document.createElement('div')
        let music_title = document.createElement('div')
        let photo = document.createElement('img')
        let info = document.createElement('td')
        let comment = document.createElement('td')
        let options = document.createElement('td')
        let options_img = document.createElement('img')

        let liked_music = document.createElement('td')
        let like = document.createElement('img')
        let time = document.createElement('td')
        let audi = document.createElement('audio')
        let duration = document.createElement('p')


        let options_box = document.createElement("div")
        let options_add_playlist = document.createElement("p")
        let options_like = document.createElement("p")
        let options_play = document.createElement("p")
        let options_delete = document.createElement("p")

        options_add_playlist.innerHTML = "ADD TO PLAYLIST"
        options_like.innerHTML = 'LIKE'
        options_play.innerHTML = "LISTEN NOW"
        options_delete.innerHTML = "DELETE"

        audi.src = item.TrackPreviewURL
        audi.setAttribute('loop', '')

        // active_img.src = 
        num.classList.add('num')
        info.classList.add('info')
        like.classList.add('like_btn')
        options_like.classList.add('like_btn')
        options_box.classList.add('options_box')
        options_add_playlist.classList.add('options_add_playlist')
        options_like.classList.add('options_like')
        options_play.classList.add('options_play')
        options_delete.classList.add('options_delete')
        options.classList.add('options')
        music_info.classList.add('music_info')
        music_name.classList.add('music_name')
        music_title.classList.add('music_title')
        liked_music.classList.add('liked_music')
        comment.classList.add('comment')
        audi.classList.add('audi')
        options_img.src = './icons/menu.svg'
        photo.src = item.AlbumImageURL
        duration.innerHTML = audio.duration

        // time.innerHTML = calculateTime(Number(duration.innerHTML))

        num.innerHTML = arr.indexOf(item) + 1
        music_name.innerHTML = item.TrackName
        music_title.innerHTML = item.ArtistName
        comment.innerHTML = item.AlbumName

        if (item.Explicit === true) {
            like.src = './icons/active_like.png'
        } else if (item.Explicit === false) {
            like.src = './icons/like.png'

        }
        get.append(tr)
        tr.append(audi, num, info, comment, liked_music, time, options)
        info.append(photo, music_info)
        liked_music.append(like)
        options.append(options_img, options_box)
        options_box.append(options_like, options_add_playlist, options_play, options_delete)
        music_info.append(music_name, music_title)


        options_play.onclick = () => {
            let data_num = tr.parentElement.getAttribute('data-num')
            data = Number(data_num)
            localStorage.setItem('index', item.id - 1)
            localStorage.setItem('music', JSON.stringify(item))
            music_namee.innerHTML = item.TrackName
            artist_name.innerHTML = item.ArtistName
            logo_img.src = item.AlbumImageURL
            audio.src = item.TrackPreviewURL
            audio.play();
            requestAnimationFrame(whilePlaying);
            playIconContainer.style.backgroundImage = 'url(./icons/control_pause.svg)'
            playState = 'pause';
            if (item.Explicit === true) {
                control_like.src = './icons/active_like.png'
                like.src = './icons/active_like.png'

            } else if (item.Explicit === false) {
                control_like.src = './icons/like.png'
                like.src = './icons/like.png'

            }
        }
        info.onclick = () => {
            let data_num = info.parentElement.getAttribute('data-num')
            data = Number(data_num)
            localStorage.setItem('index', item.id - 1)
            localStorage.setItem('music', JSON.stringify(item))
            music_namee.innerHTML = item.TrackName
            artist_name.innerHTML = item.ArtistName
            logo_img.src = item.AlbumImageURL
            audio.src = item.TrackPreviewURL
            audio.play();
            requestAnimationFrame(whilePlaying);
            playIconContainer.style.backgroundImage = 'url(./icons/control_pause.svg)'
            playState = 'pause';
            if (item.Explicit === true) {
                control_like.src = './icons/active_like.png'
                like.src = './icons/active_like.png'

            } else if (item.Explicit === false) {
                control_like.src = './icons/like.png'
                like.src = './icons/like.png'

            }
        }
        let id = item.id

        options_delete.onclick = () => {
            // localStorage.setItem('delete_id', item.id)
            let music_arr = JSON.parse(localStorage.getItem('Playlist_musics'))
            let playlistId = localStorage.getItem('PlaylistId')
            let a = music_arr.filter((i) => i.id !== item.id)


            axios.patch('http://localhost:7777/CreatedPlaylist/' + playlistId, {
                musics: a
            })

        }
        options_like.onclick = (event) => {
            event.preventDefault();
            if (item.Explicit === true) {
                axios.patch(url + '/' + id, {
                    Explicit: false
                })
                item.Explicit = false

                localStorage.setItem('music', JSON.stringify(item))

            } else if (item.Explicit === false) {
                axios.patch(url + '/' + id, {
                    Explicit: true
                })
                item.Explicit = true

                localStorage.setItem('music', JSON.stringify(item))

            }
        }
        like.onclick = (event) => {
            event.preventDefault();
            if (item.Explicit === true) {
                axios.patch(url + '/' + id, {
                    Explicit: false
                })
                item.Explicit = false
                localStorage.setItem('music', JSON.stringify(item))



            } else if (item.Explicit === false) {
                axios.patch(url + '/' + id, {
                    Explicit: true
                })
                item.Explicit = true

                localStorage.setItem('music', JSON.stringify(item))


            }
        }


        options_add_playlist.onclick = () => {
            localStorage.setItem('music_item', JSON.stringify(item))
            playlist_menu.style.display = 'block'
            bg.style.display = 'block'
        }
        bg.onclick = () => {

            playlist_menu.style.display = 'none'
            bg.style.display = 'none'
        }
        close_menu.onclick = () => {

            playlist_menu.style.display = 'none'
            bg.style.display = 'none'
        }

    }
    let options_delete = document.querySelectorAll('.options_delete')
    options_delete.forEach(item => {
        item.style.display = 'none'

    })
    for (let item of [music_now]) {
        if (item.Explicit === true) {
            control_like.src = './icons/active_like.png'

        } else if (item.Explicit === false) {
            control_like.src = './icons/like.png'

        }
    }

    control_like.onclick = () => {
        music_now = JSON.parse(localStorage.getItem('music'))
        for (let item of [music_now]) {
            if (item.Explicit === true) {
                axios.patch(url + '/' + item.id, {
                    Explicit: false
                })
                item.Explicit = false

                control_like.src = './icons/like.png'

                localStorage.setItem('index', item.id - 1)


            } else if (item.Explicit === false) {

                axios.patch(url + '/' + item.id, {
                    Explicit: true
                })
                item.Explicit = true
                control_like.src = './icons/active_like.png'

                localStorage.setItem('index', item.id)

                // reloadLocaleStirage(item)
            }
            localStorage.setItem('music', JSON.stringify(item))

        }

        // reloadLocaleStirage(localStorageMusic)
    }
}

function createMobileMusic(arr, place) {
    let get = document.querySelector(`.${place}`)
    get.innerHTML = ''

    for (let item of arr) {
        let mobile_music_playlist_item = document.createElement('div')
        let itemleft = document.createElement('div')
        let TrackImg = document.createElement('img')
        let item_name = document.createElement('div')
        let div = document.createElement('div')
        let TrackName = document.createElement('p')
        let Download = document.createElement('img')
        let TrackTitle = document.createElement('p')
        let itemright = document.createElement('div')
        let options = document.createElement('img')

        let mobile_options = document.createElement("div")
        let mobile_add_playlisyt = document.createElement("p")
        let mobile_like_music = document.createElement("p")
        let mobile_start_music = document.createElement("p")
        let mobile_delete_music = document.createElement("p")


        mobile_music_playlist_item.classList.add('mobile_music_playlist_item')
        itemleft.classList.add('itemleft')
        itemright.classList.add('itemright')
        item_name.classList.add('item_name')

        TrackImg.classList.add('TrackImg')

        mobile_add_playlisyt.classList.add('mobile_add_playlisyt')
        mobile_like_music.classList.add('mobile_like_music')
        mobile_start_music.classList.add('mobile_start_music')
        mobile_options.classList.add('mobile_options')
        mobile_delete_music.classList.add('mobile_delete_music')


        mobile_add_playlisyt.innerHTML = "ADD TO PLAYLIST"
        mobile_like_music.innerHTML = 'LIKE'
        mobile_start_music.innerHTML = "LISTEN NOW"
        mobile_delete_music.innerHTML = "DELETE"



        TrackImg.src = item.AlbumImageURL
        Download.src = './icons/download.svg'
        options.src = './icons/options.svg'
        TrackName.innerHTML = item.TrackName
        TrackTitle.innerHTML = item.ArtistName

        get.append(mobile_music_playlist_item)
        mobile_music_playlist_item.append(itemleft, itemright)
        itemright.append(options, mobile_options)
        mobile_options.append(mobile_add_playlisyt, mobile_like_music, mobile_start_music, mobile_delete_music)
        itemleft.append(TrackImg, item_name)
        item_name.append(TrackName, div)
        div.append(Download, TrackTitle)
        options.onclick = () => {
            removeAllOptions('mobile_options')
            mobile_options.style.display = 'flex'

            // setTimeout(() => {
            //     mobile_options.style.display = 'none'


            // }, 5000);
        }



        let id = item.id
        let bg = document.querySelector('.bg')
        let playlist_menu = document.querySelector('.playlist_menu')
        let close_menu = document.querySelector('.close_menu')

        mobile_start_music.onclick = () => {
            localStorage.setItem('index', item.id - 1)
            localStorage.setItem('music', JSON.stringify(item))
            music_namee.innerHTML = item.TrackName
            artist_name.innerHTML = item.ArtistName
            logo_img.src = item.AlbumImageURL
            audio.src = item.TrackPreviewURL
            audio.play();
            requestAnimationFrame(whilePlaying);
            playIconContainer.style.backgroundImage = 'url(./icons/control_pause.svg)'
            playState = 'pause';
            if (item.Explicit === true) {
                control_like.src = './icons/active_like.png'
                like.src = './icons/active_like.png'

            } else if (item.Explicit === false) {
                control_like.src = './icons/like.png'
                like.src = './icons/like.png'

            }
        }
        itemleft.onclick = () => {
            localStorage.setItem('index', item.id - 1)
            localStorage.setItem('music', JSON.stringify(item))
            music_namee.innerHTML = item.TrackName
            artist_name.innerHTML = item.ArtistName
            logo_img.src = item.AlbumImageURL
            audio.src = item.TrackPreviewURL
            audio.play();
            requestAnimationFrame(whilePlaying);
            playIconContainer.style.backgroundImage = 'url(./icons/control_pause.svg)'
            playState = 'pause';
            if (item.Explicit === true) {
                control_like.src = './icons/active_like.png'
                like.src = './icons/active_like.png'

            } else if (item.Explicit === false) {
                control_like.src = './icons/like.png'
                like.src = './icons/like.png'

            }
        }
        mobile_like_music.onclick = (event) => {
            event.preventDefault();
            if (item.Explicit === true) {
                axios.patch(url + '/' + id, {
                    Explicit: false
                })
                item.Explicit = false

                localStorage.setItem('music', JSON.stringify(item))

            } else if (item.Explicit === false) {
                axios.patch(url + '/' + id, {
                    Explicit: true
                })
                item.Explicit = true

                localStorage.setItem('music', JSON.stringify(item))

            }
        }
        mobile_add_playlisyt.onclick = () => {
            localStorage.setItem('music_item', JSON.stringify(item))
            playlist_menu.style.display = 'block'
            bg.style.display = 'block'
        }
        close_menu.onclick = () => {

            playlist_menu.style.display = 'none'
            bg.style.display = 'none'
        }
    }
   
    let mobile_delete_music = document.querySelectorAll('.mobile_delete_music')

    mobile_delete_music.forEach(item => {
        item.style.display = 'none'

    })

}

function removeAllOptions(option) {
    let all = document.querySelectorAll(`.${option}`)

    all.forEach(item => {
        item.style.display = 'none'

    })
}


function getPLaylist() {
    axios.get("http://localhost:7777/CreatedPlaylist")
        .then(res => {
            reloadPlaylist(res.data, 'create_playlists')
            reloadPlaylistInfo(res.data, 'playylists')
            reloadPlaylistInfo(res.data, 'playylists_mobile')
            playlests_arr = res.data
        })
}
getPLaylist()
function reloadPlaylist(arr, place) {
    let get = document.querySelector(`.${place}`)
    get.innerHTML = ''
    for (let item of arr) {
        let div = document.createElement('div')
        let p = document.createElement('p')
        let span = document.createElement('span')

        p.innerHTML = item.name
        span.innerHTML = item.musics.length + ' songs'

        get.append(div)
        div.append(p, span)

        div.onclick = () => {
            let a = item.musics
            let b = JSON.parse(localStorage.getItem('music_item'))


            a = a.filter((i) => i.id !== b.id)
            a.push(JSON.parse(localStorage.getItem('music_item')))
            console.log(a);
            axios.patch('http://localhost:7777/CreatedPlaylist/' + item.id, {
                musics: a
            })
        }
    }
}
function reloadPlaylistInfo(arr, place) {
    let get = document.querySelector(`.${place}`)
    get.innerHTML = ''
    for (let item of arr) {
        let div = document.createElement('div')
        let p = document.createElement('p')
        let span = document.createElement('span')

        p.innerHTML = item.name
        span.innerHTML = item.musics.length + ' songs'

        get.append(div)
        div.append(p, span)
        div.onclick = () => {
            removeALLPages()
         
            localStorage.setItem('PlaylistId', JSON.stringify(item.id))
            localStorage.setItem('Playlist_musics', JSON.stringify(item.musics))
            playlist_delete.forEach(item =>{
                item.style.display = 'block'

            })
            page_playlist.style.display = 'block'
            mobile_playlist_page.style.display = 'block'
            mobile_playlist_page_img.style.backgroundImage = `url(${item.img})`
            mobile_playlist_img.src = item.img
            mobile_playlist_name.innerHTML = item.name
            mobile_playlist_info.style.background = `linear-gradient(180deg, ${item.color} 0%, #121212 100%)`
            name_playlist.innerHTML = item.name
            playlist_img.src = item.img
            page_playlist.style.background = `linear-gradient(180deg, 
                    ${item.color} 5.09%, #121212 25.4%)`
            createMusics(item.musics, 'all_musics')
            createMobileMusic(item.musics, 'mobile_playlist_create_musics')
            let options_delete = document.querySelectorAll('.options_delete')
            options_delete.forEach(item => {
                item.style.display = 'block'
            })
            let mobile_delete_music = document.querySelectorAll('.mobile_delete_music')
            mobile_delete_music.forEach(item => {
                item.style.display = 'block'
        
            })
            
        }

        playlist_delete.forEach(item =>{
            item.onclick = () => {
                let id = Number(localStorage.getItem('PlaylistId'))
    
                axios.delete('http://localhost:7777/CreatedPlaylist/' + id)
    
    
            }

        })



    }
}
let add_playlist = document.forms.add_playlist



add_playlist.onsubmit = (event) => {
    event.preventDefault()
    let ren = Math.floor(Math.random() * 9)
    let playlist = {
        musics: [],
        img: made_for_you_arr[ren].img.slice(0, Infinity),
        color: made_for_you_arr[ren].color
    }

    let fmr = new FormData(add_playlist)


    fmr.forEach((value, key) => {
        playlist[key] = value
    })


    axios.post("http://localhost:7777/CreatedPlaylist", playlist)
}



function reloadAfternoon(arr, place) {
    let cont = document.querySelector(`.${place}`)
    cont.innerHTML = ''

    for (let item of arr) {
        let box = document.createElement('div')
        let img = document.createElement('img')
        let title = document.createElement('span')

        box.classList.add('afternoon_item')

        img.src =  item.img
        title.innerHTML = item.name

        cont.append(box)
        box.append(img, title)

        box.style.overflowX

    }

}



reloadLocaleStirage(localStorageMusic)

function playNextMUsic(arr) {
    let indexx = Number(localStorage.getItem('index'))

    localStorage.setItem('music', JSON.stringify(arr[indexx + 1]))
    localStorage.setItem('index', JSON.stringify(indexx + 1))

    playIconContainer.style.backgroundImage = 'url(./icons/control_pause.svg)'
    playState = 'play';
    requestAnimationFrame(whilePlaying);

    index = indexx + 1
    audio.play();

}
function playBackMUsic(arr) {
    let indexx = Number(localStorage.getItem('index'))

    localStorage.setItem('music', JSON.stringify(arr[indexx - 1]))
    localStorage.setItem('index', JSON.stringify(indexx - 1))

    playIconContainer.style.backgroundImage = 'url(./icons/control_pause.svg)'
    playState = 'pause';
    requestAnimationFrame(whilePlaying);

    index = indexx - 1
    audio.play();

}
let random = document.querySelector('.random')
random.onclick = () => {
    let ran = Math.floor(Math.random() * Jsonarr.length)

    reloadLocaleStirage(Jsonarr[ran])
}


let close_music_window = document.querySelector('.close_music_window')
let open_music_window = document.querySelector('.open_music_window')
let music_player_main = document.querySelector('.music_player_main')
let player_music_name = document.querySelector('.player_music_name')
let player_music_title = document.querySelector('.player_music_title')
let logo_img_main = document.querySelector('.logo_img_main')
let music_line = document.querySelector('.music_line')
let music_player = document.querySelector('.music_player')
let icon = document.querySelectorAll('.icon')
let time = document.querySelectorAll('.time')
let over_title = document.querySelectorAll('.over_title')




let width = window.innerWidth


close_music_window.onclick = () => {

    music_player_main.style.height = '72px'
    close_music_window.style.display = 'none'
    music_player_main.style.flexDirection = 'row'
    player_music_name.style.flexDirection = 'row'
    logo_img_main.style.width = '72px'
    logo_img_main.style.height = '72px'
    music_player.style.flexDirection = 'column'
    music_player_main.style.padding = '0px 32px'
    music_line.style.setProperty('--height', '1px')
    music_player_main.style.zIndex = '2'
    control_like.style.display = 'none'
    music_line.style.position = 'absolute'
    music_player_main.style.bottom = '85px'
    music_player.style.width = 'fit-content'
    // over_title.style.overflow = 'hidden'

    icon.forEach(item => {
        item.style.display = 'none'
    })
    time.forEach(item => {
        item.style.display = 'none'
    })
    music_line.style.setProperty('--boll', 'none')

    setTimeout(() => {
        music_player_main.style.position = 'sticky'


    }, 300);
}

open_music_window.onclick = () => {

    music_player_main.style.position = 'fixed'
    music_player_main.style.height = 'calc(100%)'
    music_player_main.style.flexDirection = 'column'
    music_player_main.style.padding = '56px 32px'
    music_player_main.style.bottom = '0'
    player_music_name.style.flexDirection = 'column'
    player_music_name.style.width = '100%'
    logo_img_main.style.width = '343px'
    logo_img_main.style.height = '343px'
    control_like.style.display = 'block'
    // over_title.style.overflow = 'unset'

    icon.forEach(item => {
        item.style.display = 'block'
    })
    time.forEach(item => {
        item.style.display = 'block'
    })
    music_line.style.setProperty('--height', '5px')
    music_player.style.flexDirection = 'column-reverse'
    music_player.style.width = '100%'
    music_line.style.position = 'unset'
    music_line.style.setProperty('--boll', 'block')

    setTimeout(() => {
        close_music_window.style.display = 'block'



    }, 300);
}


window.onresize = () => {
    let innerWidth = window.innerWidth


    if (innerWidth < 768) {
        music_player_main.style.height = '72px'
        close_music_window.style.display = 'none'
        music_player_main.style.flexDirection = 'row'
        player_music_name.style.flexDirection = 'row'
        logo_img_main.style.width = '72px'
        logo_img_main.style.height = '72px'
        music_player.style.flexDirection = 'column'
        music_player_main.style.padding = '0px 32px'
        music_line.style.setProperty('--height', '1px')
        music_player_main.style.zIndex = '2'
        control_like.style.display = 'none'
        music_line.style.position = 'absolute'
        music_player_main.style.bottom = '85px'
        music_player.style.width = 'fit-content'
        // over_title.style.overflow = 'hidden'
    
        icon.forEach(item => {
            item.style.display = 'none'
        })
        time.forEach(item => {
            item.style.display = 'none'
        })
        music_line.style.setProperty('--boll', 'none')
    
        setTimeout(() => {
            music_player_main.style.position = 'sticky'
    
    
        }, 300);
    }
    else if (innerWidth >= 768) {
        music_player_main.style.height = '72px'
        close_music_window.style.display = 'none'

        player_music_name.style.width = 'fit-content'
        logo_img_main.style.width = '72px'
        logo_img_main.style.height = '49px'

        control_like.style.display = 'block'
        music_line.style.position = 'absolute'
        icon.forEach(item => {
            item.style.display = 'block'
        })
        time.forEach(item => {
            item.style.display = 'block'
        })
        music_player_main.style.position = 'fixed'
        music_player_main.style.bottom = '0px'

        music_line.style.position = 'unset'
        music_player_main.style.height = '132px'
        music_line.style.setProperty('--height', '5px')
        music_line.style.setProperty('--boll', 'block')

    }
}

