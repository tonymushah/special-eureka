use async_graphql::{CustomValidator, Guard, InputValueError};

#[derive(Debug, Clone, Copy)]
pub struct U32PercentageGuard {
    value: u32,
    non_zero: bool,
}

impl U32PercentageGuard {
    pub fn new(value: u32) -> Self {
        Self {
            value,
            non_zero: false,
        }
    }
    pub fn non_zero(mut self, non_zero: bool) -> Self {
        self.non_zero = non_zero;
        self
    }
}

#[derive(Debug, Clone, Copy, Default)]
pub struct PercentageValidator {
    non_zero: bool,
}

impl PercentageValidator {
    pub fn non_zero(mut self, non_zero: bool) -> Self {
        self.non_zero = non_zero;
        self
    }
}

macro_rules! impl_percentage_validator {
	($($num:ty, )*) => {
		$(
			impl CustomValidator<$num> for PercentageValidator {
				fn check(&self, value: &$num) -> Result<(), InputValueError<$num>> {
					if self.non_zero && *value == 0 {
		                Err("Cannot accept zero values".into())
		            } else if *value > 100 {
		                Err(format!(
		                    "Percentage value should be set between 0 to 100 ({} > 100)",
		                    value
		                )
		                .into())
		            } else {
		                Ok(())
		            }
				}
			}
		)*
    };
}

impl_percentage_validator!(u8, u16, u32, u64,);

impl Guard for U32PercentageGuard {
    async fn check(&self, _ctx: &async_graphql::Context<'_>) -> async_graphql::Result<()> {
        if self.non_zero && self.value == 0 {
            Err("Cannot accept zero values".into())
        } else if self.value > 100 {
            Err(format!(
                "Percentage value should be set between 0 to 100 ({} > 100)",
                self.value
            )
            .into())
        } else {
            Ok(())
        }
    }
}
