import React from "react";
import ReactDOM from "react-dom/client";
import { Asc_Desc, Offset_limits, Order } from "../../mangadex/api/internal/Utils";
import { Manga } from "../../mangadex/api/structures/Manga";
import { Response } from "@tauri-apps/api/http";
import { Api_Request } from "../../mangadex/api/internal/Api_Request";
import ReactJson from "react-json-view";
import { At_Home } from "../../mangadex/api/structures/At_home";
import Viewer from "react-viewer";
function TEST(props) {
  const [ visible, setVisible ] = React.useState(false);

  return (
    <div>
      <button onClick={() => { setVisible(true); } }>show</button>
      <Viewer
      visible={visible}
      onClose={() => { setVisible(false); } }
      images={props.data}
      />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<p>loading</p>);

const At_home_ch: At_Home = await At_Home.getAt_Home_wChID("2a5cdc4b-7338-4062-8b52-a19f7e2c801c");
const dataSaver: Array<string> = At_home_ch.get_dataSaver_ImgURL();

const img_alts: Array<any> = [];
for (let index = 0; index < dataSaver.length; index++) {
    const element = dataSaver[index];
    img_alts[index] = {
        src: element,
        alt: At_home_ch.get_dataSaver()[index]
    };
}

root.render(<TEST data={img_alts}/>);