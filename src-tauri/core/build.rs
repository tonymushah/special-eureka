use tauri_build::{Attributes, try_build, CodegenContext};

fn main() {
    let mut att = Attributes::default();
	att = att.codegen(CodegenContext::default());
	if let Err(err) = try_build(att) {
		let error = format!("{err:#}");
		println!("{error}");
		if error.starts_with("unknown field") {
			print!("found an unknown configuration field. This usually means that you are using a CLI version that is newer than `tauri-build` and is incompatible. ");
			println!(
				"Please try updating the Rust crates by running `cargo update` in the Tauri app folder."
			);
		}
		std::process::exit(1);
	}
}