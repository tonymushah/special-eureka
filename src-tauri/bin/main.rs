#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[cfg_attr(feature = "hotpath", hotpath::main)]
fn main() {
    special_eureka::run()
}
