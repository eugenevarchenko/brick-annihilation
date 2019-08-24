// Initializing canvas

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// Keyboard controls

let leftKeyPressed = false;
let rightKeyPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
	if (e.key == 'Left' || e.key == 'ArrowLeft') {
		leftKeyPressed = true;
	} else if (e.key == 'Right' || e.key == 'ArrowRight') {
		rightKeyPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.key == 'Left' || e.key == 'ArrowLeft') {
		leftKeyPressed = false;
	} else if (e.key == 'Right' || e.key == 'ArrowRight') {
		rightKeyPressed = false;
	}
}

// Drawing a ball

let x = canvas.width / 2;
let y = canvas.height - 50;
let dx = 4;
let dy = -6;
let radius = 15;

function drawBall() {
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2);
	context.fillStyle = '#0095DD';
	context.fill();
	context.closePath();
}

// Drawing a paddle

let paddleWidth = 230;
let paddleHeight = 25;
let paddleXPosition = (canvas.width - paddleWidth) / 2;

function drawPaddle() {
	context.beginPath();
	context.rect(paddleXPosition, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	context.fillStyle = '#FF0000';
	context.fill();
	context.closePath();
}

// Drawing bricks

let brickRowCount = 6;
let brickColumnCount = 10;
let brickWidth = 100;
let brickHeight = 20;
let brickPadding = 10;
let brickLeftOffset = 50;
let brickTopOffset = 75;

let bricks = [];

for (let column = 0; column < brickColumnCount; column++) {
	bricks[column] = [];

	for (let row = 0; row < brickRowCount; row++) {
		bricks[column][row] = {x: 0, y: 0, status: 1};
	}
}

function drawBricks() {
	for (let column = 0; column < brickColumnCount; column++) {
		for (let row = 0; row < brickRowCount; row++) {
			if (bricks[column][row].status == 1) {
				let brickXPosition = (column * (brickWidth + brickPadding)) + brickLeftOffset;
				let brickYPosition = (row * (brickHeight + brickPadding)) + brickTopOffset;

				bricks[column][row].x = brickXPosition;
				bricks[column][row].y = brickYPosition;

				context.beginPath();
				context.rect(brickXPosition, brickYPosition, brickWidth, brickHeight);
				context.fillStyle = '#00D000';
				context.fill();
				context.closePath();
			}
		}
	}
}

function brickCollision() {
	for (let column = 0; column < brickColumnCount; column++) {
		for (let row = 0; row < brickRowCount; row++) {
			// Using variables in order to simplify the condition in the 'if' statement below

			let brick = bricks[column][row];
			let collisionCondition = x + radius > brick.x && x - radius < brick.x + brickWidth && y + radius > brick.y && y - radius < brick.y + brickHeight;

			if (brick.status == 1) {
				if (collisionCondition) {
					brick.status = 0;
					dy = -dy;

					score += 100;

					if (score == (brickColumnCount * brickRowCount) * 100)  {
						alert('WELL DONE, MY FRIEND! YOU DID A GREAT WORK!');
						document.location.reload();
					}
				}
			}
		}
	}
}

// Counting score

let score = 0;

function showScore() {
	context.font = '30px Aleo';
	context.fillStyle = '#FFFFFF';
	context.fillText(`SCORE: ${score}`, 10, 30);
}

// Lives remaining

let lives = 3;
 
function showLives() {
	context.font = '30px Aleo';
	context.fillStyle = '#FFFFFF';
	context.fillText(`LIVES: ${lives}`, canvas.width - 120, 30)
}

// Adding movements

function move() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Calling draw functions

	drawBricks();
	drawBall();
	drawPaddle();
	showScore();
	showLives();
	brickCollision();	

	x += dx;
	y += dy;

	// Paddle collisions

	if (x + dx > canvas.width - radius || x + dx < radius) {
		dx = -dx;
	}

	if (y + dy < radius) {
		dy = -dy;
	} else if (y + dy > canvas.height - paddleHeight) {
		if (x > paddleXPosition && x < paddleXPosition + paddleWidth) {
			dy = -dy;
		} else {
			lives--;

			if (lives == 0) {
				alert('ROT IN HELL, BALLIE!');
				document.location.reload();
			} else if (lives > 1) {
				alert('HA-HA! ONE MORE STEP TO THE DEATH! LET IT BE FASTER!');

				x = canvas.width / 2;
				y = canvas.height - 50;
				dx = 6;
				dy = -9;

				paddleWidth = 160;
				paddleXPosition = (canvas.width - paddleWidth) / 2;
			} else {
				alert('ONE LIFE REMAINING! THIS IS YOUR LAST CHANCE! HA-HA-HAA!');

				x = canvas.width / 2;
				y = canvas.height - 50;
				dx = 8;
				dy = -12;

				paddleWidth = 100;
				paddleXPosition = (canvas.width - paddleWidth) / 2;
			}
		}
	}

	// Paddle movement

	if (leftKeyPressed && paddleXPosition > 0) {
		paddleXPosition -= 13;
	} else if (rightKeyPressed && paddleXPosition < canvas.width - paddleWidth) {
		paddleXPosition += 13;
	}

	requestAnimationFrame(move);
}

move();



