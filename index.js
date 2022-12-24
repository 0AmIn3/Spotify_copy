
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
let filtered = []
let s = []
let playlests_arr = []
let react = () => {
    axios.get(url)
        .then(res => {
            s = res.data

            let liked = res.data.filter(item => item.Explicit === true)
            createMusics(s, 'all_musics')
            createMusics(liked, 'all_liked_musics')
            createMobileMusic(s, 'mobile_playlist_create_musics')

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
    {
        "name": "Daily Mix 5",
        "title": "FRENSHIP, Brooke Sierra, Julia Wolf an...",
    },


]

reloadAfternoon(afternoon_arr, 'afternoon_main')
reloadAfternoon(afternoon_arr, 'afternoon_main_modile')

search.onkeyup = () => {
    let { value } = search
    value = value.toLowerCase().trim()

    let filtered = s.filter(item => {
        let TrackName = JSON.stringify(item.TrackName)
        let ArtistName = JSON.stringify(item.AlbumArtistName)
        let aa = []
        aa.push(TrackName, ArtistName)
        if (aa.includes(value)) {
            console.log('a');
        }
    })
    console.log(filtered);
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
    } else if (music.Explicit === false) {
        control_like.src = './icons/like.png'
    }
}


let made_for_you_arr = [

    {
        "name": "Folk & Acoustic Mix",
        "title": "Canyon City, Crooked Still, Gregory Alan",
        "color": '#C93487',
    },

    {
        "name": "Daily Mix 1",
        "title": "Ayra Starr, Lil Kesh, Ed Sheeran",
        "color": '#9FDBD0',

    },

    {
        "name": "Daily Mix 5",
        "title": "FRENSHIP, Brooke Sierra, Julia Wolf",
        "color": '#ECC475',

    },
    {
        "name": "Pop Mix",
        "title": "Hey Violet, VÉRITÉ, Timeflies",
        "color": '#9F3892',

    },

    {
        "name": "Pheelz Mix",
        "title": "WizKid, Asake, Tiwa Savage",
        "color": '#6BE193',

    },
    {
        "name": "Chill Mix",
        "title": "Julia Wolf, Khalid, ayokay",
        "color": '#F8E558',

    },
    {
        "name": "Pop Mix",
        "title": "Hey Violet, VÉRITÉ, Timeflies",
        "color": '#9F3892',

    },
    {
        "name": "Pheelz Mix",
        "title": "WizKid, Asake, Tiwa Savage",
        "color": '#6BE193',

    },
    {
        "name": "Indie Mix",
        "title": "Joywave, The xx, The Neighbourhood",
        "color": '#D33827',

    },
    {
        "name": "Daily Mix 1",
        "title": "Ayra Starr, Lil Kesh, Ed Sheeran",
        "color": '#9FDBD0',

    },
]


let swapTohome = document.querySelector('#home')
let swapTohomeMobile = document.querySelector('#home_mobile')
let swapTosearch = document.querySelector('#search')
let swapToYourLibrary = document.querySelector('#your_library')
let swapToLiked = document.querySelector('#liked_playlis')
let home_page = document.querySelector('.home_page')
let mobile_home = document.querySelector('.mobile_home')
let page_playlist = document.querySelector('.page_playlist')
let mobile_playlist_page = document.querySelector('.mobile_playlist_page')
let liked_playlist = document.querySelector('.liked_playlist')
// let page = localStorage.getItem('page')
function removeALLPages() {

    let page = document.querySelectorAll('#page')

    page.forEach(item => {
        item.style.display = 'none'
    })


}
swapToLiked.onclick = () => {
    removeALLPages()
    liked_playlist.style.display = 'block'


}

swapTohome.onclick = () => {
    removeALLPages()
    home_page.style.display = 'block'
    mobile_home.style.display = 'block'

}
swapTohomeMobile.onclick = () => {
    removeALLPages()
    home_page.style.display = 'block'
    mobile_home.style.display = 'block'

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

        img.src = `./screens/${item.name}.svg`
        h3.innerHTML = item.name
        title.innerHTML = item.title + ' and more'

        cont.append(box)
        box.append(img, play_playlist, h3, title)


        img.onclick = () => {

            removeALLPages()
            page_playlist.style.display = 'block'
            mobile_playlist_page.style.display = 'block'

            playlist_img.src = `./screens/${item.name}.svg`

            name_playlist.innerHTML = item.name
            acters_info.innerHTML = item.title
            window.scrollY = 0
            page_playlist.style.background = `linear-gradient(180deg, 
                ${item.color} 5.09%, #121212 25.4%)`

            createMusics(s, 'all_musics')

            localStorage.setItem('playlist', JSON.stringify(item))
        }

    }


}
let playlistt = [JSON.parse(localStorage.getItem('playlist'))]


for (let item of playlistt) {
    playlist_img.src = `./screens/${item.name}.svg`

    name_playlist.innerHTML = item.name
    acters_info.innerHTML = item.title
    window.scrollY = 0
    page_playlist.style.background = `linear-gradient(180deg, 
            ${item.color} 5.09%, #121212 25.4%)`
}


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
        let active_img = document.createElement('img')
        let time = document.createElement('td')
        let audi = document.createElement('audio')
        let duration = document.createElement('p')


        let options_box = document.createElement("div")
        let options_add_playlist = document.createElement("p")
        let options_like = document.createElement("p")
        let options_play = document.createElement("p")

        options_add_playlist.innerHTML = "ADD TO PLAYLIST"
        options_like.innerHTML = 'LIKE'
        options_play.innerHTML = "LISTEN NOW"
        audi.src = item.TrackPreviewURL
        audi.setAttribute('loop', '')

        active_img.src = num.classList.add('num')
        info.classList.add('info')
        like.classList.add('like_btn')
        options_like.classList.add('like_btn')
        options_box.classList.add('options_box')
        options_add_playlist.classList.add('options_add_playlist')
        options_like.classList.add('options_like')
        options_play.classList.add('options_play')
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
        options_box.append(options_like, options_add_playlist, options_play)
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
        tr.onclick = () => {
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
        let id = item.id

        options_like.onclick = (event) => {
            event.preventDefault();
            if (item.Explicit === true) {
                axios.patch(url + '/' + id, {
                    Explicit: false
                })
                react()

            } else if (item.Explicit === false) {
                axios.patch(url + '/' + id, {
                    Explicit: true
                })
                react()

            }
        }
        like.onclick = (event) => {
            event.preventDefault();
            if (item.Explicit === true) {
                axios.patch(url + '/' + id, {
                    Explicit: false
                })
                react()

            } else if (item.Explicit === false) {
                axios.patch(url + '/' + id, {
                    Explicit: true
                })
                react()

            }
        }
        let bg = document.querySelector('.bg')
        let playlist_menu = document.querySelector('.playlist_menu')
        let close_menu = document.querySelector('.close_menu')

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

    for (let item of [music_now]) {
        if (item.Explicit === true) {
            control_like.src = './icons/active_like.png'

        } else if (item.Explicit === false) {
            control_like.src = './icons/like.png'

        }
    }

    control_like.onclick = () => {

        for (let item of [music_now]) {
            if (item.Explicit === true) {
                item.Explicit = false
                axios.patch(url + '/' + item.id, {
                    Explicit: false
                })
                control_like.src = './icons/active_like.png'

                localStorage.setItem('music', JSON.stringify(item))
                localStorage.setItem('index', item.id - 1)


                // reloadLocaleStirage(item)

            } else if (item.Explicit === false) {
                item.Explicit = true

                axios.patch(url + '/' + item.id, {
                    Explicit: true
                })
                control_like.src = './icons/like.png'
                localStorage.setItem('music', JSON.stringify(item))
                localStorage.setItem('index', item.id)

                // reloadLocaleStirage(item)
            }
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


        mobile_music_playlist_item.classList.add('mobile_music_playlist_item')
        itemleft.classList.add('itemleft')
        itemright.classList.add('itemright')
        item_name.classList.add('item_name')
        TrackImg.classList.add('TrackImg')

        TrackImg.src = item.AlbumImageURL
        Download.src = './icons/download.svg'
        options.src = './icons/options.svg'
        TrackName.innerHTML = item.TrackName
        TrackTitle.innerHTML = item.ArtistName

        get.append(mobile_music_playlist_item)
        mobile_music_playlist_item.append(itemleft, itemright)
        itemright.append(options)
        itemleft.append(TrackImg, item_name)
        item_name.append(TrackName, div)
        div.append(Download, TrackTitle)

        mobile_music_playlist_item.onclick = () =>{
            localStorage.setItem('index', item.id - 1)
            localStorage.setItem('music', JSON.stringify(item))
            music_namee.innerHTML = item.TrackName
            artist_name.innerHTML = item.ArtistName
            logo_img.src = item.AlbumImageURL
            audio.src = item.TrackPreviewURL
            audio.play();
            // requestAnimationFrame(whilePlaying);
            playIconContainer.style.backgroundImage = 'url(./icons/control_pause.svg)'
            playState = 'pause';
            if (item.Explicit === true) {
                control_like.src = './icons/active_like.png'

            } else if (item.Explicit === false) {
                control_like.src = './icons/like.png'

            }
        }
    }
}




function getPLaylist() {
    axios.get("http://localhost:7777/CreatedPlaylist")
        .then(res => {
            reloadPlaylist(res.data, 'create_playlists')
            reloadPlaylistInfo(res.data, 'playylists')
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
            page_playlist.style.display = 'block'
            name_playlist.innerHTML = item.name
            createMusics(item.musics, 'all_musics')
        }
    }
}
let add_playlist = document.forms.add_playlist



add_playlist.onsubmit = (event) => {
    event.preventDefault()

    let playlist = {
        musics: [],

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

        img.src = `./screens/${item.name}.svg`
        title.innerHTML = item.name

        cont.append(box)
        box.append(img, title)



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
    let ran = Math.floor(Math.random() * s.length)

    reloadLocaleStirage(s[ran])
}










