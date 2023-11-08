import React, { useEffect, useRef, useState } from 'react'
export default function PingPong() {
    const canvasGame = useRef(null);
    var looper;
    const [noofthreads, setThreads]=useState(0);
    const [stop, setStop]=useState(false);

    const [ball, setBall] = useState({
        x: 0,
        y: 0,
        radius: 10,
        velX: 5,
        velY: 5,
        speed: 5,
        color: "green",
    })

    const [user, setUser] = useState({
        x: 0,
        y: 0,
        width: 10,
        height: 100,
        score: 0,
        color: "red",
    })

    const [cpu, setCpu] = useState({
        x: 0,
        y: 0,
        width: 10,
        height: 100,
        score: 0,
        color: "red",
    })

    const [sep,setSep] = useState({
        x: 0,
        y: 0,
        height: 10,
        width: 2,
        color: "orange",
    })

    useEffect(() => {
        if(canvasGame.current) {
            const canvas = canvasGame.current
            const width = canvas.width
            const height = canvas.height

            setBall({
                ...ball,
                x: width / 2,
                y: height / 2,
            })
            setUser({
                ...user,
                y: (height - 100) / 2,
            })
            setCpu({
                ...cpu,
                x: width - 10,
                y: (height - 100) / 2,
            })
            setSep({
                ...sep,
                x: (width - 2) / 2,
            })
        }
    },[canvasGame, setSep, setCpu, setUser, setBall])

    function drawRectangle(x, y, w, h, color) {
        const draw_ = canvasGame.current.getContext('2d');
        draw_.fillStyle = color;
        draw_.fillRect(x, y, w, h);
    }

    function drawCircle(x, y, r, color) {
        const draw_ = canvasGame.current.getContext('2d');
        draw_.fillStyle = color;
        draw_.beginPath();
        draw_.arc(x, y, r, 0, 2 * Math.PI, false);
        draw_.closePath();
        draw_.fill();
    }

    function drawScore(text, x, y) {
        const draw_ = canvasGame.current.getContext('2d');
        draw_.fillStyle = "white";
        draw_.font = "60px Ariel";
        draw_.fillText(text, x, y);
    }

    function drawText(text, x, y,size) {
        const draw_ = canvasGame.current.getContext('2d');
        draw_.fillStyle = "white";
        draw_.font = size+"px Ariel";
        draw_.fillText(text, x, y);
    }

    function drawSeperator() {
        for (let i = 0; i <= canvasGame.current.height; i += 20) {
            drawRectangle(sep.x, sep.y + i, sep.width, sep.height, sep.color);
        }
    }

    // Restart the game by setting ball position to mid, to the direction of winning player
    function restart() {
        setBall({
            ...ball,
            x : canvasGame.current.width / 2,
            y : canvasGame.current.height / 2,
            velX : -ball.velX,
            speed : 5,
        })
    }

    function getMousePos(evt) {
        console.log(evt)
        let rect = canvasGame.current.getBoundingClientRect();
        setUser({
            ...user,
            y : evt.clientY - rect.top - user.height / 2
        })
        console.log(evt.clientY)
    }

    function detect_collision(ball, player) {
        player.top = player.y;
        player.bottom = player.y + player.height;
        player.left = player.x;
        player.right = player.x + player.width;

        ball.top = ball.y - ball.radius;
        ball.bottom = ball.y + ball.radius;
        ball.left = ball.x - ball.radius;
        ball.right = ball.x + ball.radius;

        if (player === user)
            return (
                player.right > ball.left &&
                player.top < ball.bottom &&
                player.bottom > ball.top
            );
        else
            return (
                player.left < ball.right &&
                player.top < ball.bottom &&
                player.bottom > ball.top
            );
    }

    function cpu_movement() {
        if (cpu.y < ball.y) setCpu({...cpu, y : cpu.y + 5});
        else setCpu({...cpu, y : cpu.y - 5});
    }

    function helper() {
        drawRectangle(0, 0, canvasGame.current.width, canvasGame.current.height, "black");
        drawScore(user.score, canvasGame.current.width / 4, canvasGame.current.height / 5);
        drawScore(cpu.score, (3 * canvasGame.current.width) / 4, canvasGame.current.height / 5);
        drawSeperator();
        drawRectangle(user.x, user.y, user.width, user.height, user.color);
        drawRectangle(cpu.x, cpu.y, cpu.width, cpu.height, cpu.color);
        drawCircle(ball.x, ball.y, ball.radius, ball.color);
    }

    function updates() {
        if (ball.x - ball.radius < 0) {
            setCpu({
                ...cpu,
                score : cpu.score + 1
            })
            if(cpu.score===5)
            {
                anounce();
                setThreads(prev => prev - 1);
                clearInterval(looper);
            }
            restart();
        }
        else if (ball.x + ball.radius > canvasGame.current.width) {
            setUser({
                ...user,
                score : user.score + 1
            })
            if(user.score===5)
            {
                anounce();
                setThreads(prev => prev - 1);
                clearInterval(looper);
            }
            restart();
        }
        setBall({
            x : ball.x + ball.velX,
            y : ball.y + ball.velY
        })

        cpu_movement();

        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvasGame.current.height) {
            setBall({
                ...ball,
                velY : -ball.velY
            })
        }

        let player = (ball.x + ball.radius < canvasGame.current.width / 2) ? user : cpu;
        console.log(detect_collision(ball, player));

        if (detect_collision(ball, player)) {
            //we check where the ball hits the paddle
            let collidePoint = ball.y - (player.y + player.height / 2);
            //normalize the value of collidePoint,we need to get numbers of collisions
            //-player.height/2<collidePoint<player.height/2
            collidePoint = collidePoint / (player.height / 2);
            //Math.PI*4=45degrees
            let angleRad = (Math.PI / 4) * collidePoint;

            //change the X and Y velocity direction
            let direction = (ball.x + ball.radius < cpu.x && ball.x - ball.radius > user.x) ? 1 : -1;
            setBall({
                ...ball,
                velX : direction * ball.speed * Math.cos(angleRad),
                velY : ball.speed * Math.sin(angleRad),
                speed : ball.speed + 1
            })
        }
    }

    function call_back() {
        if(stop===true)
        {
            setThreads(prev => prev - 1);
            clearInterval(looper);
        }
        helper();
        updates();
    }

    function anounce() {
        drawRectangle(0, 0, canvasGame.current.width, canvasGame.current.height, "black");
        if(user.score<cpu.score)
            drawText("Computer Wins", canvasGame.current.width / 3, canvasGame.current.height / 2,33);
        else
            drawText("Congratulation, You Win!", canvasGame.current.width / 5, canvasGame.current.height / 2,33);
    }

    function start(){
        while(noofthreads>0)
        {
            setStop(true);
            setTimeout(() => {console.log("Timeout");},10);
            return;
        }
        setCpu({...cpu, score: cpu.score + 1})
        console.log(cpu)
        setTimeout(function(){console.log("Timeout");},10);
        setCpu({
            x: canvasGame.current.width - 10,
            y: (canvasGame.current.height - 100) / 2,
            width: 10,
            height: 100,
            score: 0,
            color: "red",
        })
        setUser({
            x: 0,
            y: (canvasGame.current.height - 100) / 2,
            width: 10,
            height: 100,
            score: 0,
            color: "red",
        })
        setBall({
            x: canvasGame.current.width / 2,
            y: canvasGame.current.height / 2,
            radius: 10,
            velX: 5,
            velY: 5,
            speed: 5,
            color: "green",
        })
        setStop(false);
        setThreads(prev => prev + 1);
        let fps = 40;
        looper = setInterval(call_back, 1000 / fps);
    }

    useEffect(() => {
        if(canvasGame.current) {
            canvasGame.current.addEventListener("mousemove", getMousePos);
            return () => {
                canvasGame.current.removeEventListener("mousemove", getMousePos);
            }
        }
    },[])

    return (
        <>
            <button onClick={start}>Reset</button>
            <canvas ref={canvasGame} width="600" height="400"></canvas>
        </>
    )
}
