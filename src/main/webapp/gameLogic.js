kaboom();
console.log(knight.pv);
console.log(wizard.pv);
console.log(enemy.pv);
//game background

loadSprite("background", "assets/background/layer1.png");
loadSprite("trees", "assets/background/layer2.png");

loadSpriteAtlas("assets/oak_woods_tileset.png", {
    "ground-golden": {
        x: 16,
        y: 0,
        width: 16,
        height: 16,
    },
    "deep-ground": {
        x: 16,
        y: 32,
        width: 16,
        height: 16,
    },
    "ground-silver": {
        x: 150,
        y: 0,
        width: 16,
        height: 16,
    },
});

//wizard movements
loadSprite("idle-wizard", "assets/wizard-idle.png", {
    sliceX: 6,
    sliceY: 1,
    anims: { idle: { from: 0, to: 5, speed: 12, loop: true } },
});
loadSprite("jump-wizard", "assets/wizard-jump.png", {
    sliceX: 2,
    sliceY: 1,
    anims: { jump: { from: 0, to: 1, speed: 2, loop: true } },
});
loadSprite("attack-wizard", "assets/wizard-attack.png", {
    sliceX: 8,
    sliceY: 1,
    anims: { attack: { from: 0, to: 7, speed: 18 } },
});
loadSprite("run-wizard", "assets/wizard-run.png", {
    sliceX: 8,
    sliceY: 1,
    anims: { run: { from: 0, to: 7, speed: 18 } },
});
loadSprite("hit-wizard", "assets/wizard-hit.png", {
    sliceX: 4,
    sliceY: 1,
    anims: { hit: { from: 0, to: 3, speed: 10 } },
});
loadSprite("death-wizard", "assets/wizard-death.png", {
    sliceX: 7,
    sliceY: 1,
    anims: { death: { from: 0, to: 6, speed: 10 } },
});

//knight movements
loadSprite("idle-knight", "assets/knight-idle.png", {
    sliceX: 11,
    sliceY: 1,
    anims: { idle: { from: 0, to: 10, speed: 12, loop: true } },
});
loadSprite("jump-knight", "assets/knight-jump.png", {
    sliceX: 3,
    sliceY: 1,
    anims: { jump: { from: 0, to: 2, speed: 2, loop: true } },
});
loadSprite("attack-knight", "assets/knight-attack.png", {
    sliceX: 7,
    sliceY: 1,
    anims: { attack: { from: 0, to: 6, speed: 18 } },
});
loadSprite("run-knight", "assets/knight-run.png", {
    sliceX: 8,
    sliceY: 1,
    anims: { run: { from: 0, to: 7, speed: 18 } },
});
loadSprite("hit-knight", "assets/knight-hit.png", {
    sliceX: 4,
    sliceY: 1,
    anims: { hit: { from: 0, to: 3, speed: 10 } },
});
loadSprite("death-knight", "assets/knight-death.png", {
    sliceX: 11,
    sliceY: 1,
    anims: { death: { from: 0, to: 10, speed: 10 } },
});

//enemy movements
loadSprite("idle-enemy", "assets/enemy-idle.png", {
    sliceX: 4,
    sliceY: 1,
    anims: { idle: { from: 0, to: 3, speed: 12, loop: true } },
});
loadSprite("attack-enemy", "assets/enemy-attack.png", {
    sliceX: 8,
    sliceY: 1,
    anims: { attack: { from: 0, to: 7, speed: 18 } },
});
loadSprite("run-enemy", "assets/enemy-run.png", {
    sliceX: 8,
    sliceY: 1,
    anims: { run: { from: 0, to: 7, speed: 18 } },
});
loadSprite("hit-enemy", "assets/enemy-hit.png", {
    sliceX: 4,
    sliceY: 1,
    anims: { hit: { from: 0, to: 3, speed: 10 } },
});
loadSprite("death-enemy", "assets/enemy-death.png", {
    sliceX: 4,
    sliceY: 1,
    anims: { death: { from: 0, to: 3, speed: 10 } },
});

//scenes
scene("fight", () => {
    const background = add([sprite("background"), scale(4.6)]);
    background.add([sprite("trees"), pos(0, 50)]);
    //ground tiles
    const groundTiles = addLevel(
        [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "########################",
            "dddddddddddddddddddddddd",
        ],
        {
            tileWidth: 16,
            tileHeight: 16,
            tiles: {
                "#": () => [sprite("ground-golden"), area(), body({ isStatic: true })],
                "-": () => [sprite("ground-silver"), area(), body({ isStatic: true })],
                d: () => [sprite("deep-ground"), area(), body({ isStatic: true })],
            },
        }
    );
    groundTiles.use(scale(4.5));

    // left invisible wall
    add([rect(16, 720), area(), body({ isStatic: true }), pos(-16, 0)]);

    // right invisible wall
    add([rect(16, 720), area(), body({ isStatic: true }), pos(1440, 0)]);

    setGravity(1200);

    //All my functions

    function makePlayer(posX, posY, width, height, scaleFactor, id) {
        return add([
            pos(posX, posY),
            scale(scaleFactor),
            area({ shape: new Rect(vec2(0), width, height) }),
            anchor("center"),
            body({ stickToPlatform: true }),
            {
                isCurrentlyJumping: false,
                health: 500,
                sprites: {
                    run: "run-" + id,
                    idle: "idle-" + id,
                    jump: "jump-" + id,
                    attack: "attack-" + id,
                    hit: "hit-" + id,
                    death: "death-" + id,
                },
            },
        ]);
    }
    function run(player, speed, flipPlayer) {
        if (player.health === 0) return;
        if (player.curAnim !== "run" && !player.isCurrentlyJumping) {
            player.use(sprite(player.sprites.run));
            player.play("run");
        }
        player.move(speed, 0);
        player.flipX = flipPlayer;
    }

    function resetPlayerTodle(player) {
        player.use(sprite(player.sprites.idle));
        player.play("idle");
    }

    function makeJump(player) {
        if (player.health === 0) {
            return;
        }

        if (player.isGrounded()) {
            const currentFlip = player.flipX;
            player.jump();
            player.use(sprite(player.sprites.jump));
            player.flipX = currentFlip;
            player.play("jump");
            player.isCurrentlyJumping = true;
        }
    }

    function resetAfterJump(player) {
        if (player.isGrounded() && player.isCurrentlyJumping) {
            player.isCurrentlyJumping = false;
            if (player.curAnim() !== "idle") {
                resetPlayerTodle(player);
            }
        }
    }

    function attack(player, excludedKeys) {
        if (player.health === 0) {
            return;
        }

        for (const key of excludedKeys) {
            if (isKeyDown(key)) {
                return;
            }
        }

        const currentFlip = player.flipX;
        if (player.curAnim() !== "attack") {
            player.use(sprite(player.sprites.attack));
            player.flipX = currentFlip;
            const slashX = player.pos.x + 30;
            const slashXFlipped = player.pos.x - 350;
            const slashY = player.pos.y - 200;

            add([
                rect(300, 300),
                area(),
                pos(currentFlip ? slashXFlipped : slashX, slashY),
                opacity(0),
                player.id + "attackHitbox",
            ]);

            player.play("attack", {
                onEnd: () => {
                    resetPlayerTodle(player);
                    player.flipX = currentFlip;
                },
            });
        }
    }

    //Creating the players

    const knight = makePlayer(350, 300, 16, 42, 2.5, "knight");
    knight.use(sprite(knight.sprites.idle));
    knight.play("idle");

    const wizard = makePlayer(130, 300, 10, 85, 1.5, "wizard");
    wizard.use(sprite(wizard.sprites.idle));
    wizard.play("idle");

    const enemy = makePlayer(1200, 300, 16, 49, 3, "enemy");
    enemy.use(sprite(enemy.sprites.idle));
    enemy.play("idle");

    //enemy keyboard keys actions
    onKeyDown("p", () => {
        run(enemy, 500, false);
    });
    onKeyRelease("p", () => {
        if (enemy.health !== 0) {
            resetPlayerTodle(enemy);
            enemy.flipX = false;
        }
    });
    onKeyDown("o", () => {
        run(enemy, -500, true);
    });
    onKeyRelease("o", () => {
        if (enemy.health !== 0) {
            resetPlayerTodle(enemy);
            enemy.flipX = true;
        }
    });
    enemy.onUpdate(() => resetAfterJump(enemy));

    onKeyPress("i", () => {
        attack(enemy, ["o", "p", "j"]);
    });

    onKeyRelease("i", () => {
        destroyAll(enemy.id + "attackHitbox");
    });

    //knight keyboard keys actions
    onKeyDown("s", () => {
        run(knight, 500, false);
    });
    onKeyRelease("s", () => {
        if (knight.health !== 0) {
            resetPlayerTodle(knight);
            knight.flipX = false;
        }
    });
    onKeyDown("q", () => {
        run(knight, -500, true);
    });
    onKeyRelease("q", () => {
        if (knight.health !== 0) {
            resetPlayerTodle(knight);
            knight.flipX = true;
        }
    });
    onKeyDown("f", () => {
        makeJump(knight);
    });
    knight.onUpdate(() => resetAfterJump(knight));

    onKeyPress("d", () => {
        attack(knight, ["q", "s", "f"]);
    });

    onKeyRelease("d", () => {
        destroyAll(knight.id + "attackHitbox");
    });

    //wizard keyboard keys actions
    onKeyDown("z", () => {
        run(wizard, 500, false);
    });
    onKeyRelease("z", () => {
        if (wizard.health !== 0) {
            resetPlayerTodle(wizard);
            wizard.flipX = false;
        }
    });
    onKeyDown("a", () => {
        run(wizard, -500, true);
    });
    onKeyRelease("a", () => {
        if (wizard.health !== 0) {
            resetPlayerTodle(wizard);
            wizard.flipX = true;
        }
    });
    onKeyDown("r", () => {
        makeJump(wizard);
    });
    wizard.onUpdate(() => resetAfterJump(wizard));

    onKeyPress("e", () => {
        attack(wizard, ["a", "z", "r"]);
    });

    onKeyRelease("e", () => {
        destroyAll(wizard.id + "attackHitbox");
    });

    const counter = add([
        rect(100, 100),
        pos(center().x, center().y - 345),
        color(10, 10, 10),
        area(),
        anchor("center"),
    ]);

    const count = counter.add([
        text("60"),
        area(),
        anchor("center"),
        {
            timeLeft: 60,
        },
    ]);

    const winningText = add([text(""), area(), anchor("center"), pos(center())]);

    let gameOver = false;
    onKeyDown("t", () => (gameOver ? go("fight") : null));

    function declareWinner(winningText, player1, player2) {
        if (
            (player1.health > 0 && player2.health > 0) ||
            (player1.health === 0 && player2.health === 0)
        ) {
            winningText.text = "Tie!";
            wait(3, () => {
                go("fight");
            });
        } else if (player1.health > 0 && player2.health === 0) {
            winningText.text = "Victory!";
            player2.use(sprite(player2.sprites.death));
            player2.play("death");
            wait(5, () => {
                go("fight");
            });
        } else {
            winningText.text = "The Enemy won!, Try Again";
            player1.use(sprite(player1.sprites.death));
            player1.play("death");
            wait(3, () => {
                go("fight");
            });
        }
    }

    const countInterval = setInterval(() => {
        if (count.timeLeft === 0) {
            clearInterval(countInterval);
            declareWinner(winningText, knight, enemy);
            gameOver = true;
            return;
        }
        count.timeLeft--;
        count.text = count.timeLeft;
    }, 1000);

    const knightHealthContainer = add([
        rect(500, 70),
        area(),
        outline(5),
        pos(90, 50),
        color(200, 0, 0),
    ]);

    const knightHealthBar = knightHealthContainer.add([
        rect(498, 65),
        color(0, 180, 0),
        pos(498, 70 - 2.5),
        rotate(180),
    ]);

    knight.onCollide(enemy.id + "attackHitbox", () => {
        if (gameOver) {
            return;
        }

        if (knight.health !== 0) {
            knight.health -= 50;
            tween(
                knightHealthBar.width,
                knight.health,
                1,
                (val) => {
                    knightHealthBar.width = val;
                },
                easings.easeOutSine
            );
        }

        if (knight.health === 0) {
            clearInterval(countInterval);
            declareWinner(winningText, knight, enemy);
        }
    });

    const wizardHealthContainer = add([
        rect(500, 70),
        area(),
        outline(5),
        pos(90, 150),
        color(200, 0, 0),
    ]);

    const wizardHealthBar = wizardHealthContainer.add([
        rect(498, 65),
        color(0, 180, 0),
        pos(498, 70 - 2.5),
        rotate(180),
    ]);

    wizard.onCollide(enemy.id + "attackHitbox", () => {
        if (gameOver) {
            return;
        }

        if (wizard.health !== 0) {
            wizard.health -= 50;
            tween(
                wizardHealthBar.width,
                wizard.health,
                1,
                (val) => {
                    wizardHealthBar.width = val;
                },
                easings.easeOutSine
            );
        }

        if (wizard.health === 0) {
            clearInterval(countInterval);
            declareWinner(winningText, wizard, enemy);
        }
    });
    const enemyHealthContainer = add([
        rect(500, 70),
        area(),
        outline(5),
        pos(850, 50),
        color(200, 0, 0),
    ]);

    const enemyHealthBar = enemyHealthContainer.add([
        rect(498, 65),
        color(0, 180, 0),
        pos(2.5, 2.5),
    ]);

    enemy.onCollide(knight.id + "attackHitbox", () => {
        if (gameOver) {
            return;
        }

        if (enemy.health !== 0) {
            enemy.health -= 50;
            tween(
                enemyHealthBar.width,
                enemy.health,
                1,
                (val) => {
                    enemyHealthBar.width = val;
                },
                easings.easeOutSine
            );
        }

        if (enemy.health === 0) {
            clearInterval(countInterval);
            declareWinner(winningText, knight, enemy);
            gameOver = true;
        }
    });
    enemy.onCollide(wizard.id + "attackHitbox", () => {
        if (gameOver) {
            return;
        }

        if (enemy.health !== 0) {
            enemy.health -= 50;
            tween(
                enemyHealthBar.width,
                enemy.health,
                1,
                (val) => {
                    enemyHealthBar.width = val;
                },
                easings.easeOutSine
            );
        }

        if (enemy.health === 0) {
            clearInterval(countInterval);
            declareWinner(winningText, wizard, enemy);
            gameOver = true;
        }
    });
});

go("fight");
