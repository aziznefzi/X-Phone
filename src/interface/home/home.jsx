import React, { useEffect, useRef } from "react";
import style from "./home.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { animate, random, remove } from "animejs";

import LogoDark from "../../frontend/image/LogoDark.png";
import LogoLight from "../../frontend/image/LogoLight.png";
export default function Home() {
  const { t } = useTranslation();
  const holderRef = useRef(null);
  const shapesContainerRef = useRef(null);
  const theme = useTheme();
  const bgColor = theme.palette.WebsiteMode.background.bg1;

  useEffect(() => {
    // anime.js animation logic
    const randomValues = () => {
      if (!shapesContainerRef.current) return;
      const width = shapesContainerRef.current.offsetWidth;
      const height = shapesContainerRef.current.offsetHeight;

      animate(`.${style.square}, .${style.circle}, .${style.triangle}`, {
        translateX: () => random(0, width - 40),
        translateY: () => random(0, height - 40),
        rotate: () => random(0, 360),
        scale: () => random(0.3, 1.5),
        duration: () => random(3000, 6000),
        easing: "easeInOutQuad",
        onComplete: randomValues,
      });
    };

    randomValues();

    return () => {
      remove(`.${style.square}, .${style.circle}, .${style.triangle}`);
    };
  }, []);

  useEffect(() => {
    if (!holderRef.current) return;
    // ... (rest of the waves logic remains same but I'll write it out for clarity in replacement)
    const pi = Math.PI;
    const pi2 = 2 * Math.PI;

    function rnd(a, b) {
      if (arguments.length === 1) return Math.random() * a;
      return a + Math.random() * (b - a);
    }

    function rnd_sign() {
      return Math.random() > 0.5 ? 1 : -1;
    }

    function dtr(deg) {
      return (deg * pi) / 180;
    }

    function Line(Wave, color) {
      this.angle = [
        Math.sin((Wave.angle[0] += Wave.speed[0])),
        Math.sin((Wave.angle[1] += Wave.speed[1])),
        Math.sin((Wave.angle[2] += Wave.speed[2])),
        Math.sin((Wave.angle[3] += Wave.speed[3])),
      ];
      this.color = color;
    }

    function Wave(Waves) {
      this.Waves = Waves;
      this.Lines = [];
      this.angle = [rnd(pi2), rnd(pi2), rnd(pi2), rnd(pi2)];
      this.speed = [
        rnd(Waves.options.speed[0], Waves.options.speed[1]) * rnd_sign(),
        rnd(Waves.options.speed[0], Waves.options.speed[1]) * rnd_sign(),
        rnd(Waves.options.speed[0], Waves.options.speed[1]) * rnd_sign(),
        rnd(Waves.options.speed[0], Waves.options.speed[1]) * rnd_sign(),
      ];
    }

    Wave.prototype.update = function () {
      this.Lines.push(new Line(this, this.Waves.color));
      if (this.Lines.length > this.Waves.options.width) {
        this.Lines.shift();
      }
    };

    Wave.prototype.draw = function () {
      const Waves = this.Waves;
      const ctx = Waves.ctx;
      const radius = Waves.radius;
      const radius3 = radius / 3;
      const x = Waves.centerX;
      const y = Waves.centerY;
      const rotation = dtr(Waves.options.rotation);
      const amplitude = Waves.options.amplitude;

      this.Lines.forEach((line) => {
        const angle = line.angle;
        const x1 = x - radius * Math.cos(angle[0] * amplitude + rotation);
        const y1 = y - radius * Math.sin(angle[0] * amplitude + rotation);
        const x2 = x + radius * Math.cos(angle[3] * amplitude + rotation);
        const y2 = y + radius * Math.sin(angle[3] * amplitude + rotation);
        const cpx1 = x - radius3 * Math.cos(angle[1] * amplitude * 2);
        const cpy1 = y - radius3 * Math.sin(angle[1] * amplitude * 2);
        const cpx2 = x + radius3 * Math.cos(angle[2] * amplitude * 2);
        const cpy2 = y + radius3 * Math.sin(angle[2] * amplitude * 2);

        ctx.strokeStyle = line.color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
        ctx.stroke();
      });
    };

    function Waves(holder, options, bg) {
      this.options = {
        resize: true,
        rotation: 45,
        waves: 5,
        width: 100,
        hue: [11, 14],
        amplitude: 0.5,
        background: true,
        preload: true,
        speed: [0.004, 0.008],
        debug: false,
        fps: false,
        ...options,
      };
      this.waves = [];
      this.holder = holder;
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.holder.appendChild(this.canvas);
      this.hue = this.options.hue[0];
      this.hueFw = true;
      this.bgColor = bg;

      this.resize();
      this.init(this.options.preload);

      if (this.options.resize) {
        this.resizeHandler = this.resize.bind(this);
        window.addEventListener("resize", this.resizeHandler);
      }
    }

    Waves.prototype.init = function (preload) {
      for (let i = 0; i < this.options.waves; i++) {
        this.waves[i] = new Wave(this);
      }
      if (preload) this.preload();
    };

    Waves.prototype.preload = function () {
      for (let i = 0; i < this.options.waves; i++) {
        this.updateColor();
        for (let j = 0; j < this.options.width; j++) {
          this.waves[i].update();
        }
      }
    };

    Waves.prototype.render = function () {
      this.updateColor();
      this.clear();
      if (this.options.background) this.background();
      this.waves.forEach((wave) => {
        wave.update();
        wave.draw();
      });
    };

    Waves.prototype.animate = function () {
      this.render();
      this.animationId = window.requestAnimationFrame(this.animate.bind(this));
    };

    Waves.prototype.clear = function () {
      this.ctx.clearRect(0, 0, this.width, this.height);
    };

    Waves.prototype.background = function () {
      const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
      gradient.addColorStop(0, this.bgColor);
      gradient.addColorStop(1, this.color);
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.width, this.height);
    };

    Waves.prototype.resize = function () {
      const width = this.holder.offsetWidth;
      const height = this.holder.offsetHeight;
      this.scale = Math.min(window.devicePixelRatio || 1, 2);
      this.width = width * this.scale;
      this.height = height * this.scale;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.style.width = "100%";
      this.canvas.style.height = "100%";
      this.radius =
        Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / 2;
      this.centerX = this.width / 2;
      this.centerY = this.height / 2;
    };

    Waves.prototype.updateColor = function () {
      this.hue += this.hueFw ? 0.01 : -0.01;
      if (this.hue > this.options.hue[1] && this.hueFw) {
        this.hue = this.options.hue[1];
        this.hueFw = false;
      } else if (this.hue < this.options.hue[0] && !this.hueFw) {
        this.hue = this.options.hue[0];
        this.hueFw = true;
      }
      const a = Math.floor(127 * Math.sin(0.3 * this.hue + 0) + 128);
      const b = Math.floor(127 * Math.sin(0.3 * this.hue + 2) + 128);
      const c = Math.floor(127 * Math.sin(0.3 * this.hue + 4) + 128);
      this.color = `rgba(${a},${b},${c}, 0.15)`;
    };

    const isMobile = window.innerWidth < 768;
    const wavesInstance = new Waves(
      holderRef.current,
      {
        waves: isMobile ? 2 : 3,
        width: isMobile ? 100 : 200,
      },
      bgColor,
    );

    wavesInstance.animate();

    return () => {
      if (wavesInstance.animationId) {
        window.cancelAnimationFrame(wavesInstance.animationId);
      }
      if (wavesInstance.resizeHandler) {
        window.removeEventListener("resize", wavesInstance.resizeHandler);
      }
      if (wavesInstance.canvas && wavesInstance.canvas.parentNode) {
        wavesInstance.canvas.parentNode.removeChild(wavesInstance.canvas);
      }
    };
  }, [bgColor]);

  const LogoTheme = theme.palette.mode === "dark" ? LogoDark : LogoLight;

  return (
    <div id="home" className={style.home}>
      <div ref={holderRef} className={style.holder}></div>
      <div ref={shapesContainerRef} className={style.shapesContainer}>
        {[
          ...Array(
            typeof window !== "undefined" && window.innerWidth < 768 ? 3 : 5,
          ),
        ].map((_, i) => (
          <div key={`sq-${i}`} className={style.square}></div>
        ))}
        {[
          ...Array(
            typeof window !== "undefined" && window.innerWidth < 768 ? 3 : 5,
          ),
        ].map((_, i) => (
          <div key={`ci-${i}`} className={style.circle}></div>
        ))}
        {[
          ...Array(
            typeof window !== "undefined" && window.innerWidth < 768 ? 3 : 5,
          ),
        ].map((_, i) => (
          <div key={`tr-${i}`} className={style.triangle}></div>
        ))}
      </div>
      <div className={style.content}>
        <div className={style.Title}>
          <img src={LogoTheme} alt="Phone-X Logo" />
          <h1 className={style.heroTitle}>{t("home.title")}</h1>
        </div>
        <p className={style.heroSubtitle}>{t("home.subtitle")}</p>
        <button className={style.heroCTA}>{t("home.cta")}</button>
      </div>
    </div>
  );
}
