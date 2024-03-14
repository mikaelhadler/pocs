use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    let mut guess = String::new();

    println!("Guess the number!");

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read");

    let guess:u32 = guess.trim().parse().expect("Please type a number");

    println!("You guessed: {guess}");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => println!("You win!"),
    }
}