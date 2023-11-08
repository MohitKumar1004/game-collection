import React, { useEffect, useRef } from 'react'

export default function PingPong2() {

    const canv =useRef(null)
    
        var looper;
        var noofthreads=0;
        var stop=false;
        var ball = {};

        var user = {};

        var cpu = {};

        var sep = {};

        function init(){
            const can = canv.current;
            ball = {
                x: can.width / 2,
                y: can.height / 2,
                radius: 10,
                velX: 5,
                velY: 5,
                speed: 5,
                color: "green",
            };
            user = {
                x: 0,
                y: (can.height - 100) / 2,
                width: 10,
                height: 100,
                score: 0,
                color: "red",
            };
            cpu = {
                x: can.width - 10,
                y: (can.height - 100) / 2,
                width: 10,
                height: 100,
                score: 0,
                color: "red",
            };
            sep = {
                x: (can.width - 2) / 2,
                y: 0,
                height: 10,
                width: 2,
                color: "orange",
            };
        }

        function drawRectangle(x, y, w, h, color) {
            const can = canv.current;
            
        var draw_ = can.getContext("2d");
        draw_.fillStyle = color;
        draw_.fillRect(x, y, w, h);
        }

        function drawCircle(x, y, r, color) {
            const can = canv.current;
            
        var draw_ = can.getContext("2d");
        draw_.fillStyle = color;
        draw_.beginPath();
        draw_.arc(x, y, r, 0, 2 * Math.PI, false);
        draw_.closePath();
        draw_.fill();
        }

        function drawScore(text, x, y) {
            
            const can = canv.current;
        var draw_ = can.getContext("2d");
        draw_.fillStyle = "white";
        draw_.font = "60px Ariel";
        draw_.fillText(text, x, y);
        }

        function drawText(text, x, y,size) {
            
            const can = canv.current;
        var draw_ = can.getContext("2d");
        draw_.fillStyle = "white";
        draw_.font = size+"px Ariel";
        draw_.fillText(text, x, y);
        }

        function drawSeperator() {
            
            const can = canv.current;
        for (let i = 0; i <= can.height; i += 20) {
            drawRectangle(sep.x, sep.y + i, sep.width, sep.height, sep.color);
        }
        }

        function restart() {
            
            const can = canv.current;
        ball.x = can.width / 2;
        ball.y = can.height / 2;
        ball.velX = -ball.velX;
        ball.speed = 5;
        }


        function getMousePos(evt) {
            const can = canv.current;
        let rect = can.getBoundingClientRect();
        user.y = evt.clientY - rect.top - user.height / 2;
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

        if (player == user)
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
        if (cpu.y < ball.y) cpu.y += 5;
        else cpu.y -= 5;
        }

        function helper() {
            const can = canv.current;
        drawRectangle(0, 0, can.width, can.height, "black");
        drawScore(user.score, can.width / 4, can.height / 5);
        drawScore(cpu.score, (3 * can.width) / 4, can.height / 5);
        drawSeperator();
        drawRectangle(user.x, user.y, user.width, user.height, user.color);
        drawRectangle(cpu.x, cpu.y, cpu.width, cpu.height, cpu.color);
        drawCircle(ball.x, ball.y, ball.radius, ball.color);
        }

        function updates() {
            const can = canv.current;
        if (ball.x - ball.radius < 0) {
            cpu.score += 1;
            if(cpu.score==5)
            {
            anounce();
            noofthreads--;
            clearInterval(looper);
            }
            restart();
        }
        else if (ball.x + ball.radius > can.width) {
            user.score += 1;
            if(user.score==5)
            {
            anounce();
            noofthreads--;
            clearInterval(looper);
            }
            restart();
        }
        ball.x += ball.velX;
        ball.y += ball.velY;

        cpu_movement();

        if (ball.y - ball.radius < 0 || ball.y + ball.radius > can.height) {
            ball.velY = -ball.velY;
        }

        let player = (ball.x + ball.radius < can.width / 2) ? user : cpu;
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
            ball.velX = direction * ball.speed * Math.cos(angleRad);
            ball.velY = ball.speed * Math.sin(angleRad);

            ball.speed += 1;
        }
        }

        function call_back() {
        if(stop==true)
        {
            noofthreads--;
            clearInterval(looper);
        }
        helper();
        updates();
        }

        function anounce() {
            const can = canv.current;
        drawRectangle(0, 0, can.width, can.height, "black");
        if(user.score<cpu.score)
        drawText("Computer Wins", can.width / 3, can.height / 2,33);
        else
        drawText("Congratulation, You Win!", can.width / 5, can.height / 2,33);
        }

        function start(){
            const can = canv.current;
        while(noofthreads>0)
        {
            stop=true;
            setTimeout(function(){console.log("Timeout");},10);
            return;
        }
        setTimeout(function(){console.log("Timeout");},10);
        cpu = {
            x: can.width - 10,
            y: (can.height - 100) / 2,
            width: 10,
            height: 100,
            score: 0,
            color: "red",
        };
        user = {
            x: 0,
            y: (can.height - 100) / 2,
            width: 10,
            height: 100,
            score: 0,
            color: "red",
        };
        ball = {
            x: can.width / 2,
            y: can.height / 2,
            radius: 10,
            velX: 5,
            velY: 5,
            speed: 5,
            color: "green",
        };
        stop=false;
        noofthreads++;
        let fps = 40;
        looper = setInterval(call_back, 1000 / fps);
        }
        useEffect(() => {
            // canv.current.addEventListener("mousemove", getMousePos);
            if(canv.current) {
                canv.current.addEventListener("mousemove", getMousePos);
                return () => {
                    canv.current.removeEventListener("mousemove", getMousePos);
                }
            }
        },[cpu])
    

    return (
        <div>
            <canvas ref={canv} id="table" width="600" height="400"></canvas>
            <button onClick={start}>Reset</button>
        </div>
    )
}
