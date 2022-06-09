# Roller.ts

A node package to simulate Dice Rolls, currently supports the common dice:
* d2
* d4
* d6
* d8
* d10
* d12
* d20
* d100

## Design

### Dice Roll Format

A Dice Roll looks very similar to [Roll20](https://wiki.roll20.net/Dice_Reference)'s `/roll` command.  
i.e. `2d20dh1 + d6! + 2d4 + 5 + 2` (with or without spaces) is valid.

### Representation

Each element in a Dice Roll is represented by a `Summable`. Each Summable is
represented by either a `Die` or a `Modifier`. `Modifiers`, similarly, are
represented by a `StraightValue`, but in the future could be represented by
a `Stat`, `Skill`, `Proficiency`, etc. Although that may be scope creep
for this project and may end up in a more full-fledged character tracker.  

A `Die` is given a d _n_ function where _n_ is the number of faces on the `Die`.  
A `StraightValue` is given a value it is meant to represent.
