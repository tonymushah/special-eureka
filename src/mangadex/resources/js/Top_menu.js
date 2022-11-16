function show_menu(){
    var to_use = document.getElementById("mangadex-sb-closed");
    to_use.setAttribute("class", "container-fluid col-md-3 col-md-offset-5 col-lg-3 col-lg-offset-5 invisible")
    to_use.setAttribute("id", "mangadex-sb-opened");
    var content = document.getElementById("content");
    content.setAttribute("class" ,"col-lg-9 col-md-9");
    var sidebar = document.getElementById("sidebar-menu-hidden");
    sidebar.setAttribute("class", "col-lg-3 col-md-3");
    sidebar.setAttribute("id", "sidebar-menu");
}
function close_menu(){
    var content = document.getElementById("content");
    content.setAttribute("class" ,"col-lg-12 col-md-12");
    var sidebar = document.getElementById("sidebar-menu");
    sidebar.setAttribute("id", "sidebar-menu-hidden");
    sidebar.setAttribute("class", "");
    var to_use = document.getElementById("mangadex-sb-opened");
    to_use.setAttribute("id", "mangadex-sb-closed");
    to_use.setAttribute("class", "container-fluid col-md-3 col-md-offset-5 col-lg-3 col-lg-offset-5 visible")
}