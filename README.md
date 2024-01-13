# DagBall

Dagball works in desktop browsers in windows so far (cuz my GPU library TinyGlsl does not yet work in linux and android TODO) including chrome, firefox, brave, edge, and lowest lag in Opera GX. Ap.js is my new GPU language that can do over a teraflop/sec in a good gaming computer. To start with, the screen is moving through alot of dimensions but remains flat. Balls move on the screen. So if 3 balls are in a straight line on screen, they are also in a straight line in the many dimensions. Second, player created content (by me and a little from GPT4 so far) that u type or copy/paste in to the textarea on the left while a circle is selected (its that circle's custom GPU code) chooses how much hill (potentialEnergy) to add to the whole game state, for every possible game state such as every possible float[300]. with numbers in some range like plus/minus 100. Third, any shapes you build automatically come to life since every possible state (approximated by computing (numBallsOnScreen * 301) potential-energies in parallel and merging into a 300 dimensional gradient to update position by dt * velocity and update velocity by -dt * gradient(position) and by a velocityDecay that some code such as the pinball bumpers vary per dimension, and in that case it was decayed to be a constant and it instead used differential equations to define its next state over time, bump ball out expand and contract fast then wait for next bump) of them is computed in physics, and you have already defined which states of it are more and less likely by how much hill is there. Balls tend to be found lower in height.

Video: <a href="https://www.youtube.com/watch?v=HNkWuHJ5xwI">https://www.youtube.com/watch?v=HNkWuHJ5xwI</a>

(TODO massively multiplayer) browser game of balls rolling on curvy hills and valleys that reshape themselves depending on ball positions. Its a constant (TODO sparse-dimensional) scalar-field of (TODO a multiverse of possible TinyGLSL GPU code to define new curves). U fade in new curve patterns by changing their _exists and _isInView vars 0 to 1.
<br><br>
<b>Play now</b> (early experiment, no player created content, not a huge game world yet, single player):<br>
<a href="https://memecombinator.io/experiments/Dagball009_physicsWorksTodoCreativeGameDesignOfTheEquationsAndTuning_2023-9-12-2pET.html">https://memecombinator.io/experiments/Dagball009_physicsWorksTodoCreativeGameDesignOfTheEquationsAndTuning_2023-9-12-2pET.html</a>
<br><br>
Does not work in mobile browsers yet, but they do support webgl (webgl2? cuz im using webgl2) so should be able to. When thats added, can hook in gyroscope and multitouchscreen as some of the input dimensions. Also maybe hook in AugmentedBalls that sees tennis balls in your hands or rolling around or being thrown, using webcam and canvas, a ~100kB file, you can play with here: https://humanai.net/phonegame/
<br><br>
Screenshot of the game, and I added text. Video of it moving: <a href="https://www.youtube.com/watch?v=Nh9qTC_7d-A">https://www.youtube.com/watch?v=Nh9qTC_7d-A</a><br>
<img src="https://raw.githubusercontent.com/benrayfield/DagBall/main/doc/pic/2023-9-12-230pET dagball intro screen.png">
<br><br>
This game is a single equation, kind of, if you count every possible GPU code (TinyGLSL does a teraflop in browser at low lag) as a dimension, and other dimensions. So far its just 1 GPU code at a time, but I'm going to make it so many players can add new GPU code while playing the game, and it will still be a smooth surface during gradually adding it (hashOfTheCodeEtc_exists and hashOfTheCodeEtc_isInView and hashOfTheCodeEtc_normalDimension and hashOfTheCodeEtc_inputDimensionLikeFromGamepadOrMouseOrButton). As a DAG (Directed Acyclic Graph) each dimension has 0 or more child dimensions. Each dimension has a constant 2d display position that it tries to (in case of duplicates they push eachother out of the way, TODO) be displayed near, red, green, blue, any json content (such as GPU code, or text or image/jpg or code to paint the ByteRect canvas pixels directly using CPU, and has a list of child ids (hashOfTheCodeEtc). There is a recursive proofOfWork calculation I might start using if theres a spam or DenialOfServiceAttack problem, but its not needed if you just want to experiment with it on a few computers or locally. See dagnode.Dim.proofOfWorkRecurse .proofOfWorkLocal and .proofOfWorkSalt and .id. The max dimensions it can display at a time is about 1000 cuz webgl2 glsl has around that limit (might vary across computers? todo more testing). <a href="https://github.com/benrayfield/DagBall/blob/main/earlyExperiments/ConvfieldDemo3.html">ConvfieldDemo3.html</a> is a rule110 (which is turing complete) quasicrystal with each pixel (seen as squares of varying brightness) is a dimension, so 124x124=15376 dimensions, and it converges to approx the shape of rule110 in 2d (horizontal is space, vertical is time) using just CPU, and you can paint it with 2 mouse buttons. Since I can do 15376 dimensions live with CPU, I can do alot more with GPU, but I'm going for more complex patterns in fewer dimensions and keeping it to at most around 1000 dimensions in view at once cuz thats how GPU is optimized well. In the massively multiplayer game there might end up being millions billions or trillions of dimensions, each affecting how it curves and patterns of it bending when balls roll near it in 2d, to move around the higher dimensions. Each 2d area, as partially overlapping circles (its windowed there smoothly to only affect within the circle and affect 0 amount at circles edge smoothly, TODO) each with its own GPU code that gets combined into a single GPU code for multiple of them, with at most total around 1000 float vars (in the par/parr array, see example code). Calculus gradient is computed automatically by running a second GPU code of numVars+1 GPU threads to compute potentialEnergy as it is now (last index, the +1) and potentialEnergy with epsilon added to each dimension, then subtract one from the other and divide by epsilon to get the derivative in that dimension. So if theres 789 float vars in the GPU code (each named as its id/hashOfTheCodeEtc as its a DAG hash id), the calculus gradient of all of those are computed, and you see it bounce around and vibrate and reshape hills and valleys and curvy ditches and bridges and robot-arm-like curves etc (which will all be player created content, created and shared live while playing the game)... You will see and play on the sparse-dimensional constant heightmap of the multiverse of possible GPU codes, that players create and share while playing it, in potentially trillions of dimensions, but only at most around 1000 dimensions displayed at once per screen and things near the screen that could come on screen within a few seconds. A 1000 dimensional gradient is computed by 1001 GPU threads. If you have a 2000x1000 pixel screen, then it runs 2 million GPU threads to compute the scalar field (excluding balls) at each (y,x) position on screen. Its pretty fast for 500x500 on a nvidia 2080 super GPU which is a 10 teraflop card, that I've seen TinyGLSL do up to around 3 teraflops, and around that speed in chrome, brave, and firefox but some might be slower than others. TODO test and benchmark it on more computers. TODO reduce canvas resolution and stretch it using css. This might end up having 1 million simultaneous players. There might be a 3d version more like Miegakure later, but for now 2d display and 1000 dimensional physics and sparsely its going to be between a million to a trillion dimensions with player content added live. Player content is new dimensions that adds to potentialEnergy within a 2d circle at a constant y, x, and radius. The server will be mostly just to copy data in the peer to peer network, and the physics and graphics and network sync code will be in browser. The peers/servers will be just "dumb terminals", flipping the client/server model to server/client. The browser is the tool for number crunching and gameplay. BTW the curves can do neuralnets up to 1000 params. I've demoed that in another software (look in earlyExperiments dir here) called ForestCurveFit, which has numNodes^2+numNodes*numMathOps vars/scalars/params which is around 800 for 20 nodes and does very flexible curve fitting. The user created content will be able to include small neuralnets like that inside circles, but try to keep it to fewer dimensions cuz total vars of all circles in view has to be under around 1000. Circles partially overlap eachother to fit together like parts of an engine, gears, logic, compute bayes rule or neuralnets or artistic patterns or hills valleys or even just paint where you want constant height to be to roll around. Game state will sync between many computers mostly by moving vectors toward eachother gradually. Game state is only a vector, and GPU code and other content goes in the name of the dimensions (abbreviated as a hash id andOr local human readable name and content to hash also includes a preferredName but may have to be renamed locally cuz preferredName can have duplicates/collisions). This is gonna be an endless hackerspace for playing and making ball rolling games in a shared 2d space that you can paint new GPU code onto while playing. I learned to do this while making wikibinator203, to make a bunch of functions fit together. This is a simpler kind of pure-functions thats easier to optimize, not as tightly precisely defined, but I think I can scale it and avoid the players breaking the game by painting in broken GPU code etc. Its gonna be fun and you might learn some advanced math from it, but its not so much educational as you're gonna get schooled by a mix of cooperation and competition among many players moving the balls around and other balls moving as a result of the curves reshaping, in millions to trillions of dimensions, with at most 1000 dimensions in each view at once. Theres not alot of work left before can start making user created content, but the user created content will be most of the game. This game will fit in 1 html file, containing TinyGLSL and FullScreenCanvas, and 1 JSP file to run in Tomcat or a javascript file in nodejs or something like that. So just 2 files, for the basics.

<img src="https://raw.githubusercontent.com/benrayfield/DagBall/main/doc/pic/ForestCurveFit012_TinyGLSL.jpg">
<br><br>

<img src="https://raw.githubusercontent.com/benrayfield/DagBall/main/doc/pic/ConvfieldDemo3.png">
<br><br>
<img src="https://raw.githubusercontent.com/benrayfield/DagBall/main/doc/pic/crystalDefectV4.png">
<br><br>


TODO...[[[
	Dagball have "ports" their own numbers they overlap try to make my port and your port equal scalar. Display these as small balls of varying brightness and when mouseover one it shows which others its connected to. Connection strength falls gradually to 0 (max 1?) When farther away, so can sim it sparsely. Might get jumpy when get near it again, but try for smoother by gradually varying connectionstrength so it has a few seconds to pull together.
Put each ground object in a circle and window it smoothly down to exactly 0 near edges.
Display its ports on its edges around circle. Maybe display connections as line between 2 portballs on 2 circles edges. Maybe allow the portballs to move around circle edge depending what its close to on screen.
Name each ground object ala circle with ports.
Maybe have 2 layers of ground, one of scalarvars and one of ports, so many ports can be connected with linear not squared edges. Maybe require varatyx be inside any groundcircle that connects to it?
Connected ports are a simple relation, just tries to be the same scalar. Put leastsquares on their diff.
Also hook in music tools webaudioapi (fix lag andor jsoundcard option thru ajax) as some of the circles.
Other circles mught have wikib fns.
In tinyglsl the total ports computed on one screen (and nearby) must be at most 1024 or 999 etc. They dont overlap.
Or half or 1/3 of that cuz need weights of their connections to leadtsquares to include in unified energyfunc.
Or, keep the 1000 vars and add the port leastsquares in cpu. Yes do it that way.
Include a chanceorweight var per groundcircle. When 0, that circle has no effect.
Make the varatyx be the weightedaverage of the ports its a connection between, so converges faster.
Name varatyx by its y x?
That way, the ptr to it can be defined in the groundcircle instead of externally.
Or maybe just put the port inside the circ to start with. Like plugging circuits together.
The chanceorweight var of the circle itself is at its center.
This can be edited together in mmg live by adding groundcircs from chance 0 smoothly up to 1. Remove is opposite.
Have 2 chanceorweight-like vars per groundcirc, one for dors the groundcirc exist, and another for is it inornear view.
Name each groundcirc by hash. Suffix of _exists and _inview and _var17 etc.
This is space of exponentially many sparse dimensional scalarfields.
Balls arent in that design yet. Define them here... scalarfield height aka poten at given y x is well defined and smoothly changes with view and editing the grounds in mmg sparsely. Theres 2 heights, one with, and one without, the leastsquares between ports. Try the one with ports first. Diff players can have diff views that update game state differently.
Sync later if far away.
A kind of groundcirc can be a sensor only, such as to display text like logging. Varatyx344_8744+" is the var value". Etc.
A groundcirc could  also be just constant data such as a pic, text, fn, etc.
A sensor might have code that writes byterect to display custom graphics.
A  varatyx kind could be an input, such as gamepad axis button microphone etc, but careful to not instantly pull other ports to that.
Make varatyx each be named like y5695x322 and be nxn pixel squares so can keep them in array. Such as 4096x4096? At such grid cells theres an input var and a normal var. But might want the input vars named by publickey or arbitrary string? Also maybe a third one at grid cell for the weightedave of ports there. And velocity vars.
Or maybe make the vars sparse 2d?
256x256 per screen should be more than enuf.
Or could binheapindex them in 2d so each 2 bits chooses a square in a square, but that creates problems with overlap in display.
Should the ground be rectangles or circles?
4 kinds of grid squares: normaldimension inputdimension groundexists groundisinview.
Problem, there can be multiple portsvarsetc at same 2d location.
Solve that by each is a small ball with a target 2d location and is attracted to there but wont overlap other such balls
The _exists var per groundcirc, maybe it should be useable also as a normaldimension by higher level groundcircs, so the dag. _exists of parent must be at most the _exists of each child. Hyperspherenet does that with sound, kind of.
The dag defines forest of dimensions but not positions and velocities in them.
Or if it does then thats a higher dag layer or separate layer. Maybe an avetime stddevtime and partial map of var to scalar, would be a useful node. Yes, do that. It will be how the network syncs softly not lockstep.

2023-9-14 https://twitter.com/benrayfield/status/1702316774505525621
Math question (need for game): Each var is at a 2d circle, and above that circles inside circles, and in that higher layer theres a scalar field of those dimensions its in, then can sparsely define variable-dimension scalar field of POSITION. How to optimize velocity sparsely?
Planned solution: The scalar vars of each ground-circle are not shared with other circles but have a weight between pairs of them across ground-circles to pull them toward the same scalar. Each ground-circle has an _exists var and a _isInView var. Multiverse of state space.
]]]
