# Chord-Transposer

## Purpose?
This chord transposer website turns songs from Chord Pro Format into songs that can be read easily by a musician.
As a bonus, the user can also tranpose the chords of the song if they wish to play in a different key that might
be easier for them or a vocalist.
## Overview
LAUNCH INSTRUCTIONS:
use the command "node server.js" in the terminal in the "chord_transposer" directory

TESTING INSTRUCTIONS:
visit the following URL in your chrome browser:
http://localhost:3000/index.html

To shutdown server press "CTRL+C" in the terminal
## Files

- `defs.h`
- `ghost.c`
- `house.c`
- `hunter.c`
- `logger.c`
- `main.c`
- `makefile`
- `room.c`
- `utils.c`
- `README.txt`

## Compiling

To compile the program, run the following command in the terminal:

```bash
make 
or 
gcc -Wall -Wextra -o phasmo defs.h ghost.c house.c hunter.c main.c room.c utils.c logger.c -lpthread
```
## Running
To run the program, execute the following command in the terminal:
```bash
./phasmo
```
## Cleaning
To clean the project directory and remove object and executable files, use the following command:
```bash
make clean
```
## Usage
Once the program is running, you will be prompted to input the names for the four hunters. Afterward, the simulation results will be displayed on the screen.
