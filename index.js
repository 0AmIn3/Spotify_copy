
let index = Number(localStorage.getItem('index'))
let music_back = document.querySelector('.music_back')
let music_next = document.querySelector('.music_next')
let localStorageMusic = JSON.parse(localStorage.getItem('music'))
let audio = document.querySelector('.audio');
let url = 'http://localhost:7777/Playlist'

let data = 0
const react = () => {
    axios.get(url)
        .then(res => {

            let liked = res.data.filter(item => item.Explicit === true)

            // let playlests = [
            //     {
            //         id: 1,
            //         name: 'Liked Songs',
            //         img: './screens/liked_screen.svg',
            //         arr: liked,
            //     },
            //     {
            //         id: 2,
            //         name: 'Liked Songs',
            //         img: './screens/liked_screen.svg',
            //         arr: liked,
            //     },
            // ]
            createMusics(res.data, 'all_musics')
            createMusics(liked, 'all_liked_musics')


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
}, 100);

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




//МУЗЫКАЛЬНЫЙ ПЛЕЙЕР

let playIconContainer = document.getElementById('play-icon');
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

const showRangeProgress = (rangeInput) => {
    if (rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}

seekSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});
volumeSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});




const durationContainer = document.getElementById('duration');
const currentTimeContainer = document.getElementById('current-time');
const outputContainer = document.getElementById('volume-output');
let raf = null;

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration);
    calculateTime(audio.duration)

}
const setSliderMax = () => {
    seekSlider.max = Math.floor(audio.duration);
}

const displayBufferedAmount = () => {
    const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
    audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
}

const whilePlaying = () => {
    seekSlider.value = Math.floor(audio.currentTime);
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
    raf = requestAnimationFrame(whilePlaying);
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
    const value = e.target.value;

    outputContainer.textContent = value;
    audio.volume = value / 100;
});




/* Implementation of the Media Session API */
if ('mediaSession' in navigator) {

    navigator.mediaSession.setActionHandler('play', () => {
        if (playState === 'play') {
            audio.play();
            playAnimation.playSegments([14, 27], true);
            requestAnimationFrame(whilePlaying);
            playState = 'pause';
        } else {
            audio.pause();
            playAnimation.playSegments([0, 14], true);
            cancelAnimationFrame(raf);
            playState = 'play';
        }
    });
    navigator.mediaSession.setActionHandler('pause', () => {
        if (playState === 'play') {
            audio.play();
            playAnimation.playSegments([14, 27], true);
            requestAnimationFrame(whilePlaying);
            playState = 'pause';
        } else {
            audio.pause();
            playAnimation.playSegments([0, 14], true);
            cancelAnimationFrame(raf);
            playState = 'play';
        }
    });
    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        audio.currentTime = audio.currentTime - (details.seekOffset || 10);
    });
    navigator.mediaSession.setActionHandler('seekforward', (details) => {
        audio.currentTime = audio.currentTime + (details.seekOffset || 10);
    });
    navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.fastSeek && 'fastSeek' in audio) {
            audio.fastSeek(details.seekTime);
            return;
        }
        audio.currentTime = details.seekTime;
    });
    navigator.mediaSession.setActionHandler('stop', () => {
        audio.currentTime = 0;
        seekSlider.value = 0;
        audioPlayerContainer.style.setProperty('--seek-before-width', '0%');
        currentTimeContainer.textContent = '0:00';
        if (playState === 'pause') {
            playAnimation.playSegments([0, 14], true);
            cancelAnimationFrame(raf);
            playState = 'play';
        }
    });
}

//МУЗЫКАЛЬНЫЙ ПЛЕЙЕР




function reloadLocaleStirage(music) {
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



let playlist_play = document.querySelectorAll('.playlist_play')

function createMusics(arr, place) {
    let get = document.querySelector(`.${place}`)
    
    // console.log(place);

    playlist_play.forEach(item =>{
        item.onclick = () =>{
            localStorage.setItem('index', arr.indexOf(arr[0]))
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
        let liked_music = document.createElement('td')
        let like = document.createElement('img')
        let active_img = document.createElement('img')
        let time = document.createElement('td')
        let audi = document.createElement('audio')
        let duration = document.createElement('p')
        audi.src = item.TrackPreviewURL
        audi.setAttribute('loop', '')

        active_img.src = num.classList.add('num')
        info.classList.add('info')
        music_info.classList.add('music_info')
        music_name.classList.add('music_name')
        music_title.classList.add('music_title')
        liked_music.classList.add('liked_music')
        comment.classList.add('comment')
        audi.classList.add('audi')

        photo.src = item.AlbumImageURL

        duration.innerHTML = audio.duration

        time.innerHTML = calculateTime(Number(duration.innerHTML))

        num.innerHTML = arr.indexOf(item) + 1
        music_name.innerHTML = item.TrackName
        music_title.innerHTML = item.ArtistName
        comment.innerHTML = item.AlbumName

        if (item.Explicit === true) {
            like.src = './icons/active_like.png'
            control_like.src = './icons/active_like.png'

        } else if (item.Explicit === false) {
            like.src = './icons/like.png'
            control_like.src = './icons/like.png'

        }
        get.append(tr)
        tr.append(audi, num, info, comment, liked_music, time)
        info.append(photo, music_info)
        liked_music.append(like)
        music_info.append(music_name, music_title)


        tr.onclick = () => {
            let data_num = tr.parentElement.getAttribute('data-num')
            data = Number(data_num)
            localStorage.setItem('index', arr.indexOf(item))
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

            } else if (item.Explicit === false) {
                control_like.src = './icons/like.png'
            }
            // console.log(data);
        }

        like.onclick = () =>{
            let id = item.id
            if (item.Explicit === true) {
                axios.patch(url + '/' + id , {
                    Explicit: false
                })
            } else if (item.Explicit === false) {
                axios.patch(url + '/' + id , {
                    Explicit: true
                })
            }

        }
        control_like.onclick = () =>{
            let id = item.id
            if (item.Explicit === true) {
                axios.patch(url + '/' + id , {
                    Explicit: false
                })
                control_like.src = './icons/like.png'

            } else if (item.Explicit === false) {
                axios.patch(url + '/' + id , {
                    Explicit: true
                })
                control_like.src = './icons/active_like.png'

            }

        }


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
let swapTosearch = document.querySelector('#search')
let swapToYourLibrary = document.querySelector('#your_library')
let swapToLiked = document.querySelector('#liked_playlis')
let home_page = document.querySelector('.home_page')
let page_playlist = document.querySelector('.page_playlist')
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

}
let name_playlist = document.querySelector('#name_playlist')
let acters_info = document.querySelector('.acters_info')
let playlist_img = document.querySelector('.playlist_img')

function reloadRecomendations(arr, place, from , to) {
    let cont = document.querySelector(`.${place}`)
    cont.innerHTML = ''

    for (let item of arr.slice(from , to)) {
        let box = document.createElement('div')
        let play_playlist = document.createElement('div')
        let img = document.createElement('img')
        let h3 = document.createElement('h3')
        let title = document.createElement('p')

        box.classList.add('recomend_item')
        play_playlist.classList.add('play_playlist')

        img.src = `./screens/${item.name}.svg`
        h3.innerHTML = item.name
        title.innerHTML = item.title + ' and more'

        cont.append(box)
        box.append(img, play_playlist, h3, title)


        img.onclick = () => {

            removeALLPages()
            playlist_img.src = `./screens/${item.name}.svg`

            name_playlist.innerHTML = item.name
            acters_info.innerHTML = item.title
            window.scrollY = 0
            page_playlist.style.display = 'block'
            page_playlist.style.background = `linear-gradient(180deg, 
                ${item.color} 5.09%, #121212 25.4%)`


            localStorage.setItem('playlist', JSON.stringify(item))
        }

    }


}
let playlistt = [JSON.parse(localStorage.getItem('playlist'))]
console.log();
for (let item of playlistt) {
    playlist_img.src = `./screens/${item.name}.svg`

    name_playlist.innerHTML = item.name
    acters_info.innerHTML = item.title
    window.scrollY = 0
    // page_playlist.style.display = 'block'
    page_playlist.style.background = `linear-gradient(180deg, 
        ${item.color} 5.09%, #121212 25.4%)`
}

reloadRecomendations(made_for_you_arr, 'your_top_mixes', 0, 5)
reloadRecomendations(made_for_you_arr, 'made_for_you', 5, Infinity)
reloadRecomendations(made_for_you_arr, 'recently_played', 0, 5)
reloadRecomendations(made_for_you_arr, 'jump_back_in', 5, Infinity)
reloadRecomendations(made_for_you_arr, 'uniquely_yours', 0, 5)
reloadRecomendations(made_for_you_arr, 'just_the_hits', 5, Infinity)





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

    localStorage.setItem('music', JSON.stringify(arr[index + 1]))
    localStorage.setItem('index', JSON.stringify(index + 1))
    // localStorageMusic = JSON.parse(localStorage.getItem('music'))
    playIconContainer.style.backgroundImage = 'url(./icons/control_pause.svg)'
    playState = 'play';
    audio.play();
    requestAnimationFrame(whilePlaying);

    index = index + 1

}
function playBackMUsic(arr) {

    localStorage.setItem('music', JSON.stringify(arr[index - 1]))
    localStorage.setItem('index', JSON.stringify(index - 1))
    // localStorageMusic = JSON.parse(localStorage.getItem('music'))

    playIconContainer.style.backgroundImage = 'url(./icons/control_pause.svg)'
    playState = 'pause';
    audio.play();
    requestAnimationFrame(whilePlaying);

    index = index - 1

}
