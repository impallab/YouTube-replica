
export const getRandomMessage = () => {
    const messages = [
        "Hey there, Pallab! 👋🏻 How's your day going so far? 🌞",
        "Hi Sangita! 🙂 I hope you're having a wonderful day. ☀️",
        "What's up, buddy Pallab? 🙌🏼 Anything exciting happening today? 🎉",
        "Hello there, Shiba! 👋🏽 Did you catch the latest episode of our favorite show? 🎬",
        "Yo Sachin! 😎 Any plans for the weekend? 🍹",
        "Greetings, Mr. Sujan! 👴🏼 I'd love to hear your wisdom on this topic. 📚",
        "Hey there, Manisha! 🤗 I'm always happy to lend an ear if you need someone to talk to. 👂🏻",
        "Hiya Surajit! 👋🏾 I came across this hilarious meme, and it made me think of you. 😂🤣",
        "Hi Anita! 💞 I've been meaning to ask you for some advice... 💭",
        "Hey Mounojit, what's crackin'? 🔥 I'm feeling bored. Let's come up with something fun to do! 🎢",
        "Hello, my dear friend Pallab! 💖 I hope you're having a blessed day. ✨",
        "Hi there, Sagar! 🙋🏻‍♀️ I've been working on a new project, and would love to get your thoughts on it. 💻",
        "Hey Subha! 👋🏼 Are you ready for that big exam coming up? 📚🧠",
        "Hello, Mr. Anubhab! 👴🏽 I have a question about your experience in this field, if you don't mind sharing. 🕰️",
        "Hey there, buddy Rajesh! 🤜🏾🤛🏻 I'm planning a get-together. Would you be interested in joining? 🎊",
        "Hi Sreya, my friend! 🤗 I stumbled upon this interesting article and thought you might find it helpful. 📰",
        "Greetings, Priya! 💕 I've been feeling a bit down lately. Could we grab coffee and catch up? ☕",
        "Hey there, Moni! 👋🏿 I have some exciting news to share with you! 🎉",
        "Hello, Moumita! 👩🏻‍🎓 I was wondering if you could help me with that assignment we discussed. 📝",
        "Hi, Laxmi! 👴🏾 I'm seeking some guidance on how to navigate a challenging situation at work. 💼",
        "Hey there, Akash! 😄 How about we plan a fun activity together this weekend? 🎢🎳",
        "What's up, Bappa? 🤩 I just discovered this cool new restaurant. Want to check it out? 🍽️",
        "Hi Riya! 🥰 I'm feeling a bit stressed today. Could you lend me a listening ear? 🌈",
        "Hello there, Ritu! 🌺 Have you heard about the upcoming community event? It sounds like a lot of fun! 🎉",
        "Yo Pritam! 🎉 I've got some exciting news to share! Let me know when you're free to catch up. ✨",
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
};

export const generateRandomName = () => {
    const maleFirstNames = [
        "Aditya", "Arjun", "Arnav", "Ayaan", "Dhruv", "Ishaan", "Kabir", "Krish", "Neel", "Aarav", "Aarav🦁", "Aryan⚡", "Rohan🐼", "Vihaan🌟", "Arjun🦊", "Pallab🍃", "Biplab🌿", "Surajit🌞", "Mounojit🏞️", "Sujan🌱", "Shiba🕉️", "Sagar🌊", "Sachin🏏", "Anubhab🎭", "Bappa🌟", "Subhajit🎨", "Sudip🎵", "Rahul🏏", "Rupam🌹", "Rajesh🤵", "Pritam🎶", "Akash☁️", "Subhankar🚀",
    ];

    const femaleFirstNames = [
        "Aanya", "Aisha", "Anaya", "Diya", "Ishita", "Myra", "Nisha", "Priya", "Riya", "Saanvi", "Saira", "Zoya", "Aisha💫", "Ananya🦋", "Myra🌺", "Saanvi🌈", "Vani✨", "Sangita🎶", "Manisha🧘", "Rituparna🎭", "Anita👩‍🔬", "Sreya📚", "Moumita🌻", "Moni🌼", "Riya👗", "Priya💖", "Laxmi🌾", "Rimpa🎨", "Piu🎀", "Papiya💐",
    ];

    const lastNames = [
        "Dutta", "Gill", "Gupta", "Jain", "Kapoor", "Khanna", "Malhotra", "Mehra", "Patel", "Rai", "Sharma", "Singh", "Dandapat💌", "Bhattacharya🔬", "Bej🎨", "Das💼", "Pratihar📖", "Dey🧑‍💻", "Pal🌳", "Bag👜", "Seth🌟", "Chowdhury👑",
    ];

    const gender = Math.random() < 0.5 ? "male" : "female";
    const firstNames = gender === "male" ? maleFirstNames : femaleFirstNames;
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];

    // Reduce the frequency of surnames appearing
    const shouldIncludeLastName = Math.random() < 0.1;
    if (shouldIncludeLastName) {
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${randomFirstName} ${randomLastName}`;
    } else {
        return randomFirstName;
    }
};
