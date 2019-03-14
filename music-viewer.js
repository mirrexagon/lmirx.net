const CONTENT_URL = "https://s3-ap-southeast-2.amazonaws.com/lmirx.net";

const MUSIC_CONTENT_URL = CONTENT_URL + "/music";
const MUSIC_DATA_URL = MUSIC_CONTENT_URL + "/music.json"

const CONTAINER_ID = "music-viewer";

const MUSIC_LIST_CLASS = "music-list";
const SONG_ITEM_CLASS = "song-item";

function main() {
    get_music_data()
    .then(music_data => {
        document.getElementById(CONTAINER_ID).appendChild(make_list_from_music_data(music_data));
    })
    .catch(err => {
        console.log(err);
    });
}

function make_list_from_music_data(music_data) {
    let list = document.createElement("ul");
    list.className = MUSIC_LIST_CLASS;

    for (let i = 0; i < music_data.length; ++i) {
        let item = document.createElement('li');
        item.appendChild(make_song_item(music_data[i]));
        list.appendChild(item);
    }

    return list;
}

function make_song_item(song_data) {
    let item = document.createElement("div");
    item.className = SONG_ITEM_CLASS;

    item.appendChild(document.createTextNode(song_data.artist + " - " + song_data.title));

    return item;
}

async function get_music_data() {
    let json_string = await fetch(MUSIC_DATA_URL);
    return json_string.json();
}

main();
