pub fn init_hotpath() -> hotpath::FunctionsGuard {
    hotpath::FunctionsGuardBuilder::new("special-eureka").build()
}
