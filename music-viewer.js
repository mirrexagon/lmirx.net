const CONTENT_URL = "https://s3-ap-southeast-2.amazonaws.com/lmirx.net";

const MUSIC_CONTENT_URL = CONTENT_URL + "/music";
const MUSIC_DATA_URL = MUSIC_CONTENT_URL + "/music.json"

const CONTAINER_ID = "music-viewer";

const MUSIC_LIST_CLASS = "music-list";

const SONG_ITEM_CLASS = "song-item";
const SONG_ITEM_TITLE_CLASS = "song-item-title";

// -- Callbacks --
function display_tag(tag) {
}

// -- Main --
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
    let item = document.getElementById("song-item").content.cloneNode(true);

    let base_url = MUSIC_CONTENT_URL + "/" + song_data.basename;

    let flac_url = base_url + ".flac"
    let ogg_url = base_url + ".ogg"

    let project_url = undefined;
    if (song_data.project_extension !== undefined) {
        project_url = base_url + song_data.project_extension;
    }

    // ---

    item.querySelector(".song-title").textContent = song_data.artist + " - " + song_data.title;
    item.querySelector(".song-audio-source").setAttribute("src", ogg_url);

    {
        let downloads = item.querySelector(".song-downloads");
        let download_item_template = document.getElementById("song-downloads-item");

        let downloads_array = [
            [ "FLAC", flac_url ],
            [ "Ogg Vorbis", ogg_url ]
        ];

        if (song_data.project_extension !== undefined) {
            downloads_array.push([ "Project file (." + song_data.project_extension + ")", base_url + "." + song_data.project_extension ]);
        }

        for (let i = 0; i < downloads_array.length; ++i) {
            let download_item = download_item_template.content.cloneNode(true);
            let anchor = download_item.querySelector("a");

            anchor.textContent = downloads_array[i][0];
            anchor.setAttribute("href", downloads_array[i][1]);

            downloads.appendChild(download_item);
        }
    }

    if (song_data.comment !== undefined) {
        item.querySelector(".song-comment").textContent = song_data.comment;
    } else {
        item.querySelector(".song-comment").remove();
    }

    {
        let tags = item.querySelector(".song-tags");
        let tags_item_template = document.getElementById("song-tags-item");

        for (let i = 0; i < song_data.tags.length; ++i) {
            let tag_item = tags_item_template.content.cloneNode(true);
            let button = tag_item.querySelector("button");

            button.onclick = function() { display_tag(song_data.tags[i]); }
            button.textContent = song_data.tags[i];

            tags.appendChild(tag_item);
        }
    }

    return item;
}

async function get_music_data() {
    let json_string = await fetch(MUSIC_DATA_URL);
    return json_string.json();
}

main();
