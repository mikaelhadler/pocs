use std::thread;
use std::time::Duration;

fn main() {
    let handle1 = thread::spawn(|| {
        for i in 1..5 {
            println!("Thread 1 running: {}", i);
            thread::sleep(Duration::from_millis(1000));
        }
    });
    handle1.join().unwrap();

    println!("Done!");
}
