const CONTENT_URL = "https://s3-ap-southeast-2.amazonaws.com/lmirx.net";

const MUSIC_CONTENT_URL = CONTENT_URL + "/music";
const MUSIC_METADATA_URL = MUSIC_CONTENT_URL + "/metadata.json"

const CONTAINER_ID = "music-viewer";

function main() {
    get_music_metadata()
    .then(metadata => {
        document.getElementById(CONTAINER_ID).innerHTML = "Coming soon.";
    })
    .catch(err => {
        console.log(err);
    });
}

async function get_music_metadata() {
    let json_string = await fetch(MUSIC_METADATA_URL);
    return json_string.json();
}

main();
