pub fn init_hotpath() -> hotpath::HotPath {
    hotpath::GuardBuilder::new("special-eureka").build()
}
