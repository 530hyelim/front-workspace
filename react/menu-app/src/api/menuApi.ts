import axios from "axios";
import type { Menu } from "../type/menu";

const api = axios.create({
    baseURL: "http://localhost:8081/api",
    withCredentials: false
});

// export const loadMenus = async function() {
//     //const response = await api.get("/menus");
//     //return response.data;
//     return api.get<Menu[]>("/menus");
// };

export const loadMenus = async function({type, taste}:{type:string, taste:string}) {
    return api.get<Menu[]>(`/menus?type=${type}&taste=${taste}`);
};

export const getMenus = (id:string | undefined) => {
    return api.get<Menu>(`/menus/${id}`)
};

export const searchMenus = async function(searchKeyword:{type:string, taste:string}) {
    const response = await api.get<Menu[]>("/menus", {
        params : {
            type : searchKeyword.type,
            taste : searchKeyword.taste
        }
    });
    return response.data;
};