//import { http } from "@tauri-apps/api";
import { getClient } from "@tauri-apps/api/http";

const to_use = await getClient();
to_use.get("https://api.mangadex.org/manga/random").then(result => {
    document.getElementById("para").innerText = JSON.stringify(result.data);
}).catch(errors =>{
    document.getElementById("para").innerText = errors;
})

/*http.fetch("https://api.mangadex.org/manga/random").then(getted => {
    document.getElementById("para").innerText = JSON.stringify(getted.data.data);
}).catch(errors =>{
    document.getElementById("para").innerText = errors;
})*/

