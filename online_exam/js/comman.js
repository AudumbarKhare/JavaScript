class comman{
    //first letter e
    titleCase(text) {
        return text.split(" ").map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");
    }
}

export default comman;