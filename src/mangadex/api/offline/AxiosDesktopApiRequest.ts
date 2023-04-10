import axios from "axios";
import axiosTauriAdapter from "axios-tauri-adapter";

const client = axios.create({ adapter: axiosTauriAdapter });

export default client;