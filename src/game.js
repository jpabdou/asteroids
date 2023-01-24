let initState = {
    asteroids: [],
    ship : {},
    bullets: [],
    height: 600,
    width: 600,
    score: 0,
    lives: 3,
    gameOver: false,
    count: 3,
    level: 1,
    explosion: false
}
let state = {...initState}

function distance(obj1, obj2) {
    const x = obj1.x - obj2.x
    const y = obj1.y - obj2.y
    return Math.sqrt(x ** 2 + y ** 2)
}

export function accelerate() {
    if (state.ship.velocity.magnitude < 3) {
        const ship = state.ship
        const oldmagnitude = ship.velocity.magnitude  
        const bearing = ship.bearing
        const [newmagnitude, newdirection] = vectorAdd(oldmagnitude, ship.velocity.direction, 1, bearing)
        ship.velocity.magnitude = newmagnitude
        ship.velocity.direction = newdirection
    }
};

function degreesToRadians(degree) {
    return degree*Math.PI/180
};


export function decelerate() {
    if (state.ship.velocity.magnitude >1) {
        state.ship.velocity.magnitude -= 1;
}
};

export function bearLeft() {
    state.ship.bearing -= degreesToRadians(10);
};


export function bearRight() {
    state.ship.bearing += degreesToRadians(10); 
};

export function shootBullet() {
    const bullet = {
        bearing: state.ship.bearing,
        velocity: 6,
        x: state.ship.x,
        y: state.ship.y,
        radius: 5,
        travelTimer: 120
    }
    if (state.bullets.length < 3) {
        state.bullets.push(bullet)
    }

};
  
function inBound(obj) {
    if (obj.x > 600) {
        obj.x = obj.x - 600
    }
    else if (obj.x < 0) {
        obj.x = obj.x + 600
    }
    if (obj.y > 600) {
        obj.y = obj.y - 600
    }
    else if (obj.y < 0) {
        obj.y = obj.y + 600
    }
}

function vectorAdd(velo1, bear1, velo2, bear2) {
    const x1= Math.cos(bear1) * velo1
    const y1= Math.sin(bear1) * velo1
    const x2= Math.cos(bear2) * velo2
    const y2= Math.sin(bear2) * velo2
    const xtot = x1 + x2
    const ytot = y1 + y2
    const beartot = Math.atan2(ytot, xtot)
    return [Math.sqrt(xtot ** 2 + ytot ** 2), beartot]
}

function levelUp(){
    if (state.score % 10 === 0) {
        state.count += 1
        state.level += 1
    }
    if (state.level & 3 === 0) {
        state.lives +=1
    }
}

function asteroidReplacer() {
    if (state.asteroids.length < state.count) {
        const asteroid = {
            x: Math.floor(Math.random() * state.height),
            y: Math.floor(Math.random() * state.width),
            bearing: Math.floor(Math.random()*2*Math.PI),
            velocity: 1,
            radius: 24
        }
        if (distance(asteroid, state.ship) > 100) {
            state.asteroids.push(asteroid)
        }
    }
}

function moveObjects() {
    state.asteroids.forEach((asteroid) => {
        asteroid.x += Math.cos(asteroid.bearing) * asteroid.velocity
        asteroid.y += Math.sin(asteroid.bearing) * asteroid.velocity
        inBound(asteroid)
    })
    
    const ship = state.ship  
    ship.x += Math.cos(ship.velocity.direction) * ship.velocity.magnitude
    ship.y += Math.sin(ship.velocity.direction) * ship.velocity.magnitude

    state.bullets.forEach((bullet) => {
        bullet.x += Math.cos(bullet.bearing) * bullet.velocity
        bullet.y += Math.sin(bullet.bearing) * bullet.velocity
        inBound(bullet)
    })

    inBound(ship)
}

function collisionDetection(){
    state.asteroids.forEach((asteroid, asteroidIdx) => {
        if (state.ship.radius + asteroid.radius > distance(state.ship,asteroid)) {
            state.lives -= 1
            state.explosion = true
            state.asteroids.splice(asteroidIdx, 1)
            asteroidReplacer()
            if (state.lives === 0) {
            state.gameOver = true
        }}
        state.bullets.forEach((bullet, bulletIdx) => {
            if (bullet.radius + asteroid.radius > distance(bullet,asteroid)){
                state.score += 1
                levelUp()
                state.bullets.splice(bulletIdx, 1)
                state.asteroids.splice(asteroidIdx, 1)
                if (asteroid.radius > 6) {
                    const asteroidHalfOne = {
                        radius: asteroid.radius/2,
                        velocity: asteroid.velocity*1.5,
                        bearing: bullet.bearing + degreesToRadians(45),
                        x: asteroid.x,
                        y: asteroid.y
                    }
                    const asteroidHalfTwo = {
                        radius: asteroid.radius/2,
                        velocity: asteroid.velocity*2,
                        bearing: bullet.bearing - degreesToRadians(45),
                        x: asteroid.x,
                        y: asteroid.y
                    }

                    state.asteroids.push(asteroidHalfOne, asteroidHalfTwo)
                    asteroidReplacer()
                }
            }
        })
    })
}

function bulletTime() {
    state.bullets.forEach((bullet, bulletIdx) => {
        bullet.travelTimer -= 1
        if (bullet.travelTimer === 0){
            state.bullets.splice(bulletIdx, 1)}
    })
}

export function tick() {
    if (state.gameOver) {
        return
    }
    if (state.explosion) {
        state.explosion = false
    }
    moveObjects()
    collisionDetection()
    bulletTime()
    asteroidReplacer()
}





export function start() {
    state = {...initState};
    state.asteroids = [] // forces state to reinitialize with new asteroids
    state.bullets = [] // forces state to reinitialize with no bullets

    state.ship = {
     y: state.height/2, 
     x: state.width/2,
     bearing: 0.5*Math.PI,
     velocity: {
        direction: 0.5*Math.PI,
        magnitude: 0
     },
     radius: 15
    }

    while (state.asteroids.length < state.count) {
        const asteroid = {
            x: Math.floor(Math.random() * state.height),
            y: Math.floor(Math.random() * state.width),
            bearing: Math.floor(Math.random()*2*Math.PI),
            velocity: 1,
            radius: 24
        }
        if (distance(asteroid, state.ship) > 100) {
            state.asteroids.push(asteroid)
        }
    }
}

export function getState(){
    return {...state}
}
