const firebaseConfig = {

  apiKey: "AIzaSyAhwfTfsF52xeG5yeTE25_Tzz8t0tqWUKs",

  authDomain: "hydrate-jake.firebaseapp.com",
  databaseURL: "https://hydrate-jake-default-rtdb.firebaseio.com/",

  projectId: "hydrate-jake",

  storageBucket: "hydrate-jake.firebasestorage.app",

  messagingSenderId: "84138308656",

  appId: "1:84138308656:web:a72e11a8b304601359a9f5",

  measurementId: "G-S1LWBPL4RX"

};


firebase.initializeApp(firebaseConfig);


// Get database reference
const db = firebase.database();
//const gameRef = db.ref("game");



const landing = document.getElementById("landing");
const game = document.getElementById("game");

const nameInput = document.getElementById("nameInput");
const roomCodeInput = document.getElementById("roomCodeInput");

const makeRoomBtn = document.getElementById("makeRoomBtn");
const joinRoomBtn = document.getElementById("joinRoomBtn");

const roomCodeDisplay = document.getElementById("roomCodeDisplay");
const cardEl = document.getElementById("card");
const turnEl = document.getElementById("turn");
const playersEl = document.getElementById("players");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// Game state
let roomRef;
let playerId;


// Player identity
//const playerId = "player-" + Math.random().toString(36).slice(2, 8);
//let playerName = null;
//let playerScore = 0;

// Cards
const cards = [
  "Will we be friends in ten years?",
  "What personal demon are you in denial about?",
  "What is something you like about me that other people just don’t appreciate?",
  "Tell us about a time you set something in motion and left the fallout for others to deal with.",
  "What’s something you think that I get away with, but that you never could?",
  "What’s something you’ve always done— and only realized as an adult that it was weird?",
  "If you had to eat one delectable part of my delicious body, what part would you choose?",
  "When was the last time you lost your cool? What happened? How do you feel about it now?",
  "Describe me in three words from a language that you do not speak well.",
  "What’s a grand gesture you tried to save or repair a relationship?",
  "Have you ever been fired? If so, what for? If not, why not?",
  "What’s something you understand about your parents now that you’re grown up? Do they know you know?",
  "Describe a time when you really thought you might die.",
  "Our minds have traded bodies. What’s the first thing you’re going to do in my body?",
  "Have you ever ghosted someone you were close with?",
  "Tell us what you wish you’d said during your last breakup, but didn’t.",
  "What’s something about your personal hygiene that you could be more rigorous about?",
  "Tell us what you do to annoy your partner on purpose.",
  "What’s something you understand about your parents now that you’re grown up? Do they know you know?",
  "What’s a place where you feel at home where I would absolutely not fit in?",
  "Tell us about a time you got more wasted than was advisable.",
  "Assuming you were single, what would it take for you to get back together with your last ex?",
  "Do your best (or worst) impersonation of me. I promise to clap appreciatively.",
  "What is your worst coping mechanism? Defense mechanism?",
  "Have you broken any bones? What happened? Did you hear the crack?",
  "What’s something that you do that you wonder if other people do too, but don’t know for certain?",
  "Write me a new dating app bio in three sentences or less.",
  "I get a news alert that instantly makes me extremely happy—but no one else here cares. What’s the news?",
  "What’s my greatest physical asset? Don’t be shy.",
  "If I could help you with one unpleasant task, what would it be? What makes me the right choice for the job?",
  "Tell us about a time you observed me lying to someone else. Was it the right thing to do?",
  "We’re starting a business. What venture would we be most successful at as a pair?",
  "Tell me about a disagreement we had--and how we resolved it. Has it made us stronger?",
  "Describe the last time you were out of control.",
  "Have you ever dated a friend’s ex? Ever wanted to?",
  "Describe your worst bathroom- related disaster.",
  "What have you borrowed from me and still not returned? Can I have it back right now?",
  "Have you ever shared a piece of information that you realized too late was probably supposed to be a secret?",
  "Tell us about a time you were shot down romantically.",
  "I don’t know why you put up with me! Why do you keep me around?",
  "What have I ruined for you?",
  "Of all the things we do together, what is the best thing we do together?",
  "What did you get in major trouble for doing as a kid, and did you ever learn your lesson?",
  "Name a time you could have helped someone, but didn’t bother.",
  "What’s the worst thing you’ve ever had to do at work or school? How’d you handle it?",
  "Have you ever sat back and watched me confidently do something incorrectly?",
  "What’s something you did for free as a favor, that in retrospect, you really wish you’d charged for?",
  "Do you ever pity laugh at my jokes, even if you don’t think they’re funny?",
  "Would you ever see a band that you hated in concert, just to make me happy? Have you?",
  "What are your vices? Have they gotten better or worse over time?",
  "If you could have any body part of mine (for aesthetic, not medical, reasons), what would it be?",
  "What interest have you given up due to a community you didn’t want to be a part of?",
  "Tell us about a time you shot someone down romantically.",
  "If I were in a relationship with someone you hated, would you tell me?",
  "Do you think I’m capable of doing something you could never forgive me for?",
  "What’s a piece of pop culture that makes you suspicious of anyone who is a fan?",
  "Science has advanced, and now you and I are raising our five-year-old together. How are we doing? What is the kid like?",
  "If I killed somebody, under what circumstances would you help me cover it up?",
  "Someone who’s never met me asks you what I’m like. How do you answer?",
  "If we were to meet for the first time today, would we become friends?",
  "Have you ever stolen anything? What, and why? Do you still have it?",
  "Has your ego ever gotten in the way of apologizing or patching up a fight? Did you ever resolve it?",
  "What was your most embarrassing moment that transpired in public? Let’s all relive it!",
  "What is your favorite memory of our relationship?",
  "What’s a comment someone made about you that burned itself into your mind and forever altered your behavior?",
  "What is (or would be) the worst thing about having me as a travel companion?",
  "What’s something you avoid because you’re afraid you’ll enjoy it too much?",
  "Do you think you are more or less attractive than the average person? Why?",
  "What’s your most expensive mistake?",
  "We’re road tripping through the middle of nowhere. Do you have me drive or navigate?",
  "Have you ever done something with the goal of impressing specifically me?",
  "What’s the biggest lie you’ve ever come up with to cancel plans?",
  "How are we wrong for each other romantically?",
  "Describe my perfect life partner. Have I been on the right track to find this person?",
  "What’s an offense you’ve committed that could get you fired from work?",
  "Which of us do you think has committed more crimes?",
  "Describe the first time we met. What was your honest first impression of me?",
  "If I listed you as my job reference, what would you say about me? Would it all be true?",
  "What have you learned from me?",
  "How would your life be worse if we had never met?",
  "How long did it take you to get over your last ex? What did you do to get over it? Are you actually over it?",
  "Have you ever just let me win?",
  "What’s something I talked you out of doing, and it was the right call?",
  "What’s a habit, compulsion, or relationship you wish you could quit?",
  "Who’s the smartest person here? Make your case.",
  "When was the last timeyou cried? What happened?",
  "What do you wish you were as good at as me?",
  "You and I are dating. What’s going to break us up?",
  "Was your childhood happier than the average person’s?",
  "What’s something you’re self-conscious about? Are you working on it?",
  "Have you been blocked by any celebrities on social media? Tell us the story!",
  "If I didn’t have my current job, what do you see me doing?",
  "Every friendship involves give-and-take. Which one am I?",
  "If someone important to you said they’d stop seeing you unless you stopped seeing me, would you?",
  "What’s the longest period of time you could share a hotel room with me before never wanting to see me again?",
  "Have you ever seen me charm my way out of trouble?",
  "Tell us about a secret you had to keep from your loved ones.",
  "What would you never hire me to do?",
  "Describe a time when you really disappointed someone. Did you ever earn back their trust?",
  "If I were a chain restaurant, which one would I be and why?",
  "What problem do I think I’m successfully hiding from everyone, but is actually completely obvious?",
  "Tell us about a loophole you exploited until you got caught.",
  "What animal am I most like? Describe how this species and I are similar.",
  "How comfortable are we with one another? Give us an example.",
  "How many kids is too many kids? How many will you have?",
  "Is there a seemingly normal rule of society that you have never, ever followed?",
  "If someone were interested in dating me, what story would you tell them to see if they can handle me?",
  "If we were dying of thirst, how would we ration the last bottle of water between all of us here?",
  "What’s the meanest thing you’ve seen me do?",
  "Have you ever pretended to be someone else online? Who is this alter ego, and were you ever found out?",
  "Am I your type? What would I have to do to become more your type? I’m not hitting on you, we’re just talking.",
  "What do I think I’m great at, but I’m actually thoroughly average at?",
  "What’s the most terrible thing you’ve ever done for money?",
  "What is something you’re struggling with that we don’t know about?",
  "Have you ever intentionally scammed someone or misled them for personal gain?",
  "What am I stubborn about that’s making my life miserable?",
  "Your Google history has been made public. Which search is the hardest to explain?",
  "Have you ever talked about me behind my back? If yes, what did you say?",
  "Name a time you wished you could have helped me. What would you have done?",
  "Tell us about a time you deliberately did something to provoke your partner.",
  "Are there certain situations with me you avoid on purpose?",
  "When was the last time you lied to me? What was the lie?",
  "What advice do I need but don’t want to hear?",
  "Would Adult Me be attractive to Teenage You?",
  "What’s the most self-serving thing you’ve ever done?",
  "Have you ever had a pregnancy scare?",
  "Name a friend of mine you aren’t the biggest fan of. Is there anything you think I should reconsider about them?",
  "When do I demand the most attention?",
  "What’s your greatest moment of telling someone off? Can you reenact it for us?",
  "Have you ever had to apologize to someone for my behavior? Did the person accept the apology?",
  "Describe a time you lost a little bit of respect for me.",
  "Have you ever had to apologize to someone for my behavior? Did the person accept the apology?",
  "What’s a fact I can never seem to remember about you?",
  "What’s something that’s definitely not my problem, but somehow always becomes my problem?",
  "Have I ever done anything you think should have gotten me shitcanned?",
  "Have you ever pooped yourself as an adult?",
  "What’s the angriest you’ve ever been at me? What resolved it?",
  "What’s something you’re currently doing that you’ll stop if and only if you get caught?",
  "What would you never, ever want my help with?",
  "If we met up again after not seeing each other for five years, what’s the first thing we’d do together?",
  "Have you ever been genuinely scared of me?",
  "What’s the shallowest reason you’ve ever swiped left on a dating profile?",
  "What’s a bad habit that you picked up from me?",
  "How’s my drug and alcohol use? Do you think I could stand to do more, or less?",
  "What will you never understand about me?",
  "What’s something you learned from watching someone else fail spectacularly?",
  "What’s the most annoying thing I do without realizing it?",
  "Have you ever stabbed someone in the back or actively plotted against them?",
  "What’s the weirdest thing about me?",
  "If you found out I’d been embezzling from work, would you rat me out?",
  "What’s the closest we’ve ever come to parting ways forever? Did we fix the problem, or are we in denial?",
  "What’s something you know would make you a better person, but you just don’t want to do it?",
  "Do you think I care more or less about my reputation than most people? What’s your evidence?",
  "Rate my current outfit on a scale of 1-10. Is this better or worse than I usually look? Name a time you wished you could have helped me. What would you have done?",
  "What percentage of the time do you think I’m completely full of shit?",
  "If you were to kill me, how would you do it?",
  "What’s the most unhygienic thing you’ve ever seen me do?",
  "Do any of your friends not like me?",
  "Have you ever caught me in a lie? Did you confront me about it? Why or why not?",
  "Where are we, and what are we doing, in ten years? Are we still on our bullshit?",
  "How have you dishonored your parents?",
  "Have you ever become attracted to someone solely because you thought they might be into you?",
  "What’s something I do that you hate?",
  "What’s the most unreasonable thing you’ve ever completely lost your cool over?",
  "What do you think I need to just let go of? How would my life improve if I did?",
  "What’s a problem you let go on for too long before you addressed it?",
  "Have you ever broken off plans with me to be with someone else?",
  "What’s the most egregious lie you’ve ever told me?",
  "What’s a way you wish I took better care of myself? Do you think I ever will?",
  "Do you consider me a name-dropper? What’s the last name you heard me drop?",
  "If I died tomorrow, what regrets would you have about our relationship?",
  "What’s something I talk about so much that you never need to hear about it again? The topic has been sufficiently covered.",
  "What ethical boundaries are you happy to cross?",
  "Is there something that’s difficult to talk about among any of us here? Should we clear the air right now?",
  "Do you have any secrets you keep from me and me only?",
  "What’s the most embarrassing thing you’ve had to ask Google?",
  "Of the people here, whose job do you think pays the most? Do you think that person should Venmo each of us twenty bucks?",
  "What’s the meanest thing you’ve ever heard me say about someone else?",
  "What’s the biggest lie you’ve put on a résumé? Or seen on someone else’s?",
  "What’s something you think people should never joke about?",
  "What’s the most fundamental difference between us? Should we try to resolve it, or celebrate it?",
  "Have you ever done something you’re not proud of for money? (Outside of an official job.)",
  "What’s something you miss about your last serious ex?",
  "What have you done while intoxicated that you wouldn’t do again?",
  "What’s something about me that might seem creepy to others? Should I tone it down?",
  "Do you think I have a more dominant or more submissive personality? Do you have any examples?",
  "Do you think I have overachieved or underachieved?",
  "What’s an unpopular opinion you will never let go of?",
  "What am I too picky about?",
  "What thing do I love that you absolutely hate?",
  "Do I tend to be too easy on people, or too harsh?",
  "Do you think I ever stir up drama because I enjoy it? Name an example.",
  "What’s the most serious crime you’ve ever committed?",
  "What’s the disclaimer you give people before they meet me?",
  "What album title describes our relationship?",
  "Am I more of an unstoppable force or an immovable object?",
  "Who here is most likely to believe in supernatural, occult, or mystical stuff?",
  "If you suspected I had been replaced by a bodysnatcher, what question would you ask me to prove my identity?",
  "What’s something about which we have such different taste that if I like it, you already know you’ll hate it?",
  "What’s the weirdest compliment you’ve ever gotten?",
  "I can beam you to any single place in the world that you’ve never been. You have 24 hours to visit before being beamed home. Where to?",
  "I’m going to have permanent art deposited into my skin with needles. Pick a design for me. Bonus points if you draw it.",
  "Close your eyes before asking this question: What color are my eyes?",
  "Describe a way I’ve impacted your life, but that I may not know about.",
  "What’s the biggest fear you’ve overcome?",
  "We’re having a night in! Now’s your chance to make me sit and watch that thing you’re desperate for me to see. What is it, and what snack should I bring?",
  "Have you bragged about me to other people? What did you say?",
  "If you could instantly gain any skill, what would it be?",
  "What would you entrust me with above anyone else?",
  "What’s the strangest nickname you’ve ever been given?",
  "What dish do you slay every time you make it?",
  "What smell takes you back to childhood?",
  "What would be your cheesy, 20-second, game-show-contestant anecdote?",
  "What discontinued item would you give anything to bring back?",
  "When was the last time you laughed so hard you cried?",
  "What is something you know you’ll accomplish, no matter how many people tell you you can’t?",
  "What is your happiest memory from when you were a single- digit-aged child?",
  "What bad habit have you kicked?",
  "What are you rooting for me to achieve?",
  "What did you do on your very first date ever?",
  "Name a dream of yours that you’ve made come true.",
  "If I couldn’t reach an itch, would you do me a solid and scratch it?",
  "What’s the kindest thing I've ever done for you?",
  "What positive impact do you think you have on other people?",
  "What’s the hold music for your brain?",
  "What’s your favorite thing to waste money on?",
  "What’s something that completely changed you when you encountered it for the first time?",
  "What’s the best compliment you’ve ever been given?",
  "What’s something you’re proud of that not many people know about?",
  "On what totally meaningless topic could you write a whole dissertation?",
  "We’re getting matching jackets for this group. What do they look like, and what do they say on the back?",
  "What album have you spun the most times? Be honest. You can consult your music apps for verification.",
  "Do you always try to be honest with me, or do you tell me “that haircut looks great” -level white lies to be nice?",
  "What movie or TV character do I most remind you of?",
  "What snack do you turn to in times of emotional turmoil?",
  "Describe a time you accidentally mortified your parents as a child.",
  "What’s the best zinger you’ve ever come up with on the fly?",
  "What is the most comforting sound in the world?",
  "Have you ever been in love? How do you know?",
  "Describe your first real kiss. Really set the scene for us.",
  "What’s the most considerate present you’ve ever received? How did you react when you received it?",
  "Tell me your favorite joke. If I laugh, I drink.",
  "Does your hometown have a notoriously spooky landmark? A haunted barn, an abandoned hospital, Old Man Macready’s underwater sawmill...?",
  "What’s something you think I’m self-conscious about, but that you think I should stop stressing over?",
  "What’s the most fun you’ve ever had with strangers? Tell us the story.",
  "Do you think you are happier—or sadder— than the average person? Why?",
  "What movie title describes your last relationship?",
  "What movie or TV quote hits a little too close to home?",
  "If I were a perfume or cologne, what would my top, heart, and base notes be?",
  "What song is guaranteed to hit you right in the feels, no matter the time or place?",
  "What’s something you think people should appreciate more about you?",
  "If you could plan the perfect night with all of your friends, what would it entail?",
  "Aside from “moist”, what word can’t you stand the sound of?",
  "If I offered you $4,300 to call my parents every Sunday for a year and give them an update on my life, would you do it?",
  "Do you have any scars you want to show us? Pick one and tell us the story behind how you got it.",
  "If there were no barriers to entry, what job do you think you’d be amazing at?",
  "Tell us about a style choice from your past that you’re glad stayed in the past.",
  "Of the people here, who is overdue for some kind words? Let’s offer some good vibes now.",
  "What’s the weirdest way you’ve ever earned money? How much did you get?",
  "If you could live anyone else’s life, whose would it be?",
  "Have you ever been wildly overpaid? Who paid you and why was it so valuable to them?",
  "What song reminds you of me whenever you hear it?",
  "What makes you so much fun?",
  "What board game are you positive you could destroy us all at?",
  "What’s one healthy thing you do that most other people probably don’t? Surely there’s something.",
  "What’s the most common thing people praise or compliment you for?",
  "What does your ultimate Sunday look like?",
  "What’s the most kickass you’ve ever felt?",
  "What author’s work meant the most to you when you were younger? Do they still?",
  "If you were a Care Bear, what would be on your belly?",
  "If dogs and their owners are supposed to have matching personalities, what type of dog should I get?",
  "What’s something that you think is better the second time? A cover of a song, reheated leftovers...?",
  "Tell me a fact you think I don’t know. If I know it, you have to drink.",
  "What’s something you’ve done to try to be cool? Did you impress anyone?",
  "Would you trust me to pierce your ear, 80’s-sleepover style?",
  "What’s the title of your autobiography? Extra imaginary points if it includes a colon and a subtitle.",
  "If we were flying somewhere together, who would volunteer to sit in the middle seat?",
  "What song are you most ashamed to admit to me that you love? Reply in song.",
  "If someone did me wrong, would you: a) comfort me, b) distract me, or c) get revenge for me?",
  "Describe an act of petty protest you waged at work or school.",
  "What’s a situation that is always improved by my presence?",
  "What motto would you put on your family crest?",
  "What hidden talent do you suspect I have? What makes you think so?",
  "What smell is the most nostalgic for you?",
  "What’s the greatest fashion risk you’ve taken as an adult? How cool did you feel?",
  "What type of person have you always wanted to date, but never had the chance?",
  "What’s the worst date you’ve ever been on? Tell us all the juicy deets.",
  "What’s something everyone said you would regret, but you didn’t?",
  "How would Childhood You describe you now? Would that kid like you?",
  "Out of all of us, whose eyes would you like to see the world through for a day?",
  "What did you think you would hate, but ended up loving?",
  "Tell us about the one that got away.",
  "What’s the bravest thing you’ve ever done?",
  "Fill in the blank: I don’t care if _________ is for kids, I will still love it until I die. Defend your position.",
  "How many seconds is the ideal hug? Should we all test your hypothesis?",
  "Pay me a sincere and specific compliment.",
  "What’s the first app you open when you wake up in the morning?",
  "What are you anxious about? Can we reassure you?",
];

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 4 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

makeRoomBtn.onclick = async () => {
  const name = nameInput.value.trim();
  if (!name) return;

  const code = generateRoomCode();
  await db.ref("rooms").child(code).set({
  card: "click to begin!",
  currentTurn: null,
  players: {},
  turnOrder: {}

});

  joinRoom(code, name);
  
};

// --- JOIN ROOM ---
joinRoomBtn.onclick = () => {
  const name = nameInput.value.trim();
  const code = roomCodeInput.value.trim().toUpperCase();
  if (!name || !code) return;

  db.ref("rooms").child(code).once("value", snap => {
    if (!snap.exists()) return alert("Room not found");
    joinRoom(code, name);
  });
};

function joinRoom(code, name) {
  playerId = db.ref().push().key;
  roomRef = db.ref("rooms").child(code);

  roomCodeDisplay.textContent = `room ${code}`;

  roomRef.transaction(state => {
    if (!state) return state;

    state.players = state.players || {};
    state.turnOrder = state.turnOrder || {};

    state.players[playerId] = { name, score: 0 };
    state.turnOrder[playerId] = true;

    if (!state.currentTurn) state.currentTurn = playerId;

    return state;
  });
  roomRef.child("players").child(playerId).onDisconnect().remove();
  roomRef.child("turnOrder").child(playerId).onDisconnect().remove();
  //roomRef.child("currentTurn").onDisconnect().remove();

  landing.hidden = true;
  game.hidden = false;

  if (!roomRef) {
  console.error("roomRef not set");
  return;
}
listenToGame();
}

function listenToGame() {
  roomRef.on("value", snap => {
    const state = snap.val();
    if (!state) return;

    const players = state.players || {};
    const turnOrder = state.turnOrder || {};
    const turnIds = Object.keys(turnOrder);

    const currentTurn = state.currentTurn;

    // If no players, nothing to do
if (Object.keys(players).length === 0) {
  roomRef.update({
    currentTurn: null,
    deckIndex: 0
  });
}

// If currentTurn is invalid (player left)
if (!state.currentTurn || !turnIds.includes(state.currentTurn)) {
  roomRef.child("currentTurn").transaction((current) => {
    // Only fix if still invalid
    if (current && turnIds.includes(current)) return current;
    return turnIds[0]; // first remaining player
  });
  return;
}

    // Card
    cardEl.textContent = state.card || "—";

    // Turn text
    if (turnIds.length > 0) {
      const idx = turnIds.indexOf(currentTurn);
      const next = turnIds[(idx + 1) % turnIds.length];
      const a = players[currentTurn]?.name || "?";
      const b = players[next]?.name || "?";
      turnEl.textContent = `${a} asks ${b}:`;
    }

    // Buttons
    const myTurn = currentTurn === playerId;
    yesBtn.disabled = !myTurn;
    noBtn.disabled = !myTurn;

    // Players list
    playersEl.innerHTML = "";
    Object.entries(players).forEach(([id, p]) => {
      const div = document.createElement("div");
      div.className = "player";
      if (id === currentTurn) div.classList.add("active");
      div.textContent = `${p.name}: ${p.score || 0}`;
      playersEl.appendChild(div);
    });
  });
}
/*
gameRef.child("players").on("value", (snap) => {
  const players = snap.val();

  // No players left → reset game
  if (!players || Object.keys(players).length === 0) {
    gameRef.set(null);
  }
});*/

yesBtn.onclick = () => advanceTurn(false);
noBtn.onclick = () => advanceTurn(true);

function advanceTurn(addPoint) {
  roomRef.transaction(state => {
    if (!state || state.currentTurn !== playerId) return state;

    const ids = Object.keys(state.turnOrder || {});
    const idx = ids.indexOf(playerId);
    const next = ids[(idx + 1) % ids.length];

    if (addPoint) {
      state.players[next].score =
        (state.players[next].score || 0) + 1;
    }

    state.card = cards[Math.floor(Math.random() * cards.length)];
    state.currentTurn = next;

    return state;
  });
}
  /*// --- ON DISCONNECT CLEANUP ---
  const playerRef = gameRef.child("players").child(playerId);
  const turnOrderRef = gameRef.child("turnOrder").child(playerId);
  playerRef.onDisconnect().remove();
  turnOrderRef.onDisconnect().remove();

  // Show game screen
  landing.classList.add("hidden");
  gameScreen.classList.remove("hidden");
};

// --- LISTEN TO GAME STATE ---
gameRef.on("value", (snapshot) => {
  const state = snapshot.val() || {};
  const players = state.players || {};
  const turnOrder = state.turnOrder || {};

  const turnIds = Object.keys(turnOrder);

  if (turnIds.length === 0) {
    // No players at all
    turnEl.textContent = "Waiting for players...";
    nextBtn.disabled = true;
    resetBtn.disabled = true;
    cardEl.textContent = "Draw a card to begin!";
    return;
  }

  // Fix currentTurn if invalid or missing
  let currentTurn = state.currentTurn;
  if (!currentTurn || !turnIds.includes(currentTurn)) {
  currentTurn = turnIds[0];
  gameRef.child("currentTurn").set(currentTurn);
  return;
  }

  
*/
  // Display player list
 /* playersEl.innerHTML = "";

// Create a div for each player
Object.values(players).forEach((p) => {
  const playerDiv = document.createElement("div");
  playerDiv.className = "player";

  playerDiv.textContent = `${p.name}: ${p.score || 0}`;

  playersEl.appendChild(playerDiv);
});
*/
/*
  // Display card
  cardEl.textContent = state.card || "Draw a card to begin!";

  // Compute next player
  const idx = turnIds.indexOf(currentTurn);
  const nextPlayerId = turnIds[(idx + 1) % turnIds.length];

  // Get names (fallbacks just in case)
  const currentName = players[currentTurn]?.name || "Someone";
  const nextName = players[nextPlayerId]?.name || "Someone";

  turnEl.textContent = `${currentName} asks ${nextName}:`;

  // Button enable logic stays the same
  const myTurn = currentTurn === playerId;
  yesBtn.disabled = !myTurn;
  noBtn.disabled = !myTurn;
  resetBtn.disabled = !myTurn;
});


// --- NEXT CARD BUTTON ---
yesBtn.onclick = () => {
  gameRef.transaction((state) => {
    if (!state) return;

    const turnOrder = state.turnOrder || {};
    const players = state.players || {};
    const turnIds = Object.keys(turnOrder);

    if (state.currentTurn !== playerId || turnIds.length === 0) return state;

    const idx = turnIds.indexOf(playerId);
    const nextPlayer = turnIds[(idx + 1) % turnIds.length];

    return {
      card: cards[Math.floor(Math.random() * cards.length)],
      currentTurn: nextPlayer,
      players,
      turnOrder
    };
  });
};
noBtn.onclick = () => {
  gameRef.transaction((state) => {
    if (!state) return;

    const turnOrder = state.turnOrder || {};
    const players = state.players || {};
    const turnIds = Object.keys(turnOrder);

    if (state.currentTurn !== playerId || turnIds.length === 0) return state;

    const idx = turnIds.indexOf(playerId);
    const nextPlayer = turnIds[(idx + 1) % turnIds.length];

    //  Add point to next player
    players[nextPlayer].score =
      (players[nextPlayer].score || 0) + 1;

    return {
      card: cards[Math.floor(Math.random() * cards.length)],
      currentTurn: nextPlayer,
      players,
      turnOrder
    };
  });
};

*/
