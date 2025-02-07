use std::thread;
use std::time::Duration;

fn main() {
    let handle1 = thread::spawn(|| {
        for i in 1..5 {
            println!("Thread 1 running: {}", i);
            thread::sleep(Duration::from_millis(1000));
        }
    });

    let handle2 = thread::spawn(|| {
        for i in 1..5 {
            println!("Thread 2 running: {}", i);
            thread::sleep(Duration::from_millis(1000));
        }
    });

    handle1.join().unwrap();
    handle2.join().unwrap();

    println!("Done!");
}
