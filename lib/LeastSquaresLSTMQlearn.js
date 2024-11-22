/* Ben F Rayfield offers LeastSquaresLSTMQlearn under opensource MIT license.

I think a swarm of small simple low lag qlearners running in browsers in a peer to peer network are a good way to organize a system.
They're in theory fast enough to handle twitching moves in FPS games, unlike LLMs, and they can learn to operate simple controls you
custom build. They can also in theory teach eachother by choosing the reward functions, possible actions, etc, of eachother.

GPU JS wanna build+test on my games+lambdas: reward(invec)->num. qscoreLSTM(invec,weights)->outvec. invec=observes.
outvec = 1+actions approx of qscore(invec) & qscore(action[n](invec))[0]. trainData is weightedSet of invecs.
Learn by min weight*(reward+.99*max(nextQ) - Q)^2 #AGI

Its important to keep reward small (near 0 but can be positive or negative) and spread it out if bigger,
cuz unlike the forward calculated qscore update of https://en.wikipedia.org/wiki/Q-learning , the least squares form
of qlearning will try to avoid big jumps in reward down (as usual) but also avoid big jumps in reward up (despite they are good),
cuz it wants weight*(reward+.99*max(nextQ) - Q)^2 to be near 0 for every [invec,weight] piece of training data.
To do this timelessly (not sequentially) it has to be a scalarField, not a sequence of steps of updating qscore.
So if you have a big reward to give, put it in invec and give the reward a little at a time, subtracting from
a certain part of invec and adding to reward (a certain other part of invec, then zeroing that part of invec as its instant reward)
and dont let the actions add to where such gradual reward is stored in invec.
Also actions are not the only actions. Theres a world update action between them which may be deterministic or nondeterministic,
so technically you could attach qscore to a button on your keyboard or joystick to train it live (if its fast enuf)
or have it computed deterministicly. Your keyboard and joystick etc would go in part of invec.
So it will alternate between LeastSquaresLSTMQlearn chooses an action vs world updates invec (game state).
The main reason for the "world updates invec (game state)" parts is so the actions can be simpler to just record
that an action is about to be done without having to call the world sim just to check what happens right after in an action
that wasnt chosen but is 1 action deep from something that was chosen.

Use GPU.js until can get TinyGLSL andOr Ap.js to use bigger data. Will probably use GPU.js until I scale up my GPU optimized js
libraries Ap.js and TinyGLSL.js which so far can only use as much memory as fits in a single GPU core copied to all cores at once
and from there they have a few kB of local memory. By building a js library optimized in this specific kind of AI model ONLY
(least squares neural qlearning by recurrent LSTM loop unrolled n steps deep) I should in theory be able to train neural qlearning
at live gaming speed for small problems?? You only need 1 observation to train on all possible actions 1 step deeper, without running
the world sim on each of those next possible states, cuz each next state would trivially copy or add the action into the inputs,
such as "pushed the left button .3 amount".

RecurrentJava is a CPU-only library for training LSTMs (very slowly). I had ported part of it to OpenCL in java but then moved
on to javascript. Maybe I'll use some of that learning algorithm to train LSTM for least squares neural qlearning in browser?
https://github.com/evolvingstuff/RecurrentJava/blob/master/src/model/LstmLayer.java

GPT4 believes there are no neural qlearning libraries for browser, that do the learning, not just a compiled output of a different
system. I guess they couldnt handle it. I still wanna make one, but have to do more work on my game first so it has something to learn.

Weights: 2*lstmNodes numbers of starting state. 4*lstmNodes*(lstmNodes+1) weights for 4 inputs and 1 bias.
Node states: 2*lstmNodes.
Sparse compute state: action[a](invec)->otherInvec transforms for the a possible actions. outvec.length==1+a.
Inputs: invec
Outputs: outvec

3 main tools: dagball, axgob, qlearnLSTM.
This will intheory goviral, Kfactor >> 1, after I demo it for a few things that are useful and fun for me. It wont get nearly as big as a LLM
but it will fill a niche for automation of lots of small tasks. A bunch of them working together in opensource peer to peer thru
browsers might learn to do bigger things together, including using tools the qlearnLSTMs build. So 3 main tools: dagball, axgob,
qlearnLSTM. It will be 1 recurrent layer of LSTM nodes including ins and outs with simple edges between ins -> LSTM -> outs,
or maybe a feedforward sigmoid layer ins -> sigmoids -> LSTM -> sigmoid -> outs, etc. Also a starting state of LSTM is part of
model params. ins and outs only happens once. LSTM recurrent happens n times (maybe 10-100). Its a function of
i ins (and model weights, which is in the thousands) to o outs. Use GPU.js or expandedToBigMem(Ap.js)OrTinyGLSL for matmul.
this qlearn object will have state of such weights and a set of trainingData. Each trainingData will
have 1+numPossibleNextStates inVecs (UPDATE: just use action(invec) to generate those, dont store them).
each inVec is whatever the qlearnLSTM would observe at that game state, which may be
whole game state (if game is simple) or partial game state (if game is more complex). Usually it will be a partial game state.
Each trainingData will also have a learnRate aka the weight of how much this trainingData should influence learning.
Thats multiplied by globalLearnRate. Normally trainingData learnRate is 1. If trainingData does not exist it is 0.
For dagball this will be some or all of the game state vectors, including position and velocity for each dimension in
dagball thats included, and reward will be defined by the average y of certain balls so lift the balls to win, and it can
control certain dimensions, balls, rocks, etc. Those details will be worked out after the qlearnLSTM js object is working
on simpler problems. I want this qlearnLSTM to become a general tool I use for having AI get things done that I define by
a qscore, as it chooses various movement in a small subset of the dimensions. For example, to play a simple dagball game
level. For example, to learn to call lambda on lambda to find/create lambda to solve a given goalFunc as a lambda,
in axgob or wikibinator203, with a Float32Array(20) attached to each lambda that the qlearnLSTM can choose to read and
write (as a 20d sphere surface or sumsToOne etc per 20 floats) however it wants, move them around like icons, etc.
It will be able to read and recursively limit how much compute time to spend on certain lambda calls. It will be able
to edit GPU code the same way i can in Ap.js.

If there was a browser javascript library for a gaming-low-lag AI that learns (live) to choose actions in a float[100]
state space by qlearning, what would u use it for? Moving stuff around the page? Canvas graphics? NPCs in games?
A swarm of pacmans? Simulated animals?
By using recurrent LSTM as the model of Qscore, instead of the usual feedforward sigmoid neuralnet, in theory it
will be much more skilled at recursion and controlling what info flows from and to where.
If you need to store more info than float[100] then have it learn to read and write an external memory
and operate various tools with simple controls.
[ 2024-4-14 Its very incomplete, mostly just an API with no implementation, but this is something I need for my dagball
game and plan to experiment with it calling lambda on lambda to find/create lambda as icons on screen it can
drag like any other player can. https://github.com/benrayfield/DagBall/blob/main/lib/LeastSquaresLSTMQlearn.js ]
In theory, least-squares qlearning will have far less overfitting than sequential qlearning cuz it has an
exact loss function for correct qlearning, given any set of observed game states. That loss function is sum
of weightOfObservedState*(reward+discount*max(nextQ) - Q)^2.
Discount is usually around .98, and reward usually around plus/minus .1 or .01?
Reward(state)->num. If you want to choose the reward after the state is known, then use 1 of the numbers
in state as reward and have reward(state) simply return that number
but dont let the AI actions set that number, only the world action set it.
Also, since least-squares-qlearning is timeless, the LSTM weights could be chosen by harmony-search or the usual
backprop or a variety of possible learning algorithms. Its just finding localMin in a high dimensional scalarField.
*/
QL = (()=>{
	const QL = {};

	/*some of this should go into LeastSquaresLstmQlearner or other classes. Game should be just the gameTree.

	//mostly or compltely immutable, except worldAction may be mutable
	//in that it may be a connection to a mutable external world or a deterministic sim.
	//playerActions is a [] list of js functions of Float32Array->Float32Array, same size (this.stateSize) array each time. Its invec->invec,
	//to transform game state to next game state, if that action is chosen, such as an action of "move in dimension5 +0.3 amount"
	//or "push button B".
	//inSize is Float32Array.length and the number of input floats that go into the qlearner neuralnet.
	//outSize is 1+actions.length. The first is qscore of the given invec. After that its each action, a transform of invec to invec.
	//rewardFunc(invec)->num is the reward in the sum of 1 weight*(reward+.99*max(nextQ) - Q)^2 per trainingData.
	//
	QL.Game = function(inSize, actionFuncs, rewardFunc){
		this.inSize = inSize;
		this.outSize = 1+actionFuncs.length;
		this.actions = actions;
	};
	*/
	QL.Game = function(firstState, playerActions, worldAction){
		this.firstState = firstState;
		this.stateSize = firstState.length;
		this.playerActions = playerActions; //done by the AI or human player on even/odd turns (TODO who goes first?)
		this.worldAction = worldAction; //done by the game world on odd/even turns (TODO who goes first?). Human and other AI players may go in here.
	};

	//mutable.
	//rewardFunc(state)->num. state is a Float32Array(game.stateSize).
	QL.LeastSquaresLstmQlearner = function(game, rewardFunc){
		this.game = game;
		this.rewardFunc = rewardFunc;
		//map of Float32Array to weight as in weight*(reward+.99*max(nextQ) - Q)^2.
		this.trainingData = new Map(); //for timeless/leastSquaresBased experience-replay
	};
	//given a Float32Array size of game.stateSize, returns a Float32Array size of 1+game.playerActions.
	//The 1+ is the neural estimated qscore of that invec. The other game.playerActions are the neural approximated qscores of of each
	//of those next states in the possible case of doing those actions even though it wasnt necessarily done here.
	QL.LeastSquaresLstmQlearner.prototype.predict = function(invec){
		throw new Error('TODO');
	};
	//returns an integer 0 to game.playerActions.length-1.
	QL.LeastSquaresLstmQlearner.prototype.chooseAction = function(invec){
		throw new Error('TODO');
	};

	QL.LeastSquaresLstmQlearner.prototype.decayAllTrainingDataWeights = function(mult){
		for(var state in this.trainingData){ //FIXME changed to Map instead of {} so update this code
			this.multiplyTrainingDataWeight(state,mult);
		}
	};
	
	QL.LeastSquaresLstmQlearner.prototype.addToTrainingDataWeight = function(state,addToWeight){
		this.setTrainingDataWeight(state,this.trainingDataWeight(state)+addToWeight);
	};
	
	QL.LeastSquaresLstmQlearner.prototype.multiplyTrainingDataWeight = function(state,multiplyWeightBy){
		this.setTrainingDataWeight(state,this.trainingDataWeight(state)*multiplyWeightBy);
	};
	
	//weight of 0 removes the trainingData. Any nonzero weight adds it. updates to that weight.
	//Used in the loss function of sum of weight*(reward+.99*max(nextQ) - Q)^2 for all trainingData together as experienceReplay.
	QL.LeastSquaresLstmQlearner.prototype.setTrainingDataWeight = function(state,weight){
		if(weight == 0) delete this.trainingData[state]; //FIXME changed to Map instead of {} so update this code
		else this.trainingData[state] = weight; //FIXME changed to Map instead of {} so update this code
	};
	
	QL.LeastSquaresLstmQlearner.prototype.trainingDataWeight = function(state){
		return this.trainingData[state] || 0; //FIXME changed to Map instead of {} so update this code
	};

	//search for exactly equal Float32Arrays by content and sum their weights in this.trainingData
	QL.LeastSquaresLstmQlearner.prototype.mergeDupTrainingData = function(){
		throw new Error('TODO');
	};

	//TODO optimize by GPU.js first, then by TinyGLSL.js andOr Ap.js (which uses TinyGLSL.js) which are 2024-4-13 my js GPU libraries (WebGL2_GLSL) but are not scaled up yet
	//and only support as much memory as fits in 1 GPU core (up to about 1000 floats, a GLSL limit, despite GPU core could hold maybe 10 times more,
	//but shaders are supposed to be small and simpler, even though its not specific to shaders, it compiles to shaders so has that limit,
	//so Ap.js and TinyGLSL can have around as much memory as fits in 1 GPU core, copied to all GPU cores at once, plus each core can then use local memory
	//differing from the other GPU cores that it derives from that many times copied few kB of memory AND derived from its int thread id similar to in OpenCL.
	//
	//RecurrentJava is a CPU-only library for training LSTMs (very slowly). I had ported part of it to OpenCL in java but then moved
	//on to javascript. Maybe I'll use some of that learning algorithm to train LSTM for least squares neural qlearning in browser?
	//https://github.com/evolvingstuff/RecurrentJava/blob/master/src/model/LstmLayer.java

	return QL;
})();