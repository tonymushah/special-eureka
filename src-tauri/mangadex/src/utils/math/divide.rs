use std::ops::{Div, Rem, Sub};

pub struct DivideResult<T> {
    pub remainder: T,
    pub quot: T,
}

pub fn divide<T>(num: T, dem: T) -> DivideResult<T>
where
    T: Sub<Output = T> + Div<Output = T> + Rem<Output = T> + Copy,
{
    let rem = num % dem;
    let quot = (num - rem) / dem;
    DivideResult {
        remainder: rem,
        quot,
    }
}
