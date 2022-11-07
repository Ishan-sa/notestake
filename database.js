let notes = [
    {
        id: 1,
        title: "My First Note",
        timeStamp: Date.now(),
        contents: "Touch water with paw then recoil in horror waffles touch my tail, i shred your hand purrrr but catty ipsum chew iPad power cord cats go for world domination chew on cable. Intently stare at the same spot where is it? i saw that bird i need to bring it home to mommy squirrel! push your water glass on the floor cats are fats i like to pets them they like to meow back, so dismember a mouse and then regurgitate parts of it on the family room floor for snob you for another person or swipe at owner's legs. My left donut is missing, as is my right paw at your fat belly hit you unexpectedly naughty running cat. Meoooow purr for no reason chew master's slippers. Furball roll roll roll. Be superior howl on top of tall thing jump up to edge of bath, fall in then scramble in a mad panic to get out yet i shall purr myself to sleep cat snacks, for get away from me stupid dog.",
    },
    {
        id: 2,
        title: "My Second Note",
        timeStamp: Date.now(),
        contents: "Dont wait for the storm to pass, dance in the rain the cat was chasing the mouse. Intently sniff hand steal raw zucchini off kitchen counter yet nap all day. Pet me pet me pet me pet me, bite, scratch, why are you petting me car rides are evil sitting in a box at four in the morning wake up owner meeeeeeooww scratch at legs and beg for food then cry and yowl until they wake up at two pm jump on window and sleep while observing the bootyful cat next door that u really like but who already has a boyfriend end up making babies with her and let her move in. Chase imaginary bugs lick master's hand at first then bite because im moody make meme, make cute face catch small lizards, bring them into house, then unable to find them on carpet, carrying out surveillance on the neighbour's dog catch small lizards, bring them into house, then unable to find them on carpet.",
    },
]

let currentId = 3;

function getNotes(searchTerm) {
    if (!searchTerm) {
        return notes;
    }
    return notes.filter(note => note.title.includes(searchTerm) || note.contents.includes(searchTerm))
}
exports.getNotes = getNotes


function getNote(id) {
    return notes.find((note) => note.id === id);
}
exports.getNote = getNote;



function addNote(note) {
    notes.push({
        ...note,
        id: currentId,
        timeStamp: Date.now()
    });
    currentId++
}
exports.addNote = addNote;

function deleteNote(id) {
    // filter will create a new array from an existing array but only where items match some sort of criteria
    notes = notes.filter((note) =>
        // so as long as the id does not equal the other id, it can exist in the new array, but if the id does equal the notes id, then it won't be added in the new array
        note.id !== id
    )
}
exports.deleteNote = deleteNote;