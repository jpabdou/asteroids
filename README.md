<h1>Asteroids</h1>

---

<h2>What is this project?</h2>
An asteroids game app made with React, react-konva, and JavaScript deployed through GitHub Pages in <a href="https://jpabdou.github.io/asteroids/">here</a>. This game was a pair programming effort between me and a friend.

---

<h2>How do I play?</h2>

You start with your ship with 3 lives at the center of the screen oriented downward with 3 asteroids (at Level 1) in the space around you. Controls are with the following keys, which can be pressed once or held down for inputs:

<ul> 
<li>Fire a bullet with the Spacebar key. You can only have 3 bullets on-screen at a time.
<li> Rotate counterclockwise with the Left Arrow key.
<li> Rotate clockwise with the Right Arrow key.
<li> Accelerate with the Up Arrow key.
<li> Deccelerate with the Down Arrow key.
<li> Restart the game with the Enter key.
</ul>
---

<h2>Things to keep in mind</h2>
<ul>
<li>Every 10 points you earn will increase your level and the minimum amount of on-screen asteroids by 1.

<li>Asteroids split into two smaller halves upon being shot by bullets and the halves travel faster. This splitting occurs twice so one asteroid breaks into two halves and each of these halves can break into two even smaller halves.

<li>Be careful of asteroid collisions with your ship and keep an eye on your ship lives! It's very easy to miss the explosion from an asteroid collision.  

<li>You gain back 1 life each time you reach a level that's a multiple of 3. So don't lose hope!  
</ul>
