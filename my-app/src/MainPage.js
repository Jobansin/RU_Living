import React from "react";
import { FaGithub, FaLink } from "react-icons/fa";

const MainPage = ({onStartTest}) => {
    return (
        <div>
            <div class="logo">
                <img src="ru.png" width="120px" height="60px"/>
                <h1 class="title">Living</h1>
            </div>
            <div class="container">
                <div class="wrapper">
                    <img class="pics" src="livy.jpg"/>
                    <img class="pics" src="busch.jpg"/>
                    <img class="pics" src="collegeAve.jpg"/>
                    <img class="pics" src="cookDoug.jpg"/>
                </div>
            </div>
            <div class="text">
                <h2>The Perfect Dorm for you</h2>
                <button id="dorm" onClick={onStartTest}>Find me a dorm</button>
            </div>
            <div id="icons">
                <a href="https://github.com/Jobansin/RU_Living"><FaGithub size="3em"/></a>
                <a href="https://linktr.ee/RULiving"><FaLink size="3em"/></a>
            </div>
            <footer class="footer">Copyright © 2023 David Harianto, Isaiah Pajaro, Joban Singh. All rights reserved.</footer>
        </div>
    );
};

export default MainPage;